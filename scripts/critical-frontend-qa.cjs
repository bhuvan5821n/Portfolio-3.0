const {chromium,expect}=require('@playwright/test');
const fs=require('fs');
const path=require('path');
const assert=require('node:assert/strict');
const base=process.env.CHRONO_URL||'http://127.0.0.1:4173';
const dir=path.resolve('review-artifacts/chrono/critical-pass');
fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true});
 const records=[];
 for(const [route,w,h] of [['/',390,844],['/projects',390,844],['/projects/friday',390,844],['/profile',390,844],['/',1440,900],['/projects/friday',1440,900],['/',375,812],['/',430,932],['/lab',390,844],['/achievements',390,844]]){
  const page=await browser.newPage({viewport:{width:w,height:h},hasTouch:w<768});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(base+route,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const record=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,heading:document.querySelector('h1').textContent,season:document.querySelector('[data-season]').dataset.season,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}));
  assert.equal(response.status(),200);assert.equal(record.overflow,0);assert.deepEqual(record.brokenImages,[]);assert.deepEqual(errors,[]);
  const name=(route.slice(1).replaceAll('/','-')||'home')+'-'+w;
  await page.screenshot({path:path.join(dir,name+'.png')});
  if(route==='/projects/friday'&&w===390){
   await page.locator('.detail-tabs').scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(dir,'friday-system-detail-390.png')});
   for(const name of ['AI controls','Assistant','Studio navigation','System overview']){
    await page.getByRole('button',{name,exact:true}).click();
    await expect(page.getByRole('button',{name,exact:true})).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('#friday-detail img')).toBeVisible();
   }
   const expand=page.getByRole('button',{name:'Expand the original FRIDAY screenshot'});
   await expand.click();await expect(page.locator('.image-dialog')).toBeVisible();
   await expect(page.getByRole('button',{name:'Close',exact:true})).toBeFocused();
   await page.keyboard.press('Escape');await expect(page.locator('.image-dialog')).not.toBeVisible();await expect(expand).toBeFocused();
  }
  if(route==='/profile'&&w===390){
   await page.getByRole('link',{name:'My WEBTOON',exact:false}).click();await expect(page.locator('#manhwa')).toBeInViewport();
   await page.screenshot({path:path.join(dir,'webtoon-390.png')});
   await page.locator('#music').scrollIntoViewIfNeeded();await page.waitForTimeout(200);await page.screenshot({path:path.join(dir,'music-390.png')});
   await expect(page.locator('iframe')).toHaveCount(0);
   // Check click-to-load behavior without depending on third-party network availability.
   await page.route('https://open.spotify.com/embed/**',r=>r.fulfill({status:200,body:'<title>Spotify embed network boundary</title>'}));
   await page.getByRole('button',{name:'Load Spotify player'}).click();await expect(page.locator('iframe')).toHaveAttribute('src',/7MerLC0ZGytRkTf9mSBfS4/);
   await page.getByRole('button',{name:'Close player'}).click();await expect(page.locator('iframe')).toHaveCount(0);
  }
  if(route==='/'&&w===390){
   const trigger=page.getByRole('button',{name:'Open navigation',exact:true});await trigger.click();await expect(page.locator('.chrono-dialog')).toBeVisible();
   await page.screenshot({path:path.join(dir,'navigation-390.png')});await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
  }
  records.push({route,viewport:`${w}×${h}`,...record,errors});await page.close();
 }
 fs.writeFileSync(path.join(dir,'checks.json'),JSON.stringify(records,null,2));
 console.log(`PASS: ${records.length} focused viewport/route checks; FRIDAY crop controls, original dialog, menu, creative anchors and Spotify load boundary.`);
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
