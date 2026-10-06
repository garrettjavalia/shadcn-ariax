'use client';
import type * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { Group, composeRenderProps, type GroupProps } from 'react-aria-components';
import { Button, type ButtonProps } from './button';
import { Input, type InputProps } from './input';
import { Textarea, type TextareaProps } from './textarea';
type Custom = { xstyle?: stylex.StyleXStyles; className?: never };
export function InputGroup({ xstyle, className: _, style, ...props }: Omit<GroupProps, 'className'> & Custom) {
 const applied = stylex.props(styles.group, xstyle);
 return <Group data-slot="input-group" {...props} className={applied.className} style={composeRenderProps(style, value => ({ ...applied.style, ...value }))} />;
}
export type InputGroupAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
export function InputGroupAddon({ align = 'inline-start', xstyle, className: _, style, ...props }: Omit<React.ComponentProps<'div'>, 'className'> & Custom & { align?: InputGroupAlign | null }) {
 const applied = stylex.props(styles.addon, align && aligns[align], xstyle);
 return <div role="group" data-slot="input-group-addon" data-align={align} onClick={event => { if ((event.target as HTMLElement).closest('button')) return; event.currentTarget.parentElement?.querySelector('input')?.focus(); }} {...props} className={applied.className} style={{ ...applied.style, ...style }} />;
}
export type InputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';
export function InputGroupButton({ size = 'xs', variant = 'ghost', type = 'button', xstyle, ...props }: Omit<ButtonProps, 'size'> & { size?: InputGroupButtonSize | null }) {
 return <Button type={type} variant={variant} data-size={size} {...props} xstyle={[styles.button, size && sizes[size], xstyle]} />;
}
export function InputGroupText({ xstyle, className: _, style, ...props }: Omit<React.ComponentProps<'span'>, 'className'> & Custom) {
 const applied = stylex.props(styles.text, xstyle);
 return <span {...props} className={["ariax-input-group-text", applied.className].join(" ")} style={{ ...applied.style, ...style }} />;
}
export function InputGroupInput({ xstyle, ...props }: InputProps) { return <Input data-slot="input-group-control" {...props} xstyle={[styles.control, xstyle]} />; }
export function InputGroupTextarea({ xstyle, ...props }: TextareaProps) { return <Textarea data-slot="input-group-control" {...props} xstyle={[styles.control, styles.textarea, xstyle]} />; }
const ring = '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-group-ring), 0 0 0 0 #0000';
const focus = ':has([data-slot="input-group-control"]:focus-visible)';
const invalid = ':has([data-slot][aria-invalid="true"])';
const block = ':is(:has(>[data-align="block-start"]), :has(>[data-align="block-end"]))';
const zeroRing = '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 var(--ariax-control-ring), 0 0 0 0 #0000';
const styles = stylex.create({
 group: { position: 'relative', display: 'flex', width: '100%', minWidth: 0, alignItems: 'center', outlineStyle: 'none', height: { default: '2rem', ':has(>textarea)': 'auto', [block]: 'auto' }, flexDirection: { default: null, [block]: 'column' }, borderWidth: '1px', borderStyle: 'solid', borderRadius: 'var(--radius)', borderColor: { default: 'var(--input)', [focus]: 'var(--ring)', [invalid]: 'var(--destructive)', ':is([data-slot="combobox-content"] *):focus-within': 'inherit' }, backgroundColor: { default: null, ':is(.dark *)': 'color-mix(in oklab, var(--input) 30%, transparent)', ':has(:disabled)': 'color-mix(in oklab, var(--input) 50%, transparent)', ':is(.dark *):has(:disabled)': 'color-mix(in oklab, var(--input) 80%, transparent)' }, opacity: { default: null, ':has(:disabled)': 0.5 }, '--ariax-group-ring': { default: 'color-mix(in oklab, var(--ring) 50%, transparent)', [invalid]: 'color-mix(in oklab, var(--destructive) 20%, transparent)', ':is(.dark *):has([data-slot][aria-invalid="true"])': 'color-mix(in oklab, var(--destructive) 40%, transparent)' }, boxShadow: { default: null, [focus]: ring, [invalid]: ring, ':is([data-slot="combobox-content"] *):focus-within': '0 0 #0000' }, transitionProperty: 'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to', transitionDuration: '150ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' },
 addon: { display: 'flex', cursor: 'text', alignItems: 'center', justifyContent: 'center', userSelect: 'none', color: 'var(--muted-foreground)', height: 'auto', gap: '0.5rem', paddingBlock: '0.375rem', fontSize: '0.875rem', lineHeight: 'calc(1.25 / .875)', fontWeight: 500, '--ariax-addon-icon-size': '1rem', '--ariax-addon-kbd-radius': 'calc(var(--radius) - 5px)', opacity: { default: null, ':is([data-slot="input-group"][data-disabled="true"] *)': 0.5 } },
 button: { display: 'flex', alignItems: 'center', boxShadow: '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000', gap: '0.5rem', fontSize: '0.875rem', lineHeight: 'calc(1.25 / .875)' },
 text: { '--ariax-text-icon-size': '1rem', display: 'flex', alignItems: 'center', color: 'var(--muted-foreground)', gap: '0.5rem', fontSize: '0.875rem', lineHeight: 'calc(1.25 / .875)' },
 control: { '--ariax-control-ring': { default: 'currentColor', ':focus-visible': 'color-mix(in oklab, var(--ring) 50%, transparent)', ':is([aria-invalid="true"])': 'color-mix(in oklab, var(--destructive) 20%, transparent)', ':is(.dark *)[aria-invalid="true"]': 'color-mix(in oklab, var(--destructive) 40%, transparent)' }, flex: '1 1 0%', borderRadius: 0, borderWidth: 0, backgroundColor: { default: 'transparent', ':is(.dark *)': 'transparent', ':disabled': 'transparent', ':is(.dark *):disabled': 'transparent' }, boxShadow: { default: zeroRing, ':focus-visible': zeroRing, ':is([aria-invalid="true"])': zeroRing }, paddingLeft: { default: null, ':is([data-slot="input-group"]:has(>[data-align="inline-start"]) > input)': '0.375rem' }, paddingRight: { default: null, ':is([data-slot="input-group"]:has(>[data-align="inline-end"]) > input)': '0.375rem' }, paddingTop: { default: null, ':is([data-slot="input-group"]:has(>[data-align="block-end"]) > input)': '0.75rem' }, paddingBottom: { default: null, ':is([data-slot="input-group"]:has(>[data-align="block-start"]) > input)': '0.75rem' } },
 textarea: { resize: 'none', paddingBlock: '0.5rem' },
});
const aligns = stylex.create({
 'inline-start': { order: -9999, paddingLeft: '0.5rem', marginLeft: { default: null, ':has(>button)': '-0.3rem', ':has(>kbd)': '-0.15rem' } },
 'inline-end': { order: 9999, paddingRight: '0.5rem', marginRight: { default: null, ':has(>button)': '-0.3rem', ':has(>kbd)': '-0.15rem' } },
 'block-start': { order: -9999, width: '100%', justifyContent: 'flex-start', paddingInline: '0.625rem', paddingTop: '0.5rem' },
 'block-end': { order: 9999, width: '100%', justifyContent: 'flex-start', paddingInline: '0.625rem', paddingBottom: '0.5rem' },
});
const sizes = stylex.create({
 xs: { height: '1.5rem', gap: '0.25rem', borderRadius: 'calc(var(--radius) - 3px)', paddingLeft: '0.375rem', paddingRight: '0.375rem', '--ariax-icon-size': '0.875rem' },
 sm: {},
 'icon-xs': { width: '1.5rem', height: '1.5rem', borderRadius: 'calc(var(--radius) - 3px)', padding: 0, paddingLeft: 0, paddingRight: 0 },
 'icon-sm': { width: '2rem', height: '2rem', padding: 0, paddingLeft: 0, paddingRight: 0 },
});
