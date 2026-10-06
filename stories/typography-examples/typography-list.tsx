import{typographyProps}from"@typography-customizations";
export function TypographyList() {
  return (
    <ul {...typographyProps("list")}>
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
  )
}
