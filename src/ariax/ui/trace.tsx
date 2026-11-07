"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Button as ButtonPrimitive,
  type ButtonProps,
} from "react-aria-components";
import { ChevronRightIcon } from "lucide-react";
import { Collapsible, CollapsibleContent } from "./collapsible";
import { traceAnimationStyles } from "./animations.stylex";
import { applied } from "./style-props.internal";

type Styled<P> = Omit<P, "className"> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};

export function Trace({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="trace"
      {...props}
      {...applied(styles.root, xstyle, style)}
    />
  );
}

export function TraceLine({
  className: _,
  xstyle,
  style,
  status,
  ...props
}: Styled<React.ComponentProps<"span">> & {
  status?: "running" | "error" | "pending";
}) {
  return (
    <span
      data-slot="trace-line"
      data-status={status}
      {...props}
      {...applied(styles.line, xstyle, style)}
    />
  );
}

export function TraceIcon({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<React.ComponentProps<"span">>) {
  return (
    <span
      data-slot="trace-icon"
      aria-hidden="true"
      {...props}
      {...applied(styles.icon, xstyle, style)}
    />
  );
}
export function TraceTitle({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<React.ComponentProps<"span">>) {
  return (
    <span
      data-slot="trace-title"
      {...props}
      {...applied([styles.title, traceAnimationStyles.title], xstyle, style)}
    />
  );
}
export function TraceDescription({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<React.ComponentProps<"span">>) {
  return (
    <span
      data-slot="trace-description"
      {...props}
      {...applied(styles.description, xstyle, style)}
    />
  );
}

export type TraceCollapsibleProps = Omit<
  React.ComponentProps<typeof Collapsible>,
  "isExpanded"
> &
  (
    | { isExpanded?: undefined }
    | {
        isExpanded: boolean;
        onExpandedChange: NonNullable<
          React.ComponentProps<typeof Collapsible>["onExpandedChange"]
        >;
      }
  );

export function TraceCollapsible({
  className: _,
  xstyle,
  ...props
}: TraceCollapsibleProps) {
  return (
    <Collapsible
      data-slot="trace-collapsible"
      {...props}
      xstyle={[styles.collapsible, xstyle]}
    />
  );
}

export function TraceCollapsibleTrigger({
  className: _,
  xstyle,
  style,
  children,
  ...props
}: Styled<Omit<ButtonProps, "children" | "slot">> & {
  children?: React.ReactNode;
}) {
  const sx = stylex.props(styles.trigger, xstyle);
  return (
    <ButtonPrimitive
      slot="trigger"
      {...props}
      data-slot="trace-collapsible-trigger"
      className={sx.className}
      style={(state) => ({
        ...sx.style,
        ...(typeof style === "function" ? style(state) : style),
      })}
    >
      {children}
      <TraceIcon xstyle={styles.chevron}>
        <ChevronRightIcon />
      </TraceIcon>
    </ButtonPrimitive>
  );
}

export function TraceCollapsibleContent({
  className: _,
  xstyle,
  style,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CollapsibleContent>, "children"> & {
  children?: React.ReactNode;
}) {
  return (
    <CollapsibleContent
      data-slot="trace-collapsible-content"
      {...props}
      style={style}
      xstyle={styles.content}
    >
      <div
        data-slot="trace-collapsible-content-inner"
        {...stylex.props(styles.inner, xstyle)}
      >
        {children}
      </div>
    </CollapsibleContent>
  );
}

const styles = stylex.create({
  title: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  description: {
    flexShrink: 0,
    color: "color-mix(in oklab, var(--muted-foreground) 70%, transparent)",
    fontVariantNumeric: "tabular-nums",
  },
  root: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: "calc(var(--ariax-spacing, .25rem) * 2)",
  },
  line: {
    display: "flex",
    width: "fit-content",
    maxWidth: "100%",
    minWidth: 0,
    alignItems: "center",
    gap: "calc(var(--ariax-spacing, .25rem) * 2)",
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
    color: {
      default: "var(--muted-foreground)",
      ":is(a:hover *, button:hover *)": {
        default: null,
        "@media (hover: hover)": "var(--foreground)",
      },
      ':is([data-status="error"])': "var(--destructive)",
      ':is(a:hover *, button:hover *)[data-status="error"]': {
        default: null,
        "@media (hover: hover)": "var(--destructive)",
      },
    },
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    cursor: { default: null, ":is(a *, button *)": "pointer" },
    opacity: { default: null, ':is([data-status="pending"])': 0.6 },
  },
  icon: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: "calc(var(--ariax-spacing, .25rem) * 4)",
    height: "calc(var(--ariax-spacing, .25rem) * 4)",
    marginInlineStart: {
      default: null,
      ':is([data-slot="trace-title"] ~ *)':
        "calc(var(--ariax-spacing, .25rem) * -1)",
    },
  },
  collapsible: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
  },
  trigger: {
    display: "flex",
    width: "fit-content",
    maxWidth: "100%",
    minWidth: 0,
    cursor: "pointer",
    alignItems: "center",
    textAlign: "start",
    outlineStyle: "none",
    gap: "calc(var(--ariax-spacing, .25rem) * 1)",
    borderRadius: "calc(var(--radius) * .8)",
    color: {
      default: "var(--muted-foreground)",
      ':hover:not(:has([data-status="error"]))': {
        default: null,
        "@media (hover: hover)": "var(--foreground)",
      },
      ':has([data-status="error"])': "var(--destructive)",
    },
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: {
      default: null,
      ":focus-visible":
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 0 0 #0000",
    },
  },
  chevron: {
    transitionProperty: "transform, translate, scale, rotate",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    rotate: {
      default: null,
      ':is([data-slot="trace-collapsible-trigger"][aria-expanded="true"] *)':
        "90deg",
    },
  },
  content: {
    height: "var(--disclosure-panel-height)",
    minWidth: 0,
    overflow: "clip",
    transitionProperty: "height",
    transitionDuration: "200ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  inner: {
    minWidth: 0,
    overflowWrap: "break-word",
    color: "var(--muted-foreground)",
    marginTop: "calc(var(--ariax-spacing, .25rem) * 2)",
    marginBottom: "var(--ariax-spacing, .25rem)",
    marginInlineStart: "calc(var(--ariax-spacing, .25rem) * 2 - 1px)",
    borderInlineStartWidth: 1,
    paddingInlineEnd: "var(--ariax-spacing, .25rem)",
    paddingInlineStart: "calc(var(--ariax-spacing, .25rem) * 4)",
    lineHeight: 1.625,
  },
});
