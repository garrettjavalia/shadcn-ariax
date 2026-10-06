import {sliderBounded} from "@slider-customizations";
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { Slider } from "@slider"

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

export function SliderRtl() {
  const { dir } = useTranslation(translations, "ar")

  return (
    <Slider
      aria-label="RTL slider"
      defaultValue={[75]}
      maxValue={100}
      step={1}
      {...sliderBounded}
      dir={dir}
    />
  )
}
