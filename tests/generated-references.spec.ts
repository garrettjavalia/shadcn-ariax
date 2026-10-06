import { test, expect } from '@playwright/test';
import { snapshot, differences } from './compare';

test('missing React Aria references normalize only provider randomness', async ({ page }) => {
  const markup = (prefix: string, key = 'first', local = 'a', other = prefix, user = 'custom-panel') => `<main id="parity-root"><button aria-controls="react-aria${prefix}-_r_${local}_-tabpanel-${key}" aria-labelledby="react-aria${prefix}-_r_a_ react-aria${other}-_r_b_"></button><button aria-controls="${user}"></button></main>`;
  await page.setContent(markup('123'));
  const baseline = await snapshot(page);
  await page.setContent(markup('456'));
  expect(differences(baseline, await snapshot(page))).toEqual([]);
  for (const html of [markup('456', 'wrong'), markup('456', 'first', 'b'), markup('456', 'first', 'a', '789'), markup('456', 'first', 'a', '456', 'changed-panel')]) {
    await page.setContent(html);
    expect(differences(baseline, await snapshot(page)).some(diff => /\/attrs\/aria-(controls|labelledby)$/.test(diff.path))).toBe(true);
  }
});

test('missing, outside, and captured targets remain distinct', async ({ page }) => {
  const id = 'react-aria123-_r_a_';
  const markup = (target = '', inside = '', reference = id) => `${target}<main id="parity-root"><button aria-labelledby="${reference}"></button>${inside}</main>`;
  await page.setContent(markup());
  const missing = await snapshot(page);
  for (const html of [markup(`<span id="${id}"></span>`), markup('', `<span id="${id}"></span>`)]) {
    await page.setContent(html);
    expect(differences(missing, await snapshot(page)).some(diff => diff.path.endsWith('/attrs/aria-labelledby'))).toBe(true);
  }
  for (const user of ['react-aria123-custom', 'custom-panel']) {
    await page.setContent(markup('', '', user));
    const baseline = await snapshot(page);
    await page.setContent(markup('', '', user.replace('123', '456') + '-changed'));
    expect(differences(baseline, await snapshot(page)).some(diff => diff.path.endsWith('/attrs/aria-labelledby'))).toBe(true);
  }
});
