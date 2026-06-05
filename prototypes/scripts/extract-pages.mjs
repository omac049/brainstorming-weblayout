import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const PAGES = [
  { slug: 'request-info-v5', url: 'https://www.uagc.edu/success/request-info-v5' },
  { slug: 'degree-programs-v7', url: 'https://www.uagc.edu/success/degree-programs-v7' },
  { slug: 'online-college-courses-v5', url: 'https://www.uagc.edu/success/online-college-courses-v5' },
];

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const OUTPUT_DIR = path.resolve('docs/research/uagc');
const SCREENSHOTS_DIR = path.resolve('docs/design-references');
const ASSETS_DIR = path.resolve('public/images');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url || url.startsWith('data:')) return resolve(null);
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function extractGlobalTokens(page) {
  return page.evaluate(() => {
    const body = document.body;
    const heading = document.querySelector('h1, h2');
    const cs = getComputedStyle;

    const allElements = [...document.querySelectorAll('*')].slice(0, 500);
    const fontFamilies = new Set();
    const colors = new Set();
    const bgColors = new Set();

    allElements.forEach(el => {
      const s = cs(el);
      if (s.fontFamily) fontFamilies.add(s.fontFamily);
      if (s.color && s.color !== 'rgba(0, 0, 0, 0)') colors.add(s.color);
      if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') bgColors.add(s.backgroundColor);
    });

    const fontLinks = [...document.querySelectorAll('link[href*="fonts"]')].map(l => l.href);
    const fontFaces = [...document.styleSheets].flatMap(ss => {
      try {
        return [...ss.cssRules].filter(r => r instanceof CSSFontFaceRule).map(r => r.cssText);
      } catch { return []; }
    });

    return {
      fonts: {
        families: [...fontFamilies],
        links: fontLinks,
        fontFaces: fontFaces.slice(0, 20),
        body: {
          fontFamily: cs(body).fontFamily,
          fontSize: cs(body).fontSize,
          lineHeight: cs(body).lineHeight,
          color: cs(body).color,
        },
        heading: heading ? {
          fontFamily: cs(heading).fontFamily,
          fontSize: cs(heading).fontSize,
          fontWeight: cs(heading).fontWeight,
          lineHeight: cs(heading).lineHeight,
          color: cs(heading).color,
        } : null,
      },
      colors: {
        text: [...colors].slice(0, 30),
        backgrounds: [...bgColors].slice(0, 30),
      },
      favicons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({
        href: l.href,
        sizes: l.getAttribute('sizes'),
        type: l.type,
      })),
      meta: {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        ogImage: document.querySelector('meta[property="og:image"]')?.content,
      },
    };
  });
}

async function extractPageSections(page) {
  return page.evaluate(() => {
    const cs = getComputedStyle;
    const sections = [];
    
    const mainSections = document.querySelectorAll(
      'header, nav, main, section, footer, [class*="hero"], [class*="section"], [class*="banner"], [class*="cta"]'
    );

    const seen = new Set();
    const candidates = mainSections.length > 0 ? mainSections : document.body.children;

    [...candidates].forEach((el, idx) => {
      if (seen.has(el) || el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'NOSCRIPT') return;
      seen.add(el);

      const rect = el.getBoundingClientRect();
      if (rect.height < 20) return;

      const s = cs(el);
      const headings = [...el.querySelectorAll('h1, h2, h3')].map(h => ({
        level: parseInt(h.tagName[1]),
        text: h.textContent.trim().slice(0, 200),
      }));

      const forms = [...el.querySelectorAll('form')].map(f => ({
        action: f.action,
        fields: [...f.querySelectorAll('input, select, textarea')].map(i => ({
          type: i.type || i.tagName.toLowerCase(),
          name: i.name,
          placeholder: i.placeholder,
          label: i.labels?.[0]?.textContent?.trim(),
        })),
      }));

      const images = [...el.querySelectorAll('img')].map(img => ({
        src: img.src || img.currentSrc,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
      }));

      const links = [...el.querySelectorAll('a[href]')].slice(0, 20).map(a => ({
        href: a.href,
        text: a.textContent.trim().slice(0, 100),
      }));

      sections.push({
        index: idx,
        tag: el.tagName.toLowerCase(),
        id: el.id,
        classes: el.className?.toString().split(' ').filter(Boolean).slice(0, 10),
        rect: { top: rect.top + window.scrollY, left: rect.left, width: rect.width, height: rect.height },
        styles: {
          display: s.display,
          position: s.position,
          backgroundColor: s.backgroundColor,
          color: s.color,
          padding: s.padding,
          margin: s.margin,
          maxWidth: s.maxWidth,
          fontFamily: s.fontFamily,
          fontSize: s.fontSize,
          zIndex: s.zIndex,
        },
        headings,
        forms: forms.length > 0 ? forms : undefined,
        images: images.length > 0 ? images : undefined,
        links: links.length > 0 ? links : undefined,
        textContent: el.textContent.trim().slice(0, 500),
        childCount: el.children.length,
      });
    });

    return sections;
  });
}

