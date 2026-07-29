import { expect, test, type Page } from "@playwright/test";

/** Canonical prototype routes — extend when new templates ship. */
const MOBILE_SMOKE_ROUTES = [
  { path: "/organic/homepage", name: "Organic homepage", stickyBar: true },
  { path: "/organic/online-degrees", name: "Online degrees hub", stickyBar: true },
  { path: "/request-info-v5", name: "Request info v5", stickyBar: true },
  { path: "/degree-programs-v7", name: "Degree programs v7", stickyBar: true },
  { path: "/online-college-courses-v5", name: "OCC v5", stickyBar: true },
] as const;

async function gotoRoute(page: Page, path: string) {
  const response = await page.goto(path, {
    waitUntil: "load",
    timeout: 30_000,
  });
  expect(response?.ok()).toBeTruthy();
  await page.locator("#main-content").waitFor({ state: "visible", timeout: 15_000 });
}

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth + 1,
  );
  expect(overflow, "Page should not scroll horizontally on mobile").toBe(false);
}

async function assertMainContentVisible(page: Page) {
  const main = page.locator("#main-content");
  await expect(main).toBeVisible();
  const box = await main.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThan(200);
}

async function assertRevealSectionsReadable(page: Page) {
  const hiddenRevealCount = await page.evaluate(() => {
    const sections = document.querySelectorAll(".reveal-section");
    let hidden = 0;
    for (const el of sections) {
      const style = window.getComputedStyle(el);
      if (style.opacity === "0" && el.textContent?.trim()) hidden += 1;
    }
    return hidden;
  });
  expect(
    hiddenRevealCount,
    "Scroll-reveal sections should not stay opacity:0 on mobile",
  ).toBe(0);
}

async function assertStickyBarAfterScroll(page: Page) {
  await page.evaluate(() =>
    window.scrollTo(0, Math.min(2500, document.body.scrollHeight * 0.5)),
  );
  const bar = page.locator("[data-rfi-sticky-bar]");
  await expect(bar).toHaveCount(1);
  await expect(bar).toHaveClass(/translate-y-0/, { timeout: 3000 });
}

async function assertFooterTextClearOfStickyBar(page: Page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  const obscured = await page.evaluate(() => {
    const bar = document.querySelector("[data-rfi-sticky-bar]");
    const footerText = document.querySelector(
      "footer p, footer a, footer li",
    );
    if (!bar || !footerText) return false;
    const barRect = bar.getBoundingClientRect();
    if (barRect.top >= window.innerHeight - 4) return false;
    const textRect = footerText.getBoundingClientRect();
    return textRect.bottom > barRect.top + 4;
  });

  expect(
    obscured,
    "Footer text should not sit under the sticky RFI bar",
  ).toBe(false);
}

for (const route of MOBILE_SMOKE_ROUTES) {
  test.describe(route.name, () => {
    test(`${route.path} — mobile layout smoke`, async ({ page }) => {
      await gotoRoute(page, route.path);

      await assertNoHorizontalOverflow(page);
      await assertMainContentVisible(page);
      await assertRevealSectionsReadable(page);

      if (route.stickyBar) {
        await assertStickyBarAfterScroll(page);
        await assertFooterTextClearOfStickyBar(page);
      }
    });
  });
}

test.describe("Organic homepage — cost estimator", () => {
  test("cost section is visible when deep-linked", async ({ page }) => {
    await gotoRoute(page, "/organic/homepage#cost-estimator");
    await page.waitForTimeout(400);
    await assertNoHorizontalOverflow(page);

    await expect(
      page.getByRole("heading", { name: "What Could Your Degree Cost?" }),
    ).toBeVisible();
  });
});
