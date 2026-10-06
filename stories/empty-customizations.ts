import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  row: { flexDirection: 'row', justifyContent: 'center', gap: '.5rem' },
  muted: { color: 'var(--muted-foreground)' },
  outline: { borderWidth: 1, borderStyle: 'dashed' },
  background: { height: '100%', backgroundColor: 'color-mix(in oklab, var(--muted) 30%, transparent)' },
  pretty: { maxWidth: '20rem', textWrap: 'pretty' },
  avatar: { width: '3rem', height: '3rem' },
  groupAvatar: { width: '3rem', height: '3rem', filter: 'grayscale(100%)', boxShadow: '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 2px var(--background), 0 0 0 0 #0000' },
  input: { width: { default: '100%', '@media (width >= 40rem)': '75%' } },
  inputAlways: { width: '75%' },
  mutedBackground: { backgroundColor: 'var(--muted)' },
  mutedAlt: { backgroundColor: 'color-mix(in oklab, var(--muted) 50%, transparent)' },
  dynamic: (width: number) => ({ width }),
});
export const emptyCustom = (key: 'row'|'muted'|'outline'|'background'|'pretty'|'avatar'|'groupAvatar'|'input'|'inputAlways'|'mutedBackground'|'mutedAlt') => ({ xstyle: styles[key] });
export const emptyDynamic = (width: number) => ({ xstyle: styles.dynamic(width), style: undefined as import('react').CSSProperties | undefined });
