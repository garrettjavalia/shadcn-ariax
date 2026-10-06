import type {Page} from '@playwright/test';

// Shared story fixtures may expose completion of their initial JavaScript work.
// Only initial navigation waits here; intermediate animation comparisons do not.
export async function waitForStoryReadiness(page:Page) {
  await page.evaluate(async()=>{
    await (window as Window & {parityReady?:Promise<void>}).parityReady;
  });
}
