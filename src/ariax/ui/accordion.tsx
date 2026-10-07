"use client";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  DisclosureGroup,
  Disclosure,
  Heading,
  Button,
  DisclosurePanel,
  type DisclosureGroupProps,
  type DisclosureProps,
  type DisclosurePanelProps,
  type ButtonProps,
} from "react-aria-components";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
function attributes(...values: (stylex.StyleXStyles | undefined)[]) {
  const { className, style } = stylex.props(...values);
  return { className, style };
}
type Custom<P> = Omit<P, "className"> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
export type AccordionProps = Custom<DisclosureGroupProps>;
export type AccordionItemProps = Custom<DisclosureProps>;
export type AccordionTriggerProps = Custom<Omit<ButtonProps, "children">> & {
  children: React.ReactNode;
};
export type AccordionContentProps = Custom<DisclosurePanelProps>;
export function Accordion({
  className: _className,
  xstyle,
  style,
  ...props
}: AccordionProps) {
  const applied = attributes(styles.root, xstyle);
  return (
    <DisclosureGroup
      data-slot="accordion"
      {...props}
      className={applied.className}
      style={(state) => ({
        ...applied.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}
export function AccordionItem({
  className: _className,
  xstyle,
  style,
  ...props
}: AccordionItemProps) {
  const applied = attributes(styles.item, xstyle);
  return (
    <Disclosure
      data-slot="accordion-item"
      {...props}
      className={applied.className}
      style={(state) => ({
        ...applied.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    />
  );
}
export function AccordionTrigger({
  className: _className,
  xstyle,
  style,
  children,
  ...props
}: AccordionTriggerProps) {
  const applied = attributes(styles.trigger, xstyle);
  return (
    <Heading {...attributes(styles.heading)}>
      <Button
        slot="trigger"
        data-slot="accordion-trigger"
        {...props}
        className={["ariax-accordion-trigger", applied.className]
          .filter(Boolean)
          .join(" ")}
        style={(state) => ({
          ...applied.style,
          ...(typeof style === "function" ? style(state) : style),
        })}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          {...attributes(styles.icon, styles.down)}
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          {...attributes(styles.icon, styles.up)}
        />
      </Button>
    </Heading>
  );
}
export function AccordionContent({
  className: _className,
  xstyle,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <DisclosurePanel
      data-slot="accordion-content"
      {...attributes(styles.panel)}
      {...props}
    >
      <div
        {...attributes(styles.inner, xstyle)}
        className={[
          "ariax-accordion-content-inner",
          attributes(styles.inner, xstyle).className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children as React.ReactNode}
      </div>
    </DisclosurePanel>
  );
}
const down = stylex.keyframes({
  from: { height: 0 },
  to: {
    height:
      "var(--radix-accordion-content-height,var(--accordion-panel-height,auto))",
  },
});
const up = stylex.keyframes({
  from: {
    height:
      "var(--radix-accordion-content-height,var(--accordion-panel-height,auto))",
  },
  to: { height: 0 },
});
const styles = stylex.create({
  root: { display: "flex", width: "100%", flexDirection: "column" },
  item: {
    borderBottomWidth: { default: null, ":not(:last-child)": 1 },
    borderBottomStyle: { default: null, ":not(:last-child)": "solid" },
  },
  heading: { display: "flex" },
  trigger: {
    position: "relative",
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: { default: "transparent", ":focus-visible": "var(--ring)" },
    outlineStyle: "none",
    borderRadius: "var(--radius)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    textAlign: "start",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25 / 0.875)",
    fontWeight: 500,
    textDecorationLine: { default: null, ":hover": "underline" },
    pointerEvents: { default: null, ":disabled": "none" },
    opacity: { default: null, ":disabled": 0.5 },
    boxShadow: {
      default: null,
      ":focus-visible":
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 0 0 #0000",
    },
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
  },
  icon: {
    pointerEvents: "none",
    flexShrink: 0,
    color: "var(--muted-foreground)",
    marginInlineStart: "auto",
    width: "calc(var(--ariax-spacing, .25rem) * 4)",
    height: "calc(var(--ariax-spacing, .25rem) * 4)",
  },
  down: {
    display: {
      default: null,
      ':is(.ariax-accordion-trigger[aria-expanded="true"] *)': "none",
    },
  },
  up: {
    display: {
      default: "none",
      ':is(.ariax-accordion-trigger[aria-expanded="true"] *)': "inline",
    },
  },
  panel: {
    height: "var(--disclosure-panel-height)",
    overflow: "clip",
    transitionProperty: "height",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25 / 0.875)",
    animationName: {
      default: null,
      ':is([data-state="open"], [data-open]:not([data-open="false"]))': down,
      ':is([data-state="closed"], [data-closed]:not([data-closed="false"]))':
        up,
    },
    animationDuration: {
      default: null,
      ':is([data-state="open"], [data-open]:not([data-open="false"]), [data-state="closed"], [data-closed]:not([data-closed="false"]))':
        "200ms",
    },
    animationTimingFunction: {
      default: null,
      ':is([data-state="open"], [data-open]:not([data-open="false"]), [data-state="closed"], [data-closed]:not([data-closed="false"]))':
        "ease-out",
    },
  },
  inner: {
    paddingTop: 0,
    paddingBottom: "calc(var(--ariax-spacing, .25rem) * 2.5)",
  },
});
