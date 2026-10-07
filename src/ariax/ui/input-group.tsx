"use client";
import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Group,
  composeRenderProps,
  type GroupProps,
} from "react-aria-components";
import { Button, type ButtonProps } from "./button";
import { Input, type InputProps } from "./input";
import { Textarea, type TextareaProps } from "./textarea";
type Custom = { xstyle?: stylex.StyleXStyles; className?: never };
export function InputGroup({
  xstyle,
  className: _,
  style,
  ...props
}: Omit<GroupProps, "className"> & Custom) {
  const applied = stylex.props(styles.group, xstyle);
  return (
    <Group
      data-slot="input-group"
      {...props}
      className={applied.className}
      style={composeRenderProps(style, (value) => ({
        ...applied.style,
        ...value,
      }))}
    />
  );
}
export type InputGroupAlign =
  "inline-start" | "inline-end" | "block-start" | "block-end";
export function InputGroupAddon({
  align = "inline-start",
  xstyle,
  className: _,
  style,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> &
  Custom & { align?: InputGroupAlign | null }) {
  const applied = stylex.props(styles.addon, align && aligns[align], xstyle);
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;
        event.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
      className={applied.className}
      style={{ ...applied.style, ...style }}
    />
  );
}
export type InputGroupButtonSize = "xs" | "sm" | "icon-xs" | "icon-sm";
export function InputGroupButton({
  size = "xs",
  variant = "ghost",
  type = "button",
  xstyle,
  ...props
}: Omit<ButtonProps, "size"> & { size?: InputGroupButtonSize | null }) {
  return (
    <Button
      type={type}
      variant={variant}
      data-size={size}
      {...props}
      xstyle={[styles.button, size && sizes[size], xstyle]}
    />
  );
}
export function InputGroupText({
  xstyle,
  className: _,
  style,
  ...props
}: Omit<React.ComponentProps<"span">, "className"> & Custom) {
  const applied = stylex.props(styles.text, xstyle);
  return (
    <span
      {...props}
      className={["ariax-input-group-text", applied.className].join(" ")}
      style={{ ...applied.style, ...style }}
    />
  );
}
export function InputGroupInput({ xstyle, ...props }: InputProps) {
  return (
    <Input
      data-slot="input-group-control"
      {...props}
      xstyle={[styles.control, xstyle]}
    />
  );
}
export function InputGroupTextarea({ xstyle, ...props }: TextareaProps) {
  return (
    <Textarea
      data-slot="input-group-control"
      {...props}
      xstyle={[styles.control, styles.textarea, xstyle]}
    />
  );
}
const ring =
  "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-group-ring), 0 0 0 0 #0000";
const focus = ':has([data-slot="input-group-control"]:focus-visible)';
const invalid = ':has([data-slot][aria-invalid="true"])';
const block =
  ':is(:has(>[data-align="block-start"]), :has(>[data-align="block-end"]))';
const zeroRing =
  "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 var(--ariax-control-ring), 0 0 0 0 #0000";
