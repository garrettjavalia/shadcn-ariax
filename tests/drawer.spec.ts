import{test,expect}from'@playwright/test';
import{compare}from'./compare';
import{upstreamURL,stylexURL}from'./servers';
const cases=['usage','demo-example','sides','swipe-handle','nested','non-modal','snap-points','dialog','rtl','registry-demo','registry-swipe-handle','registry-custom-size','registry-position','registry-scrollable','registry-snap-points','registry-nested','registry-non-modal'];
for(const theme of ['light','dark'])for(const name of cases)test(`Drawer official ${name} / ${theme}`,async({browser},info)=>{
 const ctx=await browser.newContext({viewport:{width:1000,height:900}});const pages=await Promise.all([upstreamURL,stylexURL].map(()=>ctx.newPage()));try{
 await Promise.all(pages.map(async(p,i)=>{await p.goto(`${[upstreamURL,stylexURL][i]}/iframe.html?id=components-drawer--${name}&viewMode=story&globals=theme:${theme}`);await expect(p.locator('#parity-root')).toBeVisible();}));
 const count=await pages[0].locator('#parity-root button').count();
 for(let index=0;index<count;index++){
 await test.step(`trigger ${index}`,async()=>{
 await Promise.all(pages.map(p=>p.locator('#parity-root button').nth(index).click()));await Promise.all(pages.map(p=>expect(p.getByRole('dialog').last()).toBeVisible()));
 await Promise.all(pages.map(p=>p.evaluate(()=>{for(const portal of document.querySelectorAll('[data-slot="drawer-portal"]'))portal.setAttribute('data-parity-portal','');for(const portal of document.querySelectorAll('[data-slot="dialog-overlay"]'))portal.setAttribute('data-parity-portal','');})));
 await compare(pages[0],pages[1],info,`${name}-${index}-open`);
 await Promise.all(pages.map(p=>p.keyboard.press('Escape')));await Promise.all(pages.map(p=>expect(p.getByRole('dialog')).toBeHidden()));await compare(pages[0],pages[1],info,`${name}-${index}-closed`);
 });}
 }finally{await ctx.close();}
});
