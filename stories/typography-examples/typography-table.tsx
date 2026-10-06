import{typographyProps}from"@typography-customizations";
export function TypographyTable() {
  return (
    <div {...typographyProps("tableContainer")}>
      <table {...typographyProps("table")}>
        <thead>
          <tr {...typographyProps("tableRow")}>
            <th {...typographyProps("tableHeader")}>
              King&apos;s Treasury
            </th>
            <th {...typographyProps("tableHeader")}>
              People&apos;s happiness
            </th>
          </tr>
        </thead>
        <tbody>
          <tr {...typographyProps("tableRow")}>
            <td {...typographyProps("tableCell")}>
              Empty
            </td>
            <td {...typographyProps("tableCell")}>
              Overflowing
            </td>
          </tr>
          <tr {...typographyProps("tableRow")}>
            <td {...typographyProps("tableCell")}>
              Modest
            </td>
            <td {...typographyProps("tableCell")}>
              Satisfied
            </td>
          </tr>
          <tr {...typographyProps("tableRow")}>
            <td {...typographyProps("tableCell")}>
              Full
            </td>
            <td {...typographyProps("tableCell")}>
              Ecstatic
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
