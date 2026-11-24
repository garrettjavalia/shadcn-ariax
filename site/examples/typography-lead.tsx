import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  lead: {
    fontSize: "1.25rem",
    lineHeight: "calc(1.75 / 1.25)",
    color: "var(--muted-foreground)",
  },
});

export default function TypographyLead() {
  return (
    <p {...stylex.props(styles.lead)}>
      A modal dialog that interrupts the user with important content and expects
      a response.
    </p>
  );
}
