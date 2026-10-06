import type { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';

export type CardPartProps = Omit<ComponentProps<'div'>, 'className'> & {
  xstyle?: stylex.StyleXStyles;
  className?: never;
};
export type CardProps = CardPartProps & { size?: 'default' | 'sm' };
const styles = stylex.create({
  card: {
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
    backgroundColor: 'var(--card)', color: 'var(--card-foreground)',
    borderRadius: 'calc(var(--radius) * 1.4)',
    boxShadow: '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), 0 0 0 0 #0000',
    fontSize: '0.875rem', lineHeight: 'calc(1.25 / 0.875)',
    '--card-spacing': { default: '1rem', ':is([data-size="sm"])': '0.75rem' },
    '--ariax-card-top': { default: 'var(--card-spacing)', ':has(>img:first-child)': '0px' },
    '--ariax-card-bottom': { default: 'var(--card-spacing)', ':has([data-slot="card-footer"])': '0px' },
    gap: 'var(--card-spacing)', paddingTop: 'var(--ariax-card-top)', paddingBottom: 'var(--ariax-card-bottom)',
  },
  header: {
    display: 'grid', gridAutoRows: 'min-content', alignItems: 'flex-start',
    containerType: 'inline-size', containerName: 'card-header',
    gridTemplateColumns: { default: null, ':has([data-slot="card-action"])': '1fr auto' },
    gridTemplateRows: { default: null, ':has([data-slot="card-description"])': 'auto auto' },
    gap: '0.25rem', borderTopLeftRadius: 'calc(var(--radius) * 1.4)', borderTopRightRadius: 'calc(var(--radius) * 1.4)',
    padding: '0 var(--card-spacing)',
  },
  title: { '--ariax-card-title-size': {default: '1rem', ':is([data-slot="card"][data-size="sm"] *)': '0.875rem'}, fontSize: 'var(--ariax-card-title-size, 1rem)', lineHeight: 'var(--ariax-card-title-line, 1.375)', fontWeight: 500 },
  description: { color: 'var(--muted-foreground)', fontSize: '0.875rem', lineHeight: 'calc(1.25 / 0.875)' },
  action: { gridColumnStart: 2, gridRowStart: 1, gridRowEnd: 'span 2', alignSelf: 'flex-start', justifySelf: 'flex-end' },
  content: { padding: '0 var(--card-spacing)' },
  footer: {
    display: 'flex', alignItems: 'center', backgroundColor: 'color-mix(in oklab, var(--muted) 50%, transparent)',
    borderBottomLeftRadius: 'calc(var(--radius) * 1.4)', borderBottomRightRadius: 'calc(var(--radius) * 1.4)',
    borderTopWidth: '1px', padding: 'var(--card-spacing)',
  },
});
export function Card({ size = 'default', xstyle, className: _className, style, ...props }: CardProps) {
  const applied = stylex.props(styles.card, xstyle);
  return <div data-slot="card" data-size={size} {...props} className={applied.className} style={{ ...applied.style, ...style }} />;
}
export function CardHeader({ xstyle, className: _className, style, ...props }: CardPartProps) {
  const applied = stylex.props(styles.header, xstyle);
  return <div data-slot="card-header" {...props} className={applied.className} style={{ ...applied.style, ...style }} />;
}
export function CardTitle({ xstyle, className: _className, style, ...props }: CardPartProps) {
  const applied = stylex.props(styles.title, xstyle);
  return <div data-slot="card-title" {...props} className={applied.className} style={{ ...applied.style, ...style }} />;
}
export function CardDescription({ xstyle, className: _className, style, ...props }: CardPartProps) {
  const applied = stylex.props(styles.description, xstyle);
  return <div data-slot="card-description" {...props} className={applied.className} style={{ ...applied.style, ...style }} />;
}
export function CardAction({ xstyle, className: _className, style, ...props }: CardPartProps) {
  const applied = stylex.props(styles.action, xstyle);
  return <div data-slot="card-action" {...props} className={applied.className} style={{ ...applied.style, ...style }} />;
}
export function CardContent({ xstyle, className: _className, style, ...props }: CardPartProps) {
  const applied = stylex.props(styles.content, xstyle);
  return <div data-slot="card-content" {...props} className={applied.className} style={{ ...applied.style, ...style }} />;
}
export function CardFooter({ xstyle, className: _className, style, ...props }: CardPartProps) {
  const applied = stylex.props(styles.footer, xstyle);
  return <div data-slot="card-footer" {...props} className={applied.className} style={{ ...applied.style, ...style }} />;
}
