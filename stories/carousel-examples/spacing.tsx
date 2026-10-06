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

export default function CarouselSpacing() {
  return (
    <Carousel setApi={observeCarousel} {...carouselwide}>
      <CarouselContent {...carouselgap}>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} {...carouselspacing}>
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
