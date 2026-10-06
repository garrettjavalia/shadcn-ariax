import { test, expect } from '@playwright/test';
import { settle } from './compare';

test('settle waits for transitions started by deferred rendering work', async ({ page }) => {
  await page.setContent('<div id="target" style="opacity:0;transition:opacity 0.3s">Content</div>');
  await page.evaluate(() => {
    const target = document.getElementById('target')!;
    getComputedStyle(target).opacity;
    requestAnimationFrame(() => { target.style.opacity = '1'; });
  });
  await settle(page);
  // A one-time read must see the completed transition; polling would hide early return.
  expect(await page.locator('#target').evaluate(element => getComputedStyle(element).opacity)).toBe('1');
});

test('settle waits for a focus transition scheduled after effect completion', async ({ page }) => {
  await page.setContent('<style>input{border:2px solid rgb(0,0,0);transition:border-color 150ms}input:focus{border-color:rgb(255,0,0)}</style><input id="target"><div id="effect"></div>');
  await page.evaluate(() => {
    const target = document.getElementById('target')!;
    getComputedStyle(target).borderTopColor;
    const animation = document.getElementById('effect')!.animate([{opacity:0},{opacity:1}], {duration:50});
    animation.finished.then(() => requestAnimationFrame(() => requestAnimationFrame(() => target.focus())));
  });
  await settle(page);
  // Read once: retrying assertions would conceal an early settle return.
  expect(await page.locator('#target').evaluate(element => ({focused:element === document.activeElement,color:getComputedStyle(element).borderTopColor}))).toEqual({focused:true,color:'rgb(255, 0, 0)'});
  expect(await page.evaluate(() => document.getAnimations().some(animation => animation.pending || animation.playState === 'running'))).toBe(false);
});
