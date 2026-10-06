import { test, expect } from '@playwright/test';
import { settle } from './compare';

test('finite input blur transitions settle in a content-visibility hidden panel', async ({ page }) => {
  test.setTimeout(10_000);
  await page.setContent(`<style>input{border:2px solid rgb(0,0,0);transition:border-color 150ms}input:focus{border-color:rgb(255,0,0)}</style><main id="parity-root"><section id="panel"><input aria-label="Panel input"/></section><button onclick="document.getElementById('panel').style.contentVisibility='hidden'">Close</button></main>`);
  await page.getByRole('textbox').focus();
  await settle(page);
  await page.getByRole('button', { name: 'Close' }).click();
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running' || animation.pending).length)).toBeGreaterThan(0);
  await settle(page);
  expect(await page.evaluate(() => document.getAnimations().some(animation => animation.playState === 'running' || animation.pending))).toBe(false);
  await expect(page.locator('input')).toHaveCSS('border-top-color', 'rgb(0, 0, 0)');
  await expect(page.locator('#panel')).toHaveCSS('content-visibility', 'hidden');
});

test('settle observes finite animations started when another effect completes', async ({ page }) => {
  await page.setContent('<main id="parity-root"><div id="first">First</div><div id="second">Second</div></main>');
  await page.evaluate(() => {
    const first = document.getElementById('first')!.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 100, fill: 'forwards' });
    first.finished.then(() => document.getElementById('second')!.animate([{ opacity: 1 }, { opacity: 0.5 }], { duration: 150, fill: 'forwards' }));
  });
  await settle(page);
  expect(await page.evaluate(() => document.getAnimations().map(animation => animation.playState))).toEqual(['finished', 'finished']);
  await expect(page.locator('#second')).toHaveCSS('opacity', '0.5');
});
