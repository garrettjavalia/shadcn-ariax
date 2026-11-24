import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  h3: {
    scrollMargin: "calc(var(--ariax-spacing, .25rem) * 20)",
    fontSize: "1.5rem",
    lineHeight: "calc(2 / 1.5)",
    fontWeight: 600,
    letterSpacing: "-.025em",
  },
});

export default function TypographyH3() {
  return <h3 {...stylex.props(styles.h3)}>The Joke Tax</h3>;
}
