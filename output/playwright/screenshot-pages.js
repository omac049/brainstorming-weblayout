const { chromium } = require('playwright');
const path = require('path');

const PAGES = [
  { slug: 'homepage',            url: 'https://www.uagc.edu/' },
  { slug: 'online-degrees',      url: 'https://www.uagc.edu/online-degrees' },
  { slug: 'request-info-v5',     url: 'https://www.uagc.edu/success/request-info-v5' },
  { slug: 'degree-programs-v7',  url: 'https://www.uagc.edu/success/degree-programs-v7' },
  { slug: 'bachelors-degrees-v5',url: 'https://www.uagc.edu/success/degree-types/bachelors-degrees-v5' },
  { slug: 'military-v5',         url: 'https://www.uagc.edu/success/military-v5' },
  { slug: 'college-courses-v5',  url: 'https://www.uagc.edu/success/online-college-courses-v5' },
  { slug: 'online-programs-v7',  url: 'https://www.uagc.edu/success/online-programs-v7' },
  { slug: 'online-programs-v8',  url: 'https://www.uagc.edu/success/online-programs-v8' },
  { slug: 'apply-now',           url: 'https://www.uagc.edu/apply-now' },
];

const VIEWPORTS = [
  { label: 'desktop-1440', width: 1440, height: 900 },
  { label: 'mobile-375',   width: 375,  height: 812 },
];

const OUT_DIR = path.join(__dirname, 'screenshots');

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 150);
    });
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.width <= 500 ? 2 : 1,
      userAgent: vp.width <= 500
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : undefined,
    });

    const page = await context.newPage();

    for (const pg of PAGES) {
      const filename = `${pg.slug}_${vp.label}.png`;
      const filepath = path.join(OUT_DIR, filename);

      console.log(`→ ${filename}  (${pg.url})`);

      try {
        await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 45000 });
        await page.waitForTimeout(2000);
        await autoScroll(page);
        await page.waitForTimeout(1500);

        await page.screenshot({ path: filepath, fullPage: true });
        console.log(`  ✓ saved ${filename}`);
      } catch (err) {
        console.error(`  ✗ FAILED ${filename}: ${err.message}`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('\nDone — all screenshots saved to:', OUT_DIR);
})();
