import { defineConfig } from "@playwright/test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.ARIAX_SITE_TEST_PORT ?? 4187);
const baseURL = `http://127.0.0.1:${port}/shadcn-ariax/`;
const executablePath = process.env.ARIAX_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
  testDir: ".",
  testMatch: "site.spec.ts",
  outputDir: "../test-results/site",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  reporter: "list",
  use: {
    baseURL,
    browserName: "chromium",
    colorScheme: "light",
    viewport: { width: 1200, height: 900 },
    trace: "retain-on-failure",
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  webServer: {
    command: "node --import tsx site/serve-static.ts",
    cwd: projectRoot,
    env: { ARIAX_SITE_BASE: "/shadcn-ariax/" },
    url: baseURL,
    reuseExistingServer: false,
    timeout: 10_000,
  },
});
