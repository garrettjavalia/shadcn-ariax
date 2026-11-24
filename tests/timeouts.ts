// Budgets bound failures, not successful work. The measured detailed light run's
// longest passing test took 31s; ordinary tests retain 14s of headroom. Batch
// limits account for multiple stories without inheriting a timeout per action.
export const e2eTimeouts = {
  test: 45_000,
  expect: 5_000,
  action: 5_000,
  navigation: 15_000,
  browserWork: 5_000,
  storyTransition: 10_000,
  parityBatch: 90_000,
  spacingBatch: 60_000,
} as const;

export function originalPreviewBudget(previewCount: number) {
  return Math.min(
    120_000,
    Math.max(e2eTimeouts.test, 10_000 + previewCount * 3_000),
  );
}
