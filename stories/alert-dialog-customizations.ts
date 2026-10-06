import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({destructive:{backgroundColor:{default:'color-mix(in oklab, var(--destructive) 10%, transparent)',':is(.dark *)':'color-mix(in oklab, var(--destructive) 20%, transparent)'},color:'var(--destructive)'},custom:{maxWidth:'28rem'}});
export const destructive={xstyle:styles.destructive};
export const customized={xstyle:styles.custom,style:{opacity:.9}};
