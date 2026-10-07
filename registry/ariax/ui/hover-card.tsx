"use client";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  composeRenderProps,
  PreviewTrigger,
  Popover as Primitive,
  type PreviewTriggerProps,
} from "react-aria-components";
import { animationStyles } from "./animations.stylex";
type Custom = { xstyle?: stylex.StyleXStyles; className?: never };
export type HoverCardProps = Omit<
  React.ComponentProps<typeof Primitive>,
  "className"
> &
  Custom;
const styles = stylex.create({
  content: {
    animationDuration: {
      default: null,
      ":is([data-entering],[data-exiting])": "100ms",
    },
    animationTimingFunction: {
      default: null,
      ":is([data-entering],[data-exiting])": "ease",
    },
    "--ariax-enter-opacity": { default: 1, ":is([data-entering])": 0 },
    "--ariax-exit-opacity": { default: 1, ":is([data-exiting])": 0 },
    "--ariax-enter-scale": { default: 1, ":is([data-entering])": 0.95 },
    "--ariax-exit-scale": { default: 1, ":is([data-exiting])": 0.95 },
    "--ariax-enter-x": {
      default: "0px",
      ':is([data-placement="left"])': "calc(var(--ariax-spacing, .25rem) * 2)",
      ':is([data-placement="right"])':
        "calc(var(--ariax-spacing, .25rem) * -2)",
    },
    "--ariax-enter-y": {
      default: "0px",
      ':is([data-placement="bottom"])':
        "calc(var(--ariax-spacing, .25rem) * -2)",
      ':is([data-placement="top"])': "calc(var(--ariax-spacing, .25rem) * 2)",
    },
    zIndex: 50,
    width: "calc(var(--ariax-spacing, .25rem) * 64)",
    transformOrigin: "var(--trigger-anchor-point)",
    outlineStyle: {
      default: "none",
      "@media (forced-colors: active)": "solid",
    },
    outlineWidth: { default: null, "@media (forced-colors: active)": 2 },
    outlineOffset: { default: null, "@media (forced-colors: active)": 2 },
    outlineColor: {
      default: null,
      "@media (forced-colors: active)": "transparent",
    },
    backgroundColor: "var(--popover)",
    color: "var(--popover-foreground)",
    borderRadius: "var(--radius)",
    padding: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25 / 0.875)",
    transitionDuration: "100ms",
    boxShadow:
      "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
});
export function HoverCardTrigger(props: PreviewTriggerProps) {
  return <PreviewTrigger data-slot="hover-card-trigger" {...props} />;
}
export function HoverCard({
  placement = "bottom",
  offset = 4,
  crossOffset = 0,
  xstyle,
  style,
  className: _,
  ...props
}: HoverCardProps) {
  const a = stylex.props(animationStyles.overlay, styles.content, xstyle);
  return (
    <Primitive
      data-slot="hover-card-content"
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      {...props}
      className={a.className}
      style={composeRenderProps(style, (value) => ({ ...a.style, ...value }))}
    />
  );
}
