import type {Meta,StoryObj} from '@storybook/react-vite';
import {RadioGroupDemo} from './radio-group-demo';
import {RadioGroupDescription} from './radio-group-description';
import {RadioGroupChoiceCard} from './radio-group-choice-card';
import {RadioGroupFieldset} from './radio-group-fieldset';
import {RadioGroupDisabled} from './radio-group-disabled';
import {RadioGroupInvalid} from './radio-group-invalid';
import {RadioGroupRtl} from './radio-group-rtl';
const meta={title:'Components/Radio Group',tags:['parity'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta;
export default meta;type Story=StoryObj<typeof meta>;
export const Demo:Story={render:()=> <RadioGroupDemo/>};
export const Description:Story={render:()=> <RadioGroupDescription/>};
export const ChoiceCard:Story={render:()=> <RadioGroupChoiceCard/>};
export const Fieldset:Story={render:()=> <RadioGroupFieldset/>};
export const Disabled:Story={render:()=> <RadioGroupDisabled/>};
export const Invalid:Story={render:()=> <RadioGroupInvalid/>};
export const Rtl:Story={render:()=> <RadioGroupRtl/>};
import {useState} from 'react';
import {RadioGroup,RadioGroupItem} from '@radio-group';
import {radioCustom,radioItemCustom} from '@customizations';
function CustomizedExample(){const [width,setWidth]=useState(240);return <><button onClick={()=>setWidth(300)}>Resize</button><RadioGroup aria-label="Custom radios" defaultValue="one" {...radioCustom(width)}><RadioGroupItem value="one" {...radioItemCustom}>{state=><span>{state.isSelected?'Selected':'One'}</span>}</RadioGroupItem><RadioGroupItem value="two" {...radioItemCustom}>Two</RadioGroupItem></RadioGroup></>;}
export const Customized:Story={render:()=> <CustomizedExample/>};
export const GroupStates:Story={render:()=> <>{[true,false].map(disabled=><RadioGroup key={String(disabled)} aria-label={`Disabled ${disabled}`} name={`disabled-${disabled}`} isDisabled={disabled} isReadOnly={!disabled} isRequired defaultValue="one"><RadioGroupItem value="one" data-testid="state-one"/><RadioGroupItem value="two"/></RadioGroup>)}</>};
function ControlledExample(){const [value,setValue]=useState('one');return <form onSubmit={event=>event.preventDefault()}><RadioGroup aria-label="Controlled radios" name="choice" value={value} onChange={setValue} orientation="horizontal" isRequired><RadioGroupItem value="one">One</RadioGroupItem><RadioGroupItem value="two">Two</RadioGroupItem></RadioGroup><output>{value}</output></form>;}
export const Controlled:Story={render:()=> <ControlledExample/>};
