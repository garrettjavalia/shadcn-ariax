import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {compare} from './compare';
import {upstreamURL,stylexURL} from './servers';
test('all official ButtonGroup previews are verified or explicitly pending',async({request})=>{
 const doc=await readFile('generated/upstream/shadcn/apps/v4/content/docs/components/aria/button-group.mdx','utf8');
 const names=[...doc.matchAll(/<ComponentPreview\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]);
 const mapped:Record<string,string>={'button-group-orientation':'orientation','button-group-size':'size','button-group-nested':'nested','button-group-separator':'separator','button-group-split':'split','button-group-input':'in-input','button-group-input-group':'in-input-group'};
 const pending:Record<string,string>={'button-group-demo':'Dropdown Menu unavailable on this stack','button-group-dropdown':'Dropdown Menu unavailable on this stack','button-group-select':'Select unavailable','button-group-popover':'Popover unavailable','button-group-rtl':'Official RTL and Dropdown Menu unavailable'};
 expect(names).toHaveLength(12);
 const index=await(await request.get(`${stylexURL}/index.json`)).json();
 for(const name of names){if(name in pending)continue;expect(mapped[name],name).toBeTruthy();expect(index.entries[`components-buttongroup--${mapped[name]}`]?.tags,name).toContain('parity');}
});
for(const theme of ['light','dark'])test(`ButtonGroup focus, input editing and voice toggle / ${theme}`,async({browser},info)=>{
 const context=await browser.newContext({viewport:{width:1000,height:900},locale:'en-US',timezoneId:'UTC',colorScheme:'light'});const a=await context.newPage(),b=await context.newPage();
 const load=async(story:string)=>Promise.all([[a,upstreamURL],[b,stylexURL]].map(async([page,url])=>{await (page as typeof a).goto(`${url}/iframe.html?id=components-buttongroup--${story}&viewMode=story&globals=theme:${theme}`);await expect((page as typeof a).locator('#parity-root')).toBeVisible();}));
 try{await load('usage');for(let i=0;i<2;i++){await Promise.all([a,b].map(p=>p.keyboard.press('Tab')));await compare(a,b,info,`focus-${i}`);await expect(b.getByRole('button').nth(i)).toBeFocused();}
 await load('in-input');await Promise.all([a,b].map(p=>p.getByPlaceholder('Search...').fill('Query')));await compare(a,b,info,'input-filled');
 await load('in-input-group');await Promise.all([a,b].map(p=>p.getByRole('button',{name:'Voice Mode'}).click()));await Promise.all([a,b].map(p=>p.mouse.move(0,0)));await compare(a,b,info,'voice-enabled');await expect(b.getByPlaceholder('Record and send audio...')).toBeDisabled();
 await Promise.all([a,b].map(p=>p.getByRole('button',{name:'Voice Mode'}).click()));await Promise.all([a,b].map(p=>p.mouse.move(0,0)));await compare(a,b,info,'voice-disabled');await expect(b.getByPlaceholder('Send a message...')).toBeEnabled();
 await load('customized');await Promise.all([a,b].map(p=>p.getByText('Text',{exact:true}).click()));await compare(a,b,info,'dynamic-style');await expect(b.getByRole('group',{name:'Custom group'})).toHaveCSS('width','320px');await expect(b.getByRole('group',{name:'Custom group'})).toHaveAttribute('data-ref','attached');await expect(b.locator('[data-slot="button-group-text"]')).toHaveCSS('width','80px');
 }finally{await context.close();}
});

test('official registry ButtonGroup compositions are verified or explicitly pending',async({request})=>{
 const source=await readFile('generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/button-group-example.tsx','utf8');
 const names=[...source.matchAll(/function (ButtonGroup\w+)\(/g)].map(m=>m[1]).filter(n=>n!=='ButtonGroupExample');
 const mapped:Record<string,string>={ButtonGroupBasic:'basic',ButtonGroupWithInput:'with-input',ButtonGroupWithIcons:'icons',ButtonGroupWithInputGroup:'showcase-input-group',ButtonGroupWithLike:'like',ButtonGroupNested:'showcase-nested',ButtonGroupPagination:'pagination',ButtonGroupPaginationSplit:'pagination-split',ButtonGroupNavigation:'navigation',ButtonGroupVertical:'orientation',ButtonGroupVerticalNested:'nested-vertical'};
 const pending:Record<string,string>={ButtonGroupWithText:'Official Label render combination pending',ButtonGroupWithDropdown:'Dropdown Menu pending',ButtonGroupWithSelect:'Select and Field/Label pending',ButtonGroupWithFields:'Field/Label pending',ButtonGroupWithSelectAndInput:'Select pending',ButtonGroupTextAlignment:'Field/Label pending'};
 expect(names).toHaveLength(17);const index=await(await request.get(`${stylexURL}/index.json`)).json();
 for(const name of names){if(name in pending)continue;expect(mapped[name],name).toBeTruthy();expect(index.entries[`components-buttongroup--${mapped[name]}`]?.tags,name).toContain('parity');}
});
