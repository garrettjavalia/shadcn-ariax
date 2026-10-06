import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {compare} from './compare';
import {upstreamURL,stylexURL} from './servers';
test('Pagination official document and registry examples are covered',async({request})=>{
  const doc=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/pagination.mdx','utf8');
  const names=[...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(match=>match[1]);
  expect(names).toHaveLength(4);
  const index=await(await request.get(stylexURL+'/index.json')).json();
  for(const name of names)expect(index.entries['components-pagination--'+name.slice(11)]?.tags,name).toContain('parity');
  const source=await readFile('generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/pagination-example.tsx','utf8');
  // Registry and Usage repeat these exact document compositions; compare each once.
  const registry:Record<string,string>={PaginationBasic:'demo',PaginationSimple:'simple',PaginationIconsOnly:'icons-only'};
  const functions=[...source.matchAll(/^function (Pagination\w+)\(/gm)].map(match=>match[1]);
  expect(functions.sort()).toEqual(Object.keys(registry).sort());
  for(const name of functions)expect(index.entries['components-pagination--'+registry[name]]?.tags,name).toContain('parity');
});
for(const theme of ['light','dark'])test(`Pagination controlled navigation, real Select and native styling / ${theme}`,async({browser},info)=>{
  const context=await browser.newContext();const a=await context.newPage(),b=await context.newPage();
  try {
    for(const story of ['controlled','icons-only','customization']){
      await Promise.all(([[a,upstreamURL],[b,stylexURL]] as const).map(async([page,url])=>{await page.goto(`${url}/iframe.html?id=components-pagination--${story}&globals=theme:${theme}`);await expect(page.locator('#parity-root')).toBeVisible();}));
      if(story==='controlled'){
        for(const page of [a,b]){await page.getByRole('link',{name:'Go to previous page'}).click();await expect(page.locator('[aria-current="page"]')).toHaveText('1');await expect(page.getByRole('link',{name:'Go to previous page'})).toHaveAttribute('aria-disabled','true');}
        await compare(a,b,info,'previous-disabled');
        for(const page of [a,b]){await page.getByRole('link',{name:'3',exact:true}).focus();await page.keyboard.press('Enter');await expect(page.locator('[aria-current="page"]')).toHaveText('3');}
        await compare(a,b,info,'next-disabled-keyboard');
      }else if(story==='icons-only'){
        for(const page of [a,b]){await page.locator('[data-slot="select-trigger"]').click();await expect(page.getByRole('listbox')).toBeVisible();}
        await compare(a,b,info,'rows-select-open');
        for(const page of [a,b]){await page.getByRole('option',{name:'50',exact:true}).click();await expect(page.locator('[data-slot="select-trigger"]')).toContainText('50');await expect(page.locator('[data-parity-portal]')).toHaveCount(0);}
        await compare(a,b,info,'rows-select-change');
      }else{
        for(const page of [a,b]){await expect(page.getByRole('link',{name:'Custom'})).toHaveCSS('width','52px');await page.getByRole('button',{name:'Resize'}).click();await expect(page.getByRole('link',{name:'Custom'})).toHaveCSS('width','68px');await page.getByRole('link',{name:'Custom'}).hover();}
        await compare(a,b,info,'dynamic-native-style-hover');
      }
    }
  }finally{await context.close();}
});