async function extractDetailedCSS(page, selector) {
  return page.evaluate((sel) => {
    const props = [
      'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
      'textTransform','textDecoration','backgroundColor','background',
      'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
      'margin','marginTop','marginRight','marginBottom','marginLeft',
      'width','height','maxWidth','minWidth','maxHeight','minHeight',
      'display','flexDirection','justifyContent','alignItems','gap',
      'gridTemplateColumns','gridTemplateRows',
      'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
      'boxShadow','overflow','overflowX','overflowY',
      'position','top','right','bottom','left','zIndex',
      'opacity','transform','transition','cursor',
      'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
      'whiteSpace','textOverflow',
    ];

    function extractStyles(element) {
      const cs = getComputedStyle(element);
      const styles = {};
      props.forEach(p => {
        const v = cs[p];
        if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') {
          styles[p] = v;
        }
      });
      return styles;
    }

    function walk(element, depth) {
      if (depth > 3) return null;
      const children = [...element.children];
      return {
        tag: element.tagName.toLowerCase(),
        classes: element.className?.toString().split(' ').filter(Boolean).slice(0, 5),
        id: element.id || undefined,
        text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3
          ? element.textContent.trim().slice(0, 200) : undefined,
        styles: extractStyles(element),
        image: element.tagName === 'IMG' ? { src: element.src, alt: element.alt } : undefined,
        children: children.slice(0, 15).map(c => walk(c, depth + 1)).filter(Boolean),
      };
    }

    const el = document.querySelector(sel);
    if (!el) return { error: `Element not found: ${sel}` };
    return walk(el, 0);
  }, selector);
}

async function extractAssets(page) {
  return page.evaluate(() => {
    const images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
    })).filter(i => i.src && !i.src.startsWith('data:'));

    const bgImages = [...document.querySelectorAll('*')].filter(el => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg && bg !== 'none' && !bg.includes('gradient');
    }).map(el => ({
      url: getComputedStyle(el).backgroundImage.match(/url\(["']?(.+?)["']?\)/)?.[1],
      element: `${el.tagName}.${el.className?.toString().split(' ')[0] || ''}`,
    })).filter(i => i.url);

    const svgs = [...document.querySelectorAll('svg')].slice(0, 30).map((svg, i) => ({
      index: i,
      viewBox: svg.getAttribute('viewBox'),
      width: svg.getAttribute('width'),
      height: svg.getAttribute('height'),
      ariaLabel: svg.getAttribute('aria-label'),
      parentClass: svg.parentElement?.className?.toString().split(' ')[0],
      outerHTML: svg.outerHTML.slice(0, 500),
    }));

    const videos = [...document.querySelectorAll('video')].map(v => ({
      src: v.src || v.querySelector('source')?.src,
      poster: v.poster,
      autoplay: v.autoplay,
      loop: v.loop,
    }));

    return { images, bgImages, svgs, videos };
  });
}

