import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { upstreamURL, stylexURL } from './servers';
import { compare } from './compare';

test('Direction official preview maps to a real Card composition', async ({ request }) => {
  const document = await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/direction.mdx', 'utf8');
  expect([...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(match => match[1])).toEqual(['card-rtl']);
  const index = await (await request.get(stylexURL + '/index.json')).json();
  expect(index.entries['components-direction--card-rtl'].tags).toContain('parity');
});
for (const theme of ['light', 'dark']) test(`Direction provider inheritance, locale priority and live change / ${theme}`, async ({ browser }, info) => {
  const context = await browser.newContext();
  const a = await context.newPage(), b = await context.newPage();
  try {
    for (const story of ['usage', 'locale', 'nested', 'card-rtl', 'dynamic']) {
      await Promise.all(([[a, upstreamURL], [b, stylexURL]] as const).map(async ([page, url]) => {
        await page.goto(`${url}/iframe.html?id=components-direction--${story}&globals=theme:${theme}`);
        await expect(page.locator('#parity-root')).toBeVisible();
      }));
      await compare(a, b, info, story);
      if (story === 'usage') for (const page of [a, b]) await expect(page.getByTestId('usage')).toHaveAttribute('data-direction', 'rtl');
      if (story === 'locale') for (const page of [a, b]) await expect(page.getByTestId('explicit-locale')).toHaveAttribute('data-direction', 'ltr');
      if (story === 'dynamic') for (let i = 0; i < 2; i++) {
        for (const page of [a, b]) await page.getByRole('button', { name: 'Change locale' }).click();
        await compare(a, b, info, `dynamic-${i}`);
        for (const page of [a, b]) await expect(page.getByTestId('dynamic')).toHaveAttribute('data-direction', i === 0 ? 'rtl' : 'ltr');
      }
    }
  } finally { await context.close(); }
});
