"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { ArrowDownIcon } from "lucide-react";
import {
  MessageScroller as Primitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller";
import { Button, type ButtonProps } from "./button";
import { RenderStylesContext } from "./render-styles.internal";
type Styled<P> = Omit<P, "className"> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
export function MessageScrollerProvider(
  props: React.ComponentProps<typeof Primitive.Provider>,
) {
  return <Primitive.Provider {...props} />;
}
export function MessageScroller({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<React.ComponentProps<typeof Primitive.Root>>) {
  const sx = stylex.props(styles.root, xstyle);
  return (
    <Primitive.Root
      data-slot="message-scroller"
      {...props}
      className={sx.className}
      style={{
        ...sx.style,
        ...style,
      }}
    />
  );
}
export function MessageScrollerViewport({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<React.ComponentProps<typeof Primitive.Viewport>>) {
  const sx = stylex.props(styles.viewport, xstyle);
  return (
    <Primitive.Viewport
      data-slot="message-scroller-viewport"
      {...props}
      className={sx.className}
      style={{
        ...sx.style,
        ...style,
      }}
    />
  );
}
export function MessageScrollerContent({
  className: _,
  spacerClassName: _spacer,
  xstyle,
  style,
  ...props
}: Styled<
  Omit<React.ComponentProps<typeof Primitive.Content>, "spacerClassName">
> & {
  spacerClassName?: never;
}) {
  const sx = stylex.props(styles.content, xstyle);
  return (
    <Primitive.Content
      data-slot="message-scroller-content"
      {...props}
      className={sx.className}
      style={{
        ...sx.style,
        ...style,
      }}
    />
  );
}
export function MessageScrollerItem({
  className: _,
  xstyle,
  style,
  scrollAnchor = false,
  ...props
}: Styled<React.ComponentProps<typeof Primitive.Item>>) {
  const sx = stylex.props(styles.item, xstyle);
  return (
    <Primitive.Item
      data-slot="message-scroller-item"
      scrollAnchor={scrollAnchor}
      {...props}
      className={sx.className}
      style={{
        ...sx.style,
        ...style,
      }}
    />
  );
}
export type MessageScrollerButtonProps = Styled<
  React.ComponentProps<typeof Primitive.Button>
> &
  Pick<ButtonProps, "variant" | "size">;
export function MessageScrollerButton({
  className: _,
  xstyle,
  style,
  direction = "end",
  variant = "secondary",
  size = "icon-sm",
  render,
  children,
  ...props
}: MessageScrollerButtonProps) {
  const sr = stylex.props(styles.srOnly);
  const applied = [styles.button, xstyle];
  const sx = stylex.props(applied);
  return (
    <RenderStylesContext.Provider value={applied}>
      <Primitive.Button
        data-slot="message-scroller-button"
        data-direction={direction}
        data-variant={variant}
        data-size={size}
        direction={direction}
        {...props}
        className={sx.className}
        style={{
          ...sx.style,
          ...style,
        }}
        render={render ?? <Button variant={variant} size={size} />}
      >
        {children ?? (
          <>
            <ArrowDownIcon />
            <span className={sr.className} style={sr.style}>
              {direction === "end" ? "Scroll to end" : "Scroll to start"}
            </span>
          </>
        )}
      </Primitive.Button>
    </RenderStylesContext.Provider>
  );
}
export {
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
};
// shadcn 4.21.1 scroll-fade (MIT); SHADCN-LICENSE is installed with the styles.
const fade = stylex.keyframes({
  from: {
    // @ts-expect-error StyleX supports registered CSS properties; keyframe types omit them.
    "--scroll-fade-b":
      "var(--_scroll-fade-size-b,var(--scroll-fade-size,min(12%,calc(var(--ariax-spacing, .25rem) * 10))))",
  },
  to: {
    // @ts-expect-error Registered CSS property.
    "--scroll-fade-b": "0px",
  },
});
const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
    minHeight: 0,
    flexDirection: "column",
    overflow: "hidden",
  },
  viewport: {
    width: "100%",
    height: "100%",
    minHeight: 0,
    minWidth: 0,
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    overscrollBehavior: "contain",
    contain: "content",
    visibility: {
      default: null,
      ":is([data-pending-scroll])": "hidden",
    },
    scrollbarColor: {
      default: null,
      ":is([data-autoscrolling])": "transparent transparent",
    },
    "--_scroll-fade-size-b":
      "var(--scroll-fade-b-size,var(--scroll-fade-size,min(12%,calc(var(--ariax-spacing, .25rem) * 10))))",
    "--scroll-fade-mask":
      "linear-gradient(to bottom,#000 0,#000 calc(100% - var(--scroll-fade-b,0px)),transparent 100%)",
    WebkitMaskImage: "var(--scroll-fade-mask)",
    maskImage: "var(--scroll-fade-mask)",
    WebkitMaskComposite: {
      default: null,
      "@supports not (mask-composite: intersect)": "source-in",
    },
    maskComposite: "intersect",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    animationName: {
      default: null,
      "@supports (animation-timeline: scroll())": fade,
    },
    animationDuration: {
      default: null,
      "@supports (animation-timeline: scroll())": "1ms",
    },
    animationTimingFunction: {
      default: null,
      "@supports (animation-timeline: scroll())": "ease-in-out",
    },
    animationTimeline: {
      default: null,
      "@supports (animation-timeline: scroll())": "scroll(self y)",
    },
    animationRange: {
      default: null,
      "@supports (animation-timeline: scroll())":
        "calc(100% - var(--scroll-fade-reveal,calc(var(--ariax-spacing, .25rem) * 24))) 100%",
    },
    animationFillMode: {
      default: null,
      "@supports (animation-timeline: scroll())": "both",
    },
    "--scroll-fade-b": {
      default: null,
      "@supports not (animation-timeline: scroll())":
        "var(--_scroll-fade-size-b)",
    },
  },
  content: {
    gap: "calc(var(--ariax-spacing, .25rem) * 6)",
    display: "flex",
    height: "max-content",
    minHeight: "100%",
    flexDirection: "column",
  },
  item: {
    minWidth: 0,
    flexShrink: 0,
    containIntrinsicSize: "auto 10rem",
    contentVisibility: "auto",
  },
  button: {
    position: "absolute",
    insetInlineStart: "50%",
    translate: {
      default: "-50% 0",
      ':is([dir="rtl"] *)': "50% 0",
      ':is([data-active="false"][data-direction="end"])': "-50% 100%",
      ':is([data-active="false"][data-direction="start"])': "-50% -100%",
      ':is([dir="rtl"] *)[data-active="false"][data-direction="end"]':
        "50% 100%",
      ':is([dir="rtl"] *)[data-active="false"][data-direction="start"]':
        "50% -100%",
    },
    borderColor: "var(--border)",
    backgroundColor: {
      default: "var(--background)",
      ":hover": {
        default: null,
        "@media (hover: hover)": "var(--muted)",
      },
    },
    color: "var(--foreground)",
    transitionProperty: "translate,scale,opacity",
    transitionDuration: {
      default: "200ms",
      ':is([data-active="false"])': "400ms",
    },
    transitionTimingFunction: {
      default: "cubic-bezier(0.4,0,0.2,1)",
      ':is([data-active="true"])': "cubic-bezier(0.23,1,0.32,1)",
      ':is([data-active="false"])': "cubic-bezier(0.7,0,0.84,0)",
    },
    pointerEvents: {
      default: null,
      ':is([data-active="false"])': "none",
    },
    scale: {
      default: null,
      ':is([data-active="false"])': ".95",
      ':is([data-active="true"])': "1",
    },
    opacity: {
      default: null,
      ':is([data-active="false"])': 0,
      ':is([data-active="true"])': 1,
    },
    bottom: {
      default: null,
      ':is([data-direction="end"])': "calc(var(--ariax-spacing, .25rem) * 4)",
    },
    top: {
      default: null,
      ':is([data-direction="start"])': "calc(var(--ariax-spacing, .25rem) * 4)",
    },
  },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});
