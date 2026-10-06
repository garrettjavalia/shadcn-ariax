import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';
test('Progress official document previews and usage mapped', async ({
  request
}) => {
  const doc = await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/progress.mdx', 'utf8');
  const names = [...doc.matchAll(/<ComponentPreview\b[^>]*name="progress-([^"]+)"/g)].map(m => m[1]);
  expect(names).toHaveLength(4);
  const index = await (await request.get(stylexURL + '/index.json')).json();
  for (const name of [...names, 'usage']) expect(index.entries['components-progress--' + name]?.tags).toContain('parity');
});
for (const theme of ['light', 'dark']) for (const story of ['demo', 'label', 'controlled', 'rtl', 'usage', 'values', 'registry-label', 'registry-controlled', 'files', 'indeterminate', 'bounds', 'customization']) test(`Progress ${story} actual states / ${theme}`, async ({
  browser
}, info) => {
  const context = await browser.newContext();
  try {
    const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
      const page = await context.newPage();
      await page.goto(`${url}/iframe.html?id=components-progress--${story}&globals=theme:${theme}`);
      await expect(page.getByRole('progressbar').first()).toBeVisible();
      if (story === 'demo') await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '66');
      return page;
    }));
    await compare(pages[0], pages[1], info, 'initial');
    if (story === 'controlled' || story === 'registry-controlled') {
      for (const key of ['ArrowRight', 'End', 'Home']) {
        for (const page of pages) {
          await page.getByRole('slider').focus();
          await page.keyboard.press(key);
        }
        await compare(pages[0], pages[1], info, key);
        const values = await Promise.all(pages.map(p => p.getByRole('progressbar').getAttribute('aria-valuenow')));
        expect(values[0]).toBe(values[1]);
        expect(values[0]).toBe(key === 'ArrowRight' ? '51' : key === 'End' ? '100' : '0');
      }
    }
    if (story === 'customization') {
      for (const page of pages) {
        await expect(page.getByRole('progressbar')).toHaveCSS('width', '244px');
        await expect(page.locator('[data-slot="progress-indicator"]').first()).toHaveCSS('width', '80px');
        await expect(page.locator('[data-slot="progress-indicator"]').nth(1)).toHaveCSS('width', '90px');
        await page.getByRole('button', {
          name: 'Update'
        }).click();
      }
      await compare(pages[0], pages[1], info, 'value-callback');
    }
    if (story === 'indeterminate') for (const page of pages) await expect(page.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow', /.+/);
    if (story === 'bounds') for (const page of pages) {
      await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '10');
      await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '110');
    }
  } finally {
    await context.close();
  }
});
for (const theme of ['light', 'dark']) test(`Progress actual width transition samples / ${theme}`, async ({
  browser
}, info) => {
  const context = await browser.newContext();
  try {
    const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
      const page = await context.newPage();
      await page.goto(`${url}/iframe.html?id=components-progress--customization&globals=theme:${theme}`);
      await expect(page.getByRole('progressbar')).toBeVisible();
      await page.evaluate(() => {
        const indicators = document.querySelectorAll('[data-slot="progress-indicator"]');
        const target = indicators[indicators.length - 1];
        target.addEventListener('transitionrun', event => {
          if ((event as TransitionEvent).propertyName !== 'width') return;
          const animation = target.getAnimations().find(a => a instanceof CSSTransition && a.transitionProperty === 'width');
          if (!animation) throw new Error('Width transition missing');
          animation.pause();
          animation.currentTime = 0;
          (window as Window & {
            progressTransition?: Animation;
          }).progressTransition = animation;
        }, {
          once: true
        });
      });
      return page;
    }));
    for (const page of pages) await page.getByRole('button', {
      name: 'Update'
    }).click();
    for (const page of pages) await page.waitForFunction(() => Boolean((window as Window & {
      progressTransition?: Animation;
    }).progressTransition));
    const effects = await Promise.all(pages.map(page => page.evaluate(() => {
      const animation = (window as Window & {
        progressTransition?: Animation;
      }).progressTransition!;
      return {
        timing: animation.effect!.getTiming(),
        frames: (animation.effect as KeyframeEffect).getKeyframes()
      };
    })));
    expect(effects[0]).toEqual(effects[1]);
    expect(effects[0].timing.duration).toBe(150);
    for (const time of [0, 75, 150]) {
      for (const page of pages) await page.evaluate(time => {
        (window as Window & {
          progressTransition?: Animation;
        }).progressTransition!.currentTime = time;
      }, time);
      await compare(pages[0], pages[1], info, `width-${time}ms`, false);
    }
  } finally {
    await context.close();
  }
});
for (const theme of ['light', 'dark']) test(`Progress bounded Slider composition viewport-390 / ${theme}`, async ({
  browser
}, info) => {
  const context = await browser.newContext({
    viewport: {
      width: 390,
      height: 900
    }
  });
  try {
    const pages = await Promise.all([upstreamURL, stylexURL].map(async url => {
      const page = await context.newPage();
      await page.goto(`${url}/iframe.html?id=components-progress--controlled&globals=theme:${theme}`);
      await expect(page.getByRole('progressbar')).toBeVisible();
      return page;
    }));
    await compare(pages[0], pages[1], info, 'mobile-initial');
    for (const page of pages) {
      await page.getByRole('slider').focus();
      await page.keyboard.press('End');
    }
    await compare(pages[0], pages[1], info, 'mobile-max');
  } finally {
    await context.close();
  }
});
