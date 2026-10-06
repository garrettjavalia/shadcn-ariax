import{typographyProps}from"@typography-customizations";
export function TypographyBlockquote() {
  return (
    <blockquote {...typographyProps("blockquote")}>
      &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
      it&apos;s only fair that they should pay for the privilege.&quot;
    </blockquote>
  )
}
