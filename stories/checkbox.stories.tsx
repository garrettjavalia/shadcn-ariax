import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckboxContext, CheckboxGroup } from 'react-aria-components';
import { checkboxCustomized } from '@customizations';
import { Checkbox } from '@checkbox';
const meta = { title:'Components/Checkbox',component:Checkbox,tags:['parity'],decorators:[Story=><main id="parity-root" style={{padding:24}}><Story /></main>] } satisfies Meta<typeof Checkbox>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Usage:Story={args:{'aria-label':'Accept terms'}};
export const States:Story={render:()=> <div style={{display:'flex',gap:24}}><Checkbox aria-label="Checked" defaultSelected/><Checkbox aria-label="Indeterminate" isIndeterminate/><Checkbox aria-label="Disabled" isDisabled/><Checkbox aria-label="Disabled checked" isDisabled defaultSelected/><Checkbox aria-label="Invalid" isInvalid/><Checkbox aria-label="Invalid checked" isInvalid defaultSelected/></div>};
function ControlledExample(){const [selected,setSelected]=useState(false);return <><Checkbox aria-label="Controlled" name="terms" value="yes" isSelected={selected} onChange={setSelected}/><output>{String(selected)}</output></>}
export const Controlled:Story={render:()=> <ControlledExample/>};
export const Context:Story={render:()=> <CheckboxContext.Provider value={{isDisabled:true}}><Checkbox aria-label="Context disabled" defaultSelected/></CheckboxContext.Provider>};
export const Group:Story={render:()=> <CheckboxGroup aria-label="Preferences" defaultValue={['one']}><Checkbox aria-label="One" value="one"/><Checkbox aria-label="Two" value="two"/></CheckboxGroup>};
export const RenderProps:Story={render:()=> <Checkbox aria-label="Render props" style={({isSelected})=>({width:isSelected?24:20})}>{({isSelected})=><span>{isSelected?'On':'Off'}</span>}</Checkbox>};
export const Inline:Story={render:()=> <Checkbox aria-label="Inline" defaultSelected style={{width:24,height:24,borderColor:'red'}}/>};
export const Rtl:Story={render:()=> <div dir="rtl"><Checkbox aria-label="قبول الشروط" defaultSelected/></div>};
function CustomizedExample(){const [width,setWidth]=useState(24); const custom=checkboxCustomized(width); return <><Checkbox {...custom} aria-label="Customized" style={state=>({...custom.style,opacity:state.isSelected?0.4:0.6})}/><button onClick={()=>setWidth(36)}>Resize</button></>}
export const Customized:Story={render:()=> <CustomizedExample/>};
export const FieldDisabled:Story={render:()=> <div className="group/field"><input disabled aria-label="Disabled sibling"/><Checkbox aria-label="Disabled field"/></div>};
export const Indeterminate:Story={args:{'aria-label':'Mixed',isIndeterminate:true}};
