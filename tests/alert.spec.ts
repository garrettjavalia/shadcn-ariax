import { test, expect } from '@playwright/test';
import { upstreamURL, stylexURL } from './servers';
import { compare } from './compare';
for (const theme of ['light', 'dark']) test(`Alert links preserve hover and focus styles / ${theme}`, async ({ browser }, info) => {
  const context = await browser.newContext({ viewport: { width: 1000, height: 900 } });
  const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
    const page = await context.newPage();
    await page.goto(`${url}/iframe.html?id=components-alert--content&viewMode=story&globals=theme:${theme}`);
    await expect(page.locator('#content-alert')).toHaveAttribute('role', 'alert');
    return page;
  }));
  try {
    for (const index of [0, 1]) {
      await Promise.all(pages.map(page => page.locator('#content-alert a').nth(index).hover()));
      await compare(pages[0], pages[1], info, `alert-link-${index}-hover`);
      await Promise.all(pages.map(async page => { await page.mouse.move(0, 0); await page.locator('#content-alert a').nth(index).focus(); }));
      await compare(pages[0], pages[1], info, `alert-link-${index}-focus`);
    }
    await Promise.all(pages.map(async page => { await page.mouse.move(0, 0); await page.evaluate(() => { document.documentElement.style.fontSize = '20px'; }); }));
    await compare(pages[0], pages[1], info, 'alert-rem-scaling');
  } finally { await context.close(); }
});

test('Alert links preserve the upstream hover capability condition on touch devices', async ({ browser }, info) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 900 }, hasTouch: true, isMobile: true });
  const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
    const page = await context.newPage();
    await page.goto(`${url}/iframe.html?id=components-alert--content&viewMode=story`);
    await expect(page.locator('#content-alert')).toBeVisible();
    expect(await page.evaluate(() => matchMedia('(hover: hover)').matches)).toBe(false);
    await page.locator('#content-alert a').nth(1).tap();
    return page;
  }));
  try { await compare(pages[0], pages[1], info, 'alert-touch-link'); }
  finally { await context.close(); }
});
