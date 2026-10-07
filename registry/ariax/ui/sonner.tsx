"use client";
import type * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps as PrimitiveProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";
import { animationStyles } from "./animations.stylex";
type ToastOptions = NonNullable<PrimitiveProps["toastOptions"]>;
export type ToasterProps = Omit<
  PrimitiveProps,
  "className" | "toastOptions"
> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
  toastOptions?: Omit<
    ToastOptions,
    "className" | "classNames" | "descriptionClassName"
  > & {
    className?: never;
    classNames?: never;
    descriptionClassName?: never;
    xstyle?: stylex.StyleXStyles;
  };
};
const styles = stylex.create({
  icon: {
    width: "calc(var(--ariax-spacing, .25rem) * 4)",
    height: "calc(var(--ariax-spacing, .25rem) * 4)",
  },
  loading: {
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
});
export function Toaster({
  className: _,
  xstyle,
  style,
  toastOptions,
  ...props
}: ToasterProps) {
  const { theme = "system" } = useTheme();
  const sx = stylex.props(xstyle);
  const {
    className: _toast,
    classNames: _classes,
    descriptionClassName: _description,
    xstyle: toastXstyle,
    style: toastStyle,
    ...options
  } = toastOptions ?? {};
  const toast = stylex.props(toastXstyle);
  const { className: iconClass, style: iconStyle } = stylex.props(styles.icon);
  const icon = { className: iconClass, style: iconStyle };
  const { className: loadingClass, style: loadingStyle } = stylex.props(
    animationStyles.spin,
    styles.icon,
    styles.loading,
  );
  const loading = { className: loadingClass, style: loadingStyle };
  return (
    <Sonner
      theme={theme as PrimitiveProps["theme"]}
      icons={{
        success: <CircleCheckIcon {...icon} />,
        info: <InfoIcon {...icon} />,
        warning: <TriangleAlertIcon {...icon} />,
        error: <OctagonXIcon {...icon} />,
        loading: <Loader2Icon {...loading} />,
      }}
      {...props}
      className={["toaster", "group", sx.className].filter(Boolean).join(" ")}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          ...sx.style,
          ...style,
        } as React.CSSProperties
      }
      toastOptions={{
        ...options,
        classNames: { toast: toastOptions ? toast.className : "cn-toast" },
        style: { ...toast.style, ...toastStyle },
      }}
    />
  );
}
