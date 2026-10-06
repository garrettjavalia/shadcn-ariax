import type {Meta,StoryObj} from '@storybook/react-vite';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@accordion';
import DemoExample from './accordion-examples/accordion-demo';
import {AccordionBasic} from './accordion-examples/accordion-basic';
import {AccordionMultiple} from './accordion-examples/accordion-multiple';
import DisabledExample from './accordion-examples/accordion-disabled';
import BordersExample from './accordion-examples/accordion-borders';
import CardExample from './accordion-examples/accordion-card';
import {AccordionRtl} from './accordion-examples/accordion-rtl';
const meta={title:'Components/Accordion',component:Accordion,tags:['parity'],decorators:[Story=><main id="parity-root" style={{width:600,padding:24}}><Story/></main>]} satisfies Meta<typeof Accordion>;
export default meta;type Story=StoryObj<typeof meta>;
export const Demo:Story={render:()=> <DemoExample/>};export const Basic:Story={render:()=> <AccordionBasic/>};export const Multiple:Story={render:()=> <AccordionMultiple/>};export const Disabled:Story={render:()=> <DisabledExample/>};export const Borders:Story={render:()=> <BordersExample/>};export const Card:Story={render:()=> <CardExample/>};export const Rtl:Story={render:()=> <div dir="rtl"><AccordionRtl/></div>};
export const Usage:Story={render:()=> <Accordion defaultExpandedKeys={['item-1']}><AccordionItem id="item-1"><AccordionTrigger>Is it accessible?</AccordionTrigger><AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent></AccordionItem></Accordion>};
export const Descendants:Story={render:()=> <Accordion defaultExpandedKeys={['content']}><AccordionItem id="content"><AccordionTrigger>Rich content</AccordionTrigger><AccordionContent style={({isFocusVisibleWithin})=>({opacity:isFocusVisibleWithin?.8:1})}><p>First paragraph <a href="#content">link</a>.</p><p>Last paragraph.</p></AccordionContent></AccordionItem></Accordion>};
import {useState} from 'react';
import {customized,contentCustom} from '@accordion-customizations';
function ControlledExample(){const [expanded,setExpanded]=useState(new Set<string|number>());const[width,setWidth]=useState(300);const[disabled,setDisabled]=useState(false);return <><button onClick={()=>setWidth(360)}>Resize</button><button onClick={()=>setDisabled(value=>!value)}>Disable</button><output>{[...expanded].join(',')}</output><Accordion isDisabled={disabled} expandedKeys={expanded} onExpandedChange={setExpanded} {...customized(width)}><AccordionItem id="one" style={({isExpanded})=>({opacity:isExpanded?1:.8})}><AccordionTrigger style={({isHovered})=>({fontSize:isHovered?20:undefined})}>Controlled</AccordionTrigger><AccordionContent {...contentCustom}><p>Custom content</p></AccordionContent></AccordionItem></Accordion></>}
export const Controlled:Story={render:()=> <ControlledExample/>};
export const Motion:Story={render:()=> <Accordion><AccordionItem id="motion">{({isExpanded})=><><AccordionTrigger>Motion</AccordionTrigger><AccordionContent data-open={isExpanded?'':undefined} data-closed={!isExpanded?'':undefined}><p>Animated panel content.</p><p>Second line.</p></AccordionContent></>}</AccordionItem></Accordion>};
import type {CSSProperties} from 'react';
function TokenMotionExample(){return <Accordion><AccordionItem id="token-motion">{({isExpanded})=><><AccordionTrigger>Token motion</AccordionTrigger><AccordionContent data-state={isExpanded?'open':'closed'} style={{'--accordion-panel-height':'80px'} as CSSProperties}><p>Token height.</p></AccordionContent></>}</AccordionItem></Accordion>}
export const TokenMotion:Story={render:()=> <TokenMotionExample/>};
export const FalseFlags:Story={render:()=> <Accordion defaultExpandedKeys={['false-flags']}><AccordionItem id="false-flags"><AccordionTrigger>False flags</AccordionTrigger><AccordionContent data-open="false" data-closed="false">No active motion</AccordionContent></AccordionItem></Accordion>};
