import {observeCarousel} from './observe';
import './fixtures.css';
import {carouseldemo,carouselplugin,carouselwide,carouselfull,carouselregistry,carouselcard,carouselverticalCard,carouselgap,carouselverticalContent,carouselverticalItem,carouselsize,carouselspacing,carouselmultiple,carouselregistryGap,carouselcontrol,carouselmargin} from '@carousel-customizations';
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { Card, CardContent } from "@card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@carousel"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

function toArabicNumerals(num: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return num
    .toString()
    .split("")
    .map((digit) => arabicNumerals[parseInt(digit, 10)])
    .join("")
}

export function CarouselRtl() {
  const { dir, language } = useTranslation(translations, "ar")

  const formatNumber = (num: number): string => {
    if (language === "ar") {
      return toArabicNumerals(num)
    }
    return num.toString()
  }

  return (
    <Carousel setApi={observeCarousel}
      dir={dir}
      {...carouseldemo}
      opts={{
        direction: dir === 'rtl' ? 'rtl' : 'ltr',
      }}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div style={{padding:4}}>
              <Card>
                <CardContent {...carouselcard}>
                  <span style={{fontSize:'2.25rem',lineHeight:'calc(2.5 / 2.25)',fontWeight:600}}>
                    {formatNumber(index + 1)}
                  </span>
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
