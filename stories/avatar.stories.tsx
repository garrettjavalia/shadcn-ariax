import {useState} from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {PlusIcon} from 'lucide-react';
import {Avatar,AvatarImage,AvatarFallback,AvatarBadge,AvatarGroup,AvatarGroupCount} from '@avatar';
import {avatarLayout,avatarDynamic,avatarFallbackCustom} from '@avatar-customizations';
import AvatarDemo from './avatar-examples/avatar-demo';
import AvatarBasic from './avatar-examples/avatar-basic';
import {AvatarWithBadge} from './avatar-examples/avatar-badge';
import {AvatarBadgeIconExample} from './avatar-examples/avatar-badge-icon';
import {AvatarGroupExample} from './avatar-examples/avatar-group';
import {AvatarGroupCountExample} from './avatar-examples/avatar-group-count';
import {AvatarGroupCountIconExample} from './avatar-examples/avatar-group-count-icon';
import {AvatarSizeExample} from './avatar-examples/avatar-size';
import {AvatarDropdown} from './avatar-examples/avatar-dropdown';
import {AvatarRtl} from './avatar-examples/avatar-rtl';
function Portals({children}:{children:React.ReactNode}){ReactUsePortals();return <main id="parity-root">{children}</main>;}
import {useEffect} from 'react';
function ReactUsePortals(){useEffect(()=>{const register=()=>{for(const child of document.body.children)if(!child.contains(document.querySelector('#parity-root'))&&child.querySelector('[role="menu"]'))child.setAttribute('data-parity-portal','');};const observer=new MutationObserver(register);observer.observe(document.body,{childList:true,subtree:true});register();return()=>observer.disconnect();},[]);}
const meta={title:'Components/Avatar',component:Avatar,tags:['parity'],decorators:[Story=><Portals><Story/></Portals>]} satisfies Meta<typeof Avatar>;export default meta;type Story=StoryObj<typeof meta>;
export const Demo:Story={tags:['viewport-390'],render:()=> <AvatarDemo/>};
export const Basic:Story={render:()=> <AvatarBasic/>};
export const Badge:Story={render:()=> <AvatarWithBadge/>};
export const BadgeIcon:Story={render:()=> <AvatarBadgeIconExample/>};
export const Group:Story={render:()=> <AvatarGroupExample/>};
export const GroupCount:Story={render:()=> <AvatarGroupCountExample/>};
export const GroupCountIcon:Story={render:()=> <AvatarGroupCountIconExample/>};
export const Size:Story={render:()=> <AvatarSizeExample/>};
export const Dropdown:Story={render:()=> <AvatarDropdown/>};
export const Rtl:Story={tags:['viewport-390'],render:()=> <AvatarRtl/>};
const image='/avatar-controlled.svg';
export const States:Story={render:()=> <div {...avatarLayout('states')}>{(['sm','default','lg'] as const).map(size=><Avatar key={size} size={size}><AvatarFallback>CN</AvatarFallback><AvatarBadge><PlusIcon/></AvatarBadge></Avatar>)}<Avatar><AvatarImage src={image} alt="Controlled"/><AvatarFallback>CN</AvatarFallback></Avatar><Avatar><AvatarImage alt="Missing"/><AvatarFallback>CN</AvatarFallback></Avatar><Avatar><AvatarImage src="/avatar-failure.svg"/><AvatarFallback>CN</AvatarFallback></Avatar><Avatar><AvatarImage src="/avatar-delayed.svg"/><AvatarFallback>CN</AvatarFallback></Avatar><Avatar><AvatarImage src={image} onLoad={()=>{}}/><AvatarFallback>Custom callback</AvatarFallback></Avatar><Avatar><AvatarImage src="/avatar-failure.svg" data-testid="error-override" onError={()=>{}}/><AvatarFallback>Error callback</AvatarFallback></Avatar></div>};
export const GroupSizes:Story={render:()=> <div {...avatarLayout('states')}>{(['sm','default','lg','mixed'] as const).map(size=><AvatarGroup key={size}><Avatar size={size==='mixed'?'lg':size}><AvatarFallback>A</AvatarFallback></Avatar><Avatar size={size==='mixed'?'sm':size}><AvatarFallback>B</AvatarFallback></Avatar><AvatarGroupCount><PlusIcon/></AvatarGroupCount></AvatarGroup>)}</div>};
function Dynamic(){const[size,setSize]=useState(32);const[src,setSrc]=useState(image);return <><button onClick={()=>setSize(48)}>Resize</button><button onClick={()=>setSrc('/avatar-failure.svg')}>Fail image</button><button onClick={()=>setSrc(image)}>Recover image</button><Avatar {...avatarDynamic(size)} style={{height:40}}><AvatarImage src={src} alt="Dynamic" style={{opacity:.75}}/><AvatarFallback {...avatarFallbackCustom()} style={{fontWeight:500}}>CN</AvatarFallback></Avatar></>;}
export const Customized:Story={render:()=> <Dynamic/>};

import * as Registry from './avatar-examples/registry';
export const RegistrySizes:Story={render:()=> <Registry.AvatarSizes/>};
export const RegistryBadge:Story={render:()=> <Registry.AvatarWithBadge/>};
export const RegistryBadgeIcon:Story={render:()=> <Registry.AvatarWithBadgeIcon/>};
export const RegistryGroup:Story={render:()=> <Registry.AvatarGroupExample/>};
export const RegistryGroupCount:Story={render:()=> <Registry.AvatarGroupWithCount/>};
export const RegistryGroupCountIcon:Story={render:()=> <Registry.AvatarGroupWithIconCount/>};
export const RegistryEmpty:Story={tags:['viewport-390'],render:()=> <Registry.AvatarInEmpty/>};
