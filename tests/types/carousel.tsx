import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@carousel";
// @ts-expect-error External classes are not a customization API.
<Carousel className="x" />;
// @ts-expect-error External classes are not a customization API.
<CarouselContent className="x" />;
// @ts-expect-error External classes are not a customization API.
<CarouselItem className="x" />;
// @ts-expect-error External classes are not a customization API.
<CarouselPrevious className="x" />;
// @ts-expect-error External classes are not a customization API.
<CarouselNext className="x" />;
