'use client';
import type { ComponentProps } from 'react';
import { LabelContext, Label as LabelPrimitive } from 'react-aria-components';
import * as stylex from '@stylexjs/stylex';
export type LabelProps = Omit<ComponentProps<typeof LabelPrimitive>, 'className'> & { xstyle?: stylex.StyleXStyles; className?: never };
const styles = stylex.create({
  base: {
    display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', lineHeight: 1,
    fontWeight: 500, userSelect: 'none',
    opacity: { default: null, ':is(:where(.group)[data-disabled="true"] *)': 0.5, ':is(:where(.peer):disabled ~ *)': 0.5, ':is(:where(.peer)[data-disabled] ~ *)': 0.5 },
    pointerEvents: { default: null, ':is(:where(.group)[data-disabled="true"] *)': 'none' },
    cursor: { default: null, ':is(:where(.peer):disabled ~ *)': 'not-allowed' },
  },
});
export function Label({ htmlFor, slot, xstyle, style, className: _className, ...props }: LabelProps) {
  const applied = stylex.props(styles.base, xstyle);
  const label = <LabelPrimitive data-slot="label" {...props} htmlFor={htmlFor} slot={slot} className={[(props as Record<string, unknown>)['data-slot'] === 'field-label' ? 'group/field-label peer/field-label' : null, applied.className].filter(Boolean).join(' ')} style={{ ...applied.style, ...style }} />;
  return htmlFor && slot === undefined ? <LabelContext.Provider value={null}>{label}</LabelContext.Provider> : label;
}
