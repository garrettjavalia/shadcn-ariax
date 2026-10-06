import {test} from '@playwright/test';
import {assertSourceComponents} from './source-components';

test('existing form documentation fixtures retain original UI component JSX uses',async()=>{
 const groups:Record<string,string[]>={
  checkbox:['demo','basic','description','disabled','group','invalid','rtl','table'],
  select:['demo','groups','scrollable','disabled','invalid','autocomplete','rtl'],
  combobox:['basic','multiple','clear','groups','custom','invalid','disabled','input-group','rtl'],
  'toggle-group':['demo','outline','sizes','spacing','vertical','disabled','font-weight-selector','rtl'],
  'input-otp':['demo','pattern','separator','disabled','controlled','invalid','four-digits','alphanumeric','form','rtl'],
 };
 for(const [component,names]of Object.entries(groups))for(const name of names){
  const filename=['input-otp','checkbox'].includes(component)?name:component+'-'+name;
  await assertSourceComponents(`generated/upstream/shadcn/apps/v4/examples/aria/${component}-${name}.tsx`,`stories/${component}-examples/${filename}.tsx`);
 }
 for(const name of ['demo','description','choice-card','fieldset','disabled','invalid','rtl'])await assertSourceComponents(`generated/upstream/shadcn/apps/v4/examples/aria/radio-group-${name}.tsx`,`stories/radio-group-${name}.tsx`);
 for(const name of ['demo','groups','disabled','invalid'])await assertSourceComponents(`generated/upstream/shadcn/apps/v4/examples/aria/native-select-${name}.tsx`,`stories/native-select-${name}.tsx`);
 await assertSourceComponents('generated/upstream/shadcn/apps/v4/examples/aria/kbd-tooltip.tsx','stories/kbd-tooltip.tsx');
 const buttonGroup=['demo','orientation','size','nested','separator','split','input','input-group','dropdown','select','popover','rtl'];
 for(const name of buttonGroup)await assertSourceComponents(`generated/upstream/shadcn/apps/v4/examples/aria/button-group-${name}.tsx`,`stories/button-group-examples/${name}.tsx`);
 for(const component of ['button-group','input-otp'])await assertSourceComponents(`generated/upstream/shadcn/apps/v4/registry/bases/aria/examples/${component}-example.tsx`,`stories/${component}-examples/registry.tsx`);
});
