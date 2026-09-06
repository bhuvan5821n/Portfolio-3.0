import { expect, type Page } from "@playwright/test";

export const INTRO_SESSION_KEY = "bhuvan_intro_seen";

export async function beginWithIntroSeen(page: Page) {
  await page.addInitScript((key) => {
    try {
      window.sessionStorage.setItem(key, "1");
    } catch {
      // The application has the same storage-unavailable fallback.
    }
  }, INTRO_SESSION_KEY);
}

export async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const root = document.documentElement;
        return Math.max(0, root.scrollWidth - root.clientWidth);
      }),
    )
    .toBeLessThanOrEqual(1);
}

export async function frameIndex(page: Page) {
  return page
    .getByTestId("intro-sequence")
    .evaluate((element) => Number(element.getAttribute("data-frame-index")));
}
