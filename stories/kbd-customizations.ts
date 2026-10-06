import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ translated: { translate: '2px' }, custom: { height: 28, minWidth: 40, paddingInline: 8, borderRadius: 7 }, dynamic: (width: number) => ({ width }) });
export const translated = { xstyle: styles.translated };
export const customized = { xstyle: [styles.custom, styles.dynamic(64)], style: { width: 72, borderRadius: 10 } };
