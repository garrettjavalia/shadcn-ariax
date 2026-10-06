'use client';
import type { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
export type ScrollAreaProps=Omit<ComponentProps<'div'>,'className'>&{className?:never;xstyle?:stylex.StyleXStyles};
export function ScrollArea({className:_,xstyle,style,...props}:ScrollAreaProps){
  const sx=stylex.props(styles.root,xstyle);
  return <div data-slot="scroll-area" {...props} className={sx.className} style={{...sx.style,...style}}/>;
}
const styles=stylex.create({root:{position:'relative',scrollbarWidth:'thin',scrollbarColor:'var(--border) transparent',overflow:'auto',outlineStyle:'none',outlineWidth:{default:null,':focus-visible':1},boxShadow:{default:null,':focus-visible':'0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 0 0 #0000'}}});
