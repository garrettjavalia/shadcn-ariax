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

export const animationStyles = stylex.create({
  overlay: { animationName: { default: null, ":is([data-entering])": enter, ":is([data-exiting])": exit } },
  pulse: { animationName: pulse },
  spin: { animationName: spin },
  drawerOverlay:{transitionProperty:'opacity',transitionDuration:{default:'450ms',':is([data-swiping]):not([data-ending-style])':'0ms',':is([data-ending-style])':'calc(var(--drawer-swipe-strength) * 400ms)'},transitionTimingFunction:'cubic-bezier(.32,.72,0,1)'},
  drawerPopup:{transitionProperty:'transform, height, opacity, filter',transitionDuration:{default:'450ms',':is([data-nested-drawer-swiping],[data-swiping]):not([data-ending-style])':'0ms',':is([data-ending-style])':'calc(var(--drawer-swipe-strength) * 400ms)'},transitionTimingFunction:'cubic-bezier(.22,1,0,1)'},
  drawerContent:{transitionProperty:'opacity',transitionDuration:'300ms',transitionTimingFunction:'cubic-bezier(.45,1.005,0,1.005)'},
  scrollFade:{
   '--_scroll-fade-size-t':'var(--scroll-fade-t-size, var(--scroll-fade-size, min(12%, 2.5rem)))','--_scroll-fade-size-b':'var(--scroll-fade-b-size, var(--scroll-fade-size, min(12%, 2.5rem)))','--scroll-fade-block':'linear-gradient(to bottom, transparent 0, #000 var(--scroll-fade-t, 0px), #000 calc(100% - var(--scroll-fade-b, 0px)), transparent 100%)',maskImage:'var(--scroll-fade-mask, var(--scroll-fade-block))',maskComposite:'intersect',maskRepeat:'no-repeat',
   animationName:{default:null,'@supports (animation-timeline: scroll())':`${scrollRevealTop}, ${scrollRevealBottom}`},animationDuration:{default:null,'@supports (animation-timeline: scroll())':'1ms, 1ms'},animationTimingFunction:{default:null,'@supports (animation-timeline: scroll())':'ease-in-out, ease-in-out'},animationDelay:{default:null,'@supports (animation-timeline: scroll())':'0s, 0s'},animationIterationCount:{default:null,'@supports (animation-timeline: scroll())':'1, 1'},animationDirection:{default:null,'@supports (animation-timeline: scroll())':'normal, normal'},animationFillMode:{default:null,'@supports (animation-timeline: scroll())':'both, both'},animationPlayState:{default:null,'@supports (animation-timeline: scroll())':'running, running'},animationTimeline:{default:null,'@supports (animation-timeline: scroll())':'scroll(self y), scroll(self y)'},animationRange:{default:null,'@supports (animation-timeline: scroll())':'0 var(--scroll-fade-reveal, 6rem), calc(100% - var(--scroll-fade-reveal, 6rem)) 100%'},
   '--scroll-fade-t':{default:null,'@supports not (animation-timeline: scroll())':'var(--_scroll-fade-size-t)'},'--scroll-fade-b':{default:null,'@supports not (animation-timeline: scroll())':'var(--_scroll-fade-size-b)'},
  },
  caretBlink: { animationName: caretBlink },
});
