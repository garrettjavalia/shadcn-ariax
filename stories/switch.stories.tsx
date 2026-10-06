import type {Meta,StoryObj} from '@storybook/react-vite';
import {Switch} from '@switch';
import {Label} from '@label';
import {Field,FieldContent,FieldDescription,FieldGroup,FieldLabel,FieldTitle} from '@field';
import {useState} from 'react';
import {switchCustomized} from '@customizations';
import {SwitchContext} from 'react-aria-components';
const meta={title:'Components/Switch',component:Switch,tags:['parity'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta<typeof Switch>;
export default meta;
type Story=StoryObj<typeof meta>;
export function SwitchDemo() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}

export function SwitchSizes() {
  return (
    <FieldGroup style={{width:"100%",maxWidth:"10rem"}}>
      <Field orientation="horizontal">
        <Switch id="switch-size-sm" size="sm" />
        <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="switch-size-default" size="default" />
        <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
      </Field>
    </FieldGroup>
  )
}

export function SwitchDescription() {
  return (
    <Field orientation="horizontal" style={{maxWidth:"24rem"}}>
      <FieldContent>
        <FieldLabel htmlFor="switch-focus-mode">
          Share across devices
        </FieldLabel>
        <FieldDescription>
          Focus is shared across devices, and turns off when you leave the app.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-focus-mode" />
    </Field>
  )
}

export function SwitchDisabled() {
  return (
    <Field orientation="horizontal" data-disabled style={{width:"fit-content"}}>
      <Switch id="switch-disabled-unchecked" isDisabled />
      <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
    </Field>
  )
}

export function SwitchInvalid() {
  return (
    <Field orientation="horizontal" style={{maxWidth:"24rem"}} data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">
          Accept terms and conditions
        </FieldLabel>
        <FieldDescription>
          You must accept the terms and conditions to continue.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-terms" data-invalid />
    </Field>
  )
}

export function SwitchChoiceCard() {
  return (
    <FieldGroup style={{width:"100%",maxWidth:"24rem"}}>
      <FieldLabel htmlFor="switch-share">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>
              Focus is shared across devices, and turns off when you leave the
              app.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-share" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="switch-notifications">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              Receive notifications when focus mode is enabled or disabled.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-notifications" defaultSelected />
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}
export const Demo: Story={render:()=> <SwitchDemo/>};
export const Sizes: Story={render:()=> <SwitchSizes/>};
export const Description: Story={render:()=> <SwitchDescription/>};
export const Disabled: Story={render:()=> <SwitchDisabled/>};
export const Invalid: Story={render:()=> <SwitchInvalid/>};
export const ChoiceCard: Story={render:()=> <SwitchChoiceCard/>};
export const Rtl:Story={render:()=> <Field orientation="horizontal" style={{maxWidth:'24rem'}} dir="rtl"><FieldContent><FieldLabel htmlFor="rtl" dir="rtl">المشاركة عبر الأجهزة</FieldLabel><FieldDescription dir="rtl">يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.</FieldDescription></FieldContent><Switch id="rtl" dir="rtl"/></Field>};
export const Usage:Story={render:()=> <Switch aria-label="Switch"/>};
export const FieldSwitch:Story={render:()=> <Field orientation="horizontal" style={{width:'fit-content'}}><FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel><Switch id="2fa"/></Field>};
export const States:Story={render:()=> <div style={{display:'grid',gap:'1rem'}}>{(['default','sm'] as const).map(size=><div key={size} style={{display:'flex',gap:'2rem'}}><Switch size={size} aria-label={size+' normal'}/><Switch size={size} defaultSelected aria-label={size+' selected'}/><Switch size={size} defaultSelected isDisabled aria-label={size+' disabled'}/><Switch size={size} data-invalid aria-label={size+' invalid'}/></div>)}</div>};
export const Context:Story={render:()=> <SwitchContext.Provider value={{isSelected:true,isDisabled:true}}><Switch aria-label="Context switch"/></SwitchContext.Provider>};
export const RenderProps:Story={render:()=> <Switch aria-label="Render props" style={({isSelected})=>({marginLeft:isSelected?'1rem':'0.5rem'})}>{({isSelected})=><span>{isSelected?'On':'Off'}</span>}</Switch>};

function Custom(){const [height,setHeight]=useState(24);return <><button onClick={()=>setHeight(32)}>Resize</button><Switch aria-label='Custom' {...switchCustomized(height)}/></>;}
export const Customized:Story={render:()=> <Custom/>};
