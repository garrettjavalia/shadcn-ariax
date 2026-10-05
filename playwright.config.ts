import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 90_000, expect: { timeout: 15_000 },
  // Bound browser concurrency; override with --workers=1 on constrained machines.
  fullyParallel: true, workers: 2,
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: { browserName: 'chromium', viewport: { width: 1000, height: 900 }, locale: 'en-US', timezoneId: 'UTC', colorScheme: 'light', trace: 'off' },
  webServer: [
    { command: 'pnpm storybook:upstream', url: 'http://127.0.0.1:4100/index.json', reuseExistingServer: !process.env.CI, timeout: 120_000 },
    { command: 'pnpm storybook', url: 'http://127.0.0.1:4200/index.json', reuseExistingServer: !process.env.CI, timeout: 120_000 },
  ],
});
