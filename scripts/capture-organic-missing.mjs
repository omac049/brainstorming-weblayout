import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = "/tmp/organic-figma-captures";
const BASE = "http://localhost:3000";

const captures = [
  { file: "BLOG-SIDEBAR", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: "aside.space-y-4", maxHeight: 320, scrollY: 400 },
  { file: "BLOG-CTA", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: "main > section:last-of-type", maxHeight: 260, scrollY: 1200 },
  { file: "BLOG-SHARE", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: '[aria-label="Share this article"]', maxHeight: 160, scrollY: 600 },
  { file: "BLOG-PROGRESS", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: '[aria-label="Reading progress"]', maxHeight: 40, scrollY: 1200, optional: true },
  { file: "BLOG-NEWSLETTER", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: '[data-module="blog-newsletter-inline"]', maxHeight: 200, scrollY: 700 },
  { file: "TY-RECEIPT", url: `${BASE}/organic/request-information/thank-you`, selector: "#confirmation + div", maxHeight: 100 },
  { file: "TY-NEXT", url: `${BASE}/organic/request-information/thank-you`, selector: "#next-steps", maxHeight: 280, scrollY: 400 },
  { file: "TY-CALC", url: `${BASE}/organic/request-information/thank-you`, selector: "#time-to-graduation", maxHeight: 280, scrollY: 1200 },
  { file: "TY-CONTACT", url: `${BASE}/organic/request-information/thank-you`, selector: "#next-steps + section", maxHeight: 200, scrollY: 400 },
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const cap of captures) {
  await page.goto(cap.url, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  if (cap.scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), cap.scrollY);
    await page.waitForTimeout(600);
  }
  const el = page.locator(cap.selector).first();
  try {
    await el.waitFor({ state: "visible", timeout: 15000 });
  } catch (err) {
    if (cap.optional) {
      console.warn(`Skipping optional ${cap.file}`);
      continue;
    }
    throw err;
  }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const outPath = path.join(OUT, `${cap.file}.png`);
  await el.screenshot({ path: outPath });
  console.log(`${cap.file} -> ${outPath}`);
}

await browser.close();
