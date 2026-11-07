import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({
  dynamic: (gap: number) => ({ gap, padding: 8 }),
  title: { color: "var(--primary)" },
  content: {
    maxHeight: 120,
    paddingBlock: 8,
    paddingInlineStart: 8,
    paddingInlineEnd: 8,
  },
  narrow: { width: 260 },
  tall: { height: 80 },
  running: { color: "var(--primary)" },
});
export const customRoot = (gap: number) => ({ xstyle: styles.dynamic(gap) });
export const customTitle = { xstyle: styles.title };
export const customContent = { xstyle: styles.content };
export const narrow = { xstyle: styles.narrow };
export const tall = { xstyle: styles.tall };
