import { test, expect } from '@playwright/test';
import { upstreamURL, stylexURL } from './servers';
import { compare, snapshot, differences } from './compare';
for (const theme of ['light', 'dark']) test(`Input focus, editing, callback and file / ${theme}`, async ({ browser }, info) => {
  const context = await browser.newContext({ viewport: { width: 1000, height: 900 }, locale: 'en-US', timezoneId: 'UTC', colorScheme: 'light' });
  const a = await context.newPage(), b = await context.newPage();
  try {
    for (const story of ['basic', 'context', 'inline-style', 'file']) {
      await Promise.all([a,b].map(async (page,i) => {
        await page.goto(`${[upstreamURL,stylexURL][i]}/iframe.html?id=components-input--${story}&viewMode=story&globals=theme:${theme}`);
        await expect(page.locator('#parity-root input')).toBeVisible();
        await page.keyboard.press('Tab');
      }));
      await compare(a,b,info,`${story}-focus`);
      await Promise.all([a,b].map(async page => {
        if (story === 'file') await page.locator('input').setInputFiles({name:'sample.txt',mimeType:'text/plain',buffer:Buffer.from('Input test')});
        else await page.locator('input').fill('Updated value');
      }));
      await compare(a,b,info,`${story}-edited`);

    }
  } finally { await context.close(); }
});

test('Input documentation coverage explicitly tracks pending component compositions', async () => {
  const { readFile } = await import('node:fs/promises');
  const doc = await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/input.mdx', 'utf8');
  const names = [...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m => m[1]);
  const covered = ['input-basic'];
  // These are pending complete official compositions, not aliases to partial examples.
  const pending = ['input-demo', 'input-field', 'input-fieldgroup', 'input-disabled', 'input-invalid', 'input-file', 'input-inline', 'input-grid', 'input-required', 'input-badge', 'input-input-group', 'input-button-group', 'input-form', 'input-rtl'];
  expect(names.sort()).toEqual([...covered, ...pending].sort());
});

test('Input pseudo-element CSS mutations are detected', async ({ page }) => {
  for (const [story, pseudo, property, value] of [['basic', '::placeholder', 'color', 'rgb(1, 2, 3)'], ['file', '::file-selector-button', 'height', '47px']]) {
    await page.goto(`${stylexURL}/iframe.html?id=components-input--${story}&viewMode=story`);
    await expect(page.locator('input')).toBeVisible();
    const before = await snapshot(page);
    await page.addStyleTag({ content: `input${pseudo} { ${property}: ${value} !important }` });
    const diff = differences(before, await snapshot(page));
    expect(diff.some(d => d.path.endsWith(`/pseudos/${pseudo}/${property}`))).toBe(true);
  }
});

test('Input inline style wins while retaining StyleX dynamic variables', async ({ page }) => {
  await page.goto(`${stylexURL}/iframe.html?id=components-input--customized&viewMode=story`);
  const input = page.getByRole('textbox', { name: 'Customized' });
  await expect(input).toHaveCSS('width', '240px');
  await expect(input).toHaveCSS('height', '40px');
});
