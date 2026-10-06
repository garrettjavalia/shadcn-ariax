'use client';
import type { ComponentProps } from 'react';
import { TextArea as TextareaPrimitive } from 'react-aria-components';
import * as stylex from '@stylexjs/stylex';

export type TextareaProps = Omit<ComponentProps<typeof TextareaPrimitive>, 'className'> & {
  xstyle?: stylex.StyleXStyles;
  className?: never;
};
export function Textarea({ xstyle, className: _className, style, ...props }: TextareaProps) {
  const applied = stylex.props(styles.base, xstyle);
  return <TextareaPrimitive data-slot="textarea" {...props} className={applied.className}
    style={typeof style === 'function' ? state => ({ ...applied.style, ...style(state) }) : { ...applied.style, ...style }} />;
}
const ring = '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-textarea-ring), 0 0 0 0 #0000';
const styles = stylex.create({ base: {
  width: '100%', minHeight: 'calc(var(--ariax-spacing, .25rem) * 16)', fieldSizing: 'content', display: 'flex', outlineStyle: 'none', borderRadius: 'var(--radius)',
  borderWidth: '1px', borderStyle: 'solid', paddingInline: 'calc(var(--ariax-spacing, .25rem) * 2.5)', paddingBlock: 'calc(var(--ariax-spacing, .25rem) * 2)',
  fontSize: { default: '1rem', '@media (min-width: 48rem)': '0.875rem' },
  lineHeight: { default: 1.5, '@media (min-width: 48rem)': 'calc(1.25 / .875)' },
  color: { default: null, '::placeholder': 'var(--muted-foreground)' },
  borderColor: { default: 'var(--input)', ':focus-visible': 'var(--ring)', ':is([aria-invalid="true"])': 'var(--destructive)', ':is(.dark *)[aria-invalid="true"]': 'color-mix(in oklab, var(--destructive) 50%, transparent)' },
  backgroundColor: { default: 'transparent', ':is(.dark *)': 'color-mix(in oklab, var(--input) 30%, transparent)', ':disabled': 'color-mix(in oklab, var(--input) 50%, transparent)', ':is(.dark *):disabled': 'color-mix(in oklab, var(--input) 80%, transparent)' },
  cursor: { default: null, ':disabled': 'not-allowed' }, opacity: { default: null, ':disabled': 0.5 },
  transitionProperty: 'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to',
  transitionDuration: '150ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  '--ariax-textarea-ring': { default: 'color-mix(in oklab, var(--ring) 50%, transparent)', ':is([aria-invalid="true"])': 'color-mix(in oklab, var(--destructive) 20%, transparent)', ':is(.dark *)[aria-invalid="true"]': 'color-mix(in oklab, var(--destructive) 40%, transparent)' },
  boxShadow: { default: null, ':focus-visible': ring, ':is([aria-invalid="true"])': ring },
} });
