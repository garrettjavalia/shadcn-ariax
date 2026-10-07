"use client";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  composeRenderProps,
  DialogTrigger,
  Heading,
  Popover as Primitive,
  type DialogTriggerProps,
} from "react-aria-components";
import { animationStyles } from "./animations.stylex";
type Custom = { xstyle?: stylex.StyleXStyles; className?: never };
export type PopoverProps = Omit<
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
    width: "calc(var(--ariax-spacing, .25rem) * 72)",
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
    display: "flex",
    flexDirection: "column",
    gap: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    borderRadius: "var(--radius)",
    padding: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25 / 0.875)",
    transitionDuration: "100ms",
    boxShadow:
      "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "calc(var(--ariax-spacing, .25rem) * 0.5)",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25 / 0.875)",
  },
  title: { fontWeight: 500 },
  description: { color: "var(--muted-foreground)" },
});
export function PopoverTrigger(props: DialogTriggerProps) {
  return <DialogTrigger data-slot="popover-trigger" {...props} />;
}
export function Popover({
  placement = "bottom",
  offset = 4,
  crossOffset = 0,
  xstyle,
  style,
  className: _,
  ...props
}: PopoverProps) {
  const a = stylex.props(animationStyles.overlay, styles.content, xstyle);
  return (
    <Primitive
      data-slot="popover-content"
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      {...props}
      className={a.className}
      style={composeRenderProps(style, (value) => ({ ...a.style, ...value }))}
    />
  );
}
type DivProps = Omit<React.ComponentProps<"div">, "className"> & Custom;
export function PopoverHeader({
  xstyle,
  style,
  className: _,
  ...props
}: DivProps) {
  const a = stylex.props(styles.header, xstyle);
  return (
    <div
      data-slot="popover-header"
      {...props}
      className={a.className}
      style={{ ...a.style, ...style }}
    />
  );
}
export function PopoverTitle({
  xstyle,
  style,
  className: _,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, "className"> & Custom) {
  const a = stylex.props(styles.title, xstyle);
  return (
    <Heading
      data-slot="popover-title"
      {...props}
      className={a.className}
      style={{ ...a.style, ...style }}
    />
  );
}
export function PopoverDescription({
  xstyle,
  style,
  className: _,
  ...props
}: DivProps) {
  const a = stylex.props(styles.description, xstyle);
  return (
    <div
      data-slot="popover-description"
      {...props}
      className={a.className}
      style={{ ...a.style, ...style }}
    />
  );
}
