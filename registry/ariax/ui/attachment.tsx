"use client";
import {
  createContext,
  useContext,
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import * as stylex from "@stylexjs/stylex";
import { Button } from "./button";
import { animationStyles } from "./animations.stylex";
export type AttachmentPartProps<T extends "div" | "span" | "button" = "div"> =
  Omit<ComponentProps<T>, "className"> & {
    className?: never;
    xstyle?: stylex.StyleXStyles;
  };
export type AttachmentProps = AttachmentPartProps & {
  state?: "idle" | "uploading" | "processing" | "error" | "done";
  size?: "default" | "sm" | "xs" | null;
  orientation?: "horizontal" | "vertical" | null;
};
export type AttachmentMediaProps = AttachmentPartProps & {
  variant?: "icon" | "image" | null;
};
export type AttachmentTriggerProps = AttachmentPartProps<"button"> & {
  render?: (props: HTMLAttributes<HTMLElement>) => ReactNode;
};
const State = createContext(false);
const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    maxWidth: "100%",
    minWidth: 0,
    flexShrink: 0,
    flexWrap: "wrap",
    borderWidth: 1,
    borderRadius: "calc(var(--radius) * 1.4)",
    width: "fit-content",
    backgroundColor: {
      default: "var(--card)",
      ":has(>a,>button):hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab, var(--muted) 50%, transparent)",
      },
    },
    color: "var(--card-foreground)",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
    borderColor: {
      default: null,
      ':is([data-state="error"])':
        "color-mix(in oklab, var(--destructive) 30%, transparent)",
    },
    borderStyle: { default: null, ':is([data-state="idle"])': "dashed" },
    boxShadow: {
      default: null,
      ":focus-within":
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 0 0 #0000",
    },
  },
  horizontal: {
    minWidth: "calc(var(--ariax-spacing, .25rem) * 40)",
    alignItems: "center",
  },
  vertical: {
    flexDirection: "column",
    width: {
      default: "calc(var(--ariax-spacing, .25rem) * 24)",
      ':has([data-slot="attachment-content"])':
        "calc(var(--ariax-spacing, .25rem) * 30)",
    },
  },
  defaultSize: {
    gap: "calc(var(--ariax-spacing, .25rem) * 2)",
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
    paddingInline: {
      default: null,
      ':has([data-slot="attachment-media"])':
        "calc(var(--ariax-spacing, .25rem) * 2)",
      ':has([data-slot="attachment-content"]):not(:has([data-slot="attachment-media"]))':
        "calc(var(--ariax-spacing, .25rem) * 2.5)",
    },
    paddingBlock: {
      default: null,
      ':has([data-slot="attachment-media"])':
        "calc(var(--ariax-spacing, .25rem) * 2)",
      ':has([data-slot="attachment-content"]):not(:has([data-slot="attachment-media"]))':
        "calc(var(--ariax-spacing, .25rem) * 2)",
    },
  },
  sm: {
    gap: "calc(var(--ariax-spacing, .25rem) * 2.5)",
    fontSize: ".75rem",
    lineHeight: "calc(1 / .75)",
    paddingInline: {
      default: null,
      ':has([data-slot="attachment-media"])':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
      ':has([data-slot="attachment-content"]):not(:has([data-slot="attachment-media"]))':
        "calc(var(--ariax-spacing, .25rem) * 2)",
    },
    paddingBlock: {
      default: null,
      ':has([data-slot="attachment-media"])':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
      ':has([data-slot="attachment-content"]):not(:has([data-slot="attachment-media"]))':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
    },
  },
  xs: {
    gap: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    fontSize: ".75rem",
    lineHeight: "calc(1 / .75)",
    borderRadius: "var(--radius)",
    paddingInline: {
      default: null,
      ':has([data-slot="attachment-media"])':
        "calc(var(--ariax-spacing, .25rem) * 1)",
      ':has([data-slot="attachment-content"]):not(:has([data-slot="attachment-media"]))':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
    },
    paddingBlock: {
      default: null,
      ':has([data-slot="attachment-media"])':
        "calc(var(--ariax-spacing, .25rem) * 1)",
      ':has([data-slot="attachment-content"]):not(:has([data-slot="attachment-media"]))':
        "calc(var(--ariax-spacing, .25rem) * 1)",
    },
  },
  media: {
    position: "relative",
    display: "flex",
    aspectRatio: "1 / 1",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: {
      default: "var(--muted)",
      ':is(.ariax-attachment[data-state="error"] *)':
        "color-mix(in oklab, var(--destructive) 10%, transparent)",
    },
    color: {
      default: "var(--foreground)",
      ':is(.ariax-attachment[data-state="error"] *)': "var(--destructive)",
    },
    width: {
      default: "calc(var(--ariax-spacing, .25rem) * 10)",
      ':is(.ariax-attachment[data-size="sm"] *):not(.ariax-attachment[data-size="xs"] *)':
        "calc(var(--ariax-spacing, .25rem) * 8)",
      ':is(.ariax-attachment[data-size="xs"] *)':
        "calc(var(--ariax-spacing, .25rem) * 7)",
      ':is(.ariax-attachment[data-orientation="vertical"] *):not(.ariax-attachment:is([data-size="sm"],[data-size="xs"]) *)':
        "100%",
    },
    borderRadius: {
      default: "var(--radius)",
      ':is(.ariax-attachment[data-size="xs"] *)': "calc(var(--radius) * .8)",
    },
  },
  image: {
    opacity: {
      default: 0.6,
      ':is(.ariax-attachment[data-state="idle"] *)': 1,
      ':is(.ariax-attachment[data-state="done"] *)': 1,
    },
  },
  content: {
    maxWidth: "100%",
    minWidth: 0,
    flex: 1,
    lineHeight: 1.25,
    paddingInline: {
      default: null,
      ':is(.ariax-attachment[data-orientation="vertical"] *)':
        "calc(var(--ariax-spacing, .25rem) * 1)",
    },
  },
  title: {
    display: "block",
    maxWidth: "100%",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: 500,
  },
  description: {
    display: "block",
    maxWidth: "100%",
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginTop: "calc(var(--ariax-spacing, .25rem) * 0.5)",
    fontSize: ".75rem",
    lineHeight: "calc(1 / .75)",
    color: {
      default: "var(--muted-foreground)",
      ':is(.ariax-attachment[data-state="error"] *)':
        "color-mix(in oklab, var(--destructive) 80%, transparent)",
    },
  },
  actions: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    position: {
      default: "relative",
      ':is(.ariax-attachment[data-orientation="vertical"] *)': "absolute",
    },
    top: {
      default: null,
      ':is(.ariax-attachment[data-orientation="vertical"] *)':
        "calc(var(--ariax-spacing, .25rem) * 3)",
    },
    insetInlineEnd: {
      default: null,
      ':is(.ariax-attachment[data-orientation="vertical"] *)':
        "calc(var(--ariax-spacing, .25rem) * 3)",
    },
    zIndex: 20,
    gap: {
      default: null,
      ':is(.ariax-attachment[data-orientation="vertical"] *)':
        "calc(var(--ariax-spacing, .25rem) * 1)",
    },
  },
  trigger: { position: "absolute", inset: 0, zIndex: 10, outlineStyle: "none" },
  group: {
    display: "flex",
    minWidth: 0,
    gap: "calc(var(--ariax-spacing, .25rem) * 3)",
    scrollPaddingInline: "calc(var(--ariax-spacing, .25rem) * 1)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 1)",
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none",
    overflowX: "auto",
    overscrollBehaviorX: "contain",
  },
});
export function Attachment({
  state = "done",
  size = "default",
  orientation = "horizontal",
  xstyle,
  style,
  className: _,
  ...props
}: AttachmentProps) {
  const sx = stylex.props(
    styles.root,
    orientation === "vertical"
      ? styles.vertical
      : orientation === "horizontal"
        ? styles.horizontal
        : null,
    size === "default"
      ? styles.defaultSize
      : size === "sm"
        ? styles.sm
        : size === "xs"
          ? styles.xs
          : null,
    xstyle,
  );
  const dataState = "data-state" in props ? props["data-state"] : state;
  const shimmer =
    useContext(State) ||
    dataState === "uploading" ||
    dataState === "processing";
  return (
    <State.Provider value={shimmer}>
      <div
        data-slot="attachment"
        data-state={state}
        data-size={size}
        data-orientation={orientation ?? "horizontal"}
        {...props}
        className={`ariax-attachment ${sx.className}`}
        style={{ ...sx.style, ...style }}
      />
    </State.Provider>
  );
}
export function AttachmentMedia({
  variant = "icon",
  xstyle,
  style,
  className: _,
  ...props
}: AttachmentMediaProps) {
  const sx = stylex.props(
    styles.media,
    variant === "image" && styles.image,
    xstyle,
  );
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      {...props}
      className={`ariax-attachment-media ${sx.className}`}
      style={{ ...sx.style, ...style }}
    />
  );
}
export function AttachmentContent({
  xstyle,
  style,
  className: _,
  ...props
}: AttachmentPartProps) {
  const sx = stylex.props(styles.content, xstyle);
  return (
    <div
      data-slot="attachment-content"
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}
export function AttachmentTitle({
  xstyle,
  style,
  className: _,
  ...props
}: AttachmentPartProps<"span">) {
  const sx = stylex.props(
    styles.title,
    useContext(State) && animationStyles.shimmer,
    xstyle,
  );
  return (
    <span
      data-slot="attachment-title"
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}
export function AttachmentDescription({
  xstyle,
  style,
  className: _,
  ...props
}: AttachmentPartProps<"span">) {
  const sx = stylex.props(styles.description, xstyle);
  return (
    <span
      data-slot="attachment-description"
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}
export function AttachmentActions({
  xstyle,
  style,
  className: _,
  ...props
}: AttachmentPartProps) {
  const sx = stylex.props(styles.actions, xstyle);
  return (
    <div
      data-slot="attachment-actions"
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}
export function AttachmentAction({
  variant,
  size = "icon-xs",
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant ?? "ghost"}
      size={size}
      {...props}
    />
  );
}
export function AttachmentTrigger({
  render,
  type,
  children,
  xstyle,
  style,
  className: _,
  ...props
}: AttachmentTriggerProps) {
  const sx = stylex.props(styles.trigger, xstyle);
  const applied = {
    ...props,
    "data-slot": "attachment-trigger",
    className: sx.className,
    style: { ...sx.style, ...style },
    children,
  };
  return render ? (
    render(applied)
  ) : (
    <button {...applied} type={type ?? "button"} />
  );
}
export function AttachmentGroup({
  xstyle,
  style,
  className: _,
  ...props
}: AttachmentPartProps) {
  const sx = stylex.props(
    styles.group,
    animationStyles.scrollFadeInline,
    xstyle,
  );
  return (
    <div
      data-slot="attachment-group"
      {...props}
      className={`ariax-attachment-group ${sx.className}`}
      style={{ ...sx.style, ...style }}
    />
  );
}
