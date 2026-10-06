import { test, expect } from '@playwright/test';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';
for (const theme of ['light', 'dark']) for (const story of ['primitive-state', 'opening-start', 'last-anchor', 'rtl']) test(`MessageScroller ${story} commands and anchoring / ${theme}`, async ({
  browser
}, info) => {
  const context = await browser.newContext({
    viewport: {
      width: 1000,
      height: 900
    }
  });
  try {
    const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
      const page = await context.newPage();
      await page.goto(`${url}/iframe.html?id=components-messagescroller--${story}&globals=theme:${theme}`);
      await expect(page.locator('[data-slot="message-scroller-viewport"]')).toBeVisible();
      return page;
    }));
    await compare(pages[0], pages[1], info, 'initial');
    for (const command of ['Start', 'Middle', 'End']) {
      for (const page of pages) await page.getByRole('button', {
        name: command,
        exact: true
      }).click();
      await compare(pages[0], pages[1], info, command.toLowerCase());
    }
    for (const page of pages) {
      await page.getByRole('button', {
        name: 'Append',
        exact: true
      }).click();
      await expect(page.locator('[data-slot="message-scroller-item"]')).toHaveCount(6);
    }
    await compare(pages[0], pages[1], info, 'append');
    for (const page of pages) {
      const viewport = page.locator('[data-slot="message-scroller-viewport"]');
      await viewport.press('Home');
      await expect.poll(() => viewport.evaluate(node => node.scrollTop)).toBe(0);
    }
    await compare(pages[0], pages[1], info, 'keyboard-home');
  } finally {
    await context.close();
  }
});
