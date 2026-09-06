const {chromium,webkit}=require('@playwright/test');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const AxeBuilder=require('@axe-core/playwright').default;
const base=process.env.CHRONO_URL||'http://127.0.0.1:4173';
const dir=path.resolve('review-artifacts/chrono/final-pass');fs.mkdirSync(dir,{recursive:true});
const routes=['/','/projects','/projects/friday','/lab','/achievements','/profile'];
(async()=>{
const browser=await chromium.launch({headless:true});const records=[];
for(const [w,h] of [[390,844],[1440,900],[320,568],[360,640],[375,812],[393,873],[412,915],[430,932],[1280,720],[1920,1080]]){
 for(const route of routes){
  const context=await browser.newContext({viewport:{width:w,height:h},hasTouch:w<768});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(base+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const name=(route.slice(1).replaceAll('/','-')||'home')+'-'+w;
  await page.screenshot({path:path.join(dir,name+'.png')});
  const check=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}));
  let axe=[];if(w===390||w===1440)axe=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.map(n=>n.target)}));
  records.push({route,width:w,status:response.status(),...check,errors,axe});
  if(w===390||w===1440){
   for(const selector of route==='/projects/friday'?['.interface-detail','#architecture']:route==='/achievements'?['.scholar-records']:route==='/profile'?['#manhwa','#music']:route==='/'?['#portrait-sequence']:[]){
    await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(250);await page.screenshot({path:path.join(dir,name+'-'+selector.replace(/[.#]/g,'')+'.png')});
   }
  }
  await context.close();
 }
 fs.writeFileSync(path.join(dir,'matrix.json'),JSON.stringify(records,null,2));console.log('Rendered',w);
}
await browser.close();
const failures=records.filter(r=>r.status!==200||r.overflow||r.broken.length||r.errors.length||r.axe.length);console.log('Matrix:',records.length,'checks;',failures.length,'with findings');if(failures.length)console.log(JSON.stringify(failures));
const wk=await webkit.launch({headless:true});const webkitRecords=[];
for(const route of routes){const page=await wk.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+route,{waitUntil:'networkidle'});await page.screenshot({path:path.join(dir,'webkit-'+(route.slice(1).replaceAll('/','-')||'home')+'.png')});webkitRecords.push({route,errors,overflow:await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)});await page.close();}
await wk.close();fs.writeFileSync(path.join(dir,'webkit.json'),JSON.stringify(webkitRecords,null,2));console.log('WebKit:',JSON.stringify(webkitRecords));
assert.equal(failures.length,0);
})().catch(e=>{console.error(e);process.exit(1)});
