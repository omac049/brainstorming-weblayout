const { chromium } = require('playwright');
const path = require('path');

const PAID_PAGES = [
  { slug: 'paid-01-request-info-v5',       url: 'https://www.uagc.edu/success/request-info-v5' },
  { slug: 'paid-02-bachelors-degrees-v5',   url: 'https://www.uagc.edu/success/degree-types/bachelors-degrees-v5' },
  { slug: 'paid-03-military-v5',            url: 'https://www.uagc.edu/success/military-v5' },
  { slug: 'paid-04-college-courses-v5',     url: 'https://www.uagc.edu/success/online-college-courses-v5' },
  { slug: 'paid-05-degree-programs-v7',     url: 'https://www.uagc.edu/success/degree-programs-v7' },
  { slug: 'paid-06-online-programs-v7',     url: 'https://www.uagc.edu/success/online-programs-v7' },
  { slug: 'paid-07-online-programs-v8',     url: 'https://www.uagc.edu/success/online-programs-v8' },
  { slug: 'paid-08-liberal-arts-v6',        url: 'https://www.uagc.edu/success/programs/liberal-arts-v6' },
  { slug: 'paid-09-criminal-justice-v6',    url: 'https://www.uagc.edu/success/programs/criminal-justice-v6' },
  { slug: 'paid-10-business-v6',            url: 'https://www.uagc.edu/success/programs/business-v6' },
];

const ORGANIC_PAGES = [
  { slug: 'organic-01-homepage',            url: 'https://www.uagc.edu/' },
  { slug: 'organic-02-online-degrees',      url: 'https://www.uagc.edu/online-degrees' },
  { slug: 'organic-03-degrees-business',    url: 'https://www.uagc.edu/online-degrees/business' },
  { slug: 'organic-04-degrees-masters',     url: 'https://www.uagc.edu/online-degrees/masters' },
  { slug: 'organic-05-degrees-education',   url: 'https://www.uagc.edu/online-degrees/education' },
  { slug: 'organic-06-tuition-financial-aid',url: 'https://www.uagc.edu/tuition-financial-aid' },
  { slug: 'organic-07-blog-phd-doctorate',  url: 'https://www.uagc.edu/blog/what-difference-between-phd-and-doctorate' },
  { slug: 'organic-08-blog-business-plan',  url: 'https://www.uagc.edu/blog/how-write-business-plan-step-by-step' },
  { slug: 'organic-09-degrees-bachelors',   url: 'https://www.uagc.edu/online-degrees/bachelors' },
  { slug: 'organic-10-degrees-criminal-justice', url: 'https://www.uagc.edu/online-degrees/criminal-justice' },
];

const ALL_PAGES = [...PAID_PAGES, ...ORGANIC_PAGES];

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
  let count = 0;
  const total = ALL_PAGES.length * VIEWPORTS.length;

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.width <= 500 ? 2 : 1,
      userAgent: vp.width <= 500
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : undefined,
    });

    const page = await context.newPage();

    for (const pg of ALL_PAGES) {
      count++;
      const filename = `${pg.slug}_${vp.label}.png`;
      const filepath = path.join(OUT_DIR, filename);

      console.log(`[${count}/${total}] ${filename}`);

      try {
        await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 45000 });
        await page.waitForTimeout(2000);
        await autoScroll(page);
        await page.waitForTimeout(1500);
        await page.screenshot({ path: filepath, fullPage: true });
        console.log(`  OK`);
      } catch (err) {
        console.error(`  FAIL: ${err.message}`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log(`\nDone — ${count} screenshots saved to: ${OUT_DIR}`);
})();
