"use client";
import { animationStyles } from "./animations.stylex";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Focusable,
  OverlayArrow,
  Tooltip as TooltipPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "react-aria-components";

export type TooltipProps = Omit<
  React.ComponentProps<typeof TooltipPrimitive>,
  "children" | "className"
> & {
  className?: never;
  children?: React.ReactNode;
  xstyle?: stylex.StyleXStyles;
};
const styles = stylex.create({
  content: {
    animationDuration: {
      default: null,
      ":is([data-entering], [data-exiting])": "150ms",
    },
    animationTimingFunction: {
      default: null,
      ":is([data-entering], [data-exiting])": "ease",
    },
    "--ariax-enter-opacity": { default: 1, ":is([data-entering])": 0 },
    "--ariax-enter-scale": { default: 1, ":is([data-entering])": 0.95 },
    "--ariax-exit-opacity": { default: 1, ":is([data-exiting])": 0 },
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
    width: "fit-content",
    maxWidth: "20rem",
    transformOrigin: "var(--trigger-anchor-point)",
    backgroundColor: "var(--foreground)",
    color: "var(--background)",
    display: "inline-flex",
    alignItems: "center",
    gap: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    borderRadius: "calc(var(--radius) * 0.8)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    paddingInline:
      "calc(var(--ariax-spacing, .25rem) * 3) var(--ariax-tooltip-padding-end)",
    "--ariax-tooltip-padding-end": {
      default: "calc(var(--ariax-spacing, .25rem) * 3)",
      ':has([data-slot="kbd"])': "calc(var(--ariax-spacing, .25rem) * 1.5)",
    },
    fontSize: "0.75rem",
    lineHeight: "calc(1 / 0.75)",
  },
  arrow: {
    zIndex: 50,
    backgroundColor: "var(--foreground)",
    fill: "var(--foreground)",
    width: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    height: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    translate: "0 calc(-50% - 2px)",
    rotate: "45deg",
    borderRadius: 2,
  },
});
export function TooltipTrigger({
  delay = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipTriggerPrimitive>) {
  const [trigger, tooltip] = React.Children.toArray(children);
  return (
    <TooltipTriggerPrimitive
      data-slot="tooltip-trigger"
      delay={delay}
      {...props}
    >
      <Focusable>
        {trigger as React.ComponentProps<typeof Focusable>["children"]}
      </Focusable>
      {tooltip}
    </TooltipTriggerPrimitive>
  );
}
export function Tooltip({
  className: _className,
  placement = "top",
  offset = 4,
  crossOffset = 0,
  children,
  xstyle,
  style,
  ...props
}: TooltipProps) {
  const applied = stylex.props(animationStyles.overlay, styles.content, xstyle);
  const arrow = stylex.props(styles.arrow);
  return (
    <TooltipPrimitive
      data-slot="tooltip-content"
      placement={placement}
      offset={offset}
      crossOffset={crossOffset}
      {...props}
      className={["ariax-tooltip", applied.className].filter(Boolean).join(" ")}
      style={(state) => ({
        ...applied.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    >
      {children}
      <OverlayArrow
        className={arrow.className}
        style={({ placement, defaultStyle }) => ({
          ...arrow.style,
          ...defaultStyle,
          rotate: "0deg",
          translate: "0 0",
          transform:
            placement === "bottom"
              ? "translate(-50%, calc(50% + 2px)) rotate(45deg)"
              : placement === "top"
                ? "translate(-50%, calc(-50% - 2px)) rotate(45deg)"
                : placement === "left"
                  ? "translate(calc(-50% - 2px), -50%) rotate(45deg)"
                  : "translate(calc(50% + 2px), -50%) rotate(45deg)",
        })}
      />
    </TooltipPrimitive>
  );
}
