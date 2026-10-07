"use client";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import { animationStyles } from "./animations.stylex";
type Custom<P> = P extends unknown
  ? Omit<P, "className"> & { className?: never; xstyle?: stylex.StyleXStyles }
  : never;
type OTPProps = React.ComponentProps<typeof OTPInput>;
export type InputOTPProps = OTPProps extends infer P
  ? P extends unknown
    ? Omit<Custom<P>, "containerClassName"> & {
        containerClassName?: never;
        containerXstyle?: stylex.StyleXStyles;
      }
    : never
  : never;
export function InputOTP({
  className: _,
  containerClassName: __,
  xstyle,
  containerXstyle,
  style,
  ref,
  ...props
}: InputOTPProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => inputRef.current!, []);
  const input = stylex.props(styles.input, xstyle),
    container = stylex.props(styles.container, containerXstyle);
  // The engine owns both wrapper elements and replaces the input style prop.
  // Its public input ref lets the adapter apply StyleX variables and native
  // overrides without changing the DOM structure or the engine's state logic.
  React.useLayoutEffect(() => {
    const node = inputRef.current;
    if (!node) return;
    const undoInput = applyStyles(node, { ...input.style, ...style });
    const containerNode = node.closest<HTMLElement>(
      "[data-input-otp-container]",
    );
    const undoContainer = containerNode
      ? applyStyles(containerNode, container.style ?? {})
      : undefined;
    return () => {
      undoInput();
      undoContainer?.();
    };
  }, [input.style, container.style, style]);
  return (
    <OTPInput
      data-slot="input-otp"
      spellCheck={false}
      {...props}
      ref={inputRef}
      className={input.className}
      containerClassName={container.className}
      style={{ ...input.style, ...style }}
    />
  );
}
function applyStyles(node: HTMLElement, values: React.CSSProperties) {
  const previous = new Map<string, [string, string]>();
  for (const [key, value] of Object.entries(values)) {
    const property = key.startsWith("--")
      ? key
      : key
          .replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase())
          .replace(/^ms-/, "-ms-");
    previous.set(property, [
      node.style.getPropertyValue(property),
      node.style.getPropertyPriority(property),
    ]);
    if (value == null) node.style.removeProperty(property);
    else
      node.style.setProperty(
        property,
        typeof value === "number" &&
          !property.startsWith("--") &&
          !CSS.supports(property, String(value))
          ? value + "px"
          : String(value),
      );
  }
  return () => {
    for (const [property, [value, priority]] of previous)
      if (value) node.style.setProperty(property, value, priority);
      else node.style.removeProperty(property);
  };
}
export function InputOTPGroup({
  className: _,
  xstyle,
  style,
  ...props
}: Custom<React.ComponentProps<"div">>) {
  const sx = stylex.props(styles.group, xstyle);
  return (
    <div
      data-slot="input-otp-group"
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    />
  );
}
export function InputOTPSlot({
  index,
  className: _,
  xstyle,
  style,
  ...props
}: Custom<React.ComponentProps<"div">> & { index: number }) {
  const context = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = context?.slots[index] ?? {};
  const sx = stylex.props(styles.slot, xstyle);
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      {...props}
      className={sx.className}
      style={{ ...sx.style, ...style }}
    >
      {char}
      {hasFakeCaret && (
        <div className={stylex.props(styles.caret).className}>
          <div
            className={
              stylex.props(animationStyles.caretBlink, styles.line).className
            }
          />
        </div>
      )}
    </div>
  );
}
export function InputOTPSeparator({
  className: _,
  xstyle,
  style,
  ...props
}: Custom<React.ComponentProps<"div">>) {
  const sx = stylex.props(styles.separator, xstyle);
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      {...props}
      className={["ariax-input-otp-separator", sx.className].join(" ")}
      style={{ ...sx.style, ...style }}
    >
      <MinusIcon />
    </div>
  );
}
const invalid = ':is([aria-invalid="true"])',
  active = ':is([data-active="true"])';
const ring =
  "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-otp-ring), 0 0 0 0 #0000";
const styles = stylex.create({
  container: {
    display: "flex",
    alignItems: "center",
    opacity: { default: null, ":has(:disabled)": 0.5 },
  },
  input: { cursor: { default: null, ":disabled": "not-allowed" } },
  group: {
    display: "flex",
    alignItems: "center",
    borderRadius: "var(--radius)",
    "--ariax-otp-ring": {
      default: "color-mix(in oklab, var(--destructive) 20%, transparent)",
      ":is(.dark *)":
        "color-mix(in oklab, var(--destructive) 40%, transparent)",
    },
    boxShadow: { default: null, ':has([aria-invalid="true"])': ring },
    borderColor: {
      default: null,
      ':has([aria-invalid="true"])': "var(--destructive)",
    },
  },
  slot: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "calc(var(--ariax-spacing, .25rem) * 8)",
    height: "calc(var(--ariax-spacing, .25rem) * 8)",
    borderBlockWidth: 1,
    borderInlineEndWidth: 1,
    borderInlineStartWidth: { default: 0, ":first-child": 1 },
    borderRadius: {
      default: null,
      ":first-child": "var(--radius) 0 0 var(--radius)",
      ":last-child": "0 var(--radius) var(--radius) 0",
      ":first-child:dir(rtl)": "0 var(--radius) var(--radius) 0",
      ":last-child:dir(rtl)": "var(--radius) 0 0 var(--radius)",
      ":first-child:last-child": "var(--radius)",
      ":first-child:last-child:dir(rtl)": "var(--radius)",
    },
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
    backgroundColor: {
      default: null,
      ":is(.dark *)": "color-mix(in oklab, var(--input) 30%, transparent)",
    },
    borderColor: {
      default: "var(--input)",
      [active]: "var(--ring)",
      [invalid]: "var(--destructive)",
      [active + invalid]: "var(--destructive)",
    },
    "--ariax-otp-ring": {
      default: "color-mix(in oklab, var(--ring) 50%, transparent)",
      [invalid]: "color-mix(in oklab, var(--destructive) 20%, transparent)",
      [":is(.dark *)" + invalid]:
        "color-mix(in oklab, var(--destructive) 40%, transparent)",
    },
    boxShadow: { default: null, [active]: ring },
    zIndex: { default: null, [active]: 10 },
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    outlineStyle: "none",
  },
  caret: {
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    backgroundColor: "var(--foreground)",
    height: "calc(var(--ariax-spacing, .25rem) * 4)",
    width: 1,
    animationDuration: "1.25s",
    animationTimingFunction: "ease-out",
    animationIterationCount: "infinite",
    transitionDuration: "1s",
  },
  separator: {
    display: "flex",
    alignItems: "center",
    "--ariax-otp-icon-size": "calc(var(--ariax-spacing, .25rem) * 4)",
  },
});