const comboboxContent = ':is([data-slot="combobox-content"] > *)';
const styles = stylex.create({
  group: {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: 0,
    alignItems: "center",
    outlineStyle: "none",
    height: {
      default: "calc(var(--ariax-spacing, .25rem) * 8)",
      ":has(>textarea)": "auto",
      [block]: "auto",
      [comboboxContent]: "calc(var(--ariax-spacing, .25rem) * 8)",
    },
    margin: {
      default: null,
      [comboboxContent]: "calc(var(--ariax-spacing, .25rem) * 1)",
    },
    marginBottom: { default: null, [comboboxContent]: 0 },
    flexDirection: { default: null, [block]: "column" },
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "var(--radius)",
    borderColor: {
      default: "var(--input)",
      [comboboxContent]: "color-mix(in oklab, var(--input) 30%, transparent)",
      ':has([data-slot="input-group-control"]:focus-visible):not(:has([data-slot][aria-invalid="true"]))':
        "var(--ring)",
      [invalid]: "var(--destructive)",
      ':is([data-slot="combobox-content"] *):focus-within': "inherit",
    },
    backgroundColor: {
      default: null,
      [comboboxContent]: "color-mix(in oklab, var(--input) 30%, transparent)",
      ":is(.dark *)": "color-mix(in oklab, var(--input) 30%, transparent)",
      ":has(:disabled)": "color-mix(in oklab, var(--input) 50%, transparent)",
      ":is(.dark *):has(:disabled)":
        "color-mix(in oklab, var(--input) 80%, transparent)",
    },
    opacity: { default: null, ":has(:disabled)": 0.5 },
    "--ariax-group-ring": {
      default: "color-mix(in oklab, var(--ring) 50%, transparent)",
      [invalid]: "color-mix(in oklab, var(--destructive) 20%, transparent)",
      ':is(.dark *):has([data-slot][aria-invalid="true"])':
        "color-mix(in oklab, var(--destructive) 40%, transparent)",
    },
    boxShadow: {
      default: null,
      [comboboxContent]:
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000",
      [focus]: ring,
      [invalid]: ring,
      ':is([data-slot="combobox-content"] *):focus-within':
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000",
    },
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  addon: {
    display: "flex",
    cursor: "text",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    color: "var(--muted-foreground)",
    height: "auto",
    gap: "calc(var(--ariax-spacing, .25rem) * 2)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25 / .875)",
    fontWeight: 500,
    "--ariax-addon-icon-size": "calc(var(--ariax-spacing, .25rem) * 4)",
    "--ariax-addon-kbd-radius": "calc(var(--radius) - 5px)",
    opacity: {
      default: null,
      ':is([data-slot="input-group"][data-disabled="true"] *)': 0.5,
    },
  },
  button: {
    display: "flex",
    alignItems: "center",
    boxShadow: {
      default:
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000",
      ":focus-visible":
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-ring), 0 0 0 0 #0000",
      ':is([aria-invalid="true"])':
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-ring), 0 0 0 0 #0000",
    },
    gap: "calc(var(--ariax-spacing, .25rem) * 2)",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25 / .875)",
  },
  text: {
    "--ariax-text-icon-size": "calc(var(--ariax-spacing, .25rem) * 4)",
    display: "flex",
    alignItems: "center",
    color: "var(--muted-foreground)",
    gap: "calc(var(--ariax-spacing, .25rem) * 2)",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25 / .875)",
  },
  control: {
    "--ariax-control-ring": {
      default: "currentColor",
      ':focus-visible:not([aria-invalid="true"])':
        "color-mix(in oklab, var(--ring) 50%, transparent)",
      ':is([aria-invalid="true"])':
        "color-mix(in oklab, var(--destructive) 20%, transparent)",
      ':is(.dark *)[aria-invalid="true"]':
        "color-mix(in oklab, var(--destructive) 40%, transparent)",
    },
    flex: "1 1 0%",
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: {
      default: "transparent",
      ":is(.dark *)": "transparent",
      ":disabled": "transparent",
      ":is(.dark *):disabled": "transparent",
    },
    boxShadow: {
      default: zeroRing,
      ":focus-visible": zeroRing,
      ':is([aria-invalid="true"])': zeroRing,
    },
    paddingInlineStart: {
      default: null,
      ':is([data-slot="input-group"]:has(>[data-align="inline-start"]) > input)':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
    },
    paddingInlineEnd: {
      default: null,
      ':is([data-slot="input-group"]:has(>[data-align="inline-end"]) > input)':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
    },
    paddingTop: {
      default: null,
      ':is([data-slot="input-group"]:has(>[data-align="block-end"]) > input)':
        "calc(var(--ariax-spacing, .25rem) * 3)",
    },
    paddingBottom: {
      default: null,
      ':is([data-slot="input-group"]:has(>[data-align="block-start"]) > input)':
        "calc(var(--ariax-spacing, .25rem) * 3)",
    },
  },
  textarea: {
    resize: "none",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 2)",
  },
});
const aligns = stylex.create({
  "inline-start": {
    order: -9999,
    paddingInlineStart: "calc(var(--ariax-spacing, .25rem) * 2)",
    marginInlineStart: {
      default: null,
      ":has(>button)": "-0.3rem",
      ":has(>kbd)": "-0.15rem",
    },
  },
  "inline-end": {
    order: 9999,
    paddingInlineEnd: "calc(var(--ariax-spacing, .25rem) * 2)",
    marginInlineEnd: {
      default: null,
      ":has(>button)": "-0.3rem",
      ":has(>kbd)": "-0.15rem",
    },
  },
  "block-start": {
    order: -9999,
    width: "100%",
    justifyContent: "flex-start",
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    paddingTop: "calc(var(--ariax-spacing, .25rem) * 2)",
  },
  "block-end": {
    order: 9999,
    width: "100%",
    justifyContent: "flex-start",
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    paddingBottom: "calc(var(--ariax-spacing, .25rem) * 2)",
  },
});
const sizes = stylex.create({
  xs: {
    height: "calc(var(--ariax-spacing, .25rem) * 6)",
    gap: "calc(var(--ariax-spacing, .25rem) * 1)",
    borderRadius: "calc(var(--radius) - 3px)",
    paddingInlineStart: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    paddingInlineEnd: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    "--ariax-icon-size": "calc(var(--ariax-spacing, .25rem) * 3.5)",
  },
  sm: {},
  "icon-xs": {
    width: "calc(var(--ariax-spacing, .25rem) * 6)",
    height: "calc(var(--ariax-spacing, .25rem) * 6)",
    borderRadius: "calc(var(--radius) - 3px)",
    padding: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
  },
  "icon-sm": {
    width: "calc(var(--ariax-spacing, .25rem) * 8)",
    height: "calc(var(--ariax-spacing, .25rem) * 8)",
    padding: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
  },
});
