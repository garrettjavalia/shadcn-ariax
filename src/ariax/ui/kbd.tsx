"use client";
import type { ComponentProps } from "react";
import { Keyboard } from "react-aria-components";
import * as stylex from "@stylexjs/stylex";

export type KbdProps = Omit<ComponentProps<"kbd">, "className"> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
export type KbdGroupProps = Omit<ComponentProps<"div">, "className"> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
const styles = stylex.create({
  key: {
    pointerEvents: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    backgroundColor: {
      default: "var(--muted)",
      ':is([data-slot="tooltip-content"] *)':
        "color-mix(in oklab, var(--background) 20%, transparent)",
      ':is(.dark [data-slot="tooltip-content"] *)':
        "color-mix(in oklab, var(--background) 10%, transparent)",
    },
    color: {
      default: "var(--muted-foreground)",
      ':is([data-slot="tooltip-content"] *)': "var(--background)",
    },
    height: "calc(var(--ariax-spacing, .25rem) * 5)",
    width: "fit-content",
    minWidth: "calc(var(--ariax-spacing, .25rem) * 5)",
    gap: "calc(var(--ariax-spacing, .25rem) * 1)",
    borderRadius: {
      default: "calc(var(--radius) * 0.6)",
      ':is([data-slot="input-group-addon"] > *)': "calc(var(--radius) - 5px)",
    },
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 1)",
    fontFamily: "var(--font-sans)",
    fontSize: "0.75rem",
    lineHeight: "calc(1 / 0.75)",
    fontWeight: 500,
  },
  group: {
    display: "inline-flex",
    alignItems: "center",
    gap: "calc(var(--ariax-spacing, .25rem) * 1)",
  },
});
export function Kbd({
  xstyle,
  className: _className,
  style,
  ...props
}: KbdProps) {
  const applied = stylex.props(styles.key, xstyle);
  return (
    <Keyboard
      data-slot="kbd"
      {...props}
      className={applied.className}
      style={{ ...applied.style, ...style }}
    />
  );
}
export function KbdGroup({
  xstyle,
  className: _className,
  style,
  ...props
}: KbdGroupProps) {
  const applied = stylex.props(styles.group, xstyle);
  return (
    <Keyboard
      data-slot="kbd-group"
      {...props}
      className={applied.className}
      style={{ ...applied.style, ...style }}
    />
  );
}
