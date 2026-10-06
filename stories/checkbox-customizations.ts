import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  maxWidthSmall: {maxWidth:'var(--container-sm, 24rem)'},
  centeredNarrow: {marginInline:'auto',width:'calc(var(--spacing, .25rem) * 56)'},
  centeredWide: {marginInline:'auto',width:'calc(var(--spacing, .25rem) * 72)'},
  groupGap: {gap:'calc(var(--spacing, .25rem) * 3)'},
  normalWeight: {fontWeight:400},
  mediumWeight: {fontWeight:500},
  selectionWidth: {width:'calc(var(--spacing, .25rem) * 8)'},
});
export const maxWidthSmall={xstyle:styles.maxWidthSmall};
export const centeredNarrow={xstyle:styles.centeredNarrow};
export const centeredWide={xstyle:styles.centeredWide};
export const groupGap={xstyle:styles.groupGap};
export const normalWeight={xstyle:styles.normalWeight};
export const mediumWeight={xstyle:styles.mediumWeight};
export const selectionWidth={xstyle:styles.selectionWidth};
