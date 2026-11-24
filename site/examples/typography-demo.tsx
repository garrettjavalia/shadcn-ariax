import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  h1: {
    scrollMargin: "calc(var(--ariax-spacing, .25rem) * 20)",
    fontSize: "2.25rem",
    lineHeight: "calc(2.5 / 2.25)",
    fontWeight: 800,
    letterSpacing: "-.025em",
    textWrap: "balance",
  },
  leadParagraph: {
    fontSize: "1.25rem",
    lineHeight: "calc(var(--ariax-spacing, .25rem) * 7)",
    color: "var(--muted-foreground)",
    marginTop: {
      default: null,
      ":not(:first-child)": "calc(var(--ariax-spacing, .25rem) * 6)",
    },
  },
  h2Spaced: {
    marginTop: {
      default: "calc(var(--ariax-spacing, .25rem) * 10)",
      ":first-child": 0,
    },
    scrollMargin: "calc(var(--ariax-spacing, .25rem) * 20)",
    borderBottomWidth: 1,
    paddingBottom: "calc(var(--ariax-spacing, .25rem) * 2)",
    fontSize: "1.875rem",
    lineHeight: "calc(2.25 / 1.875)",
    fontWeight: 600,
    letterSpacing: "-.025em",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
  },
  p: {
    lineHeight: "calc(var(--ariax-spacing, .25rem) * 7)",
    marginTop: {
      default: null,
      ":not(:first-child)": "calc(var(--ariax-spacing, .25rem) * 6)",
    },
  },
  link: {
    fontWeight: 500,
    color: "var(--primary)",
    textDecorationLine: "underline",
    textUnderlineOffset: 4,
  },
  blockquote: {
    marginTop: "calc(var(--ariax-spacing, .25rem) * 6)",
    borderInlineStartWidth: 2,
    paddingInlineStart: "calc(var(--ariax-spacing, .25rem) * 6)",
    fontStyle: "italic",
  },
  h3Spaced: {
    marginTop: "calc(var(--ariax-spacing, .25rem) * 8)",
    scrollMargin: "calc(var(--ariax-spacing, .25rem) * 20)",
    fontSize: "1.5rem",
    lineHeight: "calc(2 / 1.5)",
    fontWeight: 600,
    letterSpacing: "-.025em",
  },
  list: {
    marginBlock: "calc(var(--ariax-spacing, .25rem) * 6)",
    marginInlineStart: "calc(var(--ariax-spacing, .25rem) * 6)",
    listStyleType: "disc",
  },
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
  listItem: { marginTop: "calc(var(--ariax-spacing, .25rem) * 2)" },
});

export default function TypographyDemo() {
  return (
    <div>
      <h1 {...stylex.props(styles.h1)}>
        Taxing Laughter: The Joke Tax Chronicles
      </h1>
      <p {...stylex.props(styles.leadParagraph)}>
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to him
        with a problem: the kingdom was running out of money.
      </p>
      <h2 {...stylex.props(styles.h2Spaced)}>The King&apos;s Plan</h2>
      <p {...stylex.props(styles.p)}>
        The king thought long and hard, and finally came up with{" "}
        <a href="#" {...stylex.props(styles.link)}>
          a brilliant plan
        </a>
        : he would tax the jokes in the kingdom.
      </p>
      <blockquote {...stylex.props(styles.blockquote)}>
        &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
        it&apos;s only fair that they should pay for the privilege.&quot;
      </blockquote>
      <h3 {...stylex.props(styles.h3Spaced)}>The Joke Tax</h3>
      <p {...stylex.props(styles.p)}>
        The king&apos;s subjects were not amused. They grumbled and complained,
        but the king was firm:
      </p>
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
      <p {...stylex.props(styles.p)}>
        As a result, people stopped telling jokes, and the kingdom fell into a
        gloom. But there was one person who refused to let the king&apos;s
        foolishness get him down: a court jester named Jokester.
      </p>
      <h3 {...stylex.props(styles.h3Spaced)}>Jokester&apos;s Revolt</h3>
      <p {...stylex.props(styles.p)}>
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king&apos;s pillow, in his
        soup, even in the royal toilet. The king was furious, but he
        couldn&apos;t seem to stop Jokester.
      </p>
      <p {...stylex.props(styles.p)}>
        And then, one day, the people of the kingdom discovered that the jokes
        left by Jokester were so funny that they couldn&apos;t help but laugh.
        And once they started laughing, they couldn&apos;t stop.
      </p>
      <h3 {...stylex.props(styles.h3Spaced)}>The People&apos;s Rebellion</h3>
      <p {...stylex.props(styles.p)}>
        The people of the kingdom, feeling uplifted by the laughter, started to
        tell jokes and puns again, and soon the entire kingdom was in on the
        joke.
      </p>
      <div {...stylex.props(styles.tableContainer)}>
        <table {...stylex.props(styles.table)}>
          <thead>
            <tr {...stylex.props(styles.tableRow)}>
              <th {...stylex.props(styles.tableHeader)}>
                King&apos;s Treasury
              </th>
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
      <p {...stylex.props(styles.p)}>
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax. Jokester was declared a hero, and
        the kingdom lived happily ever after.
      </p>
      <p {...stylex.props(styles.p)}>
        The moral of the story is: never underestimate the power of a good laugh
        and always be careful of bad ideas.
      </p>
    </div>
  );
}
