import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  h1Centered: {
    scrollMargin: "calc(var(--ariax-spacing, .25rem) * 20)",
    textAlign: "center",
    fontSize: "2.25rem",
    lineHeight: "calc(2.5 / 2.25)",
    fontWeight: 800,
    letterSpacing: "-.025em",
    textWrap: "balance",
  },
});

export default function TypographyH1() {
  return (
    <h1 {...stylex.props(styles.h1Centered)}>
      Taxing Laughter: The Joke Tax Chronicles
    </h1>
  );
}
