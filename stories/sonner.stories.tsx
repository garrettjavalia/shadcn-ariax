import * as React from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {ThemeProvider} from 'next-themes';
import {Toaster} from '@sonner';
import {toast} from 'sonner';
import {Button} from '@button';
import {custom,toastCustom} from '@sonner-customizations';
import {SonnerDemo} from './sonner-examples/demo';
import {SonnerTypes} from './sonner-examples/types';
import {SonnerDescription} from './sonner-examples/description';
import {SonnerPosition} from './sonner-examples/position';
import {SonnerBasic,SonnerWithDescription} from './sonner-examples/registry';
function Nova({children}:{children:React.ReactNode}){React.useLayoutEffect(()=>{document.documentElement.classList.add('style-nova');return()=>{document.documentElement.classList.remove('style-nova');toast.dismiss();}},[]);return children;}
const meta={title:'Components/Sonner',component:Toaster,tags:['parity'],decorators:[(Story,ctx)=><ThemeProvider attribute="class" forcedTheme={ctx.globals.theme} enableSystem={false}><main id="parity-root"><Nova><Story/>{ctx.parameters.toaster !== false && <Toaster {...ctx.parameters.toaster}/>}</Nova></main></ThemeProvider>]} satisfies Meta<typeof Toaster>;
export default meta;type Story=StoryObj<typeof meta>;
export const Demo:Story={render:()=> <SonnerDemo/>};
export const Types:Story={render:()=> <SonnerTypes/>};
export const Description:Story={render:()=> <SonnerDescription/>};
export const Position:Story={tags:['viewport-390'],render:()=> <SonnerPosition/>};
export const RegistryBasic:Story={render:()=> <><SonnerBasic/></>};
export const RegistryDescription:Story={render:()=> <><SonnerWithDescription/></>};
export const Usage:Story={render:()=> <><Button onPress={()=>toast('Event has been created.')}>Show Toast</Button></>};
export const Rtl:Story={parameters:{toaster:{dir:'rtl',closeButton:true}},tags:['viewport-390'],render:()=> <><Button onPress={()=>toast.success('تم إنشاء الحدث',{description:'تفاصيل الحدث',action:{label:'تراجع',onClick:()=>toast.dismiss()}})}>RTL Toast</Button></>};
export const RichColors:Story={parameters:{toaster:{richColors:true,closeButton:true}},render:()=> <SonnerTypes/>};
export const Custom:Story={parameters:{toaster:{...custom,toastOptions:toastCustom}},render:()=> <SonnerDemo/>};
export const Loading:Story={parameters:{toaster:{closeButton:true}},render:()=> <><Button onPress={()=>toast.loading('Loading...')}>Load</Button></>};
function Stack(){return <><Button onPress={()=>{for(let i=1;i<=4;i++)toast('Event '+i,{description:'Stacked notification',duration:Infinity});}}>Stack</Button></>;}
export const Stacked:Story={parameters:{toaster:{closeButton:true}},render:()=> <Stack/>};
export const NonDismissible:Story={parameters:{toaster:{closeButton:true}},render:()=> <><Button onPress={()=>toast('Fixed notification',{dismissible:false,duration:Infinity})}>Fixed</Button></>};
function LifecyclePreview(){const[state,setState]=React.useState('Idle');return <><Button onPress={()=>{setState('Open');toast('Timed notification',{duration:1000,onAutoClose:()=>setState('Auto closed'),onDismiss:()=>setState('Dismissed')});}}>Timed</Button><output>{state}</output></>;}
export const Lifecycle:Story={parameters:{toaster:{closeButton:true}},render:()=> <LifecyclePreview/>};
function ControlsPreview(){const[id,setId]=React.useState<number|string>();const[state,setState]=React.useState('Idle');return <><Button onPress={()=>setId(toast.loading('Pending',{duration:Infinity}))}>Start</Button><Button onPress={()=>toast.success('Updated',{id,duration:Infinity})}>Update</Button><Button onPress={()=>toast.dismiss(id)}>Dismiss</Button><Button onPress={()=>toast.error('Failed',{duration:Infinity,action:{label:'Retry',onClick:()=>setState('Retried')},cancel:{label:'Cancel',onClick:()=>setState('Canceled')},onDismiss:()=>setState('Dismissed')})}>Actions</Button><output>{state}</output></>;}
export const Controls:Story={parameters:{toaster:{closeButton:true}},render:()=> <ControlsPreview/>};
function ThemePreview(){const[theme,setTheme]=React.useState<'light'|'dark'>('light');return <><Button onPress={()=>toast('Theme notification',{duration:Infinity})}>Show</Button><Button onPress={()=>setTheme(t=>t==='light'?'dark':'light')}>Switch Theme</Button><output>{theme}</output><Toaster theme={theme}/></>;}
export const Theme:Story={parameters:{toaster:false},render:()=> <ThemePreview/>};
