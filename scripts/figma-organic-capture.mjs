#!/usr/bin/env node
/**
 * Open organic prototype pages with Figma capture hash + scroll-reveal prep.
 * Usage: node scripts/figma-organic-capture.mjs <captureId> <url> [width] [height]
 */
import { chromium } from "playwright";

const [captureId, baseUrl, width = "1440", height = "900"] = process.argv.slice(2);
if (!captureId || !baseUrl) {
  console.error(
    "Usage: node scripts/figma-organic-capture.mjs <captureId> <url> [width] [height]",
  );
  process.exit(1);
}

const endpoint = encodeURIComponent(
  `https://mcp.figma.com/mcp/capture/${captureId}/submit`,
);
const url = `${baseUrl}#figmacapture=${captureId}&figmaendpoint=${endpoint}&figmadelay=18000`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: Number(width), height: Number(height) },
});

console.log(`Capturing ${url}`);
await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });

await page.evaluate(async () => {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  document.documentElement.classList.add("figma-capture");
  const revealAll = () => {
    document
      .querySelectorAll(".reveal-section, .scroll-reveal")
      .forEach((el) => el.classList.add("is-visible"));
    document.querySelectorAll("img").forEach((img) => {
      img.style.opacity = "1";
      img.style.visibility = "visible";
    });
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.style.display = "none";
    });
    document.querySelectorAll('[aria-hidden="true"]').forEach((el) => {
      if (el.querySelector("img")) {
        el.style.opacity = "1";
        el.removeAttribute("aria-hidden");
      }
    });
  };
  const waitForImages = () =>
    Promise.all(
      Array.from(document.images).map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((res) => {
          img.addEventListener("load", res, { once: true });
          img.addEventListener("error", res, { once: true });
          setTimeout(res, 8000);
        });
      }),
    );
  revealAll();
  await waitForImages();
  const step = Math.max(400, window.innerHeight * 0.75);
  for (let y = 0; y <= document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    revealAll();
    await delay(250);
  }
  window.scrollTo(0, 0);
  revealAll();
  await waitForImages();
});

// Wait for figmadelay + capture upload
await page.waitForTimeout(18000);
console.log("Capture window closed — poll generate_figma_design for completion.");
await browser.close();
