import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  inlineCode: {
    position: "relative",
    borderRadius: ".25rem",
    backgroundColor: "var(--muted)",
    paddingInline: ".3rem",
    paddingBlock: ".2rem",
    fontFamily: "var(--font-mono)",
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
    fontWeight: 600,
  },
});

export default function TypographyInlineCode() {
  return (
    <code {...stylex.props(styles.inlineCode)}>react-aria-components</code>
  );
}
