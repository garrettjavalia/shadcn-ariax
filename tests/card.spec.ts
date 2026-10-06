import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { compare } from './compare';
import { stylexURL, upstreamURL } from './servers';

test('official Card documentation examples have corresponding parity compositions', async ({ request }) => {
  const doc=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/card.mdx','utf8');
  const examples=[...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]);
  const index=await(await request.get(`${stylexURL}/index.json`)).json();
  expect(examples).toHaveLength(6);
  for(const example of examples) expect(index.entries[`components-card--${example.replace('card-','')}`]?.tags,example).toContain('parity');
});
for(const theme of ['light','dark']) test(`Card form links, spacing controls and relative units / ${theme}`,async ({browser},info)=>{
  const context=await browser.newContext({viewport:{width:1000,height:900}});
  const a=await context.newPage(), b=await context.newPage();
  try {
    for (const story of ['demo', 'spacing']) {
      for (const [page,url] of [[a,upstreamURL],[b,stylexURL]] as const) {
        await page.goto(`${url}/iframe.html?id=components-card--${story}&viewMode=story&globals=theme:${theme}`);
        await expect(page.locator('#parity-root')).toBeVisible();
        await page.getByRole('textbox', {name:'Email', exact:true}).fill('card@example.com');
        await page.getByLabel('Password', {exact:true}).fill('example-password');
        const link = page.getByRole('link', {name:'Forgot your password?', exact:true});
        await link.hover();
        await expect(link).toHaveCSS('text-decoration-line','underline');
      }
      await compare(a,b,info,`card-${story}-filled-link-hover`);
      for (const page of [a,b]) {
        await page.mouse.move(0,0);
        await expect(page.getByRole('link',{name:'Forgot your password?',exact:true})).toHaveCSS('text-decoration-line','none');
      }
      await compare(a,b,info,`card-${story}-filled-link-rest`);
    }
    for(const [label,pixels] of [['20px',20],['24px',24],['32px',32]] as const){
      await Promise.all([a,b].map(async page=>{const option=page.getByRole('radio',{name:label});await option.click();await expect(option).toBeChecked();}));
      await compare(a,b,info,`card-spacing-${label}`);
      await expect(b.locator('[data-slot="card-content"]')).toHaveCSS('padding-left',`${pixels}px`);
    }
    await Promise.all([a,b].map(page=>page.evaluate(()=>{document.documentElement.style.fontSize='20px'})));
    await compare(a,b,info,'card-relative-root-font');
    await expect(b.locator('[data-slot="card"]')).toHaveCSS('gap','40px');
  } finally {await context.close();}
});

test('Card StyleX dynamic styles survive React style updates and native props/ref forwarding',async({page})=>{
 await page.goto(`${stylexURL}/iframe.html?id=components-card--react-props&viewMode=story`);
 const card=page.locator('#interactive-card');
 await expect(card).toHaveCSS('width','310px');
 await expect(card).toHaveCSS('min-width','200px');
 await expect(card).toHaveAttribute('aria-label','Card region');
 await expect(card).toHaveAttribute('data-ref','attached');
 await card.click();
 await expect(card).toHaveCSS('width','350px');
 await expect(card).toHaveCSS('min-width','240px');
 await expect(card).toHaveAttribute('data-clicks','1');
});
