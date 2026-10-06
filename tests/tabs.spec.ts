import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';
test('all official Tabs previews and usage have parity stories', async ({
  request
}) => {
  const doc = await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/tabs.mdx', 'utf8');
  const index = await (await request.get(stylexURL + '/index.json')).json();
  for (const name of [...doc.matchAll(/name="tabs-([^"]+)"/g)].map(m => m[1]).concat('usage')) expect(index.entries['components-tabs--' + name]?.tags).toContain('parity');
});
for (const theme of ['light', 'dark']) for (const story of ['demo', 'line', 'vertical', 'disabled', 'icons', 'rtl', 'usage', 'helpers']) test(`Tabs ${story} states / ${theme}`, async ({
  browser
}, info) => {
  const context = await browser.newContext();
  const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
    const page = await context.newPage();
    await page.goto(`${url}/iframe.html?id=components-tabs--${story}&globals=theme:${theme}`);
    await expect(page.locator('#parity-root')).toBeVisible();
    return page;
  }));
  try {
    await compare(pages[0], pages[1], info, 'initial');
    await Promise.all(pages.map(page => page.getByRole('tab').first().hover()));
    await compare(pages[0], pages[1], info, 'hover');
    await Promise.all(pages.map(async page => {
      await page.mouse.move(0, 0);
      await page.keyboard.press('Tab');
    }));
    await compare(pages[0], pages[1], info, 'focus');
    await Promise.all(pages.map(page => page.keyboard.press(story === 'vertical' ? 'ArrowDown' : story === 'rtl' ? 'ArrowLeft' : 'ArrowRight')));
    await compare(pages[0], pages[1], info, 'arrow-navigation');
    if (story !== 'disabled') {
      await Promise.all(pages.map(page => page.getByRole('tab').last().click()));
      await compare(pages[0], pages[1], info, 'pointer-selection');
    } else for (const page of pages) await expect(page.getByRole('tab').last()).toHaveAttribute('data-disabled', 'true');
  } finally {
    await context.close();
  }
});
for (const theme of ['light', 'dark']) test(`Tabs controlled native styles / ${theme}`, async ({
  browser
}, info) => {
  const context = await browser.newContext();
  const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
    const page = await context.newPage();
    await page.goto(`${url}/iframe.html?id=components-tabs--controlled&globals=theme:${theme}`);
    await expect(page.locator('#parity-root')).toBeVisible();
    return page;
  }));
  try {
    await compare(pages[0], pages[1], info, 'initial');
    for (const page of pages) {
      await expect(page.locator('[data-slot="tabs"]')).toHaveCSS('width', '260px');
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await expect(page.locator('output')).toHaveText('one');
    }
    await compare(pages[0], pages[1], info, 'manual-focus');
    for (const page of pages) {
      await page.keyboard.press('Space');
      await expect(page.locator('output')).toHaveText('two');
    }
    await compare(pages[0], pages[1], info, 'manual-selected');
    for (const page of pages) {
      await page.keyboard.press('ArrowDown');
      await expect(page.getByRole('tab', {
        name: 'One'
      })).toBeFocused();
    }
    await compare(pages[0], pages[1], info, 'disabled-skipped');
    await Promise.all(pages.map(page => page.getByRole('tab', {
      name: 'One'
    }).click()));
    await compare(pages[0], pages[1], info, 'pointer-selected');
    for (const page of pages) await expect(page.locator('output')).toHaveText('one');
  } finally {
    await context.close();
  }
});
for (const theme of ['light', 'dark']) test(`Tabs variant and active conditions / ${theme}`, async ({
  browser
}, info) => {
  const context = await browser.newContext();
  const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
    const page = await context.newPage();
    await page.goto(`${url}/iframe.html?id=components-tabs--conditions&globals=theme:${theme}`);
    await expect(page.locator('#parity-root')).toBeVisible();
    return page;
  }));
  try {
    await compare(pages[0], pages[1], info, 'initial');
    for (let index = 0; index < 3; index++) {
      await Promise.all(pages.map(page => page.getByRole('tablist').nth(index).getByRole('tab').first().click()));
      await compare(pages[0], pages[1], info, `selected-${index}`);
    }
  } finally {
    await context.close();
  }
});
