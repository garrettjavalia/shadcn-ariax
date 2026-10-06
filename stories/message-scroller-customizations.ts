import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  root: {
    height: 240,
    width: 320
  },
  content: {
    gap: 12,
    padding: 16
  },
  item: {
    height: 160,
    padding: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'var(--border)'
  },
  custom: (width: number) => ({
    width
  })
});
export const messageScrollerCustom = {
  root: () => ({
    xstyle: styles.root
  }),
  content: () => ({
    xstyle: styles.content
  }),
  item: () => ({
    xstyle: styles.item
  }),
  custom: (width: number) => ({
    xstyle: styles.custom(width)
  })
};
