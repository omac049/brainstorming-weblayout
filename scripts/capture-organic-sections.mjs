import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = "/tmp/organic-figma-captures";
const BASE = "http://localhost:3000";

const captures = [
  { file: "NAV-00", url: `${BASE}/organic/homepage`, selector: "header", maxHeight: 140 },
  { file: "HERO-V2", url: `${BASE}/organic/homepage`, selector: 'section[aria-label="Hero"]', maxHeight: 280 },
  { file: "IMPACT", url: `${BASE}/organic/homepage`, selector: "#impact", maxHeight: 220 },
  { file: "WHY-CHOOSE", url: `${BASE}/organic/homepage`, selector: "#why-uagc", maxHeight: 280 },
  { file: "TRUST-01", url: `${BASE}/organic/homepage`, selector: "#social-proof", maxHeight: 280 },
  { file: "PERSONA-PATHS", url: `${BASE}/organic/homepage`, selector: "#paths", maxHeight: 280 },
  { file: "COST-EST", url: `${BASE}/organic/homepage`, selector: "#cost-estimator", maxHeight: 280 },
  { file: "FOOT-01", url: `${BASE}/organic/homepage`, selector: "footer", maxHeight: 220 },
  { file: "HERO-ORG", url: `${BASE}/organic/online-degrees`, selector: 'section[aria-label="Hero"]', maxHeight: 280 },
  { file: "WAYS-TO-SAVE", url: `${BASE}/organic/online-degrees`, selector: "#ways-to-save", maxHeight: 280 },
  { file: "ACCR-01", url: `${BASE}/organic/homepage`, selector: 'section[aria-labelledby="home-accr-heading"]', maxHeight: 280 },
  { file: "AREAS", url: `${BASE}/organic/online-degrees`, selector: "#areas", maxHeight: 280 },
  { file: "TUITION-BAND", url: `${BASE}/organic/online-degrees`, selector: "#tuition", maxHeight: 200 },
  { file: "HUB-JOURNEY", url: `${BASE}/organic/online-degrees`, selector: "#journey", maxHeight: 280 },
  { file: "INTEREST-GRID", url: `${BASE}/organic/homepage`, selector: "#interests", maxHeight: 280 },
  { file: "BLOG-HERO", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: 'section[aria-label="Hero"]', maxHeight: 220 },
  { file: "BLOG-BODY", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: "main article", maxHeight: 280 },
  { file: "TY-HERO", url: `${BASE}/organic/request-information/thank-you`, selector: "#confirmation", maxHeight: 280 },
  { file: "BLOG-TOC", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: 'nav[aria-label="Table of contents"]', maxHeight: 220 },
  { file: "BLOG-SIDEBAR", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: "aside.space-y-4", maxHeight: 320, scrollY: 400 },
  { file: "BLOG-CTA", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: "main > section:last-of-type", maxHeight: 260 },
  { file: "BLOG-SHARE", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: '[aria-label="Share this article"]', maxHeight: 160, scrollY: 600 },
  { file: "BLOG-PROGRESS", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: '[aria-label="Reading progress"]', maxHeight: 40, scrollY: 500 },
  { file: "BLOG-NEWSLETTER", url: `${BASE}/organic/blog/what-difference-between-phd-and-doctorate`, selector: '[data-module="blog-newsletter-inline"]', maxHeight: 200, scrollY: 700 },
  { file: "TY-RECEIPT", url: `${BASE}/organic/request-information/thank-you`, selector: "#confirmation + div", maxHeight: 100 },
  { file: "TY-NEXT", url: `${BASE}/organic/request-information/thank-you`, selector: "#next-steps", maxHeight: 280 },
  { file: "TY-CALC", url: `${BASE}/organic/request-information/thank-you`, selector: "#time-to-graduation", maxHeight: 280, scrollY: 1200 },
  { file: "TY-CONTACT", url: `${BASE}/organic/request-information/thank-you`, selector: "#next-steps + section", maxHeight: 200 },
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
    await el.waitFor({ state: "attached", timeout: 15000 });
  } catch (err) {
    if (cap.optional) {
      console.warn(`Skipping optional ${cap.file}: ${err.message}`);
      continue;
    }
    throw err;
  }
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const box = await el.boundingBox();
  if (!box || box.width < 2 || box.height < 2) {
    console.error(`No box for ${cap.file}`);
    continue;
  }
  const clip = {
    x: Math.max(0, Math.round(box.x)),
    y: Math.max(0, Math.round(box.y)),
    width: Math.min(1440, Math.round(box.width)),
    height: Math.min(cap.maxHeight, Math.round(box.height)),
  };
  if (clip.height < 8) {
    console.error(`Clip too small for ${cap.file}`);
    continue;
  }
  const outPath = path.join(OUT, `${cap.file}.png`);
  await el.screenshot({ path: outPath });
  console.log(`${cap.file}: ${clip.width}x${clip.height} -> ${outPath}`);
}

await browser.close();
