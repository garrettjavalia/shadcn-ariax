import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {compare} from './compare';
import {upstreamURL,stylexURL} from './servers';
for(const theme of ['light','dark'])test(`Dialog official examples, dismissal and focus restoration / ${theme}`,async({browser},info)=>{
 const ctx=await browser.newContext({viewport:{width:1000,height:900}});const pages=await Promise.all([upstreamURL,stylexURL].map(()=>ctx.newPage()));
 try{for(const name of ['demo','close-button','no-close-button','scrollable-content','sticky-footer','usage','rtl','customized','non-dismissable','registry-form','registry-scrollable','registry-sticky','registry-no-close']){
 await Promise.all(pages.map((p,i)=>p.goto(`${[upstreamURL,stylexURL][i]}/iframe.html?id=components-dialog--${name}&viewMode=story&globals=theme:${theme}`)));
 await Promise.all(pages.map(async p=>{await expect(p.locator('#parity-root')).toBeVisible();await p.getByRole('button').first().click();await expect(p.getByRole('dialog')).toBeVisible();}));
 await compare(pages[0],pages[1],info,name+'-open');
 if(name.includes('scrollable')||name==='sticky-footer'||name==='registry-sticky'){await Promise.all(pages.map(p=>p.getByRole('dialog').locator('[style*="overflow"]').evaluate(el=>el.scrollTop=200)));await compare(pages[0],pages[1],info,name+'-scrolled');}
 if(name==='non-dismissable'){await Promise.all(pages.map(p=>p.keyboard.press('Escape')));await Promise.all(pages.map(p=>expect(p.getByRole('dialog')).toBeVisible()));await compare(pages[0],pages[1],info,'persistent-escape');await Promise.all(pages.map(p=>p.getByRole('button',{name:'Close',exact:true}).first().click()));}
 else{await Promise.all(pages.map(p=>p.keyboard.press('Escape')));}
 await Promise.all(pages.map(p=>expect(p.getByRole('dialog')).toBeHidden()));await compare(pages[0],pages[1],info,name+'-closed');
 }}finally{await ctx.close();}
});
test('Dialog official documentation examples all map to stories',async({request})=>{const doc=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/dialog.mdx','utf8');const names=[...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]);const mapped:Record<string,string>={'dialog':'usage'};expect(names).toHaveLength(6);const index=await(await request.get(`${stylexURL}/index.json`)).json();for(const name of names)expect(index.entries[`components-dialog--${mapped[name]??name.slice(7)}`]?.tags).toContain('parity');});
for(const theme of ['light','dark'])test(`Dialog enter/exit animation effects at 0/50/100ms / ${theme}`,async({browser},info)=>{
 const ctx=await browser.newContext();const pages=await Promise.all([upstreamURL,stylexURL].map(()=>ctx.newPage()));
 try{for(const phase of ['enter','exit']){
 for(let i=0;i<2;i++){const p=pages[i];await p.goto(`${[upstreamURL,stylexURL][i]}/iframe.html?id=components-dialog--usage&viewMode=story&globals=theme:${theme}`);await expect(p.locator('#parity-root')).toBeVisible();if(phase==='exit'){await p.getByRole('button',{name:'Open',exact:true}).click();await expect(p.locator('[data-slot="dialog-overlay"]')).not.toHaveAttribute('data-entering');}await p.evaluate(()=>{new MutationObserver(()=>{for(const animation of document.getAnimations())if(animation instanceof CSSAnimation && animation.playState==='running')animation.pause();}).observe(document.body,{subtree:true,childList:true,attributes:true});});}
 await Promise.all(pages.map(p=>phase==='enter'?p.getByRole('button',{name:'Open',exact:true}).click():p.keyboard.press('Escape')));
 for(const time of [0,50,100]){await Promise.all(pages.map(p=>p.locator('[data-slot="dialog-overlay"]').evaluate(async(el,time)=>{const animations=el.getAnimations({subtree:true}).filter(a=>a instanceof CSSAnimation);if(animations.length!==2)throw Error(`Expected overlay and content animations, got ${animations.length}`);for(const a of animations){a.pause();await a.ready;a.currentTime=time;}},time)));await compare(pages[0],pages[1],info,`${phase}-${time}`,true,false);}
 }
 }finally{await ctx.close();}
});

test("Dialog registry example coverage keeps unavailable compositions explicit",async()=>{const source=await readFile("generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/dialog-example.tsx","utf8");const names=[...source.matchAll(/function (Dialog\w+)\(/g)].map(m=>m[1]).filter(n=>n!=="DialogExample");expect(names.sort()).toEqual(["DialogWithForm","DialogScrollableContent","DialogWithStickyFooter","DialogNoCloseButton","DialogChatSettings"].sort());expect(source).toContain("ui/select");expect(source).toContain("ui/tabs");});
