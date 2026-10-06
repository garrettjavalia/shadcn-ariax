import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';
test('ToggleGroup official document previews and usage mapped', async ({
  request
}) => {
  const doc = await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/toggle-group.mdx', 'utf8');
  const names = [...doc.matchAll(/<ComponentPreview\b[^>]*name="toggle-group-([^"]+)"/g)].map(m => m[1]);
  expect(names).toHaveLength(8);
  const index = await (await request.get(stylexURL + '/index.json')).json();
  for (const name of [...names, 'usage']) expect(index.entries['components-toggle-group--' + name]?.tags).toContain('parity');
});
for (const theme of ['light', 'dark']) for (const story of ['demo', 'outline', 'sizes', 'spacing', 'vertical', 'disabled', 'font-weight-selector', 'rtl', 'usage', 'joined', 'customization']) test(`ToggleGroup ${story} states / ${theme}`, async ({
  browser
}, info) => {
  const context = await browser.newContext();
  const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
    const page = await context.newPage();
    await page.goto(`${url}/iframe.html?id=components-toggle-group--${story}&globals=theme:${theme}`);
    await expect(page.locator('[data-slot="toggle-group"]').first()).toBeVisible();
    return page;
  }));
  try {
    await compare(pages[0], pages[1], info, 'initial');
    if (story === 'disabled') {
      for (const page of pages) await expect(page.locator('[data-slot="toggle-group-item"]').first()).toBeDisabled();
      return;
    }
    const count = await pages[0].locator('[data-slot="toggle-group"]').count();
    expect(count).toBeGreaterThan(0);
    if (story === 'customization') {
      for (const page of pages) {
        await expect(page.locator('[data-slot="toggle-group"]')).toHaveCSS('width', '240px');
        await page.getByRole('button', {
          name: 'Resize'
        }).click();
        await expect(page.locator('[data-slot="toggle-group"]')).toHaveCSS('width', '300px');
      }
      await compare(pages[0], pages[1], info, 'dynamic-width');
    }
    for (let i = 0; i < count; i++) {
      for (const page of pages) await page.locator('[data-slot="toggle-group"]').nth(i).locator('[data-slot="toggle-group-item"]').first().hover();
      await compare(pages[0], pages[1], info, `hover-${i}`);
      for (const page of pages) {
        await page.mouse.move(0, 0);
        await page.keyboard.press('Tab');
        await page.locator('[data-slot="toggle-group"]').nth(i).locator('[data-slot="toggle-group-item"]').first().focus();
      }
      await compare(pages[0], pages[1], info, `focus-${i}`);
      const target = pages[0].locator('[data-slot="toggle-group"]').nth(i).locator('[data-slot="toggle-group-item"]').nth(1);
      const attribute = (await target.getAttribute('role')) === 'radio' ? 'aria-checked' : 'aria-pressed';
      const wasSelected = (await target.getAttribute(attribute)) === 'true';
      for (const page of pages) await page.locator('[data-slot="toggle-group"]').nth(i).locator('[data-slot="toggle-group-item"]').nth(1).click();
      await compare(pages[0], pages[1], info, `selected-${i}`);
      for (const page of pages) {
        const item = page.locator('[data-slot="toggle-group"]').nth(i).locator('[data-slot="toggle-group-item"]').nth(1);
        await expect(item).toHaveAttribute(attribute, wasSelected ? 'false' : 'true');
        await page.keyboard.press(story === 'vertical' || story === 'joined' && i === 1 ? 'ArrowDown' : story === 'rtl' || story === 'joined' && i === 2 ? 'ArrowLeft' : 'ArrowRight');
      }
      await compare(pages[0], pages[1], info, `arrow-${i}`);
      for (const page of pages) await page.keyboard.press('Space');
      await compare(pages[0], pages[1], info, `space-${i}`);
    }
  } finally {
    await context.close();
  }
});
for (const theme of ['light', 'dark']) test(`Toggle selected aliases match canonical shadcn variants / ${theme}`, async ({
  browser
}, info) => {
  const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
    const page = await browser.newPage();
    await page.goto(`${url}/iframe.html?id=components-toggle-group--aliases&globals=theme:${theme}`);
    await expect(page.getByRole('button', {
      name: 'True',
      exact: true
    })).toBeVisible();
    return page;
  }));
  try {
    await compare(pages[0], pages[1], info, 'literal-data-aliases');
    for (const page of pages) {
      await page.keyboard.press('Tab');
      await page.getByRole('button', {
        name: 'True',
        exact: true
      }).focus();
    }
    await compare(pages[0], pages[1], info, 'selected-focus');
  } finally {
    await Promise.all(pages.map(page => page.close()));
  }
});
