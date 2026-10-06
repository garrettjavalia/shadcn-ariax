import { test, expect } from '@playwright/test';
import { partitionStories } from './story-batches';

test('story batches cover every selected story exactly once with balanced sizes', () => {
  const stories = Array.from({ length: 73 }, (_, index) => `story-${index}`);
  for (const count of [1, 2, 4, 18, 80]) {
    const batches = partitionStories(stories, count);
    expect(batches.flat().sort()).toEqual([...stories].sort());
    const sizes = batches.map(batch => batch.length);
    expect(Math.max(...sizes) - Math.min(...sizes)).toBeLessThanOrEqual(1);
  }
  expect(partitionStories([], 2)).toEqual([[], []]);
  for (const invalid of [0, -1, 1.5, NaN]) expect(() => partitionStories(stories, invalid)).toThrow();
});
