import {test, expect} from '@playwright/test';
import {compare, compareDOMCSS, snapshot, differences} from './compare';

test('full and CI comparators enforce their declared snapshot contracts', async ({context}, info) => {
  const a = await context.newPage(), b = await context.newPage();
  const markup = '<style>#parity-root::before{content:"Prefix";color:red}</style><div id="offset"></div><main id="parity-root"><button aria-label="Save">Save</button></main>';
  const mutations = [
    {kind:'text', path:'/text'},
    {kind:'attribute', path:'/attrs/aria-label'},
    {kind:'css', path:'/css/color'},
    {kind:'pseudo', path:'/pseudos/::before/color'},
    {kind:'child', path:'/children/0'},
    {kind:'geometry', path:'/rect/y'},
  ] as const;
  await Promise.all([a,b].map(page => page.setContent(markup)));
  await b.locator('button').evaluate(button => button.setAttribute('data-parity-trigger', 'true'));
  await compare(a,b,info,'equivalent-full',false);
  await compareDOMCSS(a,b,info,'equivalent-ci');
  for (const {kind,path} of mutations) await test.step(kind, async () => {
    await Promise.all([a,b].map(page => page.setContent(markup)));
    await b.evaluate(kind => {
      const button = document.querySelector('button')!;
      if (kind === 'text') button.textContent = 'Changed';
      if (kind === 'attribute') button.setAttribute('aria-label','Changed');
      if (kind === 'css') button.style.color = 'rgb(0,128,0)';
      if (kind === 'pseudo') document.querySelector('style')!.textContent = '#parity-root::before{content:"Prefix";color:blue}';
      if (kind === 'child') button.appendChild(document.createElement('span'));
      if (kind === 'geometry') (document.getElementById('offset') as HTMLElement).style.height = '40px';
    },kind);
    expect(differences(await snapshot(a),await snapshot(b)).some(diff => diff.path.includes(path)), `${kind} must remain observable`).toBe(true);
    await expect(compare(a,b,info,`full-${kind}`,false)).rejects.toThrow(`full-${kind}`);
    if (kind === 'geometry') await compareDOMCSS(a,b,info,'ci-geometry-outside-contract');
    else await expect(compareDOMCSS(a,b,info,`ci-${kind}`)).rejects.toThrow(`ci-${kind}`);
  });
});
