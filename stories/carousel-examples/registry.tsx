import {observeCarousel} from './observe';
import './fixtures.css';
import {carouseldemo,carouselplugin,carouselwide,carouselfull,carouselregistry,carouselcard,carouselverticalCard,carouselgap,carouselverticalContent,carouselverticalItem,carouselsize,carouselspacing,carouselmultiple,carouselregistryGap,carouselcontrol,carouselmargin} from '@carousel-customizations';
import { Card, CardContent } from "@card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@carousel"


export function CarouselBasic() {
  return (
    <>
      <Carousel setApi={observeCarousel} {...carouselregistry}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div style={{padding:4}}>
                <Card>
                  <CardContent {...carouselcard}>
                    <span style={{fontSize:'2.25rem',lineHeight:'calc(2.5 / 2.25)',fontWeight:600}}>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious {...carouselcontrol} />
        <CarouselNext {...carouselcontrol} />
      </Carousel>
    </>
  )
}

export function CarouselMultiple() {
  return (
    <>
      <Carousel setApi={observeCarousel}
        {...carouselregistry}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} {...carouselmultiple}>
              <div style={{padding:4}}>
                <Card>
                  <CardContent {...carouselcard}>
                    <span style={{fontSize:'1.875rem',lineHeight:'calc(2.25 / 1.875)',fontWeight:600}}>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious {...carouselcontrol} />
        <CarouselNext {...carouselcontrol} />
      </Carousel>
    </>
  )
}

export function CarouselWithGap() {
  return (
    <>
      <Carousel setApi={observeCarousel} {...carouselregistry}>
        <CarouselContent {...carouselgap}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} {...carouselregistryGap}>
              <div style={{padding:4}}>
                <Card>
                  <CardContent {...carouselcard}>
                    <span style={{fontSize:'1.5rem',lineHeight:'calc(2 / 1.5)',fontWeight:600}}>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious {...carouselcontrol} />
        <CarouselNext {...carouselcontrol} />
      </Carousel>
    </>
  )
}
