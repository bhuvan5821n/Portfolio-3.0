const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({headless:true});
  const page = await browser.newPage({viewport:{width:1440,height:900}});
  await page.addInitScript(() => {
    const original = window.createImageBitmap.bind(window);
    window.createImageBitmap = async (...args) => {
      const bitmap = await original(...args);
      await new Promise(resolve => setTimeout(resolve, 115));
      return bitmap;
    };
  });
  await page.goto(process.env.CHRONO_URL || 'http://127.0.0.1:3003');
  await page.waitForFunction(() => document.querySelector('.intro-sequence').dataset.mode === 'active');
  const records=[];
  for (const t of [.1,.8,.2,.9,.02]) {
    await page.evaluate(t=>{
      const section=document.querySelector('.intro-sequence'),stage=section.querySelector('.sequence-stage');
      scrollTo({top:section.getBoundingClientRect().top+scrollY-80+(section.offsetHeight-stage.offsetHeight)*t,behavior:'instant'});
    },t);
    await page.waitForTimeout(1000);
    records.push(await page.locator('.intro-sequence').evaluate((el,t)=>({t,mode:el.dataset.mode,desired:el.dataset.frameIndex,painted:el.dataset.renderedFrame,decode:el.dataset.decodeMs,reason:el.querySelector('[role=status]').textContent}),t));
  }
  console.log(JSON.stringify(records,null,2));
  await browser.close();
})();
