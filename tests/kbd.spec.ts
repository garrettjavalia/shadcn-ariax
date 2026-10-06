import { test, expect } from '@playwright/test';
import { upstreamURL, stylexURL } from './servers';
import { compare } from './compare';
for (const theme of ['light', 'dark']) test(`Kbd official button and input composition interactions / ${theme}`, async ({ browser }, info) => {
  const context = await browser.newContext({ viewport: { width: 1000, height: 900 }, locale: 'en-US', timezoneId: 'UTC', colorScheme: 'light' });
  const a = await context.newPage(), b = await context.newPage();
  try {
    await Promise.all([a, b].map(async (page, i) => {
      await page.goto(`${[upstreamURL, stylexURL][i]}/iframe.html?id=components-kbd--in-button&viewMode=story&globals=theme:${theme}`);
      await page.getByRole('button').click();
      await expect(page.getByRole('button')).toBeFocused();
    }));
    await compare(a, b, info, 'kbd-button-focused');
    await Promise.all([a, b].map(async (page, i) => {
      await page.goto(`${[upstreamURL, stylexURL][i]}/iframe.html?id=components-kbd--in-input-group&viewMode=story&globals=theme:${theme}`);
      await page.locator('[data-slot="input-group-addon"]').last().click();
      await expect(page.getByRole('textbox')).toBeFocused();
      await page.getByRole('textbox').fill('Keyboard shortcut');
    }));
    await compare(a, b, info, 'kbd-input-group-edited');
  } finally { await context.close(); }
});
test('Kbd style retains dynamic variables and renders both primitives as kbd', async ({ page }) => {
  await page.goto(`${stylexURL}/iframe.html?id=components-kbd--overrides&viewMode=story`);
  const key = page.locator('[data-slot="kbd"]').first();
  await expect(key).toHaveCSS('width', '72px');
  await expect(key).toHaveCSS('height', '28px');
  await expect(key).toHaveCSS('border-radius', '10px');
  expect(await key.getAttribute('style')).toContain('--');
  expect(await page.locator('[data-slot="kbd-group"]').evaluate(el => el.tagName)).toBe('KBD');
  expect(await key.evaluate(el => el.tagName)).toBe('KBD');
});
