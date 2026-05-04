const { chromium } = require('playwright');
const path = require('path');

const VIEWPORTS = [
  { name: '375x667',  width: 375, height: 667,  label: 'iPhone SE / 8' },
  { name: '390x844',  width: 390, height: 844,  label: 'iPhone 14' },
  { name: '414x896',  width: 414, height: 896,  label: 'iPhone 11 Pro Max' },
];

const PAGES = [
  // Paid
  { slug: 'paid-01-request-info-v5', url: 'https://www.uagc.edu/success/request-info-v5', type: 'paid' },
  { slug: 'paid-02-bachelors-degrees-v5', url: 'https://www.uagc.edu/success/degree-types/bachelors-degrees-v5', type: 'paid' },
  { slug: 'paid-03-military-v5', url: 'https://www.uagc.edu/success/military-v5', type: 'paid' },
  { slug: 'paid-04-college-courses-v5', url: 'https://www.uagc.edu/success/online-college-courses-v5', type: 'paid' },
  { slug: 'paid-05-degree-programs-v7', url: 'https://www.uagc.edu/success/degree-programs-v7', type: 'paid' },
  // Organic
  { slug: 'organic-01-homepage', url: 'https://www.uagc.edu/', type: 'organic' },
  { slug: 'organic-02-online-degrees', url: 'https://www.uagc.edu/online-degrees', type: 'organic' },
  { slug: 'organic-07-blog-phd-doctorate', url: 'https://www.uagc.edu/blog/what-difference-between-phd-and-doctorate', type: 'organic' },
  { slug: 'organic-06-tuition-financial-aid', url: 'https://www.uagc.edu/tuition-financial-aid', type: 'organic' },
  { slug: 'organic-09-degrees-bachelors', url: 'https://www.uagc.edu/online-degrees/bachelors', type: 'organic' },
];

const OUT_DIR = path.join(__dirname, 'screenshots', 'chat-widget');

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Viewport: ${vp.name} (${vp.label}) ===`);

    for (const pg of PAGES) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      });
      const page = await context.newPage();

      try {
        console.log(`  ${pg.slug} @ ${vp.name}...`);
        await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 45000 });
        await page.waitForTimeout(3000);

        // Viewport-only screenshot (what the user sees on load — chat widget position)
        const vpFile = path.join(OUT_DIR, `${pg.slug}_vp-${vp.name}.png`);
        await page.screenshot({ path: vpFile, type: 'png' });
        console.log(`    ✓ viewport saved`);

        // Scroll to bottom to see if chat widget shifts or occludes footer CTAs
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1500);
        const btmFile = path.join(OUT_DIR, `${pg.slug}_btm-${vp.name}.png`);
        await page.screenshot({ path: btmFile, type: 'png' });
        console.log(`    ✓ bottom saved`);

        // Try to detect chat widget elements
        const chatInfo = await page.evaluate(() => {
          const selectors = [
            '#hubspot-messages-iframe-container',
            '#hs-chat-open',
            '.hs-chat-widget',
            '#drift-widget',
            '#drift-frame-chat',
            '.intercom-lightweight-app',
            '#intercom-container',
            '[class*="chat-widget"]',
            '[class*="chatWidget"]',
            '[id*="chat"]',
            'iframe[title*="chat" i]',
            'iframe[title*="Chat" i]',
            'iframe[src*="chat"]',
            '.LiveChat',
            '#lc_chat_layout',
            '[class*="live-chat"]',
            '[data-testid*="chat"]',
          ];
          const found = [];
          for (const sel of selectors) {
            const els = document.querySelectorAll(sel);
            els.forEach(el => {
              const rect = el.getBoundingClientRect();
              const styles = window.getComputedStyle(el);
              found.push({
                selector: sel,
                tag: el.tagName,
                id: el.id || '',
                classes: el.className?.toString?.() || '',
                rect: { top: Math.round(rect.top), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) },
                position: styles.position,
                zIndex: styles.zIndex,
                display: styles.display,
                visible: rect.width > 0 && rect.height > 0 && styles.display !== 'none' && styles.visibility !== 'hidden',
              });
            });
          }
          // Also check for sticky/fixed positioned elements near the bottom
          const allFixed = [...document.querySelectorAll('*')].filter(el => {
            const s = window.getComputedStyle(el);
            return (s.position === 'fixed' || s.position === 'sticky') && el.getBoundingClientRect().bottom > window.innerHeight - 120;
          }).map(el => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              id: el.id || '',
              classes: (el.className?.toString?.() || '').slice(0, 120),
              rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
              position: window.getComputedStyle(el).position,
              zIndex: window.getComputedStyle(el).zIndex,
            };
          });
          return { chatElements: found, fixedBottomElements: allFixed };
        });
        console.log(`    Chat elements: ${chatInfo.chatElements.length}, Fixed bottom: ${chatInfo.fixedBottomElements.length}`);

        // Save detection data
        const jsonFile = path.join(OUT_DIR, `${pg.slug}_chat-${vp.name}.json`);
        const fs = require('fs');
        fs.writeFileSync(jsonFile, JSON.stringify(chatInfo, null, 2));

      } catch (err) {
        console.log(`    ✗ ${err.message.slice(0, 100)}`);
      }
      await context.close();
    }
  }

  await browser.close();
  console.log('\n✓ Chat widget capture complete');
})();
