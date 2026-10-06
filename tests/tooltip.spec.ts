import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { compare } from './compare';
import { upstreamURL, stylexURL } from './servers';
for (const theme of ['light','dark']) test(`Tooltip official examples and trigger states / ${theme}`, async ({ browser }, info) => {
  test.setTimeout(120_000);
  const context = await browser.newContext({ viewport: { width: 1000, height: 900 }, locale: 'en-US', timezoneId: 'UTC', colorScheme: 'light' });
  const a=await context.newPage(), b=await context.newPage();
  const pages=[a,b];
  const load=async(story:string)=>Promise.all(pages.map(async(page,i)=>{await page.mouse.move(0,0);await page.goto(`${[upstreamURL,stylexURL][i]}/iframe.html?id=components-tooltip--${story}&viewMode=story&globals=theme:${theme}`);await expect(page.locator('#parity-root')).toBeVisible();await page.mouse.move(0,0);}));
  const open=async(index=0)=>Promise.all(pages.map(async page=>{await page.getByRole('button').nth(index).hover();await expect(page.getByRole('button').nth(index)).toHaveAttribute('data-hovered','true');await expect(page.getByRole('tooltip')).toBeVisible();}));
  const close=async()=>Promise.all(pages.map(async page=>{await page.mouse.move(0,0);await page.keyboard.press('Escape');await expect(page.getByRole('tooltip')).toHaveCount(0);}));
  try {
    await load('demo'); await open(); await compare(a,b,info,'demo-hover'); await close();
    await load('demo');
    await Promise.all(pages.map(async page=>{await page.keyboard.press('Tab');await expect(page.getByRole('tooltip')).toBeVisible();}));
    await compare(a,b,info,'demo-keyboard'); await close();
    for (const story of ['sides','rtl','kbd-composition']) {
      await load(story);
      const count=await a.getByRole('button').count();
      for(let index=0;index<count;index++)await test.step(`${story}-${index}`,async()=>{await load(story);await open(index);await compare(a,b,info,`${story}-${index}`);await close();});
    }
    await load('keyboard'); await open(); await compare(a,b,info,'keyboard-content'); await close();
    await load('disabled'); await Promise.all(pages.map(async page=>{await page.locator('#parity-root span').hover();await expect(page.getByRole('tooltip')).toBeVisible();}));await compare(a,b,info,'disabled-wrapper');await close();
    await load('disabled-trigger'); await Promise.all(pages.map(page=>page.getByRole('button').hover()));await compare(a,b,info,'disabled-trigger');await Promise.all(pages.map(async page=>{await expect(page.getByRole('tooltip')).toHaveCount(0);}));
    await load('delay');
    await Promise.all(pages.map(async page=>{await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});await page.clock.pauseAt(new Date('2026-01-01T00:00:01Z'));await page.getByRole('button').hover({force:true});await expect(page.locator('output')).toHaveAttribute('data-open','false');await page.clock.runFor(249);await expect(page.locator('output')).toHaveAttribute('data-open','false');await page.clock.runFor(1);await expect(page.locator('output')).toHaveAttribute('data-open','true');await page.clock.resume();await expect(page.getByRole('tooltip')).toBeVisible();}));
    await compare(a,b,info,'delayed-open');
    await Promise.all(pages.map(async page=>{await page.clock.pauseAt(new Date(await page.evaluate(()=>Date.now()+1000)));await page.mouse.move(0,0);await page.clock.runFor(249);await expect(page.locator('output')).toHaveAttribute('data-open','true');await page.clock.runFor(1);await expect(page.locator('output')).toHaveAttribute('data-open','false');await page.clock.resume();await expect(page.getByRole('tooltip')).toHaveCount(0);}));await compare(a,b,info,'delayed-close');
  } finally {await context.close();}
});
test('every official Tooltip preview and Usage has a registered parity story',async({request})=>{
  const document=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/tooltip.mdx','utf8');
  const names=[...document.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(match=>match[1]);
  expect(names).toEqual(['tooltip-demo','tooltip-sides','tooltip-keyboard','tooltip-disabled','tooltip-rtl']);
  const index=await(await request.get(`${stylexURL}/index.json`)).json();
  for(const name of names)expect(index.entries[`components-tooltip--${name.replace('tooltip-','')}`]?.tags).toContain('parity');
  expect(index.entries['components-tooltip--usage']?.tags).toContain('parity');
});
test('Tooltip native style preserves StyleX dynamic variables and user priority',async({page})=>{
  await page.goto(`${stylexURL}/iframe.html?id=components-tooltip--customized&viewMode=story`);
  const content=page.getByRole('tooltip');await expect(content).toBeVisible();await expect(content).toHaveCSS('width','210px');await expect(content).toHaveCSS('padding-left','22px');await expect(content).toHaveCSS('padding-right','20px');expect(await content.getAttribute('style')).toContain('--');
});
for(const theme of ['light','dark'])test(`Tooltip real enter and exit animation frames / ${theme}`,async({browser},info)=>{
  const context=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC',colorScheme:'light'});
  await context.addInitScript(()=>{
    new MutationObserver(()=>{
      for(const animation of document.getAnimations()){
        const target=(animation.effect as KeyframeEffect|null)?.target;
        if(target instanceof HTMLElement&&target.dataset.slot==='tooltip-content'&&(target.hasAttribute('data-entering')||target.hasAttribute('data-exiting'))){animation.pause();animation.currentTime=50;}
      }
    }).observe(document,{subtree:true,childList:true,attributes:true});
  });
  const a=await context.newPage(),b=await context.newPage();const pages=[a,b];
  try{
    await Promise.all(pages.map(async(page,i)=>{await page.goto(`${[upstreamURL,stylexURL][i]}/iframe.html?id=components-tooltip--demo&viewMode=story&globals=theme:${theme}`);await expect(page.locator('#parity-root')).toBeVisible();await page.mouse.move(0,0);await page.getByRole('button').hover();await expect(page.getByRole('tooltip')).toHaveAttribute('data-entering','true');}));
    await compare(a,b,info,'tooltip-enter-50ms');
    await Promise.all(pages.map(async page=>{await page.evaluate(()=>document.getAnimations().forEach(animation=>animation.finish()));await expect(page.getByRole('tooltip')).not.toHaveAttribute('data-entering','true');await page.mouse.move(0,0);await page.keyboard.press('Escape');await expect(page.getByRole('tooltip')).toHaveAttribute('data-exiting','true');}));
    await compare(a,b,info,'tooltip-exit-50ms');
    await Promise.all(pages.map(async page=>{await page.evaluate(()=>document.getAnimations().forEach(animation=>animation.finish()));await expect(page.getByRole('tooltip')).toHaveCount(0);}));
  }finally{await context.close();}
});
