"use client";

import type * as React from "react";
import { useContext } from "react";
import { RenderStylesContext } from "./render-styles.internal";
import * as stylex from "@stylexjs/stylex";
import {
  composeRenderProps,
  Button as ButtonPrimitive,
  Link as LinkPrimitive,
  type ButtonProps as PrimitiveProps,
  type LinkProps,
} from "react-aria-components";

export type ButtonVariant =
  "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
export type ButtonSize =
  "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
type Variants = {
  variant?: ButtonVariant | null;
  size?: ButtonSize | null;
  xstyle?: stylex.StyleXStyles;
};
type NoExternalClasses = { className?: never };
export type ButtonProps = Omit<PrimitiveProps, "className"> &
  React.RefAttributes<HTMLButtonElement> &
  Variants &
  NoExternalClasses;

// Expose the same resolved styles used by Button/LinkButton for other elements.
export function buttonProps({
  variant = "default",
  size = "default",
  xstyle,
  style,
}: Variants & { style?: React.CSSProperties } = {}) {
  const props = stylex.props(
    styles.base,
    variant && variants[variant],
    size && sizes[size],
    xstyle,
  );
  // Internal marker supports opaque descendant SVGs; it is not a customization API.
  return {
    className: ["ariax-button", props.className].filter(Boolean).join(" "),
    style: { ...props.style, ...style },
  };
}

export function Button({
  className: _className,
  style,
  xstyle,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const renderStyles = useContext(RenderStylesContext);
  const applied = buttonProps({
    variant,
    size,
    xstyle: [renderStyles, xstyle],
  });
  const button = (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      {...props}
      {...applied}
      style={composeRenderProps(style, (value) => ({
        ...applied.style,
        ...value,
      }))}
    />
  );
  return renderStyles ? (
    <RenderStylesContext.Provider value={undefined}>
      {button}
    </RenderStylesContext.Provider>
  ) : (
    button
  );
}

export function LinkButton({
  className: _className,
  style,
  xstyle,
  variant = "default",
  size = "default",
  ...props
}: Omit<LinkProps, "className"> & Variants & NoExternalClasses) {
  const renderStyles = useContext(RenderStylesContext);
  const applied = buttonProps({
    variant,
    size,
    xstyle: [renderStyles, xstyle],
  });
  const button = (
    <LinkPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      {...props}
      {...applied}
      style={composeRenderProps(style, (value) => ({
        ...applied.style,
        ...value,
      }))}
    />
  );
  return renderStyles ? (
    <RenderStylesContext.Provider value={undefined}>
      {button}
    </RenderStylesContext.Provider>
  ) : (
    button
  );
}

const styles = stylex.create({
  base: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    userSelect: "none",
    outlineStyle: "none",
    transitionProperty: "all",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    pointerEvents: { default: null, ":disabled": "none" },
    opacity: { default: null, ":disabled": 0.5 },
    borderRadius: "var(--radius)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: "transparent",
      ":focus-visible": "var(--ring)",
      ':is([aria-invalid="true"])': "var(--destructive)",
      ':is(.dark *)[aria-invalid="true"]':
        "color-mix(in oklab, var(--destructive) 50%, transparent)",
    },
    backgroundClip: "padding-box",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25 / .875)",
    fontWeight: 500,
    "--ariax-ring": {
      default: "color-mix(in oklab, var(--ring) 50%, transparent)",
      ':is([aria-invalid="true"])':
        "color-mix(in oklab, var(--destructive) 20%, transparent)",
      ':is(.dark *)[aria-invalid="true"]':
        "color-mix(in oklab, var(--destructive) 40%, transparent)",
    },
    boxShadow: {
      default: null,
      ":focus-visible":
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-ring), 0 0 0 0 #0000",
      ':is([aria-invalid="true"])':
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-ring), 0 0 0 0 #0000",
    },
    translate: { default: null, ":active:not([aria-haspopup])": "0 1px" },
    "--ariax-icon-size": "calc(var(--ariax-spacing, .25rem) * 4)",
  },
});

