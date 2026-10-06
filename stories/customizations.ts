import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  rounded: { borderRadius: 'calc(infinity * 1px)' },
  initial: { height: 60, minWidth: 120 },
  dynamic: (width: number) => ({ width }),
  custom: { height: 44, minWidth: 160, borderRadius: '0.75rem', paddingLeft: 20, paddingRight: 20, opacity: { default: null, ':hover': { default: null, '@media (hover: hover)': 0.8 } } },
});
export const rounded = { xstyle: styles.rounded };
// The later style must override both the component defaults and the earlier array entry.
export const customized = { xstyle: [styles.initial, styles.custom] };
export const dynamic = (width: number) => ({ xstyle: styles.dynamic(width) });
const separatorStyles = stylex.create({
  menu: { display: { default: 'none', '@media (width >= 48rem)': 'block' } },
  custom: { height: 4, width: 180, backgroundColor: 'var(--primary)' },
});
export const separatorMenu = { xstyle: separatorStyles.menu };
export const separatorCustom = { xstyle: separatorStyles.custom };
const labelStyles = stylex.create({ custom: { fontSize: '1.5rem', opacity: 0.8 }, dynamic: (width: number) => ({width}) });
export const labelCustomized = { xstyle: [labelStyles.custom, labelStyles.dynamic(240)], style: { opacity: 0.6 } };

// Dynamic StyleX width must survive a separate inline height override.
export const inlineSizing = { xstyle: styles.dynamic(160) };
export const inlineSkeletonSizing = inlineSizing;
