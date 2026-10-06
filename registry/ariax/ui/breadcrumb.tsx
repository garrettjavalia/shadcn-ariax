'use client';
import type { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import { Breadcrumb as BreadcrumbPrimitive, Breadcrumbs, Link, composeRenderProps, type BreadcrumbProps as PrimitiveItemProps, type BreadcrumbsProps, type LinkProps } from 'react-aria-components';

type Custom<P> = Omit<P, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
export type BreadcrumbProps = Custom<ComponentProps<'nav'>>;
export type BreadcrumbListProps<T extends object> = Custom<BreadcrumbsProps<T>>;
export type BreadcrumbItemProps = Custom<PrimitiveItemProps> & { separatorXstyle?: stylex.StyleXStyles; separatorClassName?: never };
export type BreadcrumbLinkProps = Custom<LinkProps>;
export type BreadcrumbPageProps = Custom<ComponentProps<'span'>>;
export type BreadcrumbEllipsisProps = Custom<ComponentProps<'span'>>;

export function Breadcrumb({ className: _, xstyle, style, ...props }: BreadcrumbProps) {
  const sx = stylex.props(xstyle);
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
export function BreadcrumbList<T extends object>({ className: _, xstyle, style, ...props }: BreadcrumbListProps<T>) {
  const sx = stylex.props(styles.list, xstyle);
  return <Breadcrumbs data-slot="breadcrumb-list" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
export function BreadcrumbItem({ className: _, separatorClassName: _separator, xstyle, separatorXstyle, style, children, ...props }: BreadcrumbItemProps) {
  const sx = stylex.props(styles.item, xstyle), separator = stylex.props(separatorXstyle);
  return <BreadcrumbPrimitive data-slot="breadcrumb-item" {...props} className={sx.className} style={state => ({ ...sx.style, ...(typeof style === 'function' ? style(state) : style) })}>
    {composeRenderProps(children, (children, { isCurrent }) => <>{children}{!isCurrent && <span data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={['ariax-breadcrumb-separator', separator.className].filter(Boolean).join(' ')} style={separator.style}><ChevronRightIcon className={stylex.props(styles.chevron).className} /></span>}</>)}
  </BreadcrumbPrimitive>;
}
export function BreadcrumbLink({ className: _, xstyle, style, ...props }: BreadcrumbLinkProps) {
  const sx = stylex.props(styles.link, xstyle);
  return <Link data-slot="breadcrumb-link" {...props} className={sx.className} style={state => ({ ...sx.style, ...(typeof style === 'function' ? style(state) : style) })} />;
}
export function BreadcrumbPage({ className: _, xstyle, style, ...props }: BreadcrumbPageProps) {
  const sx = stylex.props(styles.page, xstyle);
  return <span data-slot="breadcrumb-page" role="link" aria-disabled="true" aria-current="page" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
export function BreadcrumbEllipsis({ className: _, xstyle, style, ...props }: BreadcrumbEllipsisProps) {
  const sx = stylex.props(styles.ellipsis, xstyle);
  return <span data-slot="breadcrumb-ellipsis" role="presentation" aria-hidden="true" {...props} className={['ariax-breadcrumb-ellipsis', sx.className].filter(Boolean).join(' ')} style={{ ...sx.style, ...style }}><MoreHorizontalIcon /><span className={stylex.props(styles.srOnly).className}>More</span></span>;
}
const styles = stylex.create({
  list: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', overflowWrap: 'break-word', color: 'var(--muted-foreground)', gap: 'calc(var(--ariax-spacing, .25rem) * 1.5)', fontSize: '.875rem', lineHeight: 'calc(1.25 / .875)' },
  item: { display: 'inline-flex', alignItems: 'center', gap: 'calc(var(--ariax-spacing, .25rem) * 1)' },
  link: { color: { default: null, ':hover': { default: null, '@media (hover: hover)': 'var(--foreground)' } }, transitionProperty: 'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', transitionDuration: '150ms' },
  page: { color: 'var(--foreground)', fontWeight: 400 },
  ellipsis: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'calc(var(--ariax-spacing, .25rem) * 5)', height: 'calc(var(--ariax-spacing, .25rem) * 5)' },
  chevron: { rotate: { default: null, ':where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)': '180deg' } },
  srOnly: { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clipPath: 'inset(50%)', whiteSpace: 'nowrap', borderWidth: 0 },
});
