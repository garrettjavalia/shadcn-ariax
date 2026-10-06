import type {ComponentProps} from 'react';
import * as stylex from '@stylexjs/stylex';
export type MessagePartProps=Omit<ComponentProps<'div'>,'className'>&{className?:never;xstyle?:stylex.StyleXStyles};
export type MessageProps=MessagePartProps&{align?:'start'|'end'};
const styles=stylex.create({
 group:{display:'flex',minWidth:0,flexDirection:'column',gap:'.5rem'},
 root:{position:'relative',display:'flex',width:'100%',minWidth:0,flexDirection:{default:null,':is([data-align="end"])':'row-reverse'},fontSize:'.875rem',lineHeight:'calc(1.25 / .875)',gap:'.5rem'},
 avatar:{display:'flex',width:'fit-content',minWidth:'2rem',flexShrink:0,alignItems:'center',justifyContent:'center',alignSelf:'flex-end',overflow:'hidden',borderRadius:'calc(infinity * 1px)',backgroundColor:'var(--muted)',translate:{default:null,':is(.ariax-message:has([data-slot="message-footer"]) *)':'0 -2rem'}},
 content:{display:'flex',width:'100%',minWidth:0,flexDirection:'column',overflowWrap:'break-word',gap:'.625rem'},
 header:{display:'flex',maxWidth:'100%',minWidth:0,alignItems:'center',fontSize:'.75rem',lineHeight:'calc(1 / .75)',fontWeight:500,color:'var(--muted-foreground)',paddingInline:{default:'.75rem',':is(.ariax-message:has([data-variant="ghost"]) *)':0}},
 footer:{display:'flex',maxWidth:'100%',minWidth:0,alignItems:'center',fontSize:'.75rem',lineHeight:'calc(1 / .75)',fontWeight:500,color:'var(--muted-foreground)',paddingInline:{default:'.75rem',':is(.ariax-message:has([data-variant="ghost"]) *)':0},justifyContent:{default:null,':is(.ariax-message[data-align="end"] *)':'flex-end'}},
});
export function Message({align='start',xstyle,style,className:_,...props}:MessageProps){const sx=stylex.props(styles.root,xstyle);return <div data-slot="message" data-align={align} {...props} className={`ariax-message ${sx.className}`} style={{...sx.style,...style}}/>;}
export function MessageGroup({xstyle,style,className:_,...props}:MessagePartProps){const sx=stylex.props(styles.group,xstyle);return <div data-slot="message-group" {...props} className={sx.className} style={{...sx.style,...style}}/>;}
export function MessageAvatar({xstyle,style,className:_,...props}:MessagePartProps){const sx=stylex.props(styles.avatar,xstyle);return <div data-slot="message-avatar" {...props} className={sx.className} style={{...sx.style,...style}}/>;}
export function MessageContent({xstyle,style,className:_,...props}:MessagePartProps){const sx=stylex.props(styles.content,xstyle);return <div data-slot="message-content" {...props} className={`ariax-message-content ${sx.className}`} style={{...sx.style,...style}}/>;}
export function MessageHeader({xstyle,style,className:_,...props}:MessagePartProps){const sx=stylex.props(styles.header,xstyle);return <div data-slot="message-header" {...props} className={sx.className} style={{...sx.style,...style}}/>;}
export function MessageFooter({xstyle,style,className:_,...props}:MessagePartProps){const sx=stylex.props(styles.footer,xstyle);return <div data-slot="message-footer" {...props} className={sx.className} style={{...sx.style,...style}}/>;}
