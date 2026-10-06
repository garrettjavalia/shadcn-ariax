import type { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Separator, type SeparatorProps } from './separator';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';
type Custom = { xstyle?: stylex.StyleXStyles; className?: never };
export type ButtonGroupProps = Omit<ComponentProps<'div'>, 'className'> & Custom & { orientation?: ButtonGroupOrientation | null };
const styles = stylex.create({
 group: { display: 'flex', width: 'fit-content', alignItems: 'stretch', gap: { default: null, ':has(>[data-slot="button-group"])': 'calc(var(--ariax-spacing, .25rem) * 2)' } },
 vertical: { flexDirection: 'column' },
 text: { backgroundColor: 'var(--muted)', gap: 'calc(var(--ariax-spacing, .25rem) * 2)', borderRadius: 'var(--radius)', borderWidth: '1px', paddingInline: 'calc(var(--ariax-spacing, .25rem) * 2.5)', fontSize: '0.875rem', lineHeight: 'calc(1.25 / 0.875)', fontWeight: 500, display: 'flex', alignItems: 'center' },
 // aria-orientation/hr dimension utilities outrank the data-orientation :where variants.
 separator: { backgroundColor: 'var(--input)', position: 'relative', alignSelf: 'stretch', marginInline: { default: null, ':is([data-orientation="horizontal"])': '1px' }, '--ariax-button-group-separator-width': { default: 'var(--ariax-separator-width, auto)', ':is([data-orientation="horizontal"]):not(hr,[aria-orientation="horizontal"],[aria-orientation="vertical"])': 'auto' }, width: 'var(--ariax-button-group-separator-width)', marginBlock: { default: null, ':is([data-orientation="vertical"])': '1px' }, '--ariax-button-group-separator-height': { default: 'var(--ariax-separator-height, auto)', ':is([data-orientation="vertical"]):not(hr,[aria-orientation="horizontal"])': 'auto' }, height: 'var(--ariax-button-group-separator-height)' },
});
export function buttonGroupProps({ orientation, xstyle, style }: Pick<ButtonGroupProps, 'orientation'|'xstyle'|'style'> = {}) {
 const selected = orientation === undefined ? 'horizontal' : orientation;
 const applied = stylex.props(styles.group, selected === 'vertical' && styles.vertical, xstyle);
 return { className: ['ariax-button-group', selected && `ariax-button-group-${selected}`, applied.className].filter(Boolean).join(' '), style: { ...applied.style, ...style } };
}
// The style helper exposes props rather than a Tailwind class string.
export const buttonGroupVariants = buttonGroupProps;
export function ButtonGroup({ orientation, xstyle, className: _, style, ...props }: ButtonGroupProps) {
 return <div role="group" data-slot="button-group" data-orientation={orientation} {...props} {...buttonGroupProps({orientation,xstyle,style})} />;
}
export type ButtonGroupTextProps = Omit<ComponentProps<'div'>,'className'> & Custom & { render?: (props: HTMLAttributes<HTMLElement>) => ReactNode };
export function ButtonGroupText({ render, xstyle, className: _, style, ...props }: ButtonGroupTextProps) {
 const applied = stylex.props(styles.text,xstyle);
 const merged = { 'data-slot': 'button-group-text', ...props, className: ['ariax-button-group-text',applied.className].join(' '), style: {...applied.style,...style} };
 return render ? render(merged) : <div {...merged}/>;
}
export function ButtonGroupSeparator({ orientation = 'vertical', xstyle, ...props }: SeparatorProps) {
 return <Separator data-slot="button-group-separator" orientation={orientation} {...props} xstyle={[styles.separator,xstyle]} />;
}
