'use client';

import type * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { composeRenderProps, Button as ButtonPrimitive, Link as LinkPrimitive, type ButtonProps as PrimitiveProps, type LinkProps } from 'react-aria-components';

export type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg';
type Variants = { variant?: ButtonVariant | null; size?: ButtonSize | null; xstyle?: stylex.StyleXStyles };
type NoExternalClasses = { className?: never };
export type ButtonProps = Omit<PrimitiveProps, 'className'> & React.RefAttributes<HTMLButtonElement> & Variants & NoExternalClasses;

// Expose the same resolved styles used by Button/LinkButton for other elements.
export function buttonProps({ variant = 'default', size = 'default', xstyle, style }: Variants & { style?: React.CSSProperties } = {}) {
  const props = stylex.props(styles.base, variant && variants[variant], size && sizes[size], xstyle);
  // Internal marker supports opaque descendant SVGs; it is not a customization API.
  return { className: ['ariax-button', props.className].filter(Boolean).join(' '), style: { ...props.style, ...style } };
}

export function Button({ className: _className, style, xstyle, variant = 'default', size = 'default', ...props }: ButtonProps) {
  const applied = buttonProps({ variant, size, xstyle });
  return <ButtonPrimitive data-slot="button" data-variant={variant} data-size={size}
    {...props} {...applied} style={composeRenderProps(style, value => ({ ...applied.style, ...value }))} />;
}

export function LinkButton({ className: _className, style, xstyle, variant = 'default', size = 'default', ...props }: Omit<LinkProps, 'className'> & Variants & NoExternalClasses) {
  const applied = buttonProps({ variant, size, xstyle });
  return <LinkPrimitive data-slot="button" data-variant={variant} data-size={size}
    {...props} {...applied} style={composeRenderProps(style, value => ({ ...applied.style, ...value }))} />;
}

const styles = stylex.create({
  base: {
    display: 'inline-flex', flexShrink: 0, alignItems: 'center', justifyContent: 'center',
    whiteSpace: 'nowrap', userSelect: 'none', outlineStyle: 'none',
    transitionProperty: 'all', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', transitionDuration: '150ms',
    pointerEvents: { default: null, ':disabled': 'none' },
    opacity: { default: null, ':disabled': 0.5 },
    borderRadius: 'var(--radius)', borderWidth: 1, borderStyle: 'solid',
    borderColor: { default: 'transparent', ':focus-visible': 'var(--ring)', ':is([aria-invalid="true"])': 'var(--destructive)', ':is(.dark *)[aria-invalid="true"]': 'color-mix(in oklab, var(--destructive) 50%, transparent)' },
    backgroundClip: 'padding-box', fontSize: '0.875rem', lineHeight: 'calc(1.25 / .875)', fontWeight: 500,
    '--ariax-ring': { default: 'color-mix(in oklab, var(--ring) 50%, transparent)', ':is([aria-invalid="true"])': 'color-mix(in oklab, var(--destructive) 20%, transparent)', ':is(.dark *)[aria-invalid="true"]': 'color-mix(in oklab, var(--destructive) 40%, transparent)' },
    boxShadow: { default: null, ':focus-visible': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-ring), 0 0 0 0 #0000', ':is([aria-invalid="true"])': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-ring), 0 0 0 0 #0000' },
    translate: { default: null, ':active:not([aria-haspopup])': '0 1px' },
    '--ariax-icon-size': '1rem',
  },
});

