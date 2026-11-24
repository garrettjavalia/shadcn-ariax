import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  tableContainer: {
    marginBlock: "calc(var(--ariax-spacing, .25rem) * 6)",
    width: "100%",
    overflowY: "auto",
  },
  table: { width: "100%" },
  tableRow: {
    margin: 0,
    borderTopWidth: 1,
    padding: 0,
    backgroundColor: { default: null, ":nth-child(even)": "var(--muted)" },
  },
  tableHeader: {
    borderWidth: 1,
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 4)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 2)",
    textAlign: {
      default: "left",
      ':is([align="center"])': "center",
      ':is([align="right"])': "right",
    },
    fontWeight: 700,
  },
  tableCell: {
    borderWidth: 1,
    paddingInline: "calc(var(--ariax-spacing, .25rem) * 4)",
    paddingBlock: "calc(var(--ariax-spacing, .25rem) * 2)",
    textAlign: {
      default: "left",
      ':is([align="center"])': "center",
      ':is([align="right"])': "right",
    },
  },
});

export default function TypographyTable() {
  return (
    <div {...stylex.props(styles.tableContainer)}>
      <table {...stylex.props(styles.table)}>
        <thead>
          <tr {...stylex.props(styles.tableRow)}>
            <th {...stylex.props(styles.tableHeader)}>King&apos;s Treasury</th>
            <th {...stylex.props(styles.tableHeader)}>
              People&apos;s happiness
            </th>
          </tr>
        </thead>
        <tbody>
          <tr {...stylex.props(styles.tableRow)}>
            <td {...stylex.props(styles.tableCell)}>Empty</td>
            <td {...stylex.props(styles.tableCell)}>Overflowing</td>
          </tr>
          <tr {...stylex.props(styles.tableRow)}>
            <td {...stylex.props(styles.tableCell)}>Modest</td>
            <td {...stylex.props(styles.tableCell)}>Satisfied</td>
          </tr>
          <tr {...stylex.props(styles.tableRow)}>
            <td {...stylex.props(styles.tableCell)}>Full</td>
            <td {...stylex.props(styles.tableCell)}>Ecstatic</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
