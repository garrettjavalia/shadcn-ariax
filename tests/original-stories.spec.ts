import { test, expect } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';
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
    expect(preview.source).toBe(`generated/upstream/shadcn/apps/v4/examples/aria/${preview.name}.tsx`);
    expect(await readFile(preview.source, 'utf8')).toMatch(/export\s/);
  }
});
