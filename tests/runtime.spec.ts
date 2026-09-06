import { expect, test } from "@playwright/test";
import { INTRO_SESSION_KEY } from "./support/browser";
import { publicRoutes, unknownRoute } from "./support/routes";

test("all public views stay free of runtime and console errors", async ({
  baseURL,
  browser,
}) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await context.addInitScript((key) => {
    window.sessionStorage.setItem(key, "1");
  }, INTRO_SESSION_KEY);

  for (const path of [...publicRoutes.map((route) => route.path), unknownRoute]) {
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
    page.on("console", (message) => {
      const expectedNotFoundNavigation =
        path === unknownRoute &&
        message.text().includes("Failed to load resource") &&
        message.text().includes("404");
      if (message.type() === "error" && !expectedNotFoundNavigation) {
        errors.push(`console: ${message.text()}`);
      }
    });
    page.on("response", (response) => {
      if (response.url().startsWith(baseURL ?? "") && response.status() >= 500) {
        errors.push(`response ${response.status()}: ${response.url()}`);
      }
    });

    await page.goto(path, { waitUntil: "networkidle" });
    expect(errors, `Runtime errors on ${path}`).toEqual([]);
    await page.close();
  }

  await context.close();
});
