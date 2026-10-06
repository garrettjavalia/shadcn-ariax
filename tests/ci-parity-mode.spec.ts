import {test, expect} from '@playwright/test';
import {compareDOMCSS, snapshot} from './compare';

const markup = '<style>#parity-root::before { content: "Prefix"; color: red; }</style><div id="offset"></div><main id="parity-root"><button aria-label="Save">Save</button></main>';

test('CI DOM/CSS mode omits geometry and pixels while full snapshots retain them', async ({context}, info) => {
  const a = await context.newPage(), b = await context.newPage();
  await Promise.all([a, b].map(page => page.setContent(markup)));
  await b.locator('#offset').evaluate(element => (element as HTMLElement).style.height = '40px');
  await compareDOMCSS(a, b, info, 'same-dom-css-different-offset');
  expect(await snapshot(a)).not.toEqual(await snapshot(b));
  const reduced = JSON.stringify(await snapshot(a, 'dom-css'));
  for (const field of ['rect', 'rects', 'scroll', 'focused']) expect(reduced).not.toContain(`"${field}":`);
});
