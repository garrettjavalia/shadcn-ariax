import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  p: {
    lineHeight: "calc(var(--ariax-spacing, .25rem) * 7)",
    marginTop: {
      default: null,
      ":not(:first-child)": "calc(var(--ariax-spacing, .25rem) * 6)",
    },
  },
});

export default function TypographyP() {
  return (
    <p {...stylex.props(styles.p)}>
      The king, seeing how much happier his subjects were, realized the error of
      his ways and repealed the joke tax.
    </p>
  );
}
