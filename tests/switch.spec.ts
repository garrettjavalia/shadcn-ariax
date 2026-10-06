import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {compare} from './compare';
import {upstreamURL,stylexURL} from './servers';
test('Switch official examples all map to parity stories',async({request})=>{
 const doc=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/switch.mdx','utf8');
 const examples=[...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]);
 expect(examples.sort()).toEqual(['switch-choice-card','switch-demo','switch-description','switch-disabled','switch-invalid','switch-rtl','switch-sizes']);
 const index=await(await request.get(`${stylexURL}/index.json`)).json();
 for(const name of examples) expect(index.entries[`components-switch--${name.slice(7)}`]?.tags).toContain('parity');
 expect(index.entries['components-switch--field-switch']?.tags).toContain('parity');
});
for(const theme of ['light','dark']) test(`Switch pointer and keyboard, disabled, RTL, render props / ${theme}`,async({browser},info)=>{
 const ctx=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC',colorScheme:'light'});
 const pages=await Promise.all([upstreamURL,stylexURL].map(url=>ctx.newPage()));
 try {for(const story of ['demo','sizes','disabled','rtl','render-props','choice-card','customized']) {
 await Promise.all(pages.map((p,i)=>p.goto(`${[upstreamURL,stylexURL][i]}/iframe.html?id=components-switch--${story}&viewMode=story&globals=theme:${theme}`)));
 await Promise.all(pages.map(p=>expect(p.locator('#parity-root')).toBeVisible()));
 if(story==='customized'){await Promise.all(pages.map(p=>p.getByText('Resize',{exact:true}).click()));await compare(...pages as [typeof pages[0],typeof pages[0]],info,'dynamic-customization');}
 if(story==='disabled'){await compare(...pages as [typeof pages[0],typeof pages[0]],info,'disabled');continue;}
 await Promise.all(pages.map(p=>p.keyboard.press('Tab')));await compare(...pages as [typeof pages[0],typeof pages[0]],info,story+'-focus');
 await Promise.all(pages.map(p=>p.keyboard.press('Space')));await compare(...pages as [typeof pages[0],typeof pages[0]],info,story+'-keyboard');
 await Promise.all(pages.map(p=>p.locator('[data-slot="switch"]').first().click()));await compare(...pages as [typeof pages[0],typeof pages[0]],info,story+'-pointer');
 }} finally{await ctx.close();}
});
test('Switch thumb transition preserves duration, intermediate movement and endpoints',async({browser})=>{
 const ctx=await browser.newContext();
 const pages=await Promise.all([upstreamURL,stylexURL].map(async url=>{const p=await ctx.newPage();await p.goto(`${url}/iframe.html?id=components-switch--sizes&viewMode=story`);return p;}));
 try{for(let i=0;i<2;i++){
 const samples=await Promise.all(pages.map(async p=>{
 const control=p.locator('[data-slot="switch"]').nth(i);await control.click();
 return control.locator('[data-slot="switch-thumb"]').evaluate(el=>{
 const animation=el.getAnimations().find(a=>(a as CSSTransition).transitionProperty==='translate');
 if(!animation)throw new Error('Missing thumb translate transition');
 animation.pause();const duration=animation.effect!.getTiming().duration;
 const values=[0,75,150].map(t=>{animation.currentTime=t;return getComputedStyle(el).translate;});
 return {duration,values};
 });
 }));expect(samples[0]).toEqual(samples[1]);expect(samples[0].duration).toBe(150);expect(samples[0].values[1]).not.toBe(samples[0].values[0]);expect(samples[0].values[1]).not.toBe(samples[0].values[2]);
 }}finally{await ctx.close();}
});
