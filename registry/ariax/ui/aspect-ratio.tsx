import type { ComponentProps, CSSProperties } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: { position: "relative", aspectRatio: "var(--ratio)" },
});

export type AspectRatioProps = Omit<ComponentProps<"div">, "className"> & {
  ratio: number;
  xstyle?: stylex.StyleXStyles;
  className?: never;
};

export function AspectRatio({
  ratio,
  xstyle,
  className: _className,
  style: userStyle,
  ...props
}: AspectRatioProps) {
  const { className, style } = stylex.props(styles.base, xstyle);
  return (
    <div
      data-slot="aspect-ratio"
      className={className}
      style={{ "--ratio": ratio, ...style, ...userStyle } as CSSProperties}
      {...props}
    />
  );
}
