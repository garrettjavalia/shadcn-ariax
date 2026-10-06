'use client';

import * as stylex from '@stylexjs/stylex';
import { Disclosure, Button, DisclosurePanel, type DisclosureProps, type ButtonProps, type DisclosurePanelProps } from 'react-aria-components';
type Custom<P> = Omit<P, 'className'> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
export type CollapsibleProps = Custom<DisclosureProps>;
export type CollapsibleTriggerProps = Custom<ButtonProps>;
export type CollapsibleContentProps = Custom<DisclosurePanelProps>;
export function Collapsible({
  className: _className,
  xstyle,
  style,
  ...props
}: CollapsibleProps) {
  const applied = stylex.props(xstyle);
  return <Disclosure data-slot="collapsible" {...props} className={applied.className || undefined} style={state => ({
    ...applied.style,
    ...(typeof style === 'function' ? style(state) : style)
  })} />;
}
export function CollapsibleTrigger({
  className: _className,
  xstyle,
  style,
  ...props
}: CollapsibleTriggerProps) {
  const applied = stylex.props(xstyle);
  return <Button slot="trigger" data-slot="collapsible-trigger" {...props} className={applied.className || undefined} style={state => ({
    ...applied.style,
    ...(typeof style === 'function' ? style(state) : style)
  })} />;
}
export function CollapsibleContent({
  className: _className,
  xstyle,
  style,
  ...props
}: CollapsibleContentProps) {
  const applied = stylex.props(xstyle);
  return <DisclosurePanel data-slot="collapsible-content" {...props} className={applied.className || undefined} style={state => ({
    ...applied.style,
    ...(typeof style === 'function' ? style(state) : style)
  })} />;
}
