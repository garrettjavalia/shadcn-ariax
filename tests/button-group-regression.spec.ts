import {test,expect} from '@playwright/test';
import {compare} from './compare';
import {upstreamURL,stylexURL} from './servers';
for(const theme of ['light','dark'])for(const story of ['variants','edges','customized','context','typography','text-icons'])test(`ButtonGroup retained styles and context / ${story} / ${theme}`,async({browser},info)=>{
 const ctx=await browser.newContext({viewport:{width:1000,height:900}}),pages=await Promise.all([upstreamURL,stylexURL].map(()=>ctx.newPage()));
 try{await Promise.all(pages.map(async(p,i)=>{await p.goto(`${[upstreamURL,stylexURL][i]}/iframe.html?id=components-buttongroup--${story}&viewMode=story&globals=theme:${theme}`);await expect(p.locator('#parity-root')).toBeVisible();}));await compare(pages[0],pages[1],info,story);}finally{await ctx.close();}
});
