import { test, expect } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';
import { readdirSync, readFileSync } from 'node:fs';
import { waitForStoryReadiness } from './story-readiness';
import { upstreamURL } from './servers';
import type { OriginalStoriesManifest } from '../scripts/upstream/original-stories';

test('original Storybook registers every pinned documentation preview from its own source', async ({ request }) => {
  const directory = 'generated/upstream/shadcn/apps/v4/content/docs/components/aria';
  const expected: { document: string; name: string }[] = [];
  for (const file of (await readdir(directory)).filter(name => name.endsWith('.mdx')).sort()) {
    const document = `${directory}/${file}`;
    for (const match of (await readFile(document, 'utf8')).matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)) expected.push({ document, name: match[1] });
  }
  expect(expected.length).toBeGreaterThan(0);
  const response = await request.get(`${upstreamURL}/original-stories/manifest.json`);
  expect(response.ok(), 'Original preview manifest must be published with the built Storybook').toBe(true);
  const manifest: OriginalStoriesManifest = await response.json();
  expect(manifest.version).toBe(1);
  expect(manifest.previews.map(({ document, name }) => ({ document, name }))).toEqual(expected);
  const index = await (await request.get(`${upstreamURL}/index.json`)).json();
  const registered = Object.values(index.entries as Record<string, { id: string; type: string; name: string; tags?: string[] }>).filter(entry => entry.type === 'story' && entry.tags?.includes('original-documentation'));
  expect(registered.map(entry => entry.id).sort()).toEqual([...new Set(manifest.previews.map(preview => preview.storyId))].sort());
  for (const preview of manifest.previews) {
    expect(index.entries[preview.storyId]?.name).toBe(preview.name);
    expect(preview.status).toBe(preview.counterparts.length ? 'mapped' : 'unmapped');
    expect(preview.stylexStoryIds).toEqual(preview.counterparts.map(match => match.stylexStoryId).sort());
    for (const match of preview.counterparts) {
      expect(index.entries[match.storyId]?.name).toBe(preview.name);
      expect(index.entries[match.storyId]?.tags).toContain('original-parity');
      expect(match.metaSource).toMatch(/^stories\/.+\.stories\.tsx$/);
    }
    expect(preview.source).toBe(`generated/upstream/shadcn/apps/v4/examples/aria/${preview.name}.tsx`);
    expect(await readFile(preview.source, 'utf8')).toMatch(/export\s/);
  }
});

// Reuse a page per documentation component; every canonical original is visited.
// Failures include the pinned source and story ID, while other examples still run.
const documents = readdirSync('generated/upstream/shadcn/apps/v4/content/docs/components/aria').filter(name => name.endsWith('.mdx') && /<ComponentPreview\b/.test(readFileSync(`generated/upstream/shadcn/apps/v4/content/docs/components/aria/${name}`, 'utf8'))).sort();
for (const document of documents) test(`official original previews execute / ${document}`, async ({ page, request }) => {
  test.setTimeout(240_000);
  const manifest: OriginalStoriesManifest = await (await request.get(`${upstreamURL}/original-stories/manifest.json`)).json();
  const previews = [...new Map(manifest.previews.filter(preview => preview.document.endsWith('/' + document)).map(preview => [preview.storyId, preview])).values()];
  test.setTimeout(30_000 + previews.length * 45_000);
  expect(previews.length, `No official previews registered for ${document}`).toBeGreaterThan(0);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.stack ?? error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('requestfailed', request => { if (['script', 'stylesheet', 'font', 'image'].includes(request.resourceType())) errors.push(`${request.resourceType()} ${request.url()}: ${request.failure()?.errorText}`); });
  for (const preview of previews) await test.step(`${preview.storyId} (${preview.source})`, async () => {
    errors.length = 0;
    try {
      await page.goto(`${upstreamURL}/iframe.html?id=${preview.storyId}&viewMode=story&globals=theme:light`);
      await expect(page.locator('#parity-root')).toBeVisible();
      await expect(page.locator('.sb-errordisplay')).not.toBeVisible();
      await waitForStoryReadiness(page);
      await expect.poll(() => page.locator('#parity-root img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete)), { message: 'Original preview images must finish loading' }).toBe(true);
      expect(await page.locator('#parity-root img').evaluateAll(images => images.filter(image => !(image as HTMLImageElement).naturalWidth).map(image => (image as HTMLImageElement).src)), 'Original preview images must load successfully').toEqual([]);
    } catch (error) {
      errors.push(String(error));
    }
    expect.soft(errors, `Official source ${preview.source}, story ${preview.storyId}`).toEqual([]);
  });
});
