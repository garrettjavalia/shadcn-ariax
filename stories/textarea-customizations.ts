import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ dynamic: (width: number) => ({ width, height: width / 7, paddingInline: width / 17.5 }) });
export const textareaCustomization = { xstyle: styles.dynamic(280), style: { width: 240 } };
