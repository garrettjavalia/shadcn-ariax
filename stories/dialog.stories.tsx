import type {CSSProperties} from 'react';
import {ModalContext} from 'react-aria-components';
import * as Registry from './dialog-examples/registry';
import {DialogRtl} from './dialog-examples/dialog-rtl';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {Dialog,DialogTrigger,DialogClose,DialogTitle,DialogHeader,DialogFooter,DialogDescription} from '@dialog';
import {Button} from '@button';
import {DialogDemo} from './dialog-examples/dialog-demo';
import {DialogCloseButton} from './dialog-examples/dialog-close-button';
import {DialogNoCloseButton} from './dialog-examples/dialog-no-close-button';
import {DialogScrollableContent} from './dialog-examples/dialog-scrollable-content';
import {DialogStickyFooter} from './dialog-examples/dialog-sticky-footer';
import {customized} from '@dialog-customizations';
const meta={title:'Components/Dialog',component:Dialog,args:{children:null},tags:['parity','viewport-390'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta<typeof Dialog>;
export default meta;type Story=StoryObj<typeof meta>;
export const Demo:Story={render:()=> <DialogDemo/>};
export const CloseButton:Story={render:()=> <DialogCloseButton/>};
export const NoCloseButton:Story={render:()=> <DialogNoCloseButton/>};
export const ScrollableContent:Story={render:()=> <DialogScrollableContent/>};
export const StickyFooter:Story={render:()=> <DialogStickyFooter/>};
export const Usage:Story={render:()=> <DialogTrigger><Button>Open</Button><Dialog data-parity-portal><DialogTitle>Title</DialogTitle><DialogDescription>Description</DialogDescription><DialogClose>Close</DialogClose></Dialog></DialogTrigger>};
export const Rtl:Story={render:()=> <DialogRtl/>};
export const DefaultOpen:Story={render:()=> <DialogTrigger defaultOpen><Button>Open</Button><Dialog data-parity-portal><DialogHeader><DialogTitle>Open dialog</DialogTitle><DialogDescription>Description <a href="#">link</a></DialogDescription></DialogHeader><DialogFooter showCloseButton/></Dialog></DialogTrigger>};
export const Customized:Story={render:()=> <DialogTrigger><Button>Custom</Button><Dialog data-parity-portal {...customized}><DialogTitle>Custom dialog</DialogTitle><DialogFooter showCloseButton/></Dialog></DialogTrigger>};
export const NonDismissable:Story={render:()=> <DialogTrigger><Button>Persistent</Button><Dialog data-parity-portal isDismissable={false} isKeyboardDismissDisabled><DialogTitle>Persistent dialog</DialogTitle><DialogClose>Close</DialogClose></Dialog></DialogTrigger>};

export const RegistryForm:Story={render:()=> <Registry.DialogWithForm/>};
export const RegistryScrollable:Story={render:()=> <Registry.DialogScrollableContent/>};
export const RegistrySticky:Story={render:()=> <Registry.DialogWithStickyFooter/>};
export const RegistryNoClose:Story={render:()=> <Registry.DialogNoCloseButton/>};

export const Context:Story={render:()=> <ModalContext.Provider value={{isOpen:true,isDismissable:false}}><Dialog data-parity-portal><DialogTitle>Context dialog</DialogTitle><DialogDescription>Inherited open state</DialogDescription></Dialog></ModalContext.Provider>};
export const CallbackStyle:Story={render:()=> <DialogTrigger defaultOpen><Button>Open callback</Button><Dialog data-parity-portal style={({isEntering,isExiting,defaultStyle})=>({...defaultStyle,opacity:isEntering||isExiting?.5:.9})}><DialogTitle>Callback dialog</DialogTitle><DialogFooter showCloseButton/></Dialog></DialogTrigger>};

export const HeadingToken:Story={render:()=> <DialogTrigger defaultOpen><Button>Open heading</Button><Dialog data-parity-portal style={{"--font-heading":"Courier New"} as CSSProperties}><DialogTitle>Inherited heading font</DialogTitle><DialogDescription>CLI transformation keeps heading font inherited</DialogDescription></Dialog></DialogTrigger>};
