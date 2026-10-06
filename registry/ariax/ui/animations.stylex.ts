import * as stylex from '@stylexjs/stylex';

// tw-animate-css 1.4.0 (MIT); see the distributed TW-ANIMATE-LICENSE.
const enter = stylex.keyframes({ from: {
  opacity: 'var(--ariax-enter-opacity, 1)',
  transform: 'translate3d(var(--ariax-enter-x, 0), var(--ariax-enter-y, 0), 0) scale3d(var(--ariax-enter-scale, 1), var(--ariax-enter-scale, 1), var(--ariax-enter-scale, 1)) rotate(0)',
  filter: 'blur(0)',
} });
const exit = stylex.keyframes({ to: {
  opacity: 'var(--ariax-exit-opacity, 1)',
  transform: 'translate3d(0, 0, 0) scale3d(var(--ariax-exit-scale, 1), var(--ariax-exit-scale, 1), var(--ariax-exit-scale, 1)) rotate(0)',
  filter: 'blur(0)',
} });
const pulse = stylex.keyframes({ '50%': { opacity: .5 } });

export const animationStyles = stylex.create({
  overlay: { animationName: { default: null, ":is([data-entering])": enter, ":is([data-exiting])": exit } },
  pulse: { animationName: pulse },
});
