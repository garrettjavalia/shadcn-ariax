import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  h2: {
    scrollMargin: "calc(var(--ariax-spacing, .25rem) * 20)",
    borderBottomWidth: 1,
    paddingBottom: "calc(var(--ariax-spacing, .25rem) * 2)",
    fontSize: "1.875rem",
    lineHeight: "calc(2.25 / 1.875)",
    fontWeight: 600,
    letterSpacing: "-.025em",
    marginTop: { default: null, ":first-child": 0 },
  },
});

export default function TypographyH2() {
  return <h2 {...stylex.props(styles.h2)}>The People of the Kingdom</h2>;
}
