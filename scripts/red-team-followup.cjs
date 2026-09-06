const {chromium, webkit} = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');
const out = path.resolve('review-artifacts');
(async()=>{
 const browser=await chromium.launch();
 const results={};
 try {
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  const page=await context.newPage();
  await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
  await page.mouse.wheel(0,950);
  await page.waitForTimeout(800);
  await page.getByRole('button',{name:'Skip intro',exact:true}).click();
  await page.waitForTimeout(2200);
  results.skip=await page.evaluate(()=>({y:scrollY,heroTop:document.querySelector('#home-hero').getBoundingClientRect().top,focused:document.activeElement.id}));
  await page.screenshot({path:path.join(out,'desktop-skip-settled.png')});
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:path.join(out,'desktop-hero.png')});
  await context.close();
  const phone=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:1});
  const p=await phone.newPage();
  await p.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
  for(const [name,selector] of [['mobile-hero','#home-hero'],['mobile-selected','.paper-project'],['mobile-method','.working-method']]){
   await p.locator(selector).first().evaluate(e=>window.scrollTo({top:e.getBoundingClientRect().top+scrollY-80,behavior:'instant'}));
   await p.waitForTimeout(300);
   await p.screenshot({path:path.join(out,`${name}.png`)});
  }
  await p.getByRole('button',{name:'Replay intro',exact:true}).scrollIntoViewIfNeeded();
  const y=await p.evaluate(()=>scrollY);
  await p.getByRole('button',{name:'Replay intro',exact:true}).click();
  await p.waitForTimeout(500);
  results.mobileReplay={before:y,after:await p.evaluate(()=>scrollY)};
  await p.setViewportSize({width:320,height:568});
  await p.getByRole('button',{name:'Open navigation'}).click();
  await p.screenshot({path:path.join(out,'mobile-menu-320.png')});
  results.menu=await p.locator('[role="dialog"] a').evaluateAll(es=>es.map(e=>({text:e.textContent,top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom})));
  await phone.close();
  const slow=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:2});
  const s=await slow.newPage();
  const cdp=await slow.newCDPSession(s);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  await s.addInitScript(()=>{
   window.perf={lcp:[],shifts:[],longTasks:[]};
   for(const [type,key] of [['largest-contentful-paint','lcp'],['layout-shift','shifts'],['longtask','longTasks']])new PerformanceObserver(l=>l.getEntries().forEach(e=>window.perf[key].push({start:e.startTime,duration:e.duration,value:e.value,input:e.hadRecentInput}))).observe({type,buffered:true});
  });
  await s.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
  results.slow=await s.evaluate(()=>({...window.perf,resources:performance.getEntriesByType('resource').map(e=>({url:e.name,bytes:e.transferSize,duration:e.duration}))}));
  await s.screenshot({path:path.join(out,'mobile-throttled.png')});
  await slow.close();
  try {const wk=await webkit.launch();const wp=await wk.newPage({viewport:{width:390,height:844}});await wp.goto('http://127.0.0.1:4173');results.webkit={title:await wp.title()};await wp.screenshot({path:path.join(out,'webkit-mobile.png')});await wk.close();}catch(e){results.webkit={unavailable:e.message.split('\n')[0]};}
  await fs.writeFile(path.join(out,'followup.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
