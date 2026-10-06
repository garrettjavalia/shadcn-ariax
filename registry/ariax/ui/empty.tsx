import type { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';

type Styled<P> = Omit<P, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
type DivProps = Styled<ComponentProps<'div'>>;
const styles = stylex.create({
  root: { display: 'flex', width: '100%', minWidth: 0, flex: '1 1 0%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', textWrap: 'balance', gap: 'calc(var(--ariax-spacing, .25rem) * 4)', borderRadius: 'calc(var(--radius) * 1.4)', borderStyle: 'dashed', padding: 'calc(var(--ariax-spacing, .25rem) * 6)' },
  header: { display: 'flex', maxWidth: '24rem', flexDirection: 'column', alignItems: 'center', gap: 'calc(var(--ariax-spacing, .25rem) * 2)' },
  media: { display: 'flex', flexShrink: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 'calc(var(--ariax-spacing, .25rem) * 2)' },
  defaultMedia: { backgroundColor: 'transparent' },
  icon: { backgroundColor: 'var(--muted)', color: 'var(--foreground)', width: 'calc(var(--ariax-spacing, .25rem) * 8)', height: 'calc(var(--ariax-spacing, .25rem) * 8)', borderRadius: 'var(--radius)' },
  title: { fontSize: '.875rem', lineHeight: 'calc(1.25 / .875)', fontWeight: 500, letterSpacing: '-.025em' },
  description: { color: 'var(--muted-foreground)', fontSize: '.875rem', lineHeight: 1.625 },
  content: { display: 'flex', width: '100%', maxWidth: '24rem', minWidth: 0, flexDirection: 'column', alignItems: 'center', textWrap: 'balance', gap: 'calc(var(--ariax-spacing, .25rem) * 2.5)', fontSize: '.875rem', lineHeight: 'calc(1.25 / .875)' },
});
export function Empty({ className: _, xstyle, style, ...props }: DivProps) {
  const sx = stylex.props(styles.root, xstyle);
  return <div data-slot="empty" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
export function EmptyHeader({ className: _, xstyle, style, ...props }: DivProps) {
  const sx = stylex.props(styles.header, xstyle);
  return <div data-slot="empty-header" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
export function EmptyMedia({ className: _, xstyle, style, variant = 'default', ...props }: DivProps & { variant?: 'default' | 'icon' | null }) {
  const sx = stylex.props(styles.media, variant === 'default' && styles.defaultMedia, variant === 'icon' && styles.icon, xstyle);
  return <div data-slot="empty-icon" data-variant={variant} {...props} className={['ariax-empty-media', variant === 'icon' && 'ariax-empty-media-icon', sx.className].filter(Boolean).join(' ')} style={{ ...sx.style, ...style }} />;
}
export function EmptyTitle({ className: _, xstyle, style, ...props }: DivProps) {
  const sx = stylex.props(styles.title, xstyle);
  return <div data-slot="empty-title" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
export function EmptyDescription({ className: _, xstyle, style, ...props }: Styled<ComponentProps<'p'>>) {
  const sx = stylex.props(styles.description, xstyle);
  return <div data-slot="empty-description" {...props} className={['ariax-empty-description', sx.className].join(' ')} style={{ ...sx.style, ...style }} />;
}
export function EmptyContent({ className: _, xstyle, style, ...props }: DivProps) {
  const sx = stylex.props(styles.content, xstyle);
  return <div data-slot="empty-content" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
