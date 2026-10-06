import {NativeSelectBasic,NativeSelectWithGroups,NativeSelectSizes,NativeSelectWithField} from "./native-select-example";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { nativeSelectCustomized,nativeSelectOptionCustomized,nativeSelectGroupCustomized } from '@customizations';
import { useState } from 'react';
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from '@native-select';
import DemoExample from './native-select-demo';
import GroupsExample from './native-select-groups';
import { NativeSelectDisabled } from './native-select-disabled';
import { NativeSelectInvalid } from './native-select-invalid';
import { Field, FieldLabel, FieldDescription, FieldError } from '@field';
const meta={title:'Components/Native Select',component:NativeSelect,tags:['parity'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta<typeof NativeSelect>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Demo:Story={render:()=> <DemoExample/>};
export const Groups:Story={render:()=> <GroupsExample/>};
export const Disabled:Story={render:()=> <NativeSelectDisabled/>};
export const Invalid:Story={render:()=> <NativeSelectInvalid/>};
export const Small:Story={render:()=> <NativeSelect size="sm"><NativeSelectOption value="">Select status</NativeSelectOption><NativeSelectOption value="todo">Todo</NativeSelectOption></NativeSelect>};
export const Usage:Story={render:()=> <NativeSelect aria-label="Fruit"><NativeSelectOption value="">Select a fruit</NativeSelectOption>{['apple','banana','blueberry','pineapple'].map(f=><NativeSelectOption key={f} value={f}>{f[0].toUpperCase()+f.slice(1)}</NativeSelectOption>)}</NativeSelect>};
export const Rtl:Story={render:()=> <NativeSelect dir="rtl"><NativeSelectOption value="">اختر الحالة</NativeSelectOption><NativeSelectOption value="todo">مهام</NativeSelectOption><NativeSelectOption value="in-progress">قيد التنفيذ</NativeSelectOption><NativeSelectOption value="done">منجز</NativeSelectOption><NativeSelectOption value="cancelled">ملغي</NativeSelectOption></NativeSelect>};
export const States:Story={render:()=> <div style={{display:'grid',gap:16}}>{(['default','sm'] as const).map(size=><div key={size} style={{display:'flex',gap:16}}>{[{}, {disabled:true},{'aria-invalid':true},{disabled:true,'aria-invalid':true}].map((state,i)=><NativeSelect key={i} size={size} {...state} aria-label={`${size} ${i}`}><NativeSelectOption>State</NativeSelectOption></NativeSelect>)}</div>)}</div>};
export const DisabledOptions:Story={render:()=> <NativeSelect aria-label="Available choice"><NativeSelectOption value="one">One</NativeSelectOption><NativeSelectOption disabled value="two">Two</NativeSelectOption><NativeSelectOptGroup disabled label="Unavailable"><NativeSelectOption value="three">Three</NativeSelectOption></NativeSelectOptGroup><NativeSelectOption value="four">Four</NativeSelectOption></NativeSelect>};
export const Inline:Story={render:()=> <NativeSelect style={{width:190,fontSize:18,lineHeight:1.5}}><NativeSelectOptGroup label="Group" style={{color:'red'}}><NativeSelectOption style={{color:'blue'}}>Inline style</NativeSelectOption></NativeSelectOptGroup></NativeSelect>};
export const FieldComposition:Story={render:()=> <div style={{width:300}}><Field data-invalid><FieldLabel htmlFor="select-field">Department</FieldLabel><NativeSelect id="select-field" aria-invalid="true" aria-describedby="select-description select-error"><NativeSelectOption value="">Choose department</NativeSelectOption><NativeSelectOption value="engineering">Engineering</NativeSelectOption></NativeSelect><FieldDescription id="select-description">Choose a department.</FieldDescription><FieldError id="select-error">Department is required.</FieldError></Field></div>};
function FormExample(){const [value,setValue]=useState('one');return <form><NativeSelect aria-label="Controlled choice" name="choice" value={value} onChange={e=>setValue(e.target.value)}><NativeSelectOption value="one">One</NativeSelectOption><NativeSelectOption value="two">Two</NativeSelectOption></NativeSelect><output>{value}</output></form>;}
export const Controlled:Story={render:()=> <FormExample/>};
function CustomExample(){const [width,setWidth]=useState(220);return <><NativeSelect {...nativeSelectCustomized(width)} aria-label="Custom choice"><NativeSelectOptGroup label="Customized" {...nativeSelectGroupCustomized}><NativeSelectOption {...nativeSelectOptionCustomized} value="one">One</NativeSelectOption><NativeSelectOption value="two">Two</NativeSelectOption></NativeSelectOptGroup></NativeSelect><button type="button" onClick={()=>setWidth(280)}>Resize</button></>;}
export const Customized:Story={render:()=> <CustomExample/>};

export const OfficialBasic:Story={render:()=> <NativeSelectBasic/>};
export const OfficialGroups:Story={render:()=> <NativeSelectWithGroups/>};
export const OfficialSizes:Story={render:()=> <NativeSelectSizes/>};
export const OfficialField:Story={render:()=> <div style={{width:300}}><NativeSelectWithField/></div>};

export const DomProps:Story={render:()=> <div style={{display:"flex",gap:16}}><NativeSelect data-size="sm" title="Override default size"><NativeSelectOption>Small by DOM prop</NativeSelectOption></NativeSelect><NativeSelect size="sm" data-size="default" title="Override small size"><NativeSelectOption>Default by DOM prop</NativeSelectOption></NativeSelect></div>};
export const Multiple:Story={render:()=> <NativeSelect multiple defaultValue={["apple","banana"]} aria-label="Multiple fruits"><NativeSelectOption value="apple">Apple</NativeSelectOption><NativeSelectOption value="banana">Banana</NativeSelectOption><NativeSelectOption value="pineapple">Pineapple</NativeSelectOption></NativeSelect>};
