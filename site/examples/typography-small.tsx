import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  small: { fontSize: ".875rem", lineHeight: 1, fontWeight: 500 },
});

export default function TypographySmall() {
  return <small {...stylex.props(styles.small)}>Email address</small>;
}
