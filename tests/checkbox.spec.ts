import { test, expect, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { upstreamURL, stylexURL } from './servers';
import { compare } from './compare';

for(const theme of ['light','dark']) for(const story of ['controlled','render-props','customized','indeterminate','states']) test(`Checkbox interactions / ${story} / ${theme}`,async({browser},info)=>{
 const context=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC',colorScheme:'light'});
 const [a,b]=await Promise.all([upstreamURL,stylexURL].map(async url=>{const p=await context.newPage();await p.goto(`${url}/iframe.html?id=components-checkbox--${story}&viewMode=story&globals=theme:${theme}`);await expect(p.locator('#parity-root')).toBeVisible();return p}));
 const each=(fn:(p:Page)=>Promise<unknown>)=>Promise.all([a,b].map(fn));
 try {
  const target=(p:Page)=>story==='states'?p.getByRole('checkbox',{name:'Invalid',exact:true}):p.getByRole('checkbox').first();
  await each(p=>target(p).locator('..').locator('..').hover());await compare(a,b,info,'hover');
  await each(async p=>{for(let i=0;i<(story==='states'?3:1);i++)await p.keyboard.press('Tab')});await compare(a,b,info,'keyboard-focus');
  await each(p=>p.keyboard.press('Space'));await compare(a,b,info,'keyboard-selected');
  if(story==='controlled') await each(p=>expect(p.locator('output')).toHaveText('true'));
  if(story==='render-props') await each(p=>expect(p.getByText('On',{exact:true})).toBeVisible());
  if(story==='customized'){await each(p=>p.getByRole('button',{name:'Resize'}).click());await compare(a,b,info,'dynamic-resize');await expect(b.locator('[data-slot="checkbox"]')).toHaveCSS('width','36px');}
  if(story==='states'){await each(p=>expect(p.getByRole('checkbox',{name:'Disabled',exact:true})).toBeDisabled());await each(p=>expect(p.getByRole('checkbox',{name:'Disabled checked'})).toBeChecked());}
 }finally{await context.close()}
});
test('Checkbox accessible name, mixed state and group context',async({page})=>{
 await page.goto(`${stylexURL}/iframe.html?id=components-checkbox--indeterminate&viewMode=story`);await expect(page.getByRole('checkbox',{name:'Mixed'})).toHaveJSProperty('indeterminate',true);
 expect((await new AxeBuilder({page}).include('#parity-root').analyze()).violations).toEqual([]);
 await page.goto(`${stylexURL}/iframe.html?id=components-checkbox--group&viewMode=story`);await expect(page.getByRole('checkbox',{name:'One'})).toBeChecked();await expect(page.getByRole('checkbox',{name:'Two'})).not.toBeChecked();await page.locator('[data-slot="checkbox"]').filter({has:page.getByRole('checkbox',{name:'Two'})}).click();await expect(page.getByRole('checkbox',{name:'Two'})).toBeChecked();
});
test('Checkbox official previews track remaining Field integration and verified Table composition',async({request})=>{
 const doc=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/checkbox.mdx','utf8');
 const examples=[...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]).sort();
 const index=await(await request.get(`${stylexURL}/index.json`)).json();
 expect(index.entries['components-table--checkbox-selection']?.tags).toContain('parity');
 expect(examples).toEqual(['checkbox-basic','checkbox-demo','checkbox-description','checkbox-disabled','checkbox-group','checkbox-invalid','checkbox-rtl','checkbox-table']);
});
