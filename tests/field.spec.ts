import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {compare} from './compare';
import {upstreamURL,stylexURL} from './servers';
// Pending means the genuine compound example is not yet implemented. Native-control
// core stories deliberately cannot satisfy these entries.
export const fieldDocumentationPending:Record<string,string[]>={
 'field-demo':['input','textarea','checkbox','select'], 'field-input':['input'], 'field-textarea':['textarea'],
 'field-select':['select'], 'field-slider':['slider'], 'field-fieldset':['input'],
 'field-radio':['radio-group'], 'field-choice-card':['radio-group'],
 'field-rtl':['input','textarea','checkbox','select'], 'field-responsive':['input'],
};
const fieldDocumentation = {'field-checkbox':'compositions-fieldcheckbox--field-checkbox', 'field-group':'compositions-fieldcheckbox--field-group-example', 'field-switch':'components-switch--field-switch'};
test('Field official example inventory keeps dependency gaps explicit',async({request})=>{
 const doc=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/field.mdx','utf8');
 const examples=[...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]);
 expect(examples.sort()).toEqual([...Object.keys(fieldDocumentationPending), ...Object.keys(fieldDocumentation)].sort());
 const index=await (await request.get(`${stylexURL}/index.json`)).json();
 for(const story of Object.values(fieldDocumentation)) expect(index.entries[story]?.tags).toContain('parity');
 for(const [name,dependencies] of Object.entries(fieldDocumentationPending)) {
  const source=await readFile(`generated/upstream/shadcn/apps/v4/examples/aria/${name}.tsx`,'utf8');
  for(const dependency of dependencies) expect(source).toContain(`/${dependency}"`);
 }
});
for(const theme of ['light','dark']) test(`Field choice focus, hover, disabled, checked / ${theme}`,async({browser},info)=>{
 const ctx=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC',colorScheme:'light'});
 const [a,b]=await Promise.all([upstreamURL,stylexURL].map(async url=>{const p=await ctx.newPage();await p.goto(`${url}/iframe.html?id=components-field--choice-selectors&viewMode=story&globals=theme:${theme}`);await expect(p.locator('#parity-root')).toBeVisible();return p;}));
 try {
  for(let i=0;i<4;i++) {await Promise.all([a,b].map(p=>p.locator('[data-slot="field-label"]').filter({has:p.locator('[data-slot="field"]')}).nth(i).hover()));await compare(a,b,info,`choice-${i}-hover`);}
  await Promise.all([a,b].map(async p=>{await p.mouse.move(0,0);await p.keyboard.press('Tab');}));
  await compare(a,b,info,'choice-keyboard-focus');
  await Promise.all([a,b].map(p=>p.keyboard.press('Space')));
  await compare(a,b,info,'choice-keyboard-toggle');
 }finally{await ctx.close();}
});
