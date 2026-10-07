import * as stylex from '@stylexjs/stylex';
import { animationStyles } from '../src/ariax/ui/animations.stylex';
const styles = stylex.create({
  size: (size: number) => ({ width: size, height: size }),
  base: { width: '1rem', height: '1rem', animationDuration: '1s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' },
  aside: { flex: 'none', justifyContent: 'flex-end' },
  end: { marginLeft: 'auto' }, minimum: { minHeight: 300 }, muted: { color: 'var(--muted-foreground)' },
});
export const spinnerSize = (size: number) => ({ xstyle: styles.size(size), style: undefined as import('react').CSSProperties | undefined });
export const spinnerAside = { xstyle: styles.aside };
export const spinnerEnd = { xstyle: styles.end };
export const spinnerMinimum = { xstyle: styles.minimum };
export const spinnerMuted = { xstyle: styles.muted };
export function customSpinnerProps() { const { className, style } = stylex.props(animationStyles.spin, styles.base); return { className, style }; }
