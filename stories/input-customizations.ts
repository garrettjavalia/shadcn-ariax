import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width, height: width / 7, paddingInline: '1rem' }) });
export const inputCustomization = { xstyle: styles.dynamic(280), style: { width: 240 } };
