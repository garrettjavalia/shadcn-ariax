import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {compare} from './compare';
import {upstreamURL,stylexURL} from './servers';
test('ToggleGroup official document previews and usage mapped',async({request})=>{const doc=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/toggle-group.mdx','utf8');const names=[...doc.matchAll(/<ComponentPreview\b[^>]*name="toggle-group-([^"]+)"/g)].map(m=>m[1]);expect(names).toHaveLength(8);const index=await(await request.get(stylexURL+'/index.json')).json();for(const name of [...names,'usage'])expect(index.entries['components-toggle-group--'+name]?.tags).toContain('parity');});
for(const theme of ['light','dark'])for(const story of ['demo','outline','sizes','spacing','vertical','disabled','font-weight-selector','rtl','usage','joined','customization'])test(`ToggleGroup ${story} states / ${theme}`,async({browser},info)=>{
 const context=await browser.newContext();const pages=await Promise.all([upstreamURL,stylexURL].map(async url=>{const page=await context.newPage();await page.goto(`${url}/iframe.html?id=components-toggle-group--${story}&globals=theme:${theme}`);await expect(page.locator('[data-slot="toggle-group"]').first()).toBeVisible();return page;}));
 try{await compare(pages[0],pages[1],info,'initial');if(story==='disabled'){for(const page of pages)await expect(page.getByRole('button').first()).toBeDisabled();return;}
 const count=await pages[0].getByRole('group').count();
 for(let i=0;i<count;i++){
  for(const page of pages)await page.getByRole('group').nth(i).getByRole('button').first().hover();await compare(pages[0],pages[1],info,`hover-${i}`);
  for(const page of pages){await page.mouse.move(0,0);await page.keyboard.press('Tab');await page.getByRole('group').nth(i).getByRole('button').first().focus();}await compare(pages[0],pages[1],info,`focus-${i}`);
  for(const page of pages)await page.getByRole('group').nth(i).getByRole('button').nth(1).click();await compare(pages[0],pages[1],info,`selected-${i}`);
  for(const page of pages){await expect(page.getByRole('group').nth(i).getByRole('button').nth(1)).toHaveAttribute('aria-pressed','true');await page.keyboard.press(story==='vertical'||story==='joined'&&i===1?'ArrowDown':story==='rtl'||story==='joined'&&i===2?'ArrowLeft':'ArrowRight');}await compare(pages[0],pages[1],info,`arrow-${i}`);
  for(const page of pages)await page.keyboard.press('Space');await compare(pages[0],pages[1],info,`space-${i}`);
 }
 }finally{await context.close();}
});
