import {expect,test} from "@playwright/test";

test("contact form reports a successful backend submission",async({page})=>{
  await page.route("**/api/contact",async route=>route.fulfill({status:201,contentType:"application/json",body:JSON.stringify({success:true,data:{message:"Contact submission received."}})}));
  await page.goto("/profile#contact");
  const form=page.locator(".contact-form");
  await form.getByLabel("Name").fill("Portfolio QA");
  await form.getByLabel("Email").fill("qa@example.com");
  await form.getByLabel("Subject").fill("Connected form check");
  await form.getByLabel("Message").fill("This verifies the contact form response state.");
  await form.getByRole("button",{name:"Send note"}).click();
  await expect(form.getByRole("status")).toHaveText("Your note is in. I’ll read it soon.");
});

test("contact form keeps email recovery visible when the backend is unavailable",async({page})=>{
  await page.route("**/api/contact",async route=>route.fulfill({status:503,contentType:"application/json",body:JSON.stringify({success:false,error:{code:"BACKEND_UNAVAILABLE",message:"The contact form is temporarily offline. Please use the email link instead."}})}));
  await page.goto("/profile#contact");
  const form=page.locator(".contact-form");
  await form.getByLabel("Name").fill("Portfolio QA");
  await form.getByLabel("Email").fill("qa@example.com");
  await form.getByLabel("Subject").fill("Fallback form check");
  await form.getByLabel("Message").fill("This verifies graceful offline recovery.");
  await form.getByRole("button",{name:"Send note"}).click();
  await expect(form.getByRole("status")).toContainText("temporarily offline");
  await expect(form.getByRole("link",{name:/Email remains available/})).toHaveAttribute("href",/^mailto:/);
});
