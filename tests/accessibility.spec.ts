import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { beginWithIntroSeen } from "./support/browser";
import { publicRoutes, unknownRoute } from "./support/routes";

const routes = [...publicRoutes.map(({ path }) => path), unknownRoute];

test.describe("automated accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await beginWithIntroSeen(page);
  });

  for (const route of routes) {
    test(`${route} has no serious or critical Axe violations`, async ({ page }) => {
      await page.goto(route, { waitUntil: "domcontentloaded" });

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const severeViolations = results.violations
        .filter(
          ({ impact }) => impact === "serious" || impact === "critical",
        )
        .map(({ id, impact, help, nodes }) => ({
          id,
          impact,
          help,
          targets: nodes.map((node) => node.target),
        }));

      expect(
        severeViolations,
        JSON.stringify(severeViolations, null, 2),
      ).toEqual([]);
    });
  }
});
