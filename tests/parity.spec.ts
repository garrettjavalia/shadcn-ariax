import {controlAvatarAssets,waitAvatarAssets} from './avatar-assets';
import { upstreamPort, stylexPort, upstreamURL, stylexURL } from './servers';
import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { compare, compareDOMCSS } from './compare';
import { environments, type StoryEntry } from './catalog';
import { partitionStories } from './story-batches';
import { waitForStoryReadiness } from './story-readiness';
import type { OriginalStoriesManifest } from '../scripts/upstream/original-stories';

const storyFileCount = readdirSync('stories', { recursive: true, withFileTypes: true }).filter(file => file.isFile() && file.name.endsWith('.stories.tsx')).length;
const batchCount = process.env.PARITY_COMPONENT ? 1 : Math.max(1, storyFileCount);
const ciMode = process.env.ARIAX_TEST_MODE === 'ci';
const selectedEnvironments = ciMode ? environments.filter(environment => environment.width === 1000) : environments;
for (const { theme, width, requiredTag } of selectedEnvironments) for (let batch = 0; batch < batchCount; batch++) test(`registered stories / ${theme} / ${width} / batch ${batch + 1}`, { tag: '@static-parity' }, async ({ browser, request }, info) => {
  test.setTimeout(240_000);
  const leftIndex = await (await request.get(`${upstreamURL}/index.json`)).json();
  const rightIndex = await (await request.get(`${stylexURL}/index.json`)).json();
  const select = (index: { entries: Record<string, StoryEntry> }) => Object.values(index.entries)
    .filter(s => s.type === 'story' && s.tags?.includes('parity') && (!requiredTag || s.tags.includes(requiredTag)) && (!process.env.PARITY_COMPONENT || s.id.startsWith(process.env.PARITY_COMPONENT))).map(s => s.id).sort();
  const selected = select(leftIndex);
  const manifestResponse = await request.get(upstreamURL + '/original-stories/manifest.json');
  expect(manifestResponse.ok(), 'The official original story manifest must be published').toBe(true);
  const manifest: OriginalStoriesManifest = await manifestResponse.json();
  const originals = new Map<string, string>();
  for (const preview of manifest.previews) for (const counterpart of preview.counterparts) {
    const previous = originals.get(counterpart.stylexStoryId);
    expect(previous === undefined || previous === counterpart.storyId, 'Ambiguous original for ' + counterpart.stylexStoryId).toBe(true);
    expect(leftIndex.entries[counterpart.storyId]?.tags, 'Missing original counterpart: ' + counterpart.storyId).toContain('original-parity');
    originals.set(counterpart.stylexStoryId, counterpart.storyId);
  }
  expect(select(rightIndex), 'Both implementations must publish the same stories').toEqual(selected);
  test.skip(selected.length === 0 && !!requiredTag, 'No selected stories declare this additional viewport.');
  expect(selected.length, 'No parity stories discovered').toBeGreaterThan(0);
  const ids = partitionStories(selected, batchCount)[batch];
  test.skip(ids.length === 0, 'No selected stories in this batch.');
  const context = await browser.newContext({ viewport: { width, height: 900 }, locale: 'en-US', timezoneId: 'UTC', colorScheme: 'light' });
  await controlAvatarAssets(context);
  const a = await context.newPage(); const b = await context.newPage();
  // One shared context clock makes current-date styling deterministic in all static stories.
  await a.clock.setFixedTime(new Date('2026-02-12T12:00:00Z'));
  try {
    for (const id of ids) await test.step(id, async () => {
      // Full navigation resets React state; pages are reused to bound browser overhead.
      const started = performance.now();
      await Promise.all(([[a, upstreamPort], [b, stylexPort]] as const).map(async ([page, port]) => {
        const storyId = port === upstreamPort ? originals.get(id) ?? id : id;
        await page.goto(`http://127.0.0.1:${port}/iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme}`);
        await expect(page.locator('#parity-root')).toBeVisible();
        await waitAvatarAssets(page);
        await waitForStoryReadiness(page);
        await expect(page.locator('html')).toHaveClass(theme === 'dark' ? /\bdark\b/ : /^(?!.*\bdark\b).*$/);
        await page.mouse.move(0, 0);
      }));
      if (process.env.PARITY_PROFILE === '1') info.annotations.push({ type: 'parity-navigation', description: JSON.stringify({ id, ms: performance.now() - started }) });
      try { await (ciMode ? compareDOMCSS : compare)(a, b, info, `${id}-rest`); }
      catch (error) { expect.soft(false, String(error)).toBe(true); }
    });
  } finally { await context.close(); }
});
