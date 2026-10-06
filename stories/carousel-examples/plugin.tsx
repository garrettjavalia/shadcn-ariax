import {observeCarousel} from './observe';
import './fixtures.css';
import {carouseldemo,carouselplugin,carouselwide,carouselfull,carouselregistry,carouselcard,carouselverticalCard,carouselgap,carouselverticalContent,carouselverticalItem,carouselsize,carouselspacing,carouselmultiple,carouselregistryGap,carouselcontrol,carouselmargin} from '@carousel-customizations';
"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@carousel"

export default function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel setApi={observeCarousel}
      plugins={[plugin.current]}
      {...carouselplugin}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
