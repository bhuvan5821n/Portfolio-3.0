import {expect,test} from '@playwright/test';

test('FRIDAY evidence supports crop exploration and a keyboard-contained original',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/projects/friday');
  for(const name of ['Assistant','AI controls','Studio navigation','System overview']){
    await page.getByRole('button',{name,exact:true}).click();
    await expect(page.getByRole('button',{name,exact:true})).toHaveAttribute('aria-pressed','true');
    await expect(page.locator('#friday-detail img')).toBeVisible();
    await expect.poll(()=>page.locator('#friday-detail img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  }
  const expand=page.getByRole('button',{name:'Expand the original FRIDAY screenshot'});await expand.click();
  const dialog=page.locator('.image-dialog');await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button',{name:'Close',exact:true})).toBeFocused();
  for(let i=0;i<8;i++)await page.keyboard.press('Tab');
  expect(await dialog.evaluate(d=>d.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(expand).toBeFocused();
  await page.locator('#memory summary').click();await expect(page.locator('#memory')).toContainText('Local persistence does not mean all context stays offline');
  await expect(page.locator('#memory a')).toHaveAttribute('href',/memory_manager.py$/);
});

test('engineering depth remains optional and linked to source',async({page})=>{
  for(const slug of ['hackscout','finance-tracker','markwell','portfolio-evolution']){
    await page.goto('/projects/'+slug);const note=page.locator('.engineering-note').first();
    await expect(note.locator('p')).not.toBeVisible();await note.locator('summary').click();
    await expect(note.locator('p')).toBeVisible();expect((await note.locator('p').innerText()).length).toBeGreaterThan(80);
  }
});

for(const [platform,key] of [['Win32','Ctrl'],['MacIntel','⌘']])test(`command shortcut matches ${platform}`,async({page})=>{
  await page.addInitScript(p=>Object.defineProperty(navigator,'platform',{value:p}),platform);
  await page.goto('/projects');await expect(page.locator('.command-trigger')).toContainText(key+' K');
  await page.getByRole('button',{name:'Open navigation',exact:true}).click();await expect(page.locator('.dialog-help')).toContainText(key+' K');
});
