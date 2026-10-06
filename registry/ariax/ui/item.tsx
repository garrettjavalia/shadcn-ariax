'use client';
import type { ComponentProps, HTMLAttributes } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Link, type LinkProps } from 'react-aria-components';
import { Separator, type SeparatorProps } from './separator';
type Custom = { className?: never; xstyle?: stylex.StyleXStyles };
type DivProps = Omit<ComponentProps<'div'>, 'className'> & Custom;
export type ItemProps = Omit<LinkProps, 'children' | 'className'> & Omit<HTMLAttributes<HTMLElement>, 'className'> & Custom & { variant?: 'default' | 'outline' | 'muted' | null; size?: 'default' | 'sm' | 'xs' | null };
const styles = stylex.create({
  group: { display: 'flex', width: '100%', flexDirection: 'column', gap: { default: 'calc(var(--ariax-spacing, .25rem) * 4)', ':has([data-size="sm"])': 'calc(var(--ariax-spacing, .25rem) * 2.5)', ':has([data-size="xs"])': 'calc(var(--ariax-spacing, .25rem) * 2)' } },
  separator: { marginBlock: 'calc(var(--ariax-spacing, .25rem) * 2)' },
  root: { display: 'flex', width: '100%', flexWrap: 'wrap', alignItems: 'center', borderRadius: 'var(--radius)', borderWidth: 1, fontSize: '.875rem', lineHeight: 'calc(1.25 / .875)', outlineStyle: 'none', borderColor: { default: null, ':focus-visible': 'var(--ring)' }, boxShadow: { default: null, ':focus-visible': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 0 0 #0000' }, backgroundColor: { default: null, ':is(a):hover': { default: null, '@media (hover: hover)': 'var(--muted)' } }, transitionProperty: 'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to', transitionDuration: '100ms', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  defaultVariant: { borderColor: { default: 'transparent', ':focus-visible': 'var(--ring)' } },
  outline: { borderColor: { default: 'var(--border)', ':focus-visible': 'var(--ring)' } },
  muted: { borderColor: { default: 'transparent', ':focus-visible': 'var(--ring)' }, backgroundColor: { default: 'color-mix(in oklab, var(--muted) 50%, transparent)', ':is(a):hover': { default: null, '@media (hover: hover)': 'var(--muted)' } } },
  normal: { gap: 'calc(var(--ariax-spacing, .25rem) * 2.5)', paddingInline: 'calc(var(--ariax-spacing, .25rem) * 3)', paddingBlock: 'calc(var(--ariax-spacing, .25rem) * 2.5)' },
  xs: { gap: 'calc(var(--ariax-spacing, .25rem) * 2)', paddingInline: { default: 'calc(var(--ariax-spacing, .25rem) * 2.5)', ':is([data-slot="dropdown-menu-content"] *)': 0 }, paddingBlock: { default: 'calc(var(--ariax-spacing, .25rem) * 2)', ':is([data-slot="dropdown-menu-content"] *)': 0 } },
  media: { display: 'flex', flexShrink: 0, alignItems: 'center', justifyContent: 'center', gap: 'calc(var(--ariax-spacing, .25rem) * 2)', translate: { default: null, ':is(.ariax-item:has([data-slot="item-description"]) *)': '0 calc(var(--ariax-spacing, .25rem) * 0.5)' }, alignSelf: { default: null, ':is(.ariax-item:has([data-slot="item-description"]) *)': 'flex-start' } },
  mediaDefault: { backgroundColor: 'transparent' },
  image: { width: { default: 'calc(var(--ariax-spacing, .25rem) * 10)', ':is(.ariax-item[data-size="sm"] *)': 'calc(var(--ariax-spacing, .25rem) * 8)', ':is(.ariax-item[data-size="xs"] *)': 'calc(var(--ariax-spacing, .25rem) * 6)' }, height: { default: 'calc(var(--ariax-spacing, .25rem) * 10)', ':is(.ariax-item[data-size="sm"] *)': 'calc(var(--ariax-spacing, .25rem) * 8)', ':is(.ariax-item[data-size="xs"] *)': 'calc(var(--ariax-spacing, .25rem) * 6)' }, overflow: 'hidden', borderRadius: 'calc(var(--radius) * .6)' },
  content: { display: 'flex', flex: 'var(--ariax-item-content-flex, 1 1 0%)', flexDirection: 'column', gap: { default: 'calc(var(--ariax-spacing, .25rem) * 1)', ':is(.ariax-item[data-size="xs"] *)': 0 } },
  title: { overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, display: 'flex', width: 'fit-content', alignItems: 'center', gap: 'calc(var(--ariax-spacing, .25rem) * 2)', fontSize: '.875rem', lineHeight: 1.375, fontWeight: 500, textUnderlineOffset: 4 },
  description: { overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, fontWeight: 400, color: { default: 'var(--muted-foreground)', ':is(.ariax-dropdown-item-none:not([data-variant="destructive"]):focus *, .ariax-dropdown-item-selection:focus *, .ariax-dropdown-sub-trigger:not([data-variant="destructive"]):focus *, .ariax-combobox-item:not([data-variant="destructive"])[data-focused] *, .ariax-combobox-item:not([data-variant="destructive"])[data-highlighted] *)': 'var(--accent-foreground)' }, textAlign: 'start', fontSize: { default: '.875rem', ':is(.ariax-item[data-size="xs"] *)': '.75rem' }, lineHeight: 1.5 },
  actions: { display: 'flex', alignItems: 'center', gap: 'calc(var(--ariax-spacing, .25rem) * 2)' },
  edge: { display: 'flex', flexBasis: '100%', alignItems: 'center', justifyContent: 'space-between', gap: 'calc(var(--ariax-spacing, .25rem) * 2)' },
});
export function Item({ className: _, xstyle, style, variant = 'default', size = 'default', ...props }: ItemProps) {
  const sx = stylex.props(styles.root, variant === 'default' && styles.defaultVariant, variant === 'outline' && styles.outline, variant === 'muted' && styles.muted, (size === 'default' || size === 'sm') && styles.normal, size === 'xs' && styles.xs, xstyle);
  const Element = 'href' in props ? Link : 'div';
  return <Element data-slot="item" data-variant={variant} data-size={size} {...props} className={['ariax-item', sx.className].join(' ')} style={{ ...sx.style, ...style }} />;
}
export function ItemGroup({ className: _, xstyle, style, ...props }: DivProps) { const sx = stylex.props(styles.group, xstyle); return <div role="list" data-slot="item-group" {...props} className={sx.className} style={{ ...sx.style, ...style }} />; }
export function ItemSeparator({ xstyle, ...props }: SeparatorProps) { return <Separator data-slot="item-separator" orientation="horizontal" {...props} xstyle={[styles.separator, xstyle]} />; }
export function ItemMedia({ className: _, xstyle, style, variant = 'default', ...props }: DivProps & { variant?: 'default' | 'icon' | 'image' | null }) { const sx = stylex.props(styles.media, variant === 'default' && styles.mediaDefault, variant === 'image' && styles.image, xstyle); return <div data-slot="item-media" data-variant={variant} {...props} className={['ariax-item-media', variant && `ariax-item-media-${variant}`, sx.className].filter(Boolean).join(' ')} style={{ ...sx.style, ...style }} />; }
function divPart(slot: string, base: stylex.StyleXStyles, marker?: string) { return function Part({ className: _, xstyle, style, ...props }: DivProps) { const sx = stylex.props(base, xstyle); return <div data-slot={slot} {...props} className={[marker, sx.className].filter(Boolean).join(' ')} style={{ ...sx.style, ...style }} />; }; }
export const ItemContent = divPart('item-content', styles.content, 'ariax-item-content');
export const ItemTitle = divPart('item-title', styles.title);
export const ItemActions = divPart('item-actions', styles.actions);
export const ItemHeader = divPart('item-header', styles.edge);
export const ItemFooter = divPart('item-footer', styles.edge);
export function ItemDescription({ className: _, xstyle, style, ...props }: Omit<ComponentProps<'p'>, 'className'> & Custom) { const sx = stylex.props(styles.description, xstyle); return <p data-slot="item-description" {...props} className={['ariax-item-description', sx.className].join(' ')} style={{ ...sx.style, ...style }} />; }
