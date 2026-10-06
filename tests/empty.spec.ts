import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';
test('Empty official previews have real component compositions', async ({ request }) => {
  const document = await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/empty.mdx', 'utf8');
  const examples = [...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(match => match[1]);
  expect(examples).toHaveLength(7);
  const aliases: Record<string, string> = { 'empty-avatar': 'avatar-example', 'empty-input-group': 'input-group-example' };
  const index = await (await request.get(stylexURL + '/index.json')).json();
  for (const name of examples) expect(index.entries['components-empty--' + (aliases[name] ?? name.slice(6))]?.tags, name).toContain('parity');
  const registry = await readFile('generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/empty-example.tsx', 'utf8');
  const registryStories: Record<string, string> = { EmptyBasic: 'registry-basic', EmptyWithMutedBackground: 'registry-muted', EmptyWithBorder: 'registry-border', EmptyWithIcon: 'registry-icon', EmptyWithMutedBackgroundAlt: 'registry-muted-alt', EmptyInCard: 'registry-in-card' };
  const names = [...registry.matchAll(/^function (Empty\w+)\(/gm)].map(match => match[1]);
  expect(names.sort()).toEqual(Object.keys(registryStories).sort());
  for (const name of names) expect(index.entries['components-empty--' + registryStories[name]]?.tags, name).toContain('parity');
});
for (const theme of ['light', 'dark']) test(`Empty descendant links and native style override / ${theme}`, async ({ browser }, info) => {
  const context = await browser.newContext();
  const a = await context.newPage(), b = await context.newPage();
  try {
    for (const story of ['structure', 'customization', 'input-group-example']) {
      await Promise.all(([[a, upstreamURL], [b, stylexURL]] as const).map(async ([page, url]) => { await page.goto(`${url}/iframe.html?id=components-empty--${story}&globals=theme:${theme}`); await expect(page.locator('#parity-root')).toBeVisible(); }));
      if (story === 'customization') {
        for (const page of [a, b]) { await expect(page.getByTestId('custom-empty')).toHaveCSS('width', '340px'); await page.getByTestId('custom-empty').click(); await expect(page.getByTestId('custom-empty')).toHaveCSS('width', '380px'); }
      } else {
        for (const page of [a, b]) await page.getByRole('link').first().hover();
      }
      await compare(a, b, info, story);
    }
  } finally { await context.close(); }
});
