import { test, expect, type Page } from '@playwright/test';
import { compareDOMCSS } from './compare';
import { upstreamURL, stylexURL } from './servers';
import { resolve } from 'node:path';
import { waitForStoryReadiness } from './story-readiness';

async function load(page: Page, url: string, theme: 'light' | 'dark') {
  await page.goto(`${url}/@fs${resolve('tests/fixtures/base-css.html')}?theme=${theme}`);
  await expect(page.locator('html')).toHaveAttribute('data-base-css-ready', 'true');
  await expect(page.locator('html')).toHaveClass(theme === 'dark' ? /\bdark\b/ : /^(?!.*\bdark\b).*$/);
}

async function documentCSS(page: Page) {
  return page.evaluate(() => [document.documentElement, document.body].map(element => {
    const css = getComputedStyle(element);
    return Object.fromEntries([...css].filter(property => !property.startsWith('--')).sort().map(property => [property, css.getPropertyValue(property)]));
  }));
}

async function semanticColors(page: Page, theme: 'light' | 'dark') {
  return page.evaluate(theme => {
    const probe = document.createElement('i');
    document.body.append(probe);
    const color = (value: string) => { probe.style.color = value; return getComputedStyle(probe).color; };
    // These literals independently encode the pinned Neutral theme, rather than
    // accepting matching mistakes in both implementations' shared variables.
    const border = color(theme === 'dark' ? 'oklch(1 0 0 / 10%)' : 'oklch(0.922 0 0)');
    const outline = color(`color-mix(in oklab, ${theme === 'dark' ? 'oklch(0.556 0 0)' : 'oklch(0.708 0 0)'} 50%, transparent)`);
    const tokenBorder = color('var(--border)');
    const tokenOutline = color('color-mix(in oklab, var(--ring) 50%, transparent)');
    const actual = [...document.querySelectorAll('[data-base-probe]')].map(element => {
      const css = getComputedStyle(element);
      return { name: element.getAttribute('data-base-probe'), border: css.borderTopColor, outline: css.outlineColor };
    });
    probe.remove();
    return { border, outline, tokenBorder, tokenOutline, actual };
  }, theme);
}

for (const theme of ['light', 'dark'] as const) test(`loaded base CSS / neutral HTML / ${theme}`, async ({ context }, info) => {
  const a = await context.newPage(), b = await context.newPage();
  await Promise.all([load(a, upstreamURL, theme), load(b, stylexURL, theme)]);
  for (const page of [a, b]) {
    const colors = await semanticColors(page, theme);
    expect(colors.tokenBorder).toBe(colors.border);
    expect(colors.tokenOutline).toBe(colors.outline);
    for (const probe of colors.actual) {
      expect(probe.border, `${probe.name} base border`).toBe(colors.border);
      expect(probe.outline, `${probe.name} base outline`).toBe(colors.outline);
    }
  }
  expect(await documentCSS(a)).toEqual(await documentCSS(b));
  await compareDOMCSS(a, b, info, `neutral-base-${theme}`);
});

// Keep the public component cascade check separate from the pure reset fixture.
for (const theme of ['light', 'dark'] as const) test(`base CSS preserves Input border override / ${theme}`, async ({ context }) => {
  for (const url of [upstreamURL, stylexURL]) {
    const page = await context.newPage();
    await page.goto(`${url}/iframe.html?id=components-input--basic&viewMode=story&globals=theme:${theme}`);
    await expect(page.locator('#parity-root input')).toBeVisible();
    await waitForStoryReadiness(page);
    const colors = await page.locator('#parity-root input').evaluate(input => {
      const probe = document.createElement('i');
      probe.style.color = 'var(--input)';
      document.body.append(probe);
      const expected = getComputedStyle(probe).color;
      probe.remove();
      return { actual: getComputedStyle(input).borderTopColor, expected };
    });
    expect(colors.actual).toBe(colors.expected);
    await page.close();
  }
});
