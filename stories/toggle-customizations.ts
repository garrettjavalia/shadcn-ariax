import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.5rem'
  },
  bookmark: {
    fill: {
      default: null,
      ':is(.ariax-toggle[aria-pressed="true"] *)': 'var(--foreground)'
    }
  },
  custom: (width: number) => ({
    width
  })
});
function attrs(xstyle: stylex.StyleXStyles) {
  const {
    className,
    style
  } = stylex.props(xstyle);
  return {
    className,
    style
  };
}
export const toggleRow = attrs(styles.row);
export const bookmarkIcon = attrs(styles.bookmark);
export const customToggle = (width: number) => ({
  xstyle: styles.custom(width)
});
