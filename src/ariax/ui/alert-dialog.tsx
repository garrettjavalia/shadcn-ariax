"use client";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Dialog as Primitive,
  DialogTrigger as Trigger,
  Heading,
  Modal,
} from "react-aria-components";
import { DialogOverlay, type DialogOverlayProps } from "./dialog";
import { Button, type ButtonProps } from "./button";
import { animationStyles } from "./animations.stylex";
type Custom = { xstyle?: stylex.StyleXStyles; className?: never };
export type AlertDialogProps = DialogOverlayProps & {
  size?: "default" | "sm";
  isDismissable?: boolean;
};
const styles = stylex.create({
  content: {
    position: "fixed",
    top: "50%",
    insetInlineStart: "50%",
    zIndex: 50,
    display: "grid",
    width: "100%",
    translate: { default: "-50% -50%", ":dir(rtl)": "50% -50%" },
    outlineStyle: "none",
    maxWidth: {
      default: null,
      ':is([data-size="default"],[data-size="sm"])': "20rem",
      ':is([data-size="default"])': {
        default: null,
        "@media (width >= 40rem)": "24rem",
      },
    },
    backgroundColor: "var(--popover)",
    color: "var(--popover-foreground)",
    gap: "calc(var(--ariax-spacing, .25rem) * 4)",
    borderRadius: "calc(var(--radius) * 1.4)",
    padding: "calc(var(--ariax-spacing, .25rem) * 4)",
    boxShadow:
      "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px color-mix(in oklab, var(--foreground) 10%, transparent), 0 0 0 0 #0000",
    transitionDuration: "100ms",
    animationDuration: {
      default: null,
      ":is([data-entering],[data-exiting])": "100ms",
    },
    animationTimingFunction: {
      default: null,
      ":is([data-entering],[data-exiting])": "ease",
    },
    "--ariax-enter-opacity": { default: 1, ":is([data-entering])": 0 },
    "--ariax-exit-opacity": { default: 1, ":is([data-exiting])": 0 },
    "--ariax-enter-scale": { default: 1, ":is([data-entering])": 0.95 },
    "--ariax-exit-scale": { default: 1, ":is([data-exiting])": 0.95 },
  },
  primitive: { display: "inherit", gap: "inherit", outlineStyle: "none" },
  header: {
    display: "grid",
    gridTemplateRows: {
      default: "auto 1fr",
      ':has([data-slot="alert-dialog-media"])': "auto auto 1fr",
      ':is(:where(.group\\/alert-dialog-content)[data-size="default"] *):has([data-slot="alert-dialog-media"])':
        { default: null, "@media (width >= 40rem)": "auto 1fr" },
    },
    placeItems: {
      default: "center",
      ':is(:where(.group\\/alert-dialog-content)[data-size="default"] *)': {
        default: null,
        "@media (width >= 40rem)": "start",
      },
    },
    gap: "calc(var(--ariax-spacing, .25rem) * 1.5)",
    columnGap: {
      default: "calc(var(--ariax-spacing, .25rem) * 1.5)",
      ':has([data-slot="alert-dialog-media"])':
        "calc(var(--ariax-spacing, .25rem) * 4)",
    },
    textAlign: {
      default: "center",
      ':is(:where(.group\\/alert-dialog-content)[data-size="default"] *)': {
        default: null,
        "@media (width >= 40rem)": "start",
      },
    },
  },
  media: {
    backgroundColor: "var(--muted)",
    marginBottom: "calc(var(--ariax-spacing, .25rem) * 2)",
    display: "inline-flex",
    width: "calc(var(--ariax-spacing, .25rem) * 10)",
    height: "calc(var(--ariax-spacing, .25rem) * 10)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "calc(var(--radius) * 0.8)",
    gridRow: {
      default: null,
      ':is(:where(.group\\/alert-dialog-content)[data-size="default"] *)': {
        default: null,
        "@media (width >= 40rem)": "span 2 / span 2",
      },
    },
  },
  title: {
    fontSize: "1rem",
    lineHeight: 1.5,
    fontWeight: 500,
    gridColumnStart: {
      default: null,
      ':is(:where(.group\\/alert-dialog-content)[data-size="default"]:has([data-slot="alert-dialog-media"]) *)':
        { default: null, "@media (width >= 40rem)": "2" },
    },
  },
  description: {
    color: "var(--muted-foreground)",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25 / 0.875)",
    textWrap: { default: "balance", "@media (width >= 48rem)": "pretty" },
  },
  footer: {
    display: {
      default: "flex",
      ':is(:where(.group\\/alert-dialog-content)[data-size="sm"] *)': "grid",
    },
    gridTemplateColumns: {
      default: null,
      ':is(:where(.group\\/alert-dialog-content)[data-size="sm"] *)':
        "repeat(2, minmax(0, 1fr))",
    },
    flexDirection: {
      default: "column-reverse",
      "@media (width >= 40rem)": "row",
    },
    justifyContent: { default: null, "@media (width >= 40rem)": "flex-end" },
    gap: "calc(var(--ariax-spacing, .25rem) * 2)",
    backgroundColor: "color-mix(in oklab, var(--muted) 50%, transparent)",
    marginInline: "calc(var(--ariax-spacing, .25rem) * -4)",
    marginBottom: "calc(var(--ariax-spacing, .25rem) * -4)",
    borderEndStartRadius: "calc(var(--radius) * 1.4)",
    borderEndEndRadius: "calc(var(--radius) * 1.4)",
    borderTopWidth: 1,
    padding: "calc(var(--ariax-spacing, .25rem) * 4)",
  },
});
export function AlertDialogTrigger(
  props: React.ComponentProps<typeof Trigger>,
) {
  return <Trigger data-slot="alert-dialog-trigger" {...props} />;
}
export function AlertDialogOverlay(props: DialogOverlayProps) {
  return <DialogOverlay data-slot="alert-dialog-overlay" {...props} />;
}
export function AlertDialog({
  size = "default",
  xstyle,
  className: _,
  children,
  ...props
}: AlertDialogProps) {
  const content = stylex.props(animationStyles.overlay, styles.content, xstyle);
  const primitive = stylex.props(styles.primitive);
  return (
    <AlertDialogOverlay {...props}>
      <Modal
        data-slot="alert-dialog-content"
        data-size={size}
        className={["group/alert-dialog-content", content.className].join(" ")}
        style={content.style}
      >
        <Primitive
          data-slot="alert-dialog"
          role="alertdialog"
          className={primitive.className}
          style={primitive.style}
        >
          {children}
        </Primitive>
      </Modal>
    </AlertDialogOverlay>
  );
}
export function AlertDialogContent(props: AlertDialogProps) {
  return <AlertDialog {...props} />;
}
type DivProps = Omit<React.ComponentProps<"div">, "className"> & Custom;
export function AlertDialogHeader({
  xstyle,
  style,
  className: _,
  ...props
}: DivProps) {
  const a = stylex.props(styles.header, xstyle);
  return (
    <div
      data-slot="alert-dialog-header"
      {...props}
      className={a.className}
      style={{ ...a.style, ...style }}
    />
  );
}
export function AlertDialogFooter({
  xstyle,
  style,
  className: _,
  ...props
}: DivProps) {
  const a = stylex.props(styles.footer, xstyle);
  return (
    <div
      data-slot="alert-dialog-footer"
      {...props}
      className={a.className}
      style={{ ...a.style, ...style }}
    />
  );
}
export function AlertDialogMedia({
  xstyle,
  style,
  className: _,
  ...props
}: DivProps) {
  const a = stylex.props(styles.media, xstyle);
  return (
    <div
      data-slot="alert-dialog-media"
      {...props}
      className={["ariax-alert-dialog-media", a.className].join(" ")}
      style={{ ...a.style, ...style }}
    />
  );
}
export function AlertDialogTitle({
  xstyle,
  style,
  className: _,
  ...props
}: Omit<React.ComponentProps<typeof Heading>, "slot" | "className"> & Custom) {
  const a = stylex.props(styles.title, xstyle);
  return (
    <Heading
      slot="title"
      data-slot="alert-dialog-title"
      {...props}
      className={a.className}
      style={{ ...a.style, ...style }}
    />
  );
}
export function AlertDialogDescription({
  xstyle,
  style,
  className: _,
  ...props
}: Omit<DivProps, "slot">) {
  const a = stylex.props(styles.description, xstyle);
  return (
    <div
      data-slot="alert-dialog-description"
      {...props}
      className={["ariax-alert-dialog-description", a.className].join(" ")}
      style={{ ...a.style, ...style }}
    />
  );
}
export function AlertDialogAction(props: ButtonProps) {
  return <Button slot="close" data-slot="alert-dialog-action" {...props} />;
}
export function AlertDialogCancel({
  variant = "outline",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <Button
      slot="close"
      data-slot="alert-dialog-cancel"
      variant={variant}
      size={size}
      {...props}
    />
  );
}
