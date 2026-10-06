export function partitionStories<T>(stories: readonly T[], count: number): T[][] {
  if (!Number.isInteger(count) || count < 1) throw new Error('Story batch count must be a positive integer');
  const batches: T[][] = Array.from({ length: count }, () => []);
  stories.forEach((story, index) => batches[index % count].push(story));
  return batches;
}
