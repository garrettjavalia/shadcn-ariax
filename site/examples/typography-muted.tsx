import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  muted: {
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
    color: "var(--muted-foreground)",
  },
});

export default function TypographyMuted() {
  return <p {...stylex.props(styles.muted)}>Enter your email address.</p>;
}
