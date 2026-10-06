import{typographyProps}from"@typography-customizations";
export function TypographyLead() {
  return (
    <p {...typographyProps("lead")}>
      A modal dialog that interrupts the user with important content and expects
      a response.
    </p>
  )
}
