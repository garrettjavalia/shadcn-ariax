import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from '@select';
import { SelectDemo } from './select-examples/select-demo';
import { SelectGroups } from './select-examples/select-groups';
import { SelectDisabled } from './select-examples/select-disabled';
import { SelectInvalid } from './select-examples/select-invalid';
import { SelectScrollable } from './select-examples/select-scrollable';
import { SelectAutocomplete } from './select-examples/select-autocomplete';
import { SelectRtl } from './select-examples/select-rtl';
import { selectCustom } from '@select-customizations';
const meta={title:'Components/Select',component:Select,tags:['parity'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta<typeof Select>;
export default meta; type Story=StoryObj<typeof meta>;
export const Demo:Story={render:()=> <SelectDemo/>};
export const Groups:Story={render:()=> <SelectGroups/>};
export const Scrollable:Story={render:()=> <SelectScrollable/>};
export const Disabled:Story={render:()=> <SelectDisabled/>};
export const Invalid:Story={render:()=> <SelectInvalid/>};
export const Autocomplete:Story={render:()=> <SelectAutocomplete/>};
export const Rtl:Story={render:()=> <SelectRtl/>};
const items=[{label:'Light',value:'light'},{label:'Dark',value:'dark'},{label:'System',value:'system'}];
export const Usage:Story={render:()=> <Select placeholder="Theme"><SelectTrigger style={{width:180}}><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{items.map(item=><SelectItem key={item.value} id={item.value}>{item.label}</SelectItem>)}</SelectGroup></SelectContent></Select>};
function ControlledExample(){const [value,setValue]=useState<string|null>('light');return <><Select aria-label="Controlled theme" value={value} onChange={key=>setValue(key as string)}><SelectTrigger size="sm" style={{width:180}}><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{items.map(item=><SelectItem key={item.value} id={item.value}>{item.label}</SelectItem>)}</SelectGroup></SelectContent></Select><output>{value}</output></>;}
export const Controlled:Story={render:()=> <ControlledExample/>};
export const Multiple:Story={render:()=> <Select selectionMode="multiple" defaultValue={['light','dark']} aria-label="Themes"><SelectTrigger style={{width:240}}><SelectValue/></SelectTrigger><SelectContent><SelectGroup>{items.map(item=><SelectItem key={item.value} id={item.value}>{item.label}</SelectItem>)}</SelectGroup></SelectContent></Select>};
export const DisabledItems:Story={render:()=> <Select aria-label="Available theme" placeholder="Theme" disabledKeys={['dark']}><SelectTrigger style={{width:180}}><SelectValue/></SelectTrigger><SelectContent><SelectGroup><SelectLabel>Themes</SelectLabel>{items.map(item=><SelectItem key={item.value} id={item.value}>{item.label}</SelectItem>)}</SelectGroup></SelectContent></Select>};
function CustomizedExample(){const [width,setWidth]=useState(220);return <><Select aria-label="Custom theme" placeholder="Theme" {...selectCustom(width)}><SelectTrigger><SelectValue>{({selectedText})=>selectedText||'Custom placeholder'}</SelectValue></SelectTrigger><SelectContent><SelectGroup>{items.map(item=><SelectItem key={item.value} id={item.value} style={({isSelected})=>({opacity:isSelected?.8:1})}>{item.label}</SelectItem>)}</SelectGroup></SelectContent></Select><button onClick={()=>setWidth(280)}>Resize</button></>;}
export const Customized:Story={render:()=> <CustomizedExample/>};
