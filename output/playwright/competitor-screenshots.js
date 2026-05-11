const { chromium } = require('playwright');
const path = require('path');

const COMPETITORS = [
  {
    slug: 'snhu',
    name: 'SNHU',
    pages: [
      { label: 'rfi',     url: 'https://www.snhu.edu/admission/request-information' },
      { label: 'program', url: 'https://www.snhu.edu/online-degrees/bachelors/bs-in-business-administration' },
    ],
  },
  {
    slug: 'wgu',
    name: 'WGU',
    pages: [
      { label: 'rfi',     url: 'https://www.wgu.edu/admissions/get-info.html' },
      { label: 'program', url: 'https://www.wgu.edu/online-business-degrees/mba-masters-business-administration-program.html' },
    ],
  },
  {
    slug: 'csu-global',
    name: 'CSU Global',
    pages: [
      { label: 'rfi',     url: 'https://csuglobal.edu/request-info' },
      { label: 'program', url: 'https://csuglobal.edu/academic-programs/undergraduate-degrees/bachelors-degree-business-management' },
    ],
  },
  {
    slug: 'ut-tyler',
    name: 'UT Tyler',
    pages: [
      { label: 'rfi',     url: 'https://www.uttyler.edu/request-information/' },
      { label: 'program', url: 'https://www.uttyler.edu/academics/programs/applied-arts-and-sciences-baas.php' },
    ],
  },
  {
    slug: 'empire-state',
    name: 'Empire State',
    pages: [
      { label: 'rfi',     url: 'https://www.sunyempire.edu/request-info.html' },
      { label: 'program', url: 'https://www.sunyempire.edu/academics/graduate-academics/business-management.html' },
    ],
  },
];

const VIEWPORTS = [
  { label: 'desktop-1440', width: 1440, height: 900, mobile: false },
  { label: 'mobile-375',   width: 375,  height: 812, mobile: true },
];

const OUT_DIR = path.join(__dirname, 'screenshots', 'competitors');

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

async function dismissOverlays(page) {
  const selectors = [
    '[class*="cookie"] button',
    '[class*="consent"] button',
    '[id*="cookie"] button',
    '[class*="modal"] [class*="close"]',
    '[class*="overlay"] [class*="close"]',
    'button[aria-label="Close"]',
    'button[aria-label="close"]',
    'button[aria-label="Accept"]',
    '.onetrust-close-btn-handler',
    '#onetrust-accept-btn-handler',
  ];
  for (const sel of selectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 800 })) {
        await btn.click({ timeout: 1000 });
        await page.waitForTimeout(300);
      }
    } catch (_) { /* ignore */ }
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  let total = 0;
  let errors = 0;

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.mobile ? 2 : 1,
      userAgent: vp.mobile
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      isMobile: vp.mobile,
    });

    for (const comp of COMPETITORS) {
      for (const pg of comp.pages) {
        const filename = `${comp.slug}_${pg.label}_${vp.label}.png`;
        const filepath = path.join(OUT_DIR, filename);
        try {
          const page = await context.newPage();
          console.log(`  → ${filename}`);
          await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 45000 });
          await page.waitForTimeout(2000);
          await dismissOverlays(page);
          await autoScroll(page);
          await page.waitForTimeout(500);
          await page.screenshot({ path: filepath, fullPage: true });
          await page.close();
          total++;
        } catch (err) {
          console.error(`  ✗ ${filename}: ${err.message}`);
          errors++;
        }
      }
    }
    await context.close();
  }

  await browser.close();
  console.log(`\nDone: ${total} screenshots captured, ${errors} errors.`);
})();