const variants = stylex.create({
  default: {
    backgroundColor: {
      default: "var(--primary)",
      ":hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab, var(--primary) 80%, transparent)",
      },
    },
    color: "var(--primary-foreground)",
  },
  outline: {
    borderColor: {
      default: "var(--border)",
      ":is(.dark *)": "var(--input)",
      ":focus-visible": "var(--ring)",
      ":is(.dark *):focus-visible": "var(--input)",
      ':is([aria-invalid="true"])': "var(--destructive)",
      ':is(.dark *)[aria-invalid="true"]':
        "color-mix(in oklab, var(--destructive) 50%, transparent)",
    },
    backgroundColor: {
      default: "var(--background)",
      ":hover": { default: null, "@media (hover: hover)": "var(--muted)" },
      ':is([aria-expanded="true"])': "var(--muted)",
      ":is(.dark *)": "color-mix(in oklab, var(--input) 30%, transparent)",
      ':is(.dark *)[aria-expanded="true"]':
        "color-mix(in oklab, var(--input) 30%, transparent)",
      ":is(.dark *):hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab, var(--input) 50%, transparent)",
      },
    },
    color: {
      default: null,
      ":hover": { default: null, "@media (hover: hover)": "var(--foreground)" },
      ':is([aria-expanded="true"])': "var(--foreground)",
    },
  },
  secondary: {
    backgroundColor: {
      default: "var(--secondary)",
      ":hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklch, var(--secondary), var(--foreground) 5%)",
      },
      ':is([aria-expanded="true"])': "var(--secondary)",
    },
    color: "var(--secondary-foreground)",
  },
  ghost: {
    backgroundColor: {
      default: null,
      ":hover": { default: null, "@media (hover: hover)": "var(--muted)" },
      ':is([aria-expanded="true"])': "var(--muted)",
      ":is(.dark *):hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab, var(--muted) 50%, transparent)",
      },
    },
    color: {
      default: null,
      ":hover": { default: null, "@media (hover: hover)": "var(--foreground)" },
      ':is([aria-expanded="true"])': "var(--foreground)",
    },
  },
  destructive: {
    backgroundColor: {
      default: "color-mix(in oklab, var(--destructive) 10%, transparent)",
      ":hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab, var(--destructive) 20%, transparent)",
      },
      ":is(.dark *)":
        "color-mix(in oklab, var(--destructive) 20%, transparent)",
      ":is(.dark *):hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab, var(--destructive) 30%, transparent)",
      },
    },
    color: "var(--destructive)",
    "--ariax-ring": {
      default: "color-mix(in oklab, var(--destructive) 20%, transparent)",
      ":is(.dark *)":
        "color-mix(in oklab, var(--destructive) 40%, transparent)",
    },
    borderColor: {
      default: "transparent",
      ":focus-visible":
        "color-mix(in oklab, var(--destructive) 40%, transparent)",
      ':is([aria-invalid="true"])': "var(--destructive)",
      ':is(.dark *)[aria-invalid="true"]':
        "color-mix(in oklab, var(--destructive) 50%, transparent)",
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

const sizes = stylex.create({
  default: {
    height: "calc(var(--ariax-spacing, .25rem) * 8)",
    gap: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    paddingInlineEnd: {
      default: "calc(var(--ariax-spacing, .25rem) * 2.5)",
      ':has([data-icon="inline-end"])':
        "calc(var(--ariax-spacing, .25rem) * 2)",
    },
    paddingInlineStart: {
      default: "calc(var(--ariax-spacing, .25rem) * 2.5)",
      ':has([data-icon="inline-start"])':
        "calc(var(--ariax-spacing, .25rem) * 2)",
    },
  },
  xs: {
    height: "calc(var(--ariax-spacing, .25rem) * 6)",
    gap: "calc(var(--ariax-spacing, .25rem) * 1)",
    borderRadius: {
      default: "min(calc(var(--radius) * 0.8), 10px)",
      ':is([data-slot="button-group"] *)': "var(--radius)",
    },
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 2)",
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
    "--ariax-icon-size": "calc(var(--ariax-spacing, .25rem) * 3)",
  },
  sm: {
    height: "calc(var(--ariax-spacing, .25rem) * 7)",
    gap: "calc(var(--ariax-spacing, .25rem) * 1)",
    borderRadius: {
      default: "min(calc(var(--radius) * 0.8), 12px)",
      ':is([data-slot="button-group"] *)': "var(--radius)",
    },
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    paddingInlineEnd: {
      default: "calc(var(--ariax-spacing, .25rem) * 2.5)",
      ':has([data-icon="inline-end"])':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
    },
    paddingInlineStart: {
      default: "calc(var(--ariax-spacing, .25rem) * 2.5)",
      ':has([data-icon="inline-start"])':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
    },
    fontSize: "0.8rem",
    lineHeight: "inherit",
    "--ariax-icon-size": "calc(var(--ariax-spacing, .25rem) * 3.5)",
  },
  lg: {
    height: "calc(var(--ariax-spacing, .25rem) * 9)",
    gap: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    paddingInlineEnd: {
      default: "calc(var(--ariax-spacing, .25rem) * 2.5)",
      ':has([data-icon="inline-end"])':
        "calc(var(--ariax-spacing, .25rem) * 2)",
    },
    paddingInlineStart: {
      default: "calc(var(--ariax-spacing, .25rem) * 2.5)",
      ':has([data-icon="inline-start"])':
        "calc(var(--ariax-spacing, .25rem) * 2)",
    },
  },
  icon: {
    width: "calc(var(--ariax-spacing, .25rem) * 8)",
    height: "calc(var(--ariax-spacing, .25rem) * 8)",
  },
  "icon-xs": {
    width: "calc(var(--ariax-spacing, .25rem) * 6)",
    height: "calc(var(--ariax-spacing, .25rem) * 6)",
    borderRadius: {
      default: "min(calc(var(--radius) * 0.8), 10px)",
      ':is([data-slot="button-group"] *)': "var(--radius)",
    },
    "--ariax-icon-size": "calc(var(--ariax-spacing, .25rem) * 3)",
  },
  "icon-sm": {
    width: "calc(var(--ariax-spacing, .25rem) * 7)",
    height: "calc(var(--ariax-spacing, .25rem) * 7)",
    borderRadius: {
      default: "min(calc(var(--radius) * 0.8), 12px)",
      ':is([data-slot="button-group"] *)': "var(--radius)",
    },
  },
  "icon-lg": {
    width: "calc(var(--ariax-spacing, .25rem) * 9)",
    height: "calc(var(--ariax-spacing, .25rem) * 9)",
  },
});
