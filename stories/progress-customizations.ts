import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  demo: {
    width: '60%'
  },
  bounded: {
    width: '100%',
    maxWidth: '24rem'
  },
  full: {
    width: '100%'
  },
  width32: {
    width: '8rem'
  },
  px0: {
    paddingInline: 0
  },
  truncate: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  inline: {
    display: 'inline'
  },
  actions: {
    width: '4rem',
    justifyContent: 'flex-end'
  },
  custom: {
    width: 240
  },
  indicator: {
    width: 80
  },
  column: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '1rem'
  },
  boundedColumn: {
    display: 'flex',
    width: '100%',
    maxWidth: '24rem',
    flexDirection: 'column',
    gap: '1rem'
  },
  auto: {
    marginInlineStart: 'auto'
  },
  muted: {
    fontSize: '.875rem',
    lineHeight: 'calc(1.25/.875)',
    color: 'var(--muted-foreground)'
  }
});
const map = {
  demo: styles.demo,
  bounded: styles.bounded,
  full: styles.full,
  width32: styles.width32,
  px0: styles.px0,
  truncate: styles.truncate,
  inline: styles.inline,
  actions: styles.actions,
  custom: styles.custom,
  nativeIndicator: styles.indicator,
  indicator: styles.indicator
};
export const progressCustom = (key: keyof typeof map) => ({
  xstyle: map[key]
});
const native = {
  column: styles.column,
  boundedColumn: styles.boundedColumn,
  auto: styles.auto,
  muted: styles.muted
};
export function progressNative(key: keyof typeof native) {
  const {
    className,
    style
  } = stylex.props(native[key]);
  return {
    className,
    style
  };
}
