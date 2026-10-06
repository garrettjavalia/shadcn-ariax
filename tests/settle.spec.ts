import { test, expect } from '@playwright/test';
import { settle, snapshot, differences } from './compare';

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

test('settle preserves a real final color mismatch', async ({ page }) => {
  await page.setContent('<main id="parity-root"><div id="target" style="background:rgb(255,0,0);transition:background-color 50ms">Content</div></main>');
  const before = await snapshot(page);
  await page.evaluate(() => {
    const target = document.getElementById('target')!;
    getComputedStyle(target).backgroundColor;
    target.style.backgroundColor = 'rgb(0,0,255)';
  });
  await settle(page);
  const actual = await page.locator('#target').evaluate(element => getComputedStyle(element).backgroundColor);
  expect(actual).toBe('rgb(0, 0, 255)');
  expect(actual).not.toBe('rgb(255, 0, 0)');
  expect(differences(before, await snapshot(page))).toContainEqual({path:'/0/children/0/css/background-color',upstream:'rgb(255, 0, 0)',stylex:'rgb(0, 0, 255)'});
});
