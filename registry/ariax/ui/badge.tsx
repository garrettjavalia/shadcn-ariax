"use client";
import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
export type BadgeVariant =
  "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
export type BadgeProps = Omit<React.ComponentProps<"span">, "className"> & {
  className?: never;
  variant?: BadgeVariant | null;
  xstyle?: stylex.StyleXStyles;
  render?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode;
};
export function badgeProps({
  variant = "default",
  xstyle,
  style,
}: Pick<BadgeProps, "variant" | "xstyle" | "style"> = {}) {
  const applied = stylex.props(
    styles.base,
    variant && variants[variant],
    xstyle,
  );
  return {
    className: `ariax-badge ${applied.className ?? ""}`,
    style: { ...applied.style, ...style },
  };
}
export function Badge({
  className: _className,
  variant = "default",
  xstyle,
  style,
  render,
  ...props
}: BadgeProps) {
  const applied = {
    "data-slot": "badge",
    "data-variant": variant,
    ...badgeProps({ variant, xstyle, style }),
    ...props,
  };
  return render ? render(applied) : <span {...applied} />;
}
const styles = stylex.create({
  base: {
    display: "inline-flex",
    width: "fit-content",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    height: "calc(var(--ariax-spacing, .25rem) * 5)",
    gap: "calc(var(--ariax-spacing, .25rem) * 1)",
    borderRadius: "calc(var(--radius) * 2.6)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "transparent",
      ":focus-visible": "var(--ring)",
      ':is([aria-invalid="true"])': "var(--destructive)",
    },
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 0.5)",
    paddingInlineEnd: {
      default: "calc(var(--ariax-spacing, .25rem) * 2)",
      ':has([data-icon="inline-end"])':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
    },
    paddingInlineStart: {
      default: "calc(var(--ariax-spacing, .25rem) * 2)",
      ':has([data-icon="inline-start"])':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
    },
    fontSize: "0.75rem",
    lineHeight: "calc(1 / .75)",
    fontWeight: 500,
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    "--ariax-badge-ring": {
      default: "color-mix(in oklab, var(--ring) 50%, transparent)",
      ':is([aria-invalid="true"])':
        "color-mix(in oklab, var(--destructive) 20%, transparent)",
      ':is(.dark *)[aria-invalid="true"]':
        "color-mix(in oklab, var(--destructive) 40%, transparent)",
    },
    boxShadow: {
      default: null,
      ":focus-visible":
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-badge-ring), 0 0 0 0 #0000",
    },
  },
});
const variants = stylex.create({
  default: {
    backgroundColor: {
      default: "var(--primary)",
      ":is(a):hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab, var(--primary) 80%, transparent)",
      },
    },
    color: "var(--primary-foreground)",
  },
  secondary: {
    backgroundColor: {
      default: "var(--secondary)",
      ":is(a):hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab, var(--secondary) 80%, transparent)",
      },
    },
    color: "var(--secondary-foreground)",
  },
  destructive: {
    backgroundColor: {
      default: "color-mix(in oklab, var(--destructive) 10%, transparent)",
      ":is(.dark *)":
        "color-mix(in oklab, var(--destructive) 20%, transparent)",
      ":is(a):hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab, var(--destructive) 20%, transparent)",
      },
    },
    color: "var(--destructive)",
    "--ariax-badge-ring": {
      default: "color-mix(in oklab, var(--destructive) 20%, transparent)",
      ":is(.dark *)":
        "color-mix(in oklab, var(--destructive) 40%, transparent)",
    },
  },
  outline: {
    borderColor: {
      default: "var(--border)",
      ":focus-visible": "var(--ring)",
      ':is([aria-invalid="true"])': "var(--destructive)",
    },
    color: {
      default: "var(--foreground)",
      ":is(a):hover": {
        default: null,
        "@media (hover: hover)": "var(--muted-foreground)",
      },
    },
    backgroundColor: {
      default: null,
      ":is(a):hover": {
        default: null,
        "@media (hover: hover)": "var(--muted)",
      },
    },
  },
  ghost: {
    backgroundColor: {
      default: null,
      ":hover": { default: null, "@media (hover: hover)": "var(--muted)" },
      ":is(.dark *):hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab, var(--muted) 50%, transparent)",
      },
    },
    color: {
      default: null,
      ":hover": {
        default: null,
        "@media (hover: hover)": "var(--muted-foreground)",
      },
    },
  },
  link: {
    color: "var(--primary)",
    textUnderlineOffset: 4,
    textDecorationLine: {
      default: null,
      ":hover": { default: null, "@media (hover: hover)": "underline" },
    },
  },
});
