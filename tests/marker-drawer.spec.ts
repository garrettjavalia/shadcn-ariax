import { test, expect } from '@playwright/test';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';
const scenarios = [{
  story: 'registry-drawer',
  width: 1000,
  dir: 'ltr'
}, {
  story: 'registry-drawer-default',
  width: 1000,
  dir: 'ltr'
}, {
  story: 'registry-drawer-border',
  width: 1000,
  dir: 'ltr'
}, {
  story: 'registry-drawer',
  width: 1000,
  dir: 'rtl'
}, {
  story: 'registry-drawer',
  width: 390,
  dir: 'ltr'
}];
for (const theme of ['light', 'dark']) for (const scenario of scenarios) test(`Marker actual Drawer ${scenario.story} / ${scenario.width} / ${scenario.dir} / ${theme}`, async ({
  browser
}, info) => {
  const context = await browser.newContext({
    viewport: {
      width: scenario.width,
      height: 900
    }
  });
  try {
    const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
      const page = await context.newPage();
      await page.goto(`${url}/iframe.html?id=components-marker--${scenario.story}&globals=theme:${theme}`);
      await expect(page.getByRole('button', {
        name: 'Explored 4 files'
      })).toBeVisible();
      await page.locator('html').evaluate((node, dir) => node.setAttribute('dir', dir), scenario.dir);
      return page;
    }));
    await compare(pages[0], pages[1], info, 'closed');
    for (const page of pages) {
      await page.getByRole('button', {
        name: 'Explored 4 files'
      }).focus();
    }
    await compare(pages[0], pages[1], info, 'trigger-focus');
    for (const page of pages) {
      await page.getByRole('button', {
        name: 'Explored 4 files'
      }).press('Enter');
      await expect(page.getByRole('dialog', {
        name: 'File Activity'
      })).toBeVisible();
      await page.locator('[data-slot="drawer-portal"]').evaluate(node => node.setAttribute('data-parity-portal', ''));
      await expect(page.getByText('app/chat/page.tsx')).toBeVisible();
      await expect(page.getByText('components/message.tsx')).toBeVisible();
      await expect(page.getByText('lib/ai.ts')).toBeVisible();
      await expect(page.getByText('read', {
        exact: true
      })).toHaveCount(3);
      await page.mouse.move(0, 0);
    }
    await compare(pages[0], pages[1], info, 'open-files');
    for (const page of pages) {
      await page.getByRole('button', {
        name: 'Close',
        exact: true
      }).click();
      await expect(page.getByRole('dialog')).toBeHidden();
      await expect(page.getByRole('button', {
        name: 'Explored 4 files'
      })).toBeFocused();
    }
    await compare(pages[0], pages[1], info, 'close-focus-restored');
    for (const page of pages) {
      await page.getByRole('button', {
        name: 'Explored 4 files'
      }).click();
      await expect(page.getByRole('dialog', {
        name: 'File Activity'
      })).toBeVisible();
      await page.locator('[data-slot="drawer-portal"]').evaluate(node => node.setAttribute('data-parity-portal', ''));
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toBeHidden();
      await expect(page.getByRole('button', {
        name: 'Explored 4 files'
      })).toBeFocused();
    }
    await compare(pages[0], pages[1], info, 'escape-focus-restored');
  } finally {
    await context.close();
  }
});
