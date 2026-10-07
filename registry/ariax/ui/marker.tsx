import * as React from "react";
import * as stylex from "@stylexjs/stylex";

type Styled<P> = Omit<P, "className"> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
type Variant = "default" | "separator" | "border";
export type MarkerProps = Styled<React.ComponentProps<"div">> & {
  variant?: Variant | null;
  render?: (props: React.HTMLAttributes<HTMLElement>) => React.ReactNode;
};
export function markerVariants({
  variant,
  xstyle,
}: { variant?: Variant | null; xstyle?: stylex.StyleXStyles } = {}) {
  return [styles.root, variant && variants[variant], xstyle];
}
export function Marker({
  className: _,
  xstyle,
  style,
  variant = "default",
  render,
  children,
  ...props
}: MarkerProps) {
  const sx = stylex.props(markerVariants({ variant, xstyle }));
  const renderProps = {
    ...props,
    "data-slot": "marker",
    "data-variant": variant,
    className: sx.className,
    style: { ...sx.style, ...style },
    children,
  };
  if (render) return render(renderProps);
  return <div {...renderProps} />;
}
export function MarkerIcon({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<React.ComponentProps<"span">>) {
  const sx = stylex.props(styles.icon, xstyle);
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}
export function MarkerContent({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<React.ComponentProps<"span">>) {
  const sx = stylex.props(styles.content, xstyle);
  return (
    <span
      data-slot="marker-content"
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}
const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: "calc(var(--ariax-spacing, .25rem) * 2)",
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
    color: {
      default: "var(--muted-foreground)",
      ":is(a):hover": {
        default: null,
        "@media (hover: hover)": "var(--foreground)",
      },
    },
    textDecorationLine: { default: null, ":is(a)": "underline" },
    textUnderlineOffset: { default: null, ":is(a)": "3px" },
    minHeight: "calc(var(--ariax-spacing, .25rem) * 4)",
    textAlign: "start",
    "--ariax-marker-icon-size": "calc(var(--ariax-spacing, .25rem) * 4)",
  },
  icon: {
    width: "calc(var(--ariax-spacing, .25rem) * 4)",
    height: "calc(var(--ariax-spacing, .25rem) * 4)",
    flexShrink: 0,
    "--ariax-marker-icon-size": "calc(var(--ariax-spacing, .25rem) * 4)",
  },
  content: {
    minWidth: 0,
    overflowWrap: "break-word",
    flex: {
      default: null,
      ':is([data-slot="marker"][data-variant="separator"] *)': "none",
    },
    textAlign: {
      default: null,
      ':is([data-slot="marker"][data-variant="separator"] *)': "center",
    },
  },
});
const variants = stylex.create({
  default: {},
  separator: {
    content: { default: null, "::before": '""', "::after": '""' },
    height: { default: null, "::before": 1, "::after": 1 },
    minWidth: { default: null, "::before": 0, "::after": 0 },
    flex: { default: null, "::before": "1", "::after": "1" },
    backgroundColor: {
      default: null,
      "::before": "var(--border)",
      "::after": "var(--border)",
    },
    marginInlineEnd: {
      default: null,
      "::before": "calc(var(--ariax-spacing, .25rem) * 1)",
    },
    marginInlineStart: {
      default: null,
      "::after": "calc(var(--ariax-spacing, .25rem) * 1)",
    },
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "var(--border)",
    paddingBottom: "calc(var(--ariax-spacing, .25rem) * 2)",
  },
});
