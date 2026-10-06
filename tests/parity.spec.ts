import { upstreamPort, stylexPort, upstreamURL, stylexURL } from './servers';
import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { readdirSync } from 'node:fs';
import { compare } from './compare';
import { environments, buttonDocumentation, type StoryEntry } from './catalog';
import { partitionStories } from './story-batches';

const storyFileCount = readdirSync('stories', { recursive: true, withFileTypes: true }).filter(file => file.isFile() && file.name.endsWith('.stories.tsx')).length;
const batchCount = process.env.PARITY_COMPONENT ? 1 : Math.max(1, Math.ceil(storyFileCount / 4));
for (const { theme, width, requiredTag } of environments) for (let batch = 0; batch < batchCount; batch++) test(`registered stories / ${theme} / ${width} / batch ${batch + 1}`, async ({ browser, request }, info) => {
  test.setTimeout(240_000);
  const leftIndex = await (await request.get(`${upstreamURL}/index.json`)).json();
  const rightIndex = await (await request.get(`${stylexURL}/index.json`)).json();
  const select = (index: { entries: Record<string, StoryEntry> }) => Object.values(index.entries)
    .filter(s => s.type === 'story' && s.tags?.includes('parity') && (!requiredTag || s.tags.includes(requiredTag)) && (!process.env.PARITY_COMPONENT || s.id.startsWith(process.env.PARITY_COMPONENT))).map(s => s.id).sort();
  const selected = select(leftIndex);
  expect(select(rightIndex), 'Both implementations must publish the same stories').toEqual(selected);
  test.skip(selected.length === 0 && !!requiredTag, 'No selected stories declare this additional viewport.');
  expect(selected.length, 'No parity stories discovered').toBeGreaterThan(0);
  const ids = partitionStories(selected, batchCount)[batch];
  test.skip(ids.length === 0, 'No selected stories in this batch.');
  const context = await browser.newContext({ viewport: { width, height: 900 }, locale: 'en-US', timezoneId: 'UTC', colorScheme: 'light' });
  const a = await context.newPage(); const b = await context.newPage();
  try {
    for (const id of ids) await test.step(id, async () => {
      // Full navigation resets React state; pages are reused to bound browser overhead.
      const started = performance.now();
      await Promise.all(([[a, upstreamPort], [b, stylexPort]] as const).map(async ([page, port]) => {
        await page.goto(`http://127.0.0.1:${port}/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
        await expect(page.locator('#parity-root')).toBeVisible();
        await expect(page.locator('html')).toHaveClass(theme === 'dark' ? /\bdark\b/ : /^(?!.*\bdark\b).*$/);
        await page.mouse.move(0, 0);
      }));
      if (process.env.PARITY_PROFILE === '1') info.annotations.push({ type: 'parity-navigation', description: JSON.stringify({ id, ms: performance.now() - started }) });
      try { await compare(a, b, info, `${id}-rest`); }
      catch (error) { expect.soft(false, String(error)).toBe(true); }
    });
  } finally { await context.close(); }
});

test('every official Button documentation example has a registered parity story', async ({ request }) => {
  const document = await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/button.mdx', 'utf8');
  const examples = [...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m => m[1]);
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  expect(examples.length).toBeGreaterThan(0);
  for (const name of examples) {
    expect(buttonDocumentation[name], `Unmapped official example: ${name}`).toBeTruthy();
    expect(index.entries[`components-button--${buttonDocumentation[name]}`]?.tags).toContain('parity');
  }
});

 test('every official Separator documentation example has a registered parity story', async ({ request }) => {
 const document = await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/separator.mdx', 'utf8');
 const examples = [...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m => m[1]);
 const index = await (await request.get(`${stylexURL}/index.json`)).json();
 expect(examples.length).toBeGreaterThan(0);
 for (const name of examples) expect(index.entries[`components-separator--${name.replace('separator-', '')}`]?.tags, name).toContain('parity');
});

test('every official Alert documentation example has a registered parity story', async ({ request }) => {
  const document = await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/alert.mdx', 'utf8');
  const examples = [...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m => m[1]);
  const index = await (await request.get(`${stylexURL}/index.json`)).json();
  expect(examples.length).toBeGreaterThan(0);
  for (const name of examples) expect(index.entries[`components-alert--${name.replace('alert-', '')}`]?.tags, name).toContain('parity');
});
