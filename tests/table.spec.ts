import { test, expect } from '@playwright/test';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';
for (const theme of ['light','dark']) test(`Table pointer selection, hover, keyboard and horizontal scroll / ${theme}`, async ({browser}, info)=> {
 const context=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC'}); const a=await context.newPage();const b=await context.newPage();
 try {
  await Promise.all([[a,upstreamURL],[b,stylexURL]].map(async ([page,url])=>{ if(typeof page==='string')return;await page.goto(`${url}/iframe.html?id=components-table--selection&globals=theme:${theme}`);await expect(page.locator('#parity-root')).toBeVisible();await page.getByRole('row').filter({hasText:'INV001'}).click(); }));
  await compare(a,b,info,'table-selected');
  for(const page of [a,b]) {await page.getByRole('row').filter({hasText:'INV002'}).hover();}
  await compare(a,b,info,'table-hover');
  for(const page of [a,b]) {await page.keyboard.press('ArrowDown');await page.keyboard.press('Space');}
  await compare(a,b,info,'table-keyboard');
  await Promise.all([[a,upstreamURL],[b,stylexURL]].map(async ([page,url])=>{if(typeof page==='string')return;await page.goto(`${url}/iframe.html?id=components-table--scroll&globals=theme:${theme}`);await expect(page.locator('#parity-root')).toBeVisible();await page.locator('[data-slot="table-container"]').evaluate(e=>e.scrollLeft=150);}));
  await compare(a,b,info,'table-scrolled');
 } finally {await context.close();}
});

test('Table dynamic xstyle updates and user style precedence match upstream',async ({browser},info)=>{
 const context=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC'});const a=await context.newPage();const b=await context.newPage();
 try{await Promise.all(([ [a,upstreamURL],[b,stylexURL] ] as const).map(async ([page,url])=>{await page.goto(`${url}/iframe.html?id=components-table--customized`);await expect(page.locator('#parity-root')).toBeVisible();await page.getByRole('button',{name:'Resize'}).click();}));await compare(a,b,info,'table-dynamic');}finally{await context.close();}
});
