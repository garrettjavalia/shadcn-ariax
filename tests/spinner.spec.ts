import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';

test('Spinner official document and registry examples are covered', async ({ request }) => {
  const document = await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/spinner.mdx', 'utf8');
  const names = [...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(match => match[1]);
  expect(names).toHaveLength(8);
  const index = await (await request.get(stylexURL + '/index.json')).json();
  for (const name of names) expect(index.entries['components-spinner--' + name.slice(8)]?.tags, name).toContain('parity');
  const source = await readFile('generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/spinner-example.tsx', 'utf8');
  const registry: Record<string, string> = { SpinnerBasic: 'registry-basic', SpinnerInButtons: 'registry-buttons', SpinnerInBadges: 'registry-badges', SpinnerInInputGroup: 'registry-input-group', SpinnerInEmpty: 'registry-empty' };
  const examples = [...source.matchAll(/^function (Spinner\w+)\(/gm)].map(match => match[1]);
  expect(examples.sort()).toEqual(Object.keys(registry).sort());
  for (const name of examples) expect(index.entries['components-spinner--' + registry[name]]?.tags, name).toContain('parity');
});

for (const theme of ['light', 'dark']) {
  test(`Spinner complete rotation, native customization and real Button compositions / ${theme}`, async ({ browser }, info) => {
    const context = await browser.newContext();
    const a = await context.newPage(), b = await context.newPage();
    async function open(story: string) {
      await Promise.all(([[a, upstreamURL], [b, stylexURL]] as const).map(async ([page, url]) => {
        await page.goto(`${url}/iframe.html?id=${story}&globals=theme:${theme}`);
        await expect(page.locator('#parity-root')).toBeVisible();
      }));
    }
    try {
      await open('components-spinner--usage');
      for (const time of [0, 250, 500, 750, 1000]) {
        for (const page of [a, b]) await page.getByRole('status').evaluate(async (element, time) => {
          const animation = element.getAnimations()[0];
          animation.pause(); await animation.ready; animation.currentTime = time;
        }, time);
        await compare(a, b, info, `rotation-${time}`, true, false);
      }
      await open('components-spinner--customization');
      for (const page of [a, b]) {
        await expect(page.getByRole('status', { name: 'Saving' })).toHaveCSS('width', '28px');
        await page.getByRole('button', { name: 'Resize' }).click();
        await expect(page.getByRole('status', { name: 'Saving' })).toHaveCSS('width', '36px');
      }
      await compare(a, b, info, 'native-override-after-dynamic-size');
      for (const story of ['loading', 'rtl']) {
        await open('components-button--' + story);
        await compare(a, b, info, 'button-' + story);
      }
    } finally { await context.close(); }
  });
}
