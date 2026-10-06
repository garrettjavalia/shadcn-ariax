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

// shadcn 4.21.1 scroll-fade (MIT); SHADCN-LICENSE is distributed by the registry.
const scrollRevealTop = stylex.keyframes({
  // @ts-expect-error StyleX keyframes accepts registered CSS properties; its type omits them.
  from: { '--scroll-fade-t': '0px' },
  // @ts-expect-error Registered CSS property.
  to: { '--scroll-fade-t': 'var(--_scroll-fade-size-t, var(--scroll-fade-size, min(12%, 2.5rem)))' },
});
const scrollRevealBottom = stylex.keyframes({
  // @ts-expect-error Registered CSS property.
  from: { '--scroll-fade-b': 'var(--_scroll-fade-size-b, var(--scroll-fade-size, min(12%, 2.5rem)))' },
  // @ts-expect-error Registered CSS property.
  to: { '--scroll-fade-b': '0px' },
});
const caretBlink = stylex.keyframes({ '0%,70%,100%': {opacity:1}, '20%,50%': {opacity:0} });
const shimmer = stylex.keyframes({from:{backgroundPosition:'100% 0'},to:{backgroundPosition:'0 0'}});

const scrollRevealStart=stylex.keyframes({
 // @ts-expect-error Registered CSS property.
 from:{'--scroll-fade-s':'0px'},
 // @ts-expect-error Registered CSS property.
 to:{'--scroll-fade-s':'var(--_scroll-fade-size-s, var(--scroll-fade-size, min(12%, 2.5rem)))'},
});
const scrollRevealEnd=stylex.keyframes({
 // @ts-expect-error Registered CSS property.
 from:{'--scroll-fade-e':'var(--_scroll-fade-size-e, var(--scroll-fade-size, min(12%, 2.5rem)))'},
 // @ts-expect-error Registered CSS property.
 to:{'--scroll-fade-e':'0px'},
});

export const animationStyles = stylex.create({
  overlay: { animationName: { default: null, ":is([data-entering])": enter, ":is([data-exiting])": exit } },
  pulse: { animationName: pulse },
  spin: { animationName: spin },
  drawerOverlay:{transitionProperty:'opacity',transitionDuration:{default:'450ms',':is([data-swiping]):not([data-ending-style])':'0ms',':is([data-ending-style])':'calc(var(--drawer-swipe-strength) * 400ms)'},transitionTimingFunction:'cubic-bezier(.32,.72,0,1)'},
  drawerPopup:{transitionProperty:'transform, height, opacity, filter',transitionDuration:{default:'450ms',':is([data-nested-drawer-swiping],[data-swiping]):not([data-ending-style])':'0ms',':is([data-ending-style])':'calc(var(--drawer-swipe-strength) * 400ms)'},transitionTimingFunction:'cubic-bezier(.22,1,.36,1)'},
  drawerContent:{transitionProperty:'opacity',transitionDuration:'300ms',transitionTimingFunction:'cubic-bezier(.45,1.005,0,1.005)'},
  // StyleX types currently restrict enum/number animation fields to single values; CSS lists remain intact.
  scrollFade:{
   '--_scroll-fade-size-t':'var(--scroll-fade-t-size, var(--scroll-fade-size, min(12%, 2.5rem)))','--_scroll-fade-size-b':'var(--scroll-fade-b-size, var(--scroll-fade-size, min(12%, 2.5rem)))','--scroll-fade-block':'linear-gradient(to bottom, transparent 0, #000 var(--scroll-fade-t, 0px), #000 calc(100% - var(--scroll-fade-b, 0px)), transparent 100%)',maskImage:'var(--scroll-fade-mask, var(--scroll-fade-block))',maskComposite:'intersect',maskRepeat:'no-repeat',
   animationName:{default:null,'@supports (animation-timeline: scroll())':`${scrollRevealTop}, ${scrollRevealBottom}`},animationDuration:{default:null,'@supports (animation-timeline: scroll())':'1ms, 1ms'},animationTimingFunction:{default:null,'@supports (animation-timeline: scroll())':'ease-in-out, ease-in-out'},animationDelay:{default:null,'@supports (animation-timeline: scroll())':'0s, 0s'},animationIterationCount:{default:null,'@supports (animation-timeline: scroll())':'1, 1' as unknown as number},animationDirection:{default:null,'@supports (animation-timeline: scroll())':'normal, normal' as 'normal'},animationFillMode:{default:null,'@supports (animation-timeline: scroll())':'both'},animationPlayState:{default:null,'@supports (animation-timeline: scroll())':'running, running' as 'running'},animationTimeline:{default:null,'@supports (animation-timeline: scroll())':'scroll(self y), scroll(self y)'},animationRange:{default:null,'@supports (animation-timeline: scroll())':'0 var(--scroll-fade-reveal, 6rem), calc(100% - var(--scroll-fade-reveal, 6rem)) 100%'},
   '--scroll-fade-t':{default:null,'@supports not (animation-timeline: scroll())':'var(--_scroll-fade-size-t)'},'--scroll-fade-b':{default:null,'@supports not (animation-timeline: scroll())':'var(--_scroll-fade-size-b)'},
  },
  scrollFadeInline:{
   '--_scroll-fade-size-s':'var(--scroll-fade-s-size, var(--scroll-fade-size, min(12%, 2.5rem)))','--_scroll-fade-size-e':'var(--scroll-fade-e-size, var(--scroll-fade-size, min(12%, 2.5rem)))','--scroll-fade-inline':{default:'linear-gradient(to right, transparent 0, #000 var(--scroll-fade-s, 0px), #000 calc(100% - var(--scroll-fade-e, 0px)), transparent 100%)',':where([dir="rtl"], [dir="rtl"] *)':'linear-gradient(to left, transparent 0, #000 var(--scroll-fade-s, 0px), #000 calc(100% - var(--scroll-fade-e, 0px)), transparent 100%)'},maskImage:'var(--scroll-fade-mask, var(--scroll-fade-inline))',maskComposite:'intersect',maskRepeat:'no-repeat',
   animationName:{default:null,'@supports (animation-timeline: scroll())':`${scrollRevealStart}, ${scrollRevealEnd}`},animationDuration:{default:null,'@supports (animation-timeline: scroll())':'1ms, 1ms'},animationTimingFunction:{default:null,'@supports (animation-timeline: scroll())':'ease-in-out, ease-in-out'},animationDelay:{default:null,'@supports (animation-timeline: scroll())':'0s, 0s'},animationIterationCount:{default:null,'@supports (animation-timeline: scroll())':'1, 1' as unknown as number},animationDirection:{default:null,'@supports (animation-timeline: scroll())':'normal, normal' as 'normal'},animationFillMode:{default:null,'@supports (animation-timeline: scroll())':'both'},animationPlayState:{default:null,'@supports (animation-timeline: scroll())':'running, running' as 'running'},animationTimeline:{default:null,'@supports (animation-timeline: scroll())':'scroll(self inline), scroll(self inline)'},animationRange:{default:null,'@supports (animation-timeline: scroll())':'0 var(--scroll-fade-reveal, 6rem), calc(100% - var(--scroll-fade-reveal, 6rem)) 100%'},
   '--scroll-fade-s':{default:null,'@supports not (animation-timeline: scroll())':'var(--_scroll-fade-size-s)'},'--scroll-fade-e':{default:null,'@supports not (animation-timeline: scroll())':'var(--_scroll-fade-size-e)'},
  },
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
