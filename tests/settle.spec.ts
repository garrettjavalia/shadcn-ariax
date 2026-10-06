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
