import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  blockquote: {
    marginTop: "calc(var(--ariax-spacing, .25rem) * 6)",
    borderInlineStartWidth: 2,
    paddingInlineStart: "calc(var(--ariax-spacing, .25rem) * 6)",
    fontStyle: "italic",
  },
});

export default function TypographyBlockquote() {
  return (
    <blockquote {...stylex.props(styles.blockquote)}>
      &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
      it&apos;s only fair that they should pay for the privilege.&quot;
    </blockquote>
  );
}
