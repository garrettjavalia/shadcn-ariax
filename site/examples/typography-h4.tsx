import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  h4: {
    scrollMargin: "calc(var(--ariax-spacing, .25rem) * 20)",
    fontSize: "1.25rem",
    lineHeight: "calc(1.75 / 1.25)",
    fontWeight: 600,
    letterSpacing: "-.025em",
  },
});

export default function TypographyH4() {
  return <h4 {...stylex.props(styles.h4)}>People stopped telling jokes</h4>;
}
