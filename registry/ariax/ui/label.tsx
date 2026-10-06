'use client';
import {useContext,type ComponentProps} from 'react';
import{RenderStylesContext}from'./render-styles.internal';
import { LabelContext, Label as LabelPrimitive } from 'react-aria-components';
import * as stylex from '@stylexjs/stylex';
export type LabelProps = Omit<ComponentProps<typeof LabelPrimitive>, 'className'> & { xstyle?: stylex.StyleXStyles; className?: never };
const styles = stylex.create({
  base: {
    display: 'flex', alignItems: 'center', gap: 'calc(var(--ariax-spacing, .25rem) * 2)', fontSize: '0.875rem', lineHeight: 1,
    fontWeight: 500, userSelect: 'none',
    opacity: { default: null, ':is(:where(.group)[data-disabled="true"] *)': 0.5, ':is(:where(.peer):disabled ~ *)': 0.5, ':is(:where(.peer)[data-disabled] ~ *)': 0.5 },
    pointerEvents: { default: null, ':is(:where(.group)[data-disabled="true"] *)': 'none' },
    cursor: { default: null, ':is(:where(.peer):disabled ~ *)': 'not-allowed' },
  },
});
export function Label({ htmlFor, slot, xstyle, style, className: _className, ...props }: LabelProps) {
  const renderStyles=useContext(RenderStylesContext);
  const applied = stylex.props(styles.base, renderStyles, xstyle);
  const structuralClass = (props as { 'data-slot'?: string })['data-slot'] === 'field-label' ? 'group/field-label peer/field-label' : (props as {'data-slot'?:string})['data-slot']==='button-group-text'?'ariax-button-group-text':'';
  const label = <LabelPrimitive data-slot="label" {...props} htmlFor={htmlFor} slot={slot} className={[structuralClass, applied.className].filter(Boolean).join(' ')} style={{ ...applied.style, ...style }} />;
  const contextual=renderStyles?<RenderStylesContext.Provider value={undefined}>{label}</RenderStylesContext.Provider>:label;
  return htmlFor && slot === undefined ? <LabelContext.Provider value={null}>{contextual}</LabelContext.Provider> : contextual;
}
