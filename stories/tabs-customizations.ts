import { tabsListProps } from '@tabs';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  width: {
    width: 400
  },
  rootOverride: (width: number) => ({
    width,
    fontSize: "1.25rem",
    lineHeight: 1.2
  }),
  triggerOverride: {
    paddingInline: "0.625rem",
    fontSize: "1.25rem",
    lineHeight: 1.1
  },
  rtlWidth: {
    width: "100%",
    maxWidth: "24rem"
  },
  content: {
    fontSize: '0.875rem',
    lineHeight: 'calc(1.25 / 0.875)',
    color: 'var(--muted-foreground)'
  }
});
export const width = {
  xstyle: styles.width
};
export const content = {
  xstyle: styles.content
};
export const rtlWidth = {
  xstyle: styles.rtlWidth
};
export const rootOverride = (width: number) => ({
  xstyle: styles.rootOverride(width)
});
export const triggerOverride = {
  xstyle: styles.triggerOverride
};
export const listHelper = tabsListProps({
  variant: 'line',
  style: {
    width: 320
  }
});
