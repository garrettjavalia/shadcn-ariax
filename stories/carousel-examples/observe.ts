import type {CarouselApi} from '@carousel';
declare global{interface Window{parityCarousel?:CarouselApi}}
// Expose the real public API to browser tests without changing the rendered tree.
export function observeCarousel(api:CarouselApi){window.parityCarousel=api;}
