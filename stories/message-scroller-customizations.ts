import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  root: {
    height: 'calc(var(--spacing, .25rem) * 60)',
    width: 'calc(var(--spacing, .25rem) * 80)'
  },
  content: {
    gap: 'calc(var(--spacing, .25rem) * 3)',
    padding: 'calc(var(--spacing, .25rem) * 4)'
  },
  item: {
    height: 'calc(var(--spacing, .25rem) * 40)',
    padding: 'calc(var(--spacing, .25rem) * 2)',
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
export function messageScrollerDynamic(width: number, style: React.CSSProperties = {}) {
  return {
    xstyle: [styles.root, styles.custom(width)],
    style
  };
}
