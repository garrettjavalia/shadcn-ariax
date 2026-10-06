'use client';
import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { Focusable, OverlayArrow, Tooltip as TooltipPrimitive, TooltipTrigger as TooltipTriggerPrimitive } from 'react-aria-components';

export type TooltipProps = Omit<React.ComponentProps<typeof TooltipPrimitive>, 'children' | 'className'> & { className?: never; children?: React.ReactNode; xstyle?: stylex.StyleXStyles };
const styles = stylex.create({
  content: {
    animationName: { default: null, ':is([data-entering])': 'enter', ':is([data-exiting])': 'exit' },
    animationDuration: { default: null, ':is([data-entering], [data-exiting])': '150ms' },
    animationTimingFunction: { default: null, ':is([data-entering], [data-exiting])': 'ease' },
    '--ariax-enter-opacity': { default: 1, ':is([data-entering])': 0 }, '--ariax-enter-scale': { default: 1, ':is([data-entering])': 0.95 },
    '--ariax-exit-opacity': { default: 1, ':is([data-exiting])': 0 }, '--ariax-exit-scale': { default: 1, ':is([data-exiting])': 0.95 },
    '--ariax-enter-x': { default: '0px', ':is([data-placement="left"])': '0.5rem', ':is([data-placement="right"])': '-0.5rem' },
    '--ariax-enter-y': { default: '0px', ':is([data-placement="bottom"])': '-0.5rem', ':is([data-placement="top"])': '0.5rem' },
    zIndex: 50, width: 'fit-content', maxWidth: '20rem', transformOrigin: 'var(--trigger-anchor-point)', backgroundColor: 'var(--foreground)', color: 'var(--background)',
    display: 'inline-flex', alignItems: 'center', gap: '0.375rem', borderRadius: 'calc(var(--radius) * 0.8)', paddingBlock: '0.375rem', paddingInline: '0.75rem var(--ariax-tooltip-padding-end)', '--ariax-tooltip-padding-end': { default: '0.75rem', ':has([data-slot="kbd"])': '0.375rem' },
    fontSize: '0.75rem', lineHeight: 'calc(1 / 0.75)',
  },
  arrow: { zIndex: 50, backgroundColor: 'var(--foreground)', fill: 'var(--foreground)', width: '0.625rem', height: '0.625rem', translate: '0 calc(-50% - 2px)', rotate: '45deg', borderRadius: 2 },
});
export function TooltipTrigger({ delay = 0, children, ...props }: React.ComponentProps<typeof TooltipTriggerPrimitive>) {
  const [trigger, tooltip] = React.Children.toArray(children);
  return <TooltipTriggerPrimitive data-slot="tooltip-trigger" delay={delay} {...props}><Focusable>{trigger as React.ComponentProps<typeof Focusable>['children']}</Focusable>{tooltip}</TooltipTriggerPrimitive>;
}
export function Tooltip({ className: _className, placement = 'top', offset = 4, crossOffset = 0, children, xstyle, style, ...props }: TooltipProps) {
  const applied = stylex.props(styles.content, xstyle);
  const arrow = stylex.props(styles.arrow);
  return <TooltipPrimitive data-slot="tooltip-content" placement={placement} offset={offset} crossOffset={crossOffset} {...props} className={['ariax-tooltip', applied.className].filter(Boolean).join(' ')} style={state => ({ ...applied.style, ...(typeof style === 'function' ? style(state) : style) })}>
    {children}<OverlayArrow className={arrow.className} style={({ placement, defaultStyle }) => ({ ...arrow.style, ...defaultStyle, rotate: '0deg', translate: '0 0', transform: placement === 'bottom' ? 'translate(-50%, calc(50% + 2px)) rotate(45deg)' : placement === 'top' ? 'translate(-50%, calc(-50% - 2px)) rotate(45deg)' : placement === 'left' ? 'translate(calc(-50% - 2px), -50%) rotate(45deg)' : 'translate(calc(50% + 2px), -50%) rotate(45deg)' })}/>
  </TooltipPrimitive>;
}
