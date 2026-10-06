import type {Meta,StoryObj} from '@storybook/react-vite';
import {useState} from 'react';
import {Group,I18nProvider} from 'react-aria-components';
import {SearchIcon} from 'lucide-react';
import {Combobox,ComboboxContent,ComboboxInput,ComboboxItem,ComboboxList,ComboboxValue,ComboboxEmpty,ComboboxGroup,ComboboxLabel,ComboboxSeparator,ComboboxTrigger,useComboboxAnchor} from '@combobox';
import {InputGroup as InputGroupComponent,InputGroupInput,InputGroupAddon} from '@input-group';
import {ComboboxWithCustomItems} from './combobox-examples/combobox-custom';
import ComboboxBasic from './combobox-examples/combobox-basic';
import {ComboboxMultiple} from './combobox-examples/combobox-multiple';
import {ComboboxWithClear} from './combobox-examples/combobox-clear';
import {ComboboxWithGroupsAndSeparator} from './combobox-examples/combobox-groups';
import {ComboboxInvalid} from './combobox-examples/combobox-invalid';
import {ComboboxDisabled} from './combobox-examples/combobox-disabled';
import {ComboxboxInputGroup} from './combobox-examples/combobox-input-group';
import {ComboboxRtl} from './combobox-examples/combobox-rtl';
import {comboboxCustom,comboboxItemCustom,comboboxPopoverCustom} from '@combobox-customizations';
const meta={title:'Components/Combobox',component:Combobox,tags:['parity'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta<typeof Combobox>;
export default meta;type Story=StoryObj<typeof meta>;
export const Custom:Story={render:()=> <ComboboxWithCustomItems/>};
export const Demo:Story={render:()=> <ComboboxBasic/>};
export const Basic:Story={render:()=> <ComboboxBasic/>};
export const Multiple:Story={render:()=> <ComboboxMultiple/>};
export const Clear:Story={render:()=> <ComboboxWithClear/>};
export const Groups:Story={render:()=> <ComboboxWithGroupsAndSeparator/>};
export const Invalid:Story={render:()=> <ComboboxInvalid/>};
export const Disabled:Story={render:()=> <ComboboxDisabled/>};
export const InputGroup:Story={render:()=> <ComboxboxInputGroup/>};
export const Rtl:Story={render:()=> <ComboboxRtl/>};
export const RtlChips:Story={render:()=> <I18nProvider locale="ar"><div dir="rtl"><ComboboxRtl/></div></I18nProvider>};
const items=['Next.js','SvelteKit','Nuxt.js','Remix','Astro'];
export const Usage:Story={render:()=> <Combobox><ComboboxInput placeholder="Select a framework"/><ComboboxContent><ComboboxList>{items.map(item=><ComboboxItem key={item} id={item}>{item}</ComboboxItem>)}</ComboboxList></ComboboxContent></Combobox>};
function ControlledExample(){const [value,setValue]=useState<string|null>('Next.js');return <><Combobox value={value} onChange={key=>setValue(key as string)} aria-label="Controlled framework"><ComboboxInput showClear/><ComboboxContent><ComboboxList>{items.map(item=><ComboboxItem key={item} id={item} isDisabled={item==='Nuxt.js'}>{item}</ComboboxItem>)}</ComboboxList></ComboboxContent></Combobox><output>{value}</output></>;}
export const Controlled:Story={render:()=> <ControlledExample/>};
function CustomExample(){const [width,setWidth]=useState(220);return <><Combobox aria-label="Customized framework" {...comboboxCustom(width)}><ComboboxInput placeholder="Customized" style={{lineHeight:1.75}}/><ComboboxContent {...comboboxPopoverCustom(width)}><ComboboxList><ComboboxGroup><ComboboxLabel>Frameworks</ComboboxLabel>{items.slice(0,2).map(item=><ComboboxItem key={item} id={item} {...comboboxItemCustom}>{({isSelected})=><span>{item} {isSelected?'selected':''}</span>}</ComboboxItem>)}</ComboboxGroup><ComboboxSeparator/><ComboboxGroup>{items.slice(2).map(item=><ComboboxItem key={item} id={item}>{item}</ComboboxItem>)}</ComboboxGroup></ComboboxList></ComboboxContent></Combobox><button onClick={()=>setWidth(280)}>Resize</button></>;}
export const Customized:Story={render:()=> <CustomExample/>};
function PopupInputExample(){const anchor=useComboboxAnchor();return <Combobox aria-label="Popup framework"><Group ref={anchor}><ComboboxInput showTrigger={false}/><ComboboxTrigger><ComboboxValue/></ComboboxTrigger></Group><ComboboxContent anchor={anchor}><InputGroupComponent><InputGroupInput placeholder="Search popup"/><InputGroupAddon><SearchIcon/></InputGroupAddon></InputGroupComponent><ComboboxList renderEmptyState={()=> <ComboboxEmpty>No matches</ComboboxEmpty>}>{items.map(item=><ComboboxItem key={item} id={item}>{item}</ComboboxItem>)}</ComboboxList></ComboboxContent></Combobox>;}
export const PopupInput:Story={render:()=> <PopupInputExample/>};
