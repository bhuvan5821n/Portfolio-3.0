const {chromium,webkit}=require('@playwright/test');
const fs=require('fs');
const path=require('path');
const AxeBuilder=require('@axe-core/playwright').default;
const base=process.env.CHRONO_URL||'http://127.0.0.1:4173';
const dir=path.resolve('review-artifacts/chrono');
const viewports=[[320,568],[360,640],[375,667],[375,812],[390,844],[393,873],[412,915],[430,932],[768,1024],[820,1180],[1280,720],[1366,768],[1440,900],[1920,1080]];
const routes=['/','/projects','/lab','/achievements','/profile'];
(async()=>{
 const browser=await chromium.launch({headless:true});
 const records=[];
 for(const [w,h] of viewports){
  const context=await browser.newContext({viewport:{width:w,height:h},deviceScaleFactor:1,hasTouch:w<768});
  for(const route of routes){
   const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
   const name=(route.slice(1)||'home')+'-'+w+'x'+h;
   await page.screenshot({path:path.join(dir,name+'.png')});
   const checks=await page.evaluate(()=>{
    const rects=[...document.querySelectorAll('main a,main button,header button')].map(e=>{const r=e.getBoundingClientRect();return {text:e.textContent.trim(),w:r.width,h:r.height};}).filter(r=>r.w>0&&r.h>0);
    const root=document.documentElement;
    return {overflow:root.scrollWidth-root.clientWidth,h1:document.querySelector('h1')?.textContent,season:document.querySelector('[data-season]')?.dataset.season,smallTargets:rects.filter(r=>r.w<24||r.h<24),brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)};
   });
   let accessibility=null;
   if(w===390||w===1440){const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();accessibility=axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}));}
   records.push({route,viewport:w+'x'+h,status:response.status(),...checks,errors,accessibility,screenshot:name+'.png'});
   if(w===390){await page.screenshot({path:path.join(dir,(route.slice(1)||'home')+'-390-full.png'),fullPage:true});}
   await page.close();
  }
  await context.close();
  fs.writeFileSync(path.join(dir,'matrix.json'),JSON.stringify(records,null,2));
  console.log('Matrix complete',w,h);
 }
 const page=await browser.newPage({viewport:{width:390,height:844}});
 await page.goto('http://127.0.0.1:3002/',{waitUntil:'networkidle'});await page.screenshot({path:path.join(dir,'portfolio2-390-first.png')});
 await page.evaluate(()=>sessionStorage.setItem('bhuvan_intro_seen','1'));await page.reload({waitUntil:'networkidle'});await page.screenshot({path:path.join(dir,'portfolio2-390-content.png')});
 await page.goto(base+'/profile',{waitUntil:'networkidle'});
 for(const id of ['capabilities','manhwa','music','contact']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.screenshot({path:path.join(dir,'profile-'+id+'-390.png')});}
 await page.goto(base+'/');await page.getByRole('button',{name:'Open navigation',exact:true}).click();await page.screenshot({path:path.join(dir,'menu-390.png')});
 await page.close();await browser.close();
 try {
  const wk=await webkit.launch({headless:true}); const context=await wk.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const results=[];
  for(const route of routes){const p=await context.newPage();let errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(base+route,{waitUntil:'networkidle'});await p.screenshot({path:path.join(dir,'webkit-'+(route.slice(1)||'home')+'-390.png')});results.push({route,errors,overflow:await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth)});await p.close();}
  fs.writeFileSync(path.join(dir,'webkit.json'),JSON.stringify(results,null,2));await wk.close();console.log('WebKit rendered all five routes');
 }catch(e){fs.writeFileSync(path.join(dir,'webkit.json'),JSON.stringify({status:'NOT VERIFIED',reason:e.message}));console.log('WebKit unavailable:',e.message.slice(0,150));}
})();
