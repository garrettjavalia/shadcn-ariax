import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ base: { minWidth: 160, paddingInline: 18 }, dynamic: (width: number) => ({ width }), override: { paddingInline: 20 }, sideButton: { width: 'fit-content', textTransform: 'capitalize' } });
export const customized = { xstyle: [styles.base, styles.override, styles.dynamic(200)], style: { width: 210, paddingLeft: 22 } };
export const sideButton = { xstyle: styles.sideButton };
