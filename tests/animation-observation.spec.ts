import { test, expect, type Page } from '@playwright/test';
import { compare, snapshot, differences, normalizeAnimationSnapshots } from './compare';
import { upstreamURL, stylexURL } from './servers';
type ObservationWindow = Window & {
  parityAnimationEffects?: WeakMap<Element, CSSAnimation[]>;
};
async function finishedFixture(page: Page, name: string, mutation: 'none' | 'keyframes' | 'timing' = 'none', url = stylexURL) {
  await page.goto(url + '/iframe.html?id=components-skeleton--usage');
  await expect(page.locator('[data-slot="skeleton"]')).toBeVisible();
  await page.evaluate(async ({
    name,
    mutation
  }) => {
    const root = document.querySelector('#parity-root');
    if (!root) throw new Error('Missing root');
    const sheet = document.createElement('style');
    sheet.textContent = `@keyframes ${name}{0%{opacity:0}50%{opacity:.5}100%{opacity:1}}.motion-fixture{animation:${name} 300ms ease-out;}`;
    document.head.append(sheet);
    const element = document.createElement('div');
    element.className = 'motion-fixture';
    element.textContent = 'Completed motion';
    const started = new Promise<void>(resolve => element.addEventListener('animationstart', () => resolve(), {
      once: true
    }));
    const ended = new Promise<void>(resolve => element.addEventListener('animationend', () => resolve(), {
      once: true
    }));
    root.replaceChildren(element);
    await started;
    const effects = (window as ObservationWindow).parityAnimationEffects?.get(element);
    if (effects?.length !== 1) throw new Error('Preview did not observe the real effect at animationstart');
    const effect = effects[0].effect;
    if (!(effect instanceof KeyframeEffect)) throw new Error('Missing actual keyframes');
    if (mutation === 'keyframes') effect.setKeyframes(effect.getKeyframes().map(frame => frame.offset === .5 ? {
      ...frame,
      opacity: '.25'
    } : frame));
    if (mutation === 'timing') effect.updateTiming({
      duration: 450
    });
    await ended;
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    if (element.getAnimations().length !== 0) throw new Error('Non-filling effect must end before first snapshot');
  }, {
    name,
    mutation
  });
}
const effects = (value: unknown): Record<string, unknown>[] => Array.isArray(value) ? value.flatMap(effects) : value && typeof value === 'object' ? [...((value as {
  animations?: Record<string, unknown>[];
}).animations ?? []), ...effects((value as {
  children?: unknown;
}).children)] : [];
test('animationstart preserves real completed non-filling metadata before the first snapshot', async ({
  browser
}, info) => {
  const context = await browser.newContext({
    viewport: {
      width: 1000,
      height: 900
    }
  });
  try {
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    await finishedFixture(pages[0], 'source_enter', 'none', upstreamURL);
    await finishedFixture(pages[1], 'stylex_enter');
    const captures = await Promise.all(pages.map(page => snapshot(page)));
    for (const capture of captures) {
      expect(effects(capture)).toHaveLength(1);
      expect(effects(capture)[0].timing).toMatchObject({
        duration: 300,
        fill: 'none'
      });
      expect(effects(capture)[0].frames).toHaveLength(3);
    }
    expect(differences(captures[0], captures[1]).some(diff => diff.path.endsWith('/css/animation-name'))).toBe(true);
    expect(differences(...normalizeAnimationSnapshots(captures[0], captures[1]))).toHaveLength(0);
    await compare(pages[0], pages[1], info, 'completed-before-first-snapshot', true, false);
  } finally {
    await context.close();
  }
});
for (const mutation of ['keyframes', 'timing'] as const) test(`completed non-filling observations reject deliberate ${mutation} changes`, async ({
  browser
}, info) => {
  const context = await browser.newContext({
    viewport: {
      width: 1000,
      height: 900
    }
  });
  try {
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    await finishedFixture(pages[0], 'source_enter', 'none', upstreamURL);
    await finishedFixture(pages[1], 'stylex_enter', mutation);
    for (const page of pages) await expect(page.locator('.motion-fixture')).toHaveCSS('opacity', '1');
    const captures = await Promise.all(pages.map(page => snapshot(page)));
    const diff = differences(...normalizeAnimationSnapshots(captures[0], captures[1]));
    expect(diff.some(item => mutation === 'keyframes' ? item.path.includes('/frames/') : item.path.endsWith('/timing/duration'))).toBe(true);
    await expect(compare(pages[0], pages[1], info, `completed-${mutation}-mutation`, false, false)).rejects.toThrow(`completed-${mutation}-mutation`);
  } finally {
    await context.close();
  }
});
test('restarting the same CSS name replaces a completed handle and clears stale evidence', async ({
  page
}) => {
  await finishedFixture(page, 'restart_enter');
  expect(effects(await snapshot(page))).toHaveLength(1);
  const result = await page.locator('.motion-fixture').evaluate(async element => {
    const map = (window as ObservationWindow).parityAnimationEffects;
    if (!map) throw new Error('Missing observer');
    const old = map.get(element)?.[0];
    if (!old) throw new Error('Missing old effect');
    (element as HTMLElement).style.animationName = 'none';
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const start = new Promise<void>(resolve => element.addEventListener('animationstart', () => resolve(), {
      once: true
    }));
    const end = new Promise<void>(resolve => element.addEventListener('animationend', () => resolve(), {
      once: true
    }));
    (element as HTMLElement).style.animationName = 'restart_enter';
    await start;
    const current = map.get(element) ?? [];
    const replaced = current.length === 1 && current[0] !== old;
    await end;
    return replaced;
  });
  expect(result).toBe(true);
  expect(effects(await snapshot(page))).toHaveLength(1);
  await page.locator('.motion-fixture').evaluate(element => (element as HTMLElement).style.animationName = 'none');
  expect(effects(await snapshot(page))).toHaveLength(0);
  await page.locator('.motion-fixture').evaluate(element => element.remove());
  expect(effects(await snapshot(page))).toHaveLength(0);
});