async function processPage(browser, pageConfig) {
  const { slug, url } = pageConfig;
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Processing: ${slug} (${url})`);
  console.log('='.repeat(60));

  const pageDir = path.join(OUTPUT_DIR, slug);
  ensureDir(pageDir);
  ensureDir(path.join(pageDir, 'components'));

  const results = { slug, url, viewports: {} };

  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    console.log(`  [${vpName}] Capturing at ${vp.width}x${vp.height}...`);
    const context = await browser.newContext({ viewport: vp });
    const page = await context.newPage();

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    const screenshotPath = path.join(SCREENSHOTS_DIR, `${slug}_${vpName}-${vp.width}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  [${vpName}] Screenshot saved: ${screenshotPath}`);

    if (vpName === 'desktop') {
      console.log(`  [${vpName}] Extracting global tokens...`);
      results.tokens = await extractGlobalTokens(page);

      console.log(`  [${vpName}] Extracting page sections...`);
      results.sections = await extractPageSections(page);

      console.log(`  [${vpName}] Extracting assets...`);
      results.assets = await extractAssets(page);

      console.log(`  [${vpName}] Extracting detailed CSS for key selectors...`);
      const keySelectors = ['header', 'main', 'footer', 'form', '[class*="hero"]', 'h1', 'h2'];
      results.detailedCSS = {};
      for (const sel of keySelectors) {
        const css = await extractDetailedCSS(page, sel);
        if (css && !css.error) {
          results.detailedCSS[sel] = css;
        }
      }
    }

    results.viewports[vpName] = {
      width: vp.width,
      height: vp.height,
      screenshotPath,
    };

    await context.close();
  }

  const outputPath = path.join(pageDir, 'extraction.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`  Extraction data saved: ${outputPath}`);

  return results;
}

async function downloadAllAssets(allResults) {
  console.log('\n' + '='.repeat(60));
  console.log('Downloading assets...');
  console.log('='.repeat(60));

  ensureDir(ASSETS_DIR);
  const downloaded = new Set();
  let count = 0;

  for (const result of allResults) {
    if (!result.assets?.images) continue;
    for (const img of result.assets.images) {
      if (!img.src || downloaded.has(img.src)) continue;
      downloaded.add(img.src);

      try {
        const urlObj = new URL(img.src);
        const filename = path.basename(urlObj.pathname).replace(/[?#].*$/, '') || `image-${count}.png`;
        const dest = path.join(ASSETS_DIR, filename);

        if (!fs.existsSync(dest)) {
          await downloadFile(img.src, dest);
          count++;
          if (count % 10 === 0) console.log(`  Downloaded ${count} assets...`);
        }
      } catch (err) {
        // Skip failed downloads silently
      }
    }
  }
  console.log(`  Total assets downloaded: ${count}`);
}

async function main() {
  ensureDir(OUTPUT_DIR);
  ensureDir(SCREENSHOTS_DIR);
  ensureDir(ASSETS_DIR);

  console.log('Starting UAGC page extraction...');
  console.log(`Pages: ${PAGES.map(p => p.slug).join(', ')}`);

  const browser = await chromium.launch({ headless: true });
  const allResults = [];

  for (const pageConfig of PAGES) {
    try {
      const result = await processPage(browser, pageConfig);
      allResults.push(result);
    } catch (err) {
      console.error(`ERROR processing ${pageConfig.slug}:`, err.message);
    }
  }

  await downloadAllAssets(allResults);

  const summaryPath = path.join(OUTPUT_DIR, 'extraction-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify({
    extractedAt: new Date().toISOString(),
    pages: allResults.map(r => ({
      slug: r.slug,
      url: r.url,
      sectionCount: r.sections?.length || 0,
      imageCount: r.assets?.images?.length || 0,
      svgCount: r.assets?.svgs?.length || 0,
    })),
  }, null, 2));

  await browser.close();

  console.log('\n' + '='.repeat(60));
  console.log('Extraction complete!');
  console.log(`Summary: ${summaryPath}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
