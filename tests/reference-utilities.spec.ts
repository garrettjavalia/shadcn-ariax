import { test, expect } from '@playwright/test';
import { upstreamURL } from './servers';

test('reference imports real enter/exit animation utilities and official state variants', async ({ page }) => {
  await page.goto(`${upstreamURL}/iframe.html?id=harness-reference-utilities--animations&viewMode=story`);
  await expect(page.locator('#parity-root')).toBeVisible();
  for (const [probe, name] of [['enter', 'enter'], ['exit', 'exit']] as const) {
    const element = page.locator(`[data-probe="${probe}"]`);
    await expect(element).toHaveCSS('animation-name', name);
    await expect(element).toHaveCSS('animation-duration', '0.2s');
    const samples = await element.evaluate(node => {
      const animation = node.getAnimations()[0];
      if (!animation) throw new Error('Animation utilities did not produce an animation');
      animation.pause();
      return [0, 100, 199, 200].map(time => {
        animation.currentTime = time;
        const css = getComputedStyle(node);
        return { opacity: Number(css.opacity), transform: css.transform };
      });
    });
    expect(samples[1].opacity).toBeGreaterThan(0);
    expect(samples[1].opacity).toBeLessThan(1);
    expect(samples[0].opacity).toBe(probe === 'enter' ? 0 : 1);
    expect(samples[2].opacity).toBeCloseTo(probe === 'enter' ? 1 : 0, 2);
    expect(samples[3].opacity).toBe(1);
    expect(samples[1].transform).not.toBe(samples[0].transform);
  }
  await expect(page.locator('[data-probe="selected"]')).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(page.locator('[data-probe="unselected"]')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});
