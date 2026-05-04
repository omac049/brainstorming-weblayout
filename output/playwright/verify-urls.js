const { chromium } = require('playwright');

const URLS_TO_CHECK = [
  // Organic pages
  'https://www.uagc.edu/',
  'https://www.uagc.edu/online-degrees',
  'https://www.uagc.edu/online-degrees/business',
  'https://www.uagc.edu/online-degrees/masters',
  'https://www.uagc.edu/online-degrees/education',
  'https://www.uagc.edu/tuition-financial-aid',
  'https://www.uagc.edu/blog/education/what-is-the-difference-between-a-phd-and-a-doctorate',
  'https://www.uagc.edu/blog/business/how-to-write-a-business-plan-step-by-step',
  'https://www.uagc.edu/blog/business/five-principles-of-management',
  'https://www.uagc.edu/writing-center/thesis-generator',
  'https://www.uagc.edu/online-degrees/health-sciences',
  'https://www.uagc.edu/online-degrees/liberal-arts',
  // Paid pages
  'https://www.uagc.edu/success/request-info-v5',
  'https://www.uagc.edu/success/degree-types/bachelors-degrees-v5',
  'https://www.uagc.edu/success/military-v5',
  'https://www.uagc.edu/success/online-college-courses-v5',
  'https://www.uagc.edu/success/degree-programs-v7',
  'https://www.uagc.edu/success/online-programs-v7',
  'https://www.uagc.edu/success/online-programs-v8',
  'https://www.uagc.edu/apply-now',
  'https://www.uagc.edu/success/programs/liberal-arts-v6',
  'https://www.uagc.edu/success/programs/criminal-justice-v6',
  'https://www.uagc.edu/success/programs/business-v6',
  'https://www.uagc.edu/success/programs/education-v6',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const url of URLS_TO_CHECK) {
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const finalUrl = page.url();
      const status = response ? response.status() : '?';
      const title = await page.title();
      const redirected = finalUrl !== url ? ` → ${finalUrl}` : '';
      console.log(`${status} | ${url}${redirected} | ${title.substring(0, 80)}`);
    } catch (err) {
      console.log(`ERR | ${url} | ${err.message.substring(0, 80)}`);
    }
  }

  await browser.close();
})();
