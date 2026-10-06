import {test,expect} from '@playwright/test';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {assertSourceComponents} from './source-components';

test('source component coverage rejects imports replaced by native stand-ins',async()=>{
 const root=await mkdtemp(join(tmpdir(),'ariax-source-components-'));
 try{
  const source=join(root,'source.tsx'),fixture=join(root,'fixture.tsx');
  await writeFile(source,'import {Input} from "@/styles/aria-nova/ui/input";export default()=> <div><Input/><span>Original native layout</span></div>;');
  await writeFile(fixture,'import {Input} from "@input";export default()=> <div><input/><span>Original native layout</span></div>;');
  await expect(assertSourceComponents(source,fixture)).rejects.toThrow('fixture Input has 0');
  await writeFile(fixture,'import {Input as RenamedInput} from "@input";export default()=> <div><RenamedInput/><span>Original native layout</span></div>;');
  await assertSourceComponents(source,fixture);
  await writeFile(source,'import {Input} from "@/styles/aria-nova/ui/input";export default()=> <><Input/><Input/></>;');
  await expect(assertSourceComponents(source,fixture)).rejects.toThrow('has 2 JSX uses');
 }finally{await rm(root,{recursive:true,force:true});}
});
test('source component coverage follows fixture wrappers and explicit canonical aliases',async()=>{
 const root=await mkdtemp(join(tmpdir(),'ariax-source-wrappers-'));
 try{
  const source=join(root,'source.tsx'),fixture=join(root,'fixture.tsx');
  await writeFile(source,'import {SelectContent} from "@/styles/aria-nova/ui/select";export default()=> <SelectContent/>;');
  await writeFile(fixture,'import {Example} from "./example";export default()=> <Example/>;');
  await writeFile(join(root,'example.tsx'),'import {SelectList} from "@select";export const Example=()=> <SelectList/>;');
  await assertSourceComponents(source,fixture,{SelectContent:'SelectList'});
 }finally{await rm(root,{recursive:true,force:true});}
});
test('explicit UI proxies preserve each call and must delegate to real components',async()=>{
 const root=await mkdtemp(join(tmpdir(),'ariax-source-proxies-'));
 try{
  const source=join(root,'source.tsx'),fixture=join(root,'fixture.tsx'),proxy=join(root,'portal.tsx');
  await writeFile(source,'import {SidebarMenuButton} from "@/styles/aria-nova/ui/sidebar";export default()=> <><SidebarMenuButton/><SidebarMenuButton/></>;');
  await writeFile(fixture,'import {SidebarMenuButton} from "./portal";export default()=> <><SidebarMenuButton/><SidebarMenuButton/></>;');
  await writeFile(proxy,'import {SidebarMenuButton as Primitive} from "@sidebar";export const SidebarMenuButton=()=> <Primitive/>;');
  const options={fixtureUiModules:['./portal']};
  await assertSourceComponents(source,fixture,{},options);
  await writeFile(proxy,'import {SidebarMenuButton as Primitive} from "@sidebar";export const SidebarMenuButton=()=> <button/>;');
  await expect(assertSourceComponents(source,fixture,{},options)).rejects.toThrow('does not delegate');
 }finally{await rm(root,{recursive:true,force:true});}
});
