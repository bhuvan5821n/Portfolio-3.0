const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const out = path.resolve('review-artifacts');
const base = 'http://127.0.0.1:4173';
const sizes = [[320,568],[360,640],[375,812],[390,844],[412,915],[430,932]];

async function instrument(page) {
  await page.addInitScript(() => {
    window.review = { draws: [], requests: [], shifts: [], longTasks: [], lcp: [] };
    for (const [type, key] of [['layout-shift','shifts'],['longtask','longTasks'],['largest-contentful-paint','lcp']]) {
      try { new PerformanceObserver(list => list.getEntries().forEach(e => window.review[key].push({start:e.startTime,duration:e.duration,value:e.value,input:e.hadRecentInput,size:e.size,element:e.element?.className}))).observe({type, buffered:true}); } catch {}
    }
    const blobs = new WeakMap();
    const bitmaps = new WeakMap();
    const fetchOriginal = window.fetch;
    window.fetch = async (...args) => {
      const response = await fetchOriginal(...args);
      const match = response.url.match(/frame_(\d+)\.jpg/);
      if (match) {
        const originalBlob = response.blob.bind(response);
        response.blob = async () => { const blob = await originalBlob(); blobs.set(blob, Number(match[1])); return blob; };
        window.review.requests.push({frame:Number(match[1]),time:performance.now()});
      }
      return response;
    };
    const bitmapOriginal = window.createImageBitmap;
    window.createImageBitmap = async (...args) => { const bitmap = await bitmapOriginal(...args); bitmaps.set(bitmap, blobs.get(args[0])); return bitmap; };
    const drawOriginal = CanvasRenderingContext2D.prototype.drawImage;
    CanvasRenderingContext2D.prototype.drawImage = function(...args) {
      const result = drawOriginal.apply(this,args);
      if (this.canvas.closest('.intro-sequence')) window.review.draws.push({frame:bitmaps.get(args[0]),requested:Number(document.querySelector('.intro-sequence')?.dataset.frameIndex),time:performance.now(),scroll:scrollY});
      return result;
    };
  });
}

async function inspect(page) {
  return page.evaluate(() => {
    const box = selector => { const e = document.querySelector(selector); if (!e) return null; const r=e.getBoundingClientRect(); return {top:r.top+scrollY,height:r.height,width:r.width,text:e.textContent?.trim().slice(0,110)}; };
    return {width:innerWidth,height:innerHeight,scrollHeight:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth-innerWidth,intro:box('.intro-sequence'),heading:box('h1'),cta:box('.hero-actions'),selected:box('.selected-work'),firstProject:box('.paper-project'),poster:document.querySelector('.intro-poster')?.currentSrc,skip:!!document.querySelector('.intro-skip'),replay:!!document.querySelector('.replay-intro'),resources:performance.getEntriesByType('resource').map(e=>({url:e.name.replace(location.origin,''),type:e.initiatorType,bytes:e.transferSize,decoded:e.decodedBodySize,duration:e.duration})),...window.review};
  });
}

(async () => {
  await fs.mkdir(out,{recursive:true});
  const browser=await chromium.launch({headless:true});
  const report={mobile:[],routes:[],sequence:[],assets:{}};
  try {
    for(const [width,height] of sizes) {
      const context=await browser.newContext({viewport:{width,height},hasTouch:true,isMobile:true,deviceScaleFactor:1});
      const page=await context.newPage();
      await instrument(page);
      await page.goto(base,{waitUntil:'networkidle'});
      await page.screenshot({path:path.join(out,`home-${width}.png`)});
      report.mobile.push(await inspect(page));
      if(width===390) {
        await page.screenshot({path:path.join(out,'home-390-full.png'),fullPage:true});
        const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
        report.mobile.at(-1).axe=axe.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}));
        const before=await page.locator('.intro-sequence').boundingBox();
        await page.evaluate(()=>sessionStorage.setItem('bhuvan_intro_seen','1'));
        await page.reload({waitUntil:'networkidle'});
        report.mobile.at(-1).returnIntro={before,after:await page.locator('.intro-sequence').boundingBox()};
      }
      await context.close();
    }
    for(const width of [390,1440]) {
      const context=await browser.newContext({viewport:{width,height:width===390?844:900},hasTouch:width===390});
      for(const route of ['/projects','/projects/friday','/lab','/achievements','/profile','/this-room-does-not-exist']) {
        const page=await context.newPage();
        const errors=[];
        page.on('pageerror',e=>errors.push(e.message));
        const response=await page.goto(base+route,{waitUntil:'networkidle'});
        await page.screenshot({path:path.join(out,`${route.slice(1).replaceAll('/','-')}-${width}.png`),fullPage:true});
        report.routes.push({route,width,status:response.status(),errors,...await inspect(page)});
        await page.close();
      }
      await context.close();
    }
    for(const delayed of [false,true]) {
      const context=await browser.newContext({viewport:{width:1440,height:900}});
      const page=await context.newPage();
      await instrument(page);
      if(delayed) await page.route(/frame_\d+\.jpg/,async route=>{await new Promise(r=>setTimeout(r,180));await route.continue();});
      await page.goto(base,{waitUntil:'networkidle'});
      await page.screenshot({path:path.join(out,`desktop-intro-${delayed}.png`)});
      for(let i=0;i<8;i++){await page.mouse.wheel(0,100);await page.waitForTimeout(80);}
      await page.mouse.wheel(0,1650);
      await page.waitForTimeout(120);
      await page.mouse.wheel(0,-1500);
      await page.waitForTimeout(2500);
      const freeze=await inspect(page);
      await page.screenshot({path:path.join(out,`desktop-reverse-${delayed}.png`)});
      const count=freeze.draws.length;
      await page.getByRole('button',{name:'Skip intro',exact:true}).click();
      await page.waitForTimeout(700);
      await page.screenshot({path:path.join(out,`desktop-home-${delayed}.png`)});
      report.sequence.push({delayed,freeze,afterSkip:await inspect(page),drawCountAtSkip:count});
      await context.close();
    }
    const files=await fs.readdir('public/media/hero-sequence');
    const jpgs=files.filter(f=>f.endsWith('.jpg'));
    const stats=await Promise.all(jpgs.map(async f=>({file:f,bytes:(await fs.stat(path.join('public/media/hero-sequence',f))).size})));
    report.assets={frames:stats,totalBytes:stats.reduce((n,f)=>n+f.bytes,0),dimensions:await sharp('public/media/hero-sequence/frame_001.jpg').metadata()};
    await fs.writeFile(path.join(out,'review.json'),JSON.stringify(report,null,2));
    console.log(JSON.stringify({mobile:report.mobile.map(m=>({width:m.width,intro:m.intro,heading:m.heading,cta:m.cta,selected:m.selected,overflow:m.overflow,axe:m.axe,returnIntro:m.returnIntro})),sequence:report.sequence.map(s=>({delayed:s.delayed,lastDraws:s.freeze.draws.slice(-12),requests:s.freeze.requests.length,afterSkipRequests:s.afterSkip.requests.length})),assetBytes:report.assets.totalBytes},null,2));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
