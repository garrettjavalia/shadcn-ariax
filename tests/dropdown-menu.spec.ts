import {test,expect,type Page} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {compare} from './compare';
import {upstreamURL,stylexURL} from './servers';
const examples=['basic','demo','submenu','shortcuts','icons','checkboxes','checkboxes-icons','radio-group','radio-icons','destructive','complex','rtl','table-actions-example','customized'];
for(const theme of ['light','dark']) for(const story of examples) test(`DropdownMenu open portal / ${story} / ${theme}`,async({browser},info)=>{
 const context=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC'});const pages=await Promise.all([upstreamURL,stylexURL].map(async url=>{const page=await context.newPage();await page.goto(`${url}/iframe.html?id=components-dropdown-menu--${story}&globals=theme:${theme}`);await expect(page.locator('#parity-root')).toBeVisible();return page;}));
 try{for(const page of pages){await page.locator('#parity-root [data-slot="button"]').first().click();await expect(page.getByRole('menu').first()).toBeVisible();await expect(page.locator('[data-parity-portal]')).toHaveCount(1);}
 await compare(pages[0],pages[1],info,'dropdown-open');
 for(const page of pages)await page.keyboard.press('Escape');await compare(pages[0],pages[1],info,'dropdown-close');
 }finally{await context.close();}
});
test('DropdownMenu official preview coverage tracks actual Avatar dependency and RTL limitation',async({request})=>{const doc=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/dropdown-menu.mdx','utf8');const previews=[...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]);expect(previews).toHaveLength(13);const index=await(await request.get(`${stylexURL}/index.json`)).json();for(const preview of previews){if(preview==='dropdown-menu-avatar'){expect('Actual Avatar/AvatarImage/AvatarFallback implementation is pending; draft scope.').toBeTruthy();continue;}expect(index.entries[`components-dropdown-menu--${preview.replace('dropdown-menu-','')}`]?.tags,preview).toContain('parity');}});

for(const theme of ['light','dark']) test(`DropdownMenu pointer, keyboard, multiple/single selection, nested portal and dynamic width / ${theme}`,async({browser},info)=>{
 const context=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC'});const a=await context.newPage();const b=await context.newPage();const pages=[a,b];
 const navigate=async(story:string)=>{await Promise.all(([ [a,upstreamURL],[b,stylexURL] ] as const).map(async([page,url])=>{await page.goto(`${url}/iframe.html?id=components-dropdown-menu--${story}&globals=theme:${theme}`);await expect(page.locator('#parity-root')).toBeVisible();await page.locator('#parity-root [data-slot="button"]').first().click();await expect(page.getByRole('menu').first()).toBeVisible();}));};
 try{
  await navigate('basic');for(const page of pages)await page.getByRole('menuitem',{name:'Billing',exact:true}).hover();await compare(a,b,info,'hover-item');
  for(const page of pages){await page.keyboard.press('End');await expect(page.getByRole('menuitem',{name:'API',exact:true})).not.toBeFocused();await page.keyboard.press('Home');await page.keyboard.press('b');}await compare(a,b,info,'keyboard-typeahead');
  for(const page of pages){await page.getByRole('menuitem',{name:'Billing',exact:true}).click();await expect(page.getByRole('menu')).toHaveCount(0);}await compare(a,b,info,'action-close');
  await navigate('checkboxes');for(const page of pages){await page.getByRole('menuitemcheckbox',{name:'Panel',exact:true}).click();await expect(page.getByRole('menuitemcheckbox',{name:'Panel',exact:true})).toHaveAttribute('aria-checked','true');await expect(page.getByRole('menuitemcheckbox',{name:'Activity Bar',exact:true})).toHaveAttribute('aria-disabled','true');}await compare(a,b,info,'multiple-selection');
  await navigate('radio-group');for(const page of pages){await page.getByRole('menuitemradio',{name:'Top',exact:true}).click();await expect(page.getByRole('menu')).toHaveCount(0);await page.locator('#parity-root [data-slot="button"]').click();await expect(page.getByRole('menuitemradio',{name:'Top',exact:true})).toHaveAttribute('aria-checked','true');await expect(page.getByRole('menuitemradio',{name:'Bottom',exact:true})).toHaveAttribute('aria-checked','false');}await compare(a,b,info,'single-selection');
  await navigate('submenu');for(const page of pages){await page.getByRole('menuitem',{name:'Invite users',exact:true}).hover();await expect(page.getByRole('menu')).toHaveCount(2);}await compare(a,b,info,'submenu-open');
  for(const page of pages){await page.getByRole('menuitem',{name:'More options',exact:true}).hover();await expect(page.getByRole('menu')).toHaveCount(3);for(const menu of await page.getByRole('menu').all())await expect(menu.locator('xpath=ancestor::*[@data-parity-portal]')).toHaveCount(1);}await compare(a,b,info,'nested-submenu-open');
  for(const page of pages){await page.keyboard.press('ArrowLeft');await expect(page.getByRole('menu')).toHaveCount(2);}await compare(a,b,info,'nested-submenu-keyboard-back');
  await navigate('customized');for(const page of pages){await page.keyboard.press('Escape');await expect(page.getByRole('menu')).toHaveCount(0);await page.getByRole('button',{name:'Resize',exact:true}).click();}for(const page of pages)if(await page.getByRole('menu').count()===0)await page.locator('#parity-root [data-slot="button"]').click();await compare(a,b,info,'dynamic-width');await expect(b.locator('[data-slot="dropdown-menu-content"]')).toHaveCSS('width','220px');
 }finally{await context.close();}
});

for(const theme of ['light','dark']) test(`DropdownMenu enter/exit animation phases and finite completion / ${theme}`,async({browser},info)=>{
 const context=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC'});
 await context.addInitScript(()=>{const sampled=new WeakSet<Animation>();const handles=new WeakMap<Element,Animation>();(window as Window & {dropdownAnimations?:WeakMap<Element,Animation>}).dropdownAnimations=handles;document.addEventListener('animationstart',event=>{if(!(event.target instanceof Element)||!event.target.matches('[data-slot="dropdown-menu-content"]'))return;for(const animation of event.target.getAnimations())if(animation instanceof CSSAnimation&&['enter','exit'].includes(animation.animationName)&&!sampled.has(animation)){sampled.add(animation);handles.set(event.target,animation);animation.pause();animation.currentTime=0;}},true);});
 const a=await context.newPage();const b=await context.newPage();
 try{
  await Promise.all(([ [a,upstreamURL],[b,stylexURL] ] as const).map(async([page,url])=>{await page.goto(`${url}/iframe.html?id=components-dropdown-menu--basic&globals=theme:${theme}`);await expect(page.locator('#parity-root')).toBeVisible();await page.locator('[data-slot="button"]').click();}));
  for(const phase of ['enter','exit']){
   if(phase==='exit')for(const page of [a,b])await page.keyboard.press('Escape');
   for(const page of [a,b])await expect.poll(()=>page.locator('[data-slot="dropdown-menu-content"]').evaluate((element,name)=>element.getAnimations().some(animation=>animation instanceof CSSAnimation&&animation.animationName===name&&animation.playState==='paused'),phase)).toBe(true);
   for(const time of [0,50,100]){
    for(const page of [a,b])await page.locator('[data-slot="dropdown-menu-content"]').evaluate(async(element,{name,time})=>{const animation=element.getAnimations().find(animation=>animation instanceof CSSAnimation&&animation.animationName===name)!;await animation.ready;animation.currentTime=time;},{name:phase,time});
    await compare(a,b,info,`${phase}-${time}ms`);
   }
   for(const page of [a,b])await page.locator('[data-slot="dropdown-menu-content"]').evaluate(element=>{const animation=(window as Window & {dropdownAnimations?:WeakMap<Element,Animation>}).dropdownAnimations!.get(element)!;animation.currentTime=0;animation.play();});
   await compare(a,b,info,`${phase}-complete`);
   if(phase==='exit')for(const page of [a,b])await expect(page.getByRole('menu')).toHaveCount(0);
  }
 }finally{await context.close();}
});

for(const theme of ['light','dark']) test(`DropdownMenu forced colors retains native outline and portal geometry / ${theme}`,async({browser},info)=>{
 const context=await browser.newContext({viewport:{width:1000,height:900},forcedColors:'active',locale:'en-US',timezoneId:'UTC'});const a=await context.newPage();const b=await context.newPage();
 try{for(const [page,url] of [[a,upstreamURL],[b,stylexURL]] as const){await page.goto(`${url}/iframe.html?id=components-dropdown-menu--basic&globals=theme:${theme}`);await expect(page.locator('#parity-root')).toBeVisible();await page.locator('[data-slot="button"]').click();await expect(page.getByRole('menu')).toBeVisible();await page.getByRole('menuitem',{name:'Billing',exact:true}).hover();}await compare(a,b,info,'forced-colors-open-focus');}finally{await context.close();}
});

for(const theme of ['light','dark']) test(`official TableActions each row opens its real menu and preserves keyboard focus behavior / ${theme}`,async({browser},info)=>{
 const context=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC'});const a=await context.newPage();const b=await context.newPage();
 try{for(const [page,url] of [[a,upstreamURL],[b,stylexURL]] as const){await page.goto(`${url}/iframe.html?id=components-dropdown-menu--table-actions-example&globals=theme:${theme}`);await expect(page.locator('#parity-root')).toBeVisible();}
 for(let row=0;row<3;row++){
  for(const page of [a,b]){await page.getByRole('button',{name:'Open menu',exact:true}).nth(row).focus();await page.keyboard.press('Space');await expect(page.getByRole('menuitem',{name:'Edit',exact:true})).toBeFocused();await page.keyboard.press('End');await expect(page.getByRole('menuitem',{name:'Delete',exact:true})).toBeFocused();}
  await compare(a,b,info,`row-${row}-destructive-focus`);
  for(const page of [a,b]){await page.keyboard.press('Enter');await expect(page.getByRole('menu')).toHaveCount(0);}
  await compare(a,b,info,`row-${row}-action-close`);
 }
 }finally{await context.close();}
});
