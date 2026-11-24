import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  list: {
    marginBlock: "calc(var(--ariax-spacing, .25rem) * 6)",
    marginInlineStart: "calc(var(--ariax-spacing, .25rem) * 6)",
    listStyleType: "disc",
  },
  listItem: { marginTop: "calc(var(--ariax-spacing, .25rem) * 2)" },
});

export default function TypographyList() {
  return (
    <ul {...stylex.props(styles.list)}>
      <li {...stylex.props(styles.listItem)}>
        1st level of puns: 5 gold coins
      </li>
      <li {...stylex.props(styles.listItem)}>
        2nd level of jokes: 10 gold coins
      </li>
      <li {...stylex.props(styles.listItem)}>
        3rd level of one-liners : 20 gold coins
      </li>
    </ul>
  );
}
