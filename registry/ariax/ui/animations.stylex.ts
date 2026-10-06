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
const spin = stylex.keyframes({ to: { transform: 'rotate(360deg)' } });

const caretBlink = stylex.keyframes({ '0%,70%,100%': {opacity:1}, '20%,50%': {opacity:0} });
const shimmer = stylex.keyframes({from:{backgroundPosition:'100% 0'},to:{backgroundPosition:'0 0'}});

export const animationStyles = stylex.create({
  overlay: { animationName: { default: null, ":is([data-entering])": enter, ":is([data-exiting])": exit } },
  pulse: { animationName: pulse },
  spin: { animationName: spin },
  caretBlink: { animationName: caretBlink },
  shimmer: {
    '--ariax-shimmer-spread':'var(--shimmer-spread, calc(3ch + 40px))',
    '--ariax-shimmer-base':'currentColor',
    '--ariax-shimmer-highlight':{default:'var(--shimmer-color, oklch(from currentColor l c h / calc(alpha * 0.2)))',':is(.dark *)':'var(--shimmer-color, oklch(from currentColor max(0.8, calc(l + 0.4)) c h / calc(alpha + 0.4)))'},
    backgroundImage:{default:'var(--shimmer-image, linear-gradient(calc(90deg + var(--shimmer-angle)), var(--ariax-shimmer-base) calc(50% - var(--ariax-shimmer-spread)), color-mix(in oklch, var(--ariax-shimmer-highlight), var(--ariax-shimmer-base) 50%) calc(50% - var(--ariax-shimmer-spread) * 0.5), var(--ariax-shimmer-highlight) 50%, color-mix(in oklch, var(--ariax-shimmer-highlight), var(--ariax-shimmer-base) 50%) calc(50% + var(--ariax-shimmer-spread) * 0.5), var(--ariax-shimmer-base) calc(50% + var(--ariax-shimmer-spread))))','@media (prefers-reduced-motion: reduce)':'none'},
    backgroundRepeat:'no-repeat',backgroundSize:'calc(200% + var(--ariax-shimmer-spread) * 2) 100%',backgroundPosition:'0 0',backgroundClip:'text',
    WebkitTextFillColor:{default:'var(--shimmer-text-fill, transparent)','@media (prefers-reduced-motion: reduce)':'currentColor'},
    animationName:{default:shimmer,'@media (prefers-reduced-motion: reduce)':'none'},
    animationDuration:{default:'var(--shimmer-duration, 2s)','@media (prefers-reduced-motion: reduce)':'0s'},
    animationTimingFunction:{default:'linear','@media (prefers-reduced-motion: reduce)':'ease'},
    animationIterationCount:{default:'infinite','@media (prefers-reduced-motion: reduce)':1},
    animationDirection:{default:'normal',':where([dir="rtl"], [dir="rtl"] *)':{default:'reverse','@media (prefers-reduced-motion: reduce)':'normal'}},
  },
});
