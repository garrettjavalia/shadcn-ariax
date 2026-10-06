import {observeCarousel} from './observe';
import './fixtures.css';
import {carouseldemo,carouselplugin,carouselwide,carouselfull,carouselregistry,carouselcard,carouselverticalCard,carouselgap,carouselverticalContent,carouselverticalItem,carouselsize,carouselspacing,carouselmultiple,carouselregistryGap,carouselcontrol,carouselmargin} from '@carousel-customizations';
import * as React from "react"

import { Card, CardContent } from "@card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@carousel"

export default function CarouselSize() {
  return (
    <Carousel setApi={observeCarousel}
      opts={{
        align: "start",
      }}
      {...carouselwide}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} {...carouselsize}>
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
