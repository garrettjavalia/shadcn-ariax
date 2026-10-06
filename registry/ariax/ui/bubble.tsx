import * as React from 'react';
import * as stylex from '@stylexjs/stylex';

type Styled<P> = Omit<P, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
type DivProps = Styled<React.ComponentProps<'div'>>;
export type BubbleProps = DivProps & { variant?: 'default' | 'secondary' | 'muted' | 'tinted' | 'outline' | 'ghost' | 'destructive' | null; align?: 'start' | 'end' };
export function BubbleGroup({ className: _, xstyle, style, ...props }: DivProps) {
  const sx = stylex.props(styles.group, xstyle);
  return <div data-slot="bubble-group" {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
export function Bubble({ variant = 'default', align = 'start', className: _, xstyle, style, ...props }: BubbleProps) {
  const sx = stylex.props(styles.root, xstyle);
  return <div data-slot="bubble" data-variant={variant} data-align={align} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
export function BubbleContent({ className: _, xstyle, style, render, children, ...props }: DivProps & { render?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode }) {
  const sx = stylex.props(styles.content, xstyle);
  const attributes = { ...props, 'data-slot': 'bubble-content', className: sx.className, style: { ...sx.style, ...style }, children };
  return render ? render(attributes) : <div {...attributes} />;
}
export function BubbleReactions({ side = 'bottom', align = 'end', className: _, xstyle, style, ...props }: DivProps & { side?: 'top' | 'bottom'; align?: 'start' | 'end' }) {
  const sx = stylex.props(styles.reactions, xstyle);
  return <div data-slot="bubble-reactions" data-align={align} data-side={side} {...props} className={sx.className} style={{ ...sx.style, ...style }} />;
}
const styles = stylex.create({
  group: { display: 'flex', minWidth: 0, flexDirection: 'column', gap: 'calc(var(--ariax-spacing, .25rem) * 2)' },
  root: { position: 'relative', display: 'flex', width: 'fit-content', minWidth: 0, flexDirection: 'column', gap: 'calc(var(--ariax-spacing, .25rem) * 1)', maxWidth: { default: '80%', ':is([data-variant="ghost"])': '100%' }, alignSelf: { default: null, ':is([data-align="end"], [data-slot="message"][data-align="end"] *)': 'flex-end' }, borderStyle: { default: null, ':is([data-variant="ghost"])': 'none' } },
  content: { width: 'fit-content', maxWidth: '100%', minWidth: 0, overflow: 'hidden', overflowWrap: 'break-word', textAlign: { default: null, ':is(button)': 'left' }, transitionProperty: { default: null, ':is(button,a)': 'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to' }, transitionDuration: { default: null, ':is(button,a)': '150ms' }, transitionTimingFunction: { default: null, ':is(button,a)': 'cubic-bezier(0.4,0,0.2,1)' }, borderRadius: 'var(--ariax-bubble-radius, calc(var(--radius) * 1.4))', borderWidth: 1, borderStyle: 'solid', borderColor: { default: 'var(--ariax-bubble-border, transparent)', ':is(button,a):focus-visible': 'var(--ring)' }, paddingInline: 'var(--ariax-bubble-padding-x, calc(var(--ariax-spacing, .25rem) * 3))', paddingBlock: 'var(--ariax-bubble-padding-y, calc(var(--ariax-spacing, .25rem) * 2))', fontSize: '.875rem', lineHeight: 1.625, outlineStyle: { default: null, ':is(button,a)': 'none' }, boxShadow: { default: null, ':is(button,a):focus-visible': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 0 0 #0000' }, alignSelf: { default: null, ':is([data-slot="bubble"][data-align="end"] *)': 'flex-end' } },
  reactions: { position: 'absolute', zIndex: 10, display: 'flex', width: 'fit-content', alignItems: 'center', justifyContent: 'center', borderRadius: 'calc(infinity * 1px)', boxShadow: '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--card), 0 0 0 0 #0000', backgroundColor: 'var(--muted)', flexShrink: 0, gap: 'calc(var(--ariax-spacing, .25rem) * 1)', paddingInline: { default: 'calc(var(--ariax-spacing, .25rem) * 1.5)', ':has(button)': 0 }, paddingBlock: { default: 'calc(var(--ariax-spacing, .25rem) * 0.5)', ':has(button)': 0 }, fontSize: '.875rem', lineHeight: 'calc(1.25 / .875)', top: { default: null, ':is([data-side="top"])': 0 }, bottom: { default: null, ':is([data-side="bottom"])': 0 }, translate: { default: null, ':is([data-side="top"])': '0 -75%', ':is([data-side="bottom"])': '0 75%' }, insetInlineStart: { default: null, ':is([data-align="start"])': 'calc(var(--ariax-spacing, .25rem) * 3)' }, insetInlineEnd: { default: null, ':is([data-align="end"])': 'calc(var(--ariax-spacing, .25rem) * 3)' } },
});