const variants = stylex.create({
  default: {
    backgroundColor: { default: 'var(--primary)', ':hover': { default: null, '@media (hover: hover)': 'color-mix(in oklab, var(--primary) 80%, transparent)' } },
    color: 'var(--primary-foreground)',
  },
  outline: {
    borderColor: { default: 'var(--border)', ':is(.dark *)': 'var(--input)', ':focus-visible': 'var(--ring)', ':is(.dark *):focus-visible': 'var(--input)', ':is([aria-invalid="true"])': 'var(--destructive)', ':is(.dark *)[aria-invalid="true"]': 'color-mix(in oklab, var(--destructive) 50%, transparent)' },
    backgroundColor: {
      default: 'var(--background)',
      ':hover': { default: null, '@media (hover: hover)': 'var(--muted)' },
      ':is([aria-expanded="true"])': 'var(--muted)',
      ':is(.dark *)': 'color-mix(in oklab, var(--input) 30%, transparent)',
      ':is(.dark *)[aria-expanded="true"]': 'color-mix(in oklab, var(--input) 30%, transparent)',
      ':is(.dark *):hover': { default: null, '@media (hover: hover)': 'color-mix(in oklab, var(--input) 50%, transparent)' },
    },
    color: { default: null, ':hover': { default: null, '@media (hover: hover)': 'var(--foreground)' }, ':is([aria-expanded="true"])': 'var(--foreground)' },
  },
  secondary: {
    backgroundColor: { default: 'var(--secondary)', ':hover': { default: null, '@media (hover: hover)': 'color-mix(in oklch, var(--secondary), var(--foreground) 5%)' }, ':is([aria-expanded="true"])': 'var(--secondary)' },
    color: 'var(--secondary-foreground)',
  },
  ghost: {
    backgroundColor: { default: null, ':hover': { default: null, '@media (hover: hover)': 'var(--muted)' }, ':is([aria-expanded="true"])': 'var(--muted)', ':is(.dark *):hover': { default: null, '@media (hover: hover)': 'color-mix(in oklab, var(--muted) 50%, transparent)' } },
    color: { default: null, ':hover': { default: null, '@media (hover: hover)': 'var(--foreground)' }, ':is([aria-expanded="true"])': 'var(--foreground)' },
  },
  destructive: {
    backgroundColor: { default: 'color-mix(in oklab, var(--destructive) 10%, transparent)', ':hover': { default: null, '@media (hover: hover)': 'color-mix(in oklab, var(--destructive) 20%, transparent)' }, ':is(.dark *)': 'color-mix(in oklab, var(--destructive) 20%, transparent)', ':is(.dark *):hover': { default: null, '@media (hover: hover)': 'color-mix(in oklab, var(--destructive) 30%, transparent)' } },
    color: 'var(--destructive)',
    '--ariax-ring': { default: 'color-mix(in oklab, var(--destructive) 20%, transparent)', ':is(.dark *)': 'color-mix(in oklab, var(--destructive) 40%, transparent)' },
    borderColor: { default: 'transparent', ':focus-visible': 'color-mix(in oklab, var(--destructive) 40%, transparent)', ':is([aria-invalid="true"])': 'var(--destructive)', ':is(.dark *)[aria-invalid="true"]': 'color-mix(in oklab, var(--destructive) 50%, transparent)' },
  },
  link: { color: 'var(--primary)', textUnderlineOffset: 4, textDecorationLine: { default: null, ':hover': { default: null, '@media (hover: hover)': 'underline' } } },
});

const sizes = stylex.create({
  default: { height: '2rem', gap: '0.375rem', paddingInline: '0.625rem', paddingInlineEnd: { default: '0.625rem', ':has([data-icon="inline-end"])': '0.5rem' }, paddingInlineStart: { default: '0.625rem', ':has([data-icon="inline-start"])': '0.5rem' } },
  xs: { height: '1.5rem', gap: '0.25rem', borderRadius: { default: 'min(calc(var(--radius) * 0.8), 10px)', ':is([data-slot="button-group"] *)': 'var(--radius)' }, paddingInline: '0.5rem', paddingInlineEnd: { default: '0.5rem', ':has([data-icon="inline-end"])': '0.375rem' }, paddingInlineStart: { default: '0.5rem', ':has([data-icon="inline-start"])': '0.375rem' }, fontSize: '0.75rem', lineHeight: 'calc(1 / .75)', '--ariax-icon-size': '0.75rem' },
  sm: { height: '1.75rem', gap: '0.25rem', borderRadius: { default: 'min(calc(var(--radius) * 0.8), 12px)', ':is([data-slot="button-group"] *)': 'var(--radius)' }, paddingInline: '0.625rem', paddingInlineEnd: { default: '0.625rem', ':has([data-icon="inline-end"])': '0.375rem' }, paddingInlineStart: { default: '0.625rem', ':has([data-icon="inline-start"])': '0.375rem' }, fontSize: '0.8rem', lineHeight: 'inherit', '--ariax-icon-size': '0.875rem' },
  lg: { height: '2.25rem', gap: '0.375rem', paddingInline: '0.625rem', paddingInlineEnd: { default: '0.625rem', ':has([data-icon="inline-end"])': '0.5rem' }, paddingInlineStart: { default: '0.625rem', ':has([data-icon="inline-start"])': '0.5rem' } },
  icon: { width: '2rem', height: '2rem' },
  'icon-xs': { width: '1.5rem', height: '1.5rem', borderRadius: { default: 'min(calc(var(--radius) * 0.8), 10px)', ':is([data-slot="button-group"] *)': 'var(--radius)' }, '--ariax-icon-size': '0.75rem' },
  'icon-sm': { width: '1.75rem', height: '1.75rem', borderRadius: { default: 'min(calc(var(--radius) * 0.8), 12px)', ':is([data-slot="button-group"] *)': 'var(--radius)' } },
  'icon-lg': { width: '2.25rem', height: '2.25rem' },
});
