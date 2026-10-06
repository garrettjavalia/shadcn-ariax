'use client';
import type { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';

export type AlertPartProps = Omit<ComponentProps<'div'>, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
export type AlertProps = AlertPartProps & { variant?: 'default' | 'destructive' | null };
export const alertStyles = stylex.create({
  base: { position: 'relative', width: '100%', display: 'grid', gap: 2, borderRadius: 'var(--radius)', borderWidth: 1, paddingLeft: 10, paddingRight: 'var(--ariax-alert-pr, 10px)', paddingBlock: 8, textAlign: 'left', fontSize: 14, lineHeight: '20px' },
  default: { backgroundColor: 'var(--card)', color: 'var(--card-foreground)' },
  destructive: { backgroundColor: 'var(--card)', color: 'var(--destructive)' },
  title: { fontWeight: 500 },
  description: { color: 'var(--ariax-alert-description-color, var(--muted-foreground))', fontSize: 14, lineHeight: '20px', textWrap: { default: 'balance', '@media (min-width: 48rem)': 'pretty' } },
  action: { position: 'absolute', top: 8, right: 8 },
});
export function Alert({ variant = 'default', xstyle, style, className: _className, ...props }: AlertProps) {
  const applied = stylex.props(alertStyles.base, variant && alertStyles[variant], xstyle);
  return <div data-slot="alert" role="alert" {...props} className={`${applied.className} ariax-alert${variant === 'destructive' ? ' ariax-alert-destructive' : ''}`} style={{ ...applied.style, ...style }} />;
}
export function AlertTitle({ xstyle, style, className: _className, ...props }: AlertPartProps) {
  const applied = stylex.props(alertStyles.title, xstyle);
  return <div data-slot="alert-title" {...props} className={`${applied.className} ariax-alert-title`} style={{ ...applied.style, ...style }} />;
}
export function AlertDescription({ xstyle, style, className: _className, ...props }: AlertPartProps) {
  const applied = stylex.props(alertStyles.description, xstyle);
  return <div data-slot="alert-description" {...props} className={`${applied.className} ariax-alert-description`} style={{ ...applied.style, ...style }} />;
}
export function AlertAction({ xstyle, style, className: _className, ...props }: AlertPartProps) {
  const applied = stylex.props(alertStyles.action, xstyle);
  return <div data-slot="alert-action" {...props} {...applied} style={{ ...applied.style, ...style }} />;
}
