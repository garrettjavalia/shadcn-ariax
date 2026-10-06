import { test, expect } from '@playwright/test';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';
for (const theme of ['light', 'dark']) test(`Questionnaire entry frames and reduced motion / ${theme}`, async ({ browser }, info) => {
  const context = await browser.newContext({ viewport: { width: 1000, height: 900 } });
  await context.addInitScript(() => {
    document.addEventListener('animationstart', event => {
      const element = event.target;
      if (!(element instanceof Element) || element.getAttribute('data-slot') !== 'questionnaire-item') return;
      for (const animation of element.getAnimations()) { animation.pause(); animation.currentTime = 0; }
    });
  });
  try {
    const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
      const page = await context.newPage();
      await page.goto(`${url}/iframe.html?id=components-questionnaire--animated&globals=theme:${theme}`);
      await expect(page.locator('[data-slot="questionnaire-item"][data-active]')).toBeVisible();
      await expect.poll(() => page.locator('[data-slot="questionnaire-item"][data-active]').evaluate(e => e.getAnimations().some(a => a.playState === 'paused'))).toBe(true);
      return page;
    }));
    for (const time of [0, 150, 300]) {
      for (const page of pages) await page.locator('[data-slot="questionnaire-item"][data-active]').evaluate(async (element, time) => {
        const animation = element.getAnimations()[0];
        await animation.ready;
        animation.currentTime = time;
      }, time);
      await compare(pages[0], pages[1], info, `entry-${time}`, true, false);
    }
    for (const page of pages) { await page.emulateMedia({ reducedMotion: 'reduce' }); await page.reload(); await expect.poll(()=>page.locator('[data-slot="questionnaire-item"][data-active]').evaluate(e=>e.getAnimations().some(a=>a.playState==='paused'))).toBe(true); await page.locator('[data-slot="questionnaire-item"][data-active]').evaluate(e=>{e.getAnimations()[0].currentTime=150;}); }
    // The pinned source's data-active selector takes precedence over motion-reduce.
    await compare(pages[0], pages[1], info, 'reduced-motion-source-precedence', true, false);
  } finally { await context.close(); }
});
