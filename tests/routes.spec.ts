import {expect,test} from "@playwright/test";
import {publicRoutes,unknownRoute} from "./support/routes";
for(const route of publicRoutes){test(`${route.path} renders semantic content and metadata`,async({page})=>{
 const response=await page.goto(route.path);expect(response?.status()).toBe(200);
 await expect(page.getByRole('heading',{level:1,name:route.heading})).toBeVisible();
 await expect(page.locator('h1')).toHaveCount(1);
 const canonical=await page.locator('link[rel=canonical]').getAttribute('href');expect(canonical).toBeTruthy();expect(new URL(canonical!).pathname).toBe(route.path);
 await expect(page.getByRole('navigation',{name:'Primary navigation'})).toBeVisible();
});}
test('real 404 has recovery links',async({page})=>{const r=await page.goto(unknownRoute);expect(r?.status()).toBe(404);await expect(page.getByRole('heading',{name:'This path ends here.'})).toBeVisible();await expect(page.getByRole('link',{name:/Return home/})).toBeVisible();});
test('home content is server-rendered without JavaScript',async({browser,baseURL})=>{const ctx=await browser.newContext({javaScriptEnabled:false,baseURL});const page=await ctx.newPage();await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('Curiosity');await expect(page.getByRole('link',{name:'Explore projects',exact:true})).toBeVisible();await ctx.close();});
