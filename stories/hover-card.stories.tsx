import * as React from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {HoverCard,HoverCardTrigger} from '@hover-card';
import {Button} from '@button';
import {customized} from '@hover-card-customizations';
import Demo from './hover-card-examples/demo';
import {HoverCardSides} from './hover-card-examples/sides';
import {HoverCardRtl} from './hover-card-examples/rtl';
import * as Registry from './hover-card-examples/registry';
function Nova({children}:{children:React.ReactNode}){React.useLayoutEffect(()=>{document.documentElement.classList.add('style-nova');return()=>document.documentElement.classList.remove('style-nova');},[]);return children;}
const meta={title:'Components/HoverCard',component:HoverCard,tags:['parity','viewport-390'],decorators:[Story=><main id="parity-root"><Nova><Story/></Nova></main>]} satisfies Meta<typeof HoverCard>;
export default meta;type Story=StoryObj<typeof meta>;
export const DemoExample:Story={render:()=> <Demo/>};
export const Sides:Story={render:()=> <HoverCardSides/>};
export const Rtl:Story={render:()=> <HoverCardRtl/>};
export const RegistrySides:Story={render:()=> <Registry.HoverCardSides/>};
export const InDialog:Story={render:()=> <Registry.HoverCardInDialog/>};
export const Usage:Story={render:()=> <HoverCardTrigger><Button variant="link">Hover</Button><HoverCard data-parity-portal>The React Framework – created and maintained by @vercel.</HoverCard></HoverCardTrigger>};
export const Delays:Story={render:()=> <HoverCardTrigger delay={100} closeDelay={200}><Button variant="link">Hover</Button><HoverCard data-parity-portal>Content</HoverCard></HoverCardTrigger>};
export const Positioning:Story={render:()=> <HoverCardTrigger><Button variant="link">Hover</Button><HoverCard data-parity-portal placement="top">Content</HoverCard></HoverCardTrigger>};
export const Customized:Story={render:()=> <HoverCardTrigger><Button>Custom</Button><HoverCard data-parity-portal {...customized}>Custom native width</HoverCard></HoverCardTrigger>};
export const Callback:Story={render:()=> <HoverCardTrigger><Button>Callback</Button><HoverCard data-parity-portal style={({isEntering})=>({opacity:isEntering?.5:1})}>{({placement})=> <p>{placement}</p>}</HoverCard></HoverCardTrigger>};
export const DefaultOpen:Story={render:()=> <HoverCardTrigger defaultOpen><Button>Open</Button><HoverCard data-parity-portal>Default open</HoverCard></HoverCardTrigger>};
function TimedPreview(){const[open,setOpen]=React.useState(false);return <><HoverCardTrigger delay={100} closeDelay={200} onOpenChange={setOpen}><Button variant="link">Hover</Button><HoverCard data-parity-portal>Content</HoverCard></HoverCardTrigger><output data-open={String(open)}>{open?'Open':'Closed'}</output></>;}
export const Timed:Story={render:()=> <TimedPreview/>};
export const Disabled:Story={render:()=> <HoverCardTrigger isDisabled><Button>Disabled preview</Button><HoverCard data-parity-portal>Unavailable preview</HoverCard></HoverCardTrigger>};
export const Interactive:Story={render:()=> <HoverCardTrigger delay={100} closeDelay={200}><Button>Preview actions</Button><HoverCard data-parity-portal><Button>Inside action</Button></HoverCard></HoverCardTrigger>};
