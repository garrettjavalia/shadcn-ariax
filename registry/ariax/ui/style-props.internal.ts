import type { CSSProperties } from "react";
import * as stylex from "@stylexjs/stylex";

// Keep marker classes and native inline styles after the compiled StyleX props.
export function applied(
  base: stylex.StyleXArray<
    | stylex.CompiledStyles
    | null
    | undefined
    | boolean
    | readonly [stylex.CompiledStyles, stylex.InlineStyles]
  >,
  xstyle?: stylex.StyleXStyles,
  style?: CSSProperties,
  marker?: string,
) {
  const props = stylex.props(base, xstyle);
  return {
    className: [marker, props.className].filter(Boolean).join(" "),
    style: { ...props.style, ...style },
  };
}

export function resolveStyle<State>(
  style:
    CSSProperties | ((state: State) => CSSProperties | undefined) | undefined,
  state: State,
) {
  return typeof style === "function" ? style(state) : style;
}
