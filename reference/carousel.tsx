import { useCallback, type ComponentProps } from 'react';
import { Carousel as OriginalCarousel, type CarouselApi } from '../generated/reference/aria-nova/ui/carousel';
import { observeCarousel } from '../stories/carousel-examples/observe';

export * from '../generated/reference/aria-nova/ui/carousel';

// Observe the public API without rewriting the official examples or their DOM.
// Preserve an example's own setApi callback (notably the current-slide example).
export function Carousel({ setApi, ...props }: ComponentProps<typeof OriginalCarousel>) {
  const observedApi = useCallback((api: CarouselApi) => {
    observeCarousel(api);
    setApi?.(api);
  }, [setApi]);
  return <OriginalCarousel {...props} setApi={observedApi} />;
}
