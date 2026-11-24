import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  large: {
    fontSize: "1.125rem",
    lineHeight: "calc(1.75 / 1.125)",
    fontWeight: 600,
  },
});

export default function TypographyLarge() {
  return <div {...stylex.props(styles.large)}>Are you absolutely sure?</div>;
}
