import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({width:{width:400},rtlWidth:{width:"100%",maxWidth:"24rem"},content:{fontSize:'0.875rem',lineHeight:'calc(1.25 / 0.875)',color:'var(--muted-foreground)'}});
export const width={xstyle:styles.width};export const content={xstyle:styles.content};
export const rtlWidth={xstyle:styles.rtlWidth};
