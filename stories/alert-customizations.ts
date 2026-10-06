import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  colors: {
    borderColor: { default: 'oklch(0.924 0.12 95.746)', ':is(.dark *)': 'oklch(0.414 0.112 45.904)' },
    backgroundColor: { default: 'oklch(0.987 0.022 95.277)', ':is(.dark *)': 'oklch(0.279 0.077 45.635)' },
    color: { default: 'oklch(0.414 0.112 45.904)', ':is(.dark *)': 'oklch(0.987 0.022 95.277)' },
  },
  dynamic: (width: number) => ({ width, paddingRight: 30 }),
  title: { fontWeight: 700 },
  description: { color: 'var(--foreground)' },
});
export const colors = { xstyle: styles.colors };
export const customized = { xstyle: styles.dynamic(360), style: { paddingRight: 40 } };
export const customTitle = { xstyle: styles.title };
export const customDescription = { xstyle: styles.description };
