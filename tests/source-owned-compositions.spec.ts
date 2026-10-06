import {test,expect} from '@playwright/test';
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {assertSourceComponents} from './source-components';

const formComponents=new Set(['button-group','input-group','field','input','textarea','checkbox','label','kbd','tooltip','native-select','radio-group','select','combobox','switch','toggle','toggle-group','input-otp']);
const originalRoot='generated/upstream/shadcn/apps/v4/examples/aria';
function officialFixturePairs(){
 const pairs:{source:string;fixture:string;proxy:boolean}[]=[];
 for(const directory of readdirSync('stories').filter(name=>name.endsWith('-examples'))){
  const component=directory.slice(0,-'-examples'.length);
  if(formComponents.has(component))continue;
  for(const filename of readdirSync(`stories/${directory}`).filter(name=>name.endsWith('.tsx'))){
   const fixture=`stories/${directory}/${filename}`;
   // This module exports the Markdown parser shared by Message examples;
   // it is not a port of the separately unpublished bubble-markdown example.
   if(fixture==='stories/bubble-examples/markdown.tsx'){
    expect(readFileSync(fixture,'utf8')).toContain('export function Markdown(');
    continue;
   }
   const source=[`${originalRoot}/${filename}`,`${originalRoot}/${component}-${filename}`].find(existsSync);
   if(source)pairs.push({source,fixture,proxy:component==='sidebar'&&readFileSync(fixture,'utf8').includes('from "./portal"')});
  }
 }
 return pairs;
}

test('existing official composition fixtures retain their original UI components',async()=>{
 const pairs=officialFixturePairs();
 expect(pairs.length,'The audited official fixture inventory must remain present').toBeGreaterThanOrEqual(247);
 for(const {source,fixture,proxy} of pairs)await test.step(fixture,()=>assertSourceComponents(source,fixture,{},proxy?{fixtureUiModules:['./portal']}:{}));
 for(const [example,fixture] of [['badge-spinner','stories/badge.stories.tsx'],['skeleton-card','stories/skeleton.stories.tsx'],['card-spacing','stories/card.stories.tsx']] as const)
  await test.step(example,()=>assertSourceComponents(`${originalRoot}/${example}.tsx`,fixture));
});
