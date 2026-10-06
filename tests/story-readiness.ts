import {expect,type Page} from '@playwright/test';

// Shared story fixtures may expose completion of their initial JavaScript work.
// Only initial navigation waits here; intermediate animation comparisons do not.
export async function waitForStoryReadiness(page:Page) {
  const usesVazirmatn = await page.evaluate(async()=>{
    await (window as Window & {parityReady?:Promise<void>}).parityReady;
    return document.querySelector('.example-vazirmatn') !== null;
  });
  if (usesVazirmatn) {
    await expect.poll(() => page.evaluate(() => Array.from(document.fonts).some(face => face.family.replaceAll('"','').replaceAll("'",'') === 'Vazirmatn')), {message:'The official Vazirmatn web font stylesheet must register its font faces'}).toBe(true);
    await page.evaluate(async () => {
      const faces = await document.fonts.load('16px "Vazirmatn"','مرحبا Calendar ۱۲۳۴');
      await document.fonts.ready;
      if (!faces.length || faces.some(face => face.status !== 'loaded')) throw new Error('The official Vazirmatn web font files failed to load');
    });
  }
}
