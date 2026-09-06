const {chromium}=require('@playwright/test'); const fs=require('fs');
const base=process.env.CHRONO_URL||'http://127.0.0.1:4173';
(async()=>{
 const browser=await chromium.launch({headless:true});const results=[];
 for(const mobile of [true,false]){
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:1,hasTouch:mobile});
  await context.addInitScript(()=>{
   window.__metrics={lcp:0,cls:0,longTasks:[],events:[]};
   for(const type of ['largest-contentful-paint','layout-shift','longtask','event']){
    try{new PerformanceObserver(list=>{for(const e of list.getEntries()){
     if(type==='largest-contentful-paint')window.__metrics.lcp=e.startTime;
     if(type==='layout-shift'&&!e.hadRecentInput)window.__metrics.cls+=e.value;
     if(type==='longtask')window.__metrics.longTasks.push({start:e.startTime,duration:e.duration});
     if(type==='event'&&e.interactionId)window.__metrics.events.push({name:e.name,duration:e.duration});
    }}).observe({type,buffered:true,durationThreshold:16});}catch{}
   }
  });
  const page=await context.newPage();await page.bringToFront();await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1000);
  const first=await page.evaluate(()=>({metrics:window.__metrics,resources:performance.getEntriesByType('resource').map(e=>({name:e.name,bytes:e.transferSize,encoded:e.encodedBodySize,type:e.initiatorType})),heap:performance.memory?{used:performance.memory.usedJSHeapSize,total:performance.memory.totalJSHeapSize}:null}));
  await page.locator('#portrait-sequence').scrollIntoViewIfNeeded();
  const measurements=[];
  for(const t of [0,.02,.04,.06,.08,.25,.5,.75,1,.75,.5,.25,.2,.15,.1,0,.9,.1,.8,.2]){
   const before=Date.now();await page.evaluate(t=>{const e=document.querySelector('.intro-sequence'),s=e.querySelector('.sequence-stage');window.scrollTo({top:e.getBoundingClientRect().top+scrollY-80+(e.offsetHeight-s.offsetHeight)*t,behavior:'instant'});},t);
   await page.waitForFunction(n=>Number(document.querySelector('.intro-sequence').dataset.renderedFrame)===n,Math.round(t*159),{timeout:5000}).catch(()=>{});
   measurements.push({t,settleMs:Date.now()-before,...await page.locator('.intro-sequence').evaluate(e=>({...e.dataset}))});
  }
  await page.screenshot({path:'review-artifacts/chrono/sequence-'+(mobile?'mobile':'desktop')+'.png'});
  await page.getByRole('button',{name:'Open navigation',exact:true}).click();await page.keyboard.press('Escape');
  const after=await page.evaluate(()=>({metrics:window.__metrics,heap:performance.memory?performance.memory.usedJSHeapSize:null,frameResources:performance.getEntriesByType('resource').filter(e=>e.name.includes('hero-delivery')).map(e=>({name:e.name,bytes:e.transferSize}))}));
  await page.reload({waitUntil:'networkidle'});const cached=await page.evaluate(()=>({lcp:window.__metrics.lcp,cls:window.__metrics.cls,resources:performance.getEntriesByType('resource').map(e=>({name:e.name,bytes:e.transferSize}))}));
  results.push({mobile,first,measurements,after,cached});fs.writeFileSync('review-artifacts/chrono/performance.json',JSON.stringify(results,null,2));console.log('Performance complete',mobile);await context.close();
 }
 await browser.close();
})();
