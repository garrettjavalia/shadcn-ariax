"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  ProgressBar,
  Label as LabelPrimitive,
  composeRenderProps,
  type ProgressBarProps,
  type LabelProps,
} from "react-aria-components";
type Custom = {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
export type ProgressProps = Omit<ProgressBarProps, "className" | "children"> &
  Custom & {
    children?: React.ReactNode;
  };
export type ProgressTrackProps = Omit<
  React.ComponentProps<"span">,
  "className"
> &
  Custom;
export type ProgressIndicatorProps = ProgressTrackProps;
export type ProgressLabelProps = Omit<LabelProps, "className"> & Custom;
export type ProgressValueProps = Omit<ProgressTrackProps, "children"> & {
  children?: (value: string) => React.ReactNode;
};
type Context = {
  percentage?: number;
  isIndeterminate: boolean;
  valueText?: string;
};
const ProgressContext = React.createContext<Context | null>(null);
function useProgress() {
  const context = React.useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within a Progress.");
  return context;
}
function attrs(xstyle: stylex.StyleXStyles, style?: React.CSSProperties) {
  const applied = stylex.props(xstyle);
  return {
    className: applied.className,
    style: {
      ...applied.style,
      ...style,
    },
  };
}
function ProgressContent({
  children,
  percentage,
  isIndeterminate,
  valueText,
}: Context & {
  children?: React.ReactNode;
}) {
  const context = React.useMemo(
    () => ({
      percentage,
      isIndeterminate,
      valueText,
    }),
    [percentage, isIndeterminate, valueText],
  );
  return (
    <ProgressContext value={context}>
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressContext>
  );
}
export function Progress({
  className: _className,
  xstyle,
  style,
  children,
  ...props
}: ProgressProps) {
  const applied = attrs([styles.root, xstyle]);
  return (
    <ProgressBar
      data-slot="progress"
      {...props}
      {...applied}
      style={composeRenderProps(style, (value) => ({
        ...applied.style,
        ...value,
      }))}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <ProgressContent
          percentage={percentage}
          valueText={valueText}
          isIndeterminate={isIndeterminate}
        >
          {children}
        </ProgressContent>
      )}
    </ProgressBar>
  );
}
export function ProgressTrack({
  className: _className,
  xstyle,
  style,
  ...props
}: ProgressTrackProps) {
  return (
    <span
      data-slot="progress-track"
      {...props}
      {...attrs([styles.track, xstyle], style)}
    />
  );
}
export function ProgressIndicator({
  className: _className,
  xstyle,
  style,
  ...props
}: ProgressIndicatorProps) {
  const { percentage, isIndeterminate } = useProgress();
  return (
    <span
      data-slot="progress-indicator"
      {...props}
      {...attrs(
        [
          styles.indicator,
          styles.width(isIndeterminate ? 100 : (percentage ?? 0)),
          xstyle,
        ],
        style,
      )}
    />
  );
}
export function ProgressLabel({
  className: _className,
  xstyle,
  style,
  ...props
}: ProgressLabelProps) {
  return (
    <LabelPrimitive
      data-slot="progress-label"
      {...props}
      {...attrs([styles.label, xstyle], style)}
    />
  );
}
export function ProgressValue({
  className: _className,
  xstyle,
  style,
  children,
  ...props
}: ProgressValueProps) {
  const { valueText } = useProgress();
  return (
    <span
      data-slot="progress-value"
      {...props}
      {...attrs([styles.value, xstyle], style)}
    >
      {children && valueText != null ? children(valueText) : valueText}
    </span>
  );
}
const styles = stylex.create({
  root: {
    display: "flex",
    flexWrap: "wrap",
    gap: "calc(var(--ariax-spacing, .25rem) * 3)",
  },
  track: {
    position: "relative",
    display: "flex",
    width: "100%",
    alignItems: "center",
    overflowX: "hidden",
    backgroundColor: "var(--muted)",
    height: "calc(var(--ariax-spacing, .25rem) * 1)",
    borderRadius: "calc(infinity * 1px)",
  },
  indicator: {
    height: "100%",
    backgroundColor: "var(--primary)",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
  },
  width: (percentage: number) => ({
    width: `${percentage}%`,
  }),
  label: {
    fontSize: "0.875rem",
    lineHeight: "calc(1.25/.875)",
    fontWeight: 500,
  },
  value: {
    color: "var(--muted-foreground)",
    marginInlineStart: "auto",
    fontSize: "0.875rem",
    lineHeight: "calc(1.25/.875)",
    fontVariantNumeric: "tabular-nums",
  },
});
