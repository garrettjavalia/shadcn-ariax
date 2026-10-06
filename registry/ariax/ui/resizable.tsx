'use client';
import * as stylex from '@stylexjs/stylex';
import * as Primitive from 'react-resizable-panels';
type Custom<P>=Omit<P,'className'>&{className?:never;xstyle?:stylex.StyleXStyles};
export type ResizablePanelGroupProps=Custom<Primitive.GroupProps>;
export type ResizablePanelProps=Custom<Primitive.PanelProps>;
export type ResizableHandleProps=Custom<Primitive.SeparatorProps>&{withHandle?:boolean};
export function ResizablePanelGroup({className:_,xstyle,style,...props}:ResizablePanelGroupProps){const sx=stylex.props(styles.group,xstyle);return <Primitive.Group data-slot="resizable-panel-group" {...props} className={sx.className} style={{...sx.style,...style}}/>;}
export function ResizablePanel({className:_,xstyle,style,...props}:ResizablePanelProps){const sx=stylex.props(xstyle);return <Primitive.Panel data-slot="resizable-panel" {...props} className={sx.className} style={{...sx.style,...style}}/>;}
export function ResizableHandle({withHandle,className:_,xstyle,style,...props}:ResizableHandleProps){const sx=stylex.props(styles.handle,xstyle);return <Primitive.Separator data-slot="resizable-handle" {...props} className={['ariax-resizable-handle',sx.className].join(' ')} style={{...sx.style,...style}}>{withHandle&&<div className={stylex.props(styles.icon).className}/>}</Primitive.Separator>;}
const horizontal=':is([aria-orientation="horizontal"])';
const styles=stylex.create({
 group:{display:'flex',height:'100%',width:'100%',flexDirection:{default:null,':is([aria-orientation="vertical"])':'column'}},
 handle:{position:'relative',display:'flex',width:{default:'1px',[horizontal]:'100%'},height:{default:null,[horizontal]:'1px'},alignItems:'center',justifyContent:'center',backgroundColor:'var(--border)','--ariax-resizable-after-start':{default:'50%',[horizontal]:'0px'},'--ariax-resizable-after-width':{default:'calc(var(--ariax-spacing, .25rem) * 1)',[horizontal]:'100%'},'--ariax-resizable-after-height':{default:'auto',[horizontal]:'calc(var(--ariax-spacing, .25rem) * 1)'},'--ariax-resizable-after-translate':{default:'-50% 0',':dir(rtl)':'50% 0',[horizontal]:'0 -50%',[horizontal+':dir(rtl)']:'0 -50%'},boxShadow:{default:null,':focus-visible':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px var(--ring), 0 0 0 0 #0000'},outlineStyle:{default:null,':focus-visible':'none','@media (forced-colors: active)':{default:null,':focus-visible':'solid'}},outlineWidth:{default:null,'@media (forced-colors: active)':{default:null,':focus-visible':2}},outlineColor:{default:null,'@media (forced-colors: active)':{default:null,':focus-visible':'transparent'}},outlineOffset:{default:null,'@media (forced-colors: active)':{default:null,':focus-visible':2}}},
 icon:{zIndex:10,display:'flex',flexShrink:0,backgroundColor:'var(--border)',height:'calc(var(--ariax-spacing, .25rem) * 6)',width:'calc(var(--ariax-spacing, .25rem) * 1)',borderRadius:'var(--radius)',rotate:{default:null,':is([aria-orientation="horizontal"]>*)':'90deg'}},
});
