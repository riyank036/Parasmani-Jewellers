import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.argv[2] || 'http://localhost:5175/';
const dir = path.join('review-screenshots');
fs.mkdirSync(dir, { recursive: true });

const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440];

const browser = await chromium.launch();
const results = [];

for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });

  const audit = await page.evaluate(() => {
    const doc = document.documentElement;
    const hero = document.getElementById('hero');
    const h1 = hero?.querySelector('h1');
    const h1Style = h1 ? getComputedStyle(h1) : null;
    const nav = document.querySelector('header');
    const navStyle = nav ? getComputedStyle(nav) : null;
    return {
      overflow: doc.scrollWidth > doc.clientWidth + 1,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      heroHeight: hero?.getBoundingClientRect().height,
      h1Size: h1Style?.fontSize,
      h1Color: h1Style?.color,
      navBg: navStyle?.backgroundColor,
      sectionHeights: [...document.querySelectorAll('section')].map((s) => ({
        id: s.id,
        h: s.offsetHeight,
      })),
      textSample: document.body.innerText.slice(0, 120),
    };
  });

  const shots = [
    ['hero', 0],
    ['collections', '#collections'],
    ['jewellery', '#jewellery'],
    ['showroom', '#showroom'],
  ];

  for (const [name, target] of shots) {
    if (target === 0) {
      await page.evaluate(() => window.scrollTo(0, 0));
    } else {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) el.scrollIntoView({ block: 'start' });
      }, target);
    }
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(dir, `${name}-${w}.png`) });
  }

  results.push({ width: w, ...audit });
  await page.close();
}

const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.goto(BASE_URL, { waitUntil: 'networkidle' });

const mobileAudit = {
  mapsHref: await page.locator('section#showroom a', { hasText: 'Get Directions' }).first().getAttribute('href'),
  hasPlaceholders: await page.evaluate(() =>
    /XXXXX|example\.com/i.test(document.body.innerText)
  ),
  collectionExploreHidden: await page.evaluate(() => {
    const el = document.querySelector('#collections [class*="opacity-0"]');
    return el ? getComputedStyle(el).opacity : null;
  }),
  showroomBtnWrap: await page.evaluate(() => {
    const row = document.querySelector('#showroom .sm\\:flex-row');
    return row ? row.getBoundingClientRect().width : null;
  }),
};

await page.locator('button[aria-label="Open menu"]').click();
await page.waitForTimeout(400);
mobileAudit.menuDialog = await page.evaluate(() => !!document.querySelector('[role="dialog"]'));
mobileAudit.menuExpanded = await page.evaluate(() =>
  document.querySelector('button[aria-label="Open menu"]')?.getAttribute('aria-expanded')
);

await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(BASE_URL, { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
mobileAudit.firstTabFocus = await page.evaluate(() => ({
  tag: document.activeElement?.tagName,
  label: document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim().slice(0, 40),
}));

await browser.close();

console.log(JSON.stringify({ baseUrl: BASE_URL, results, mobileAudit }, null, 2));
