import {test,expect} from '@playwright/test';
import {PNG} from 'pngjs';
import {compare} from './compare';

test('portal comparison captures the fixed viewport while preserving overflow geometry',async({browser},info)=>{
 const context=await browser.newContext({viewport:{width:390,height:900}});
 const pages=await Promise.all([0,1].map(()=>context.newPage()));
 try{
  await Promise.all(pages.map(page=>page.setContent('<style>body{margin:0}#portal{position:absolute;left:12px;top:12px;width:382px;height:509px;background:#123456}</style><main id="parity-root">Trigger</main><div id="portal" data-parity-portal>Options</div>')));
  for(const page of pages){const screenshot=page.screenshot.bind(page);page.screenshot=async options=>{expect(options?.fullPage).not.toBe(true);const result=await screenshot(options);const png=PNG.sync.read(result);expect([png.width,png.height]).toEqual([390,900]);return result;};}
  const geometry=()=>Promise.all(pages.map(page=>page.locator('#portal').evaluate(el=>({rect:el.getBoundingClientRect().toJSON(),scrollWidth:document.documentElement.scrollWidth}))));
  const before=await geometry();expect(before[0].scrollWidth).toBe(394);
  await compare(pages[0],pages[1],info,'overflow-portal');expect(await geometry()).toEqual(before);
  // A canvas pixel change is invisible to computed CSS and remains a hard failure.
  await Promise.all(pages.map(page=>page.locator('#portal').evaluate(el=>{const canvas=document.createElement('canvas');canvas.width=10;canvas.height=10;el.append(canvas);const context=canvas.getContext('2d')!;context.fillStyle='#000';context.fillRect(0,0,10,10);}))); 
  await pages[1].locator('canvas').evaluate(canvas=>{const context=(canvas as HTMLCanvasElement).getContext('2d')!;context.fillStyle='#fff';context.fillRect(0,0,10,10);});
  await expect(compare(pages[0],pages[1],info,'intentional-visible-pixels')).rejects.toThrow('RGBA difference');
 }finally{await context.close();}
});
