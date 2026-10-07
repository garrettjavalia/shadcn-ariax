import {
  expect,
  type Browser,
  type BrowserContextOptions,
  type Page,
} from "@playwright/test";
import { upstreamURL, stylexURL } from "./servers";

// Use only where the story already requests this locale, timezone and viewport.
// Media and device options remain explicit at the call site.
export function deterministicStoryContextOptions(
  width = 1000,
  options: Omit<BrowserContextOptions, "viewport"> = {},
): BrowserContextOptions {
  return {
    viewport: { width, height: 900 },
    locale: "en-US",
    timezoneId: "UTC",
    ...options,
  };
}

export async function createStoryPair(
  browser: Browser,
  options: BrowserContextOptions | undefined,
  initialize?: (page: Page, url: string) => Promise<void>,
) {
  const context = await browser.newContext(options);
  try {
    const pages = await Promise.all(
      [upstreamURL, stylexURL].map(async (url) => {
        const page = await context.newPage();
        await initialize?.(page, url);
        return page;
      }),
    );
    return { context, pages: pages as [Page, Page] };
  } catch (error) {
    await context.close().catch(() => {});
    throw error;
  }
}

export async function loadStoryPair(
  pages: [Page, Page],
  storyId: string,
  theme: string,
  prepare?: (page: Page) => Promise<void>,
) {
  await Promise.all(
    pages.map(async (page, index) => {
      await page.goto(
        `${[upstreamURL, stylexURL][index]}/iframe.html?id=${storyId}&viewMode=story&globals=theme:${theme}`,
      );
      await expect(page.locator("#parity-root")).toBeVisible();
      await prepare?.(page);
    }),
  );
}
