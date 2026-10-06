import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  frame: { width: '100%', maxWidth: '24rem', borderRadius: 'var(--radius)', backgroundColor: 'var(--muted)' },
  square: { maxWidth: '12rem' },
  portrait: { maxWidth: '10rem' },
  bare: { borderRadius: 'var(--radius)', backgroundColor: 'var(--muted)' },
  dynamic: (width: number) => ({ width }),
});
export const frame = { xstyle: styles.frame };
export const square = { xstyle: [styles.frame, styles.square] };
export const portrait = { xstyle: [styles.frame, styles.portrait] };
export const bare = { xstyle: styles.bare };
export const customized = (ratio: number, width: number) => ({ xstyle: styles.dynamic(width), style: { maxWidth: 240 } });
