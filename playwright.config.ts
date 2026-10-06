import { upstreamURL, stylexURL, upstreamPort, stylexPort } from './tests/servers';
import { defineConfig } from '@playwright/test';
const staticStorybook = process.env.ARIAX_STATIC_STORYBOOK === '1';
export default defineConfig({
  testDir: './tests', timeout: 90_000, expect: { timeout: 15_000 },
  // Bound browser concurrency; override with --workers=1 on constrained machines.
  fullyParallel: true, workers: 2,
  reporter: [...(process.env.CI ? [['github'] as const] : []), ['list'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: { browserName: 'chromium', launchOptions: { args: ['--disable-partial-raster', '--disable-threaded-animation'] }, viewport: { width: 1000, height: 900 }, locale: 'en-US', timezoneId: 'UTC', colorScheme: 'light', trace: 'off' },
  webServer: [
    { command: staticStorybook ? `pnpm exec vite preview --outDir dist/upstream --host 127.0.0.1 --port ${upstreamPort} --strictPort` : 'pnpm storybook:upstream', url: `${upstreamURL}/index.json`, reuseExistingServer: !process.env.CI, timeout: 120_000 },
    { command: staticStorybook ? `pnpm exec vite preview --outDir dist/stylex --host 127.0.0.1 --port ${stylexPort} --strictPort` : 'pnpm storybook', url: `${stylexURL}/index.json`, reuseExistingServer: !process.env.CI, timeout: 120_000 },
  ],
});
