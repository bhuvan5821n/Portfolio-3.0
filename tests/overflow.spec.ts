import { test } from "@playwright/test";
import {
  beginWithIntroSeen,
  expectNoHorizontalOverflow,
} from "./support/browser";
import { publicRoutes, unknownRoute } from "./support/routes";

const viewports = [
  { width: 320, height: 720 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
] as const;

for (const viewport of viewports) {
  test(`all routes avoid horizontal overflow at ${viewport.width}px`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await beginWithIntroSeen(page);

    for (const route of [...publicRoutes.map(({ path }) => path), unknownRoute]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expectNoHorizontalOverflow(page);
    }
  });
}
