import {
  upstreamURL,
  stylexURL,
  upstreamPort,
  stylexPort,
} from "./tests/servers";
import { e2eTimeouts } from "./tests/timeouts";
import { defineConfig } from "@playwright/test";
const staticStorybook = process.env.ARIAX_STATIC_STORYBOOK === "1";
export default defineConfig({
  testDir: "./tests",
  timeout: e2eTimeouts.test,
  expect: { timeout: e2eTimeouts.expect },
  // Local sampling favors 4 workers; keep CI within its smaller runner budget.
  // The CLI's --workers option can tune either environment independently.
  fullyParallel: true,
  workers: process.env.CI || process.env.ARIAX_TEST_MODE === "ci" ? 2 : 4,
  reporter: [
    ...(process.env.CI ? [["github"] as const] : []),
    ["list"],
    ["html", { open: "never" }],
    ["json", { outputFile: "test-results/results.json" }],
  ],
  use: {
    browserName: "chromium",
    actionTimeout: e2eTimeouts.action,
    navigationTimeout: e2eTimeouts.navigation,
    launchOptions: {
      args: ["--disable-partial-raster", "--disable-threaded-animation"],
    },
    viewport: { width: 1000, height: 900 },
    locale: "en-US",
    timezoneId: "UTC",
    colorScheme: "light",
    trace: "off",
  },
  webServer: [
    {
      command: staticStorybook
        ? `pnpm exec vite preview --outDir dist/upstream --host 127.0.0.1 --port ${upstreamPort} --strictPort`
        : "pnpm storybook:upstream",
      url: `${upstreamURL}/index.json`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: staticStorybook
        ? `pnpm exec vite preview --outDir dist/stylex --host 127.0.0.1 --port ${stylexPort} --strictPort`
        : "pnpm storybook",
      url: `${stylexURL}/index.json`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
