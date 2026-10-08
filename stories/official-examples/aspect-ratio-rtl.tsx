import { demoProps, demoStyle } from '@official-demo-customizations';
"use client"

import * as React from "react"
import Image from "../../reference/framework/image"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { AspectRatio } from "@aspect-ratio"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      caption: "Beautiful landscape",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      caption: "منظر طبيعي جميل",
    },
  },
  he: {
    dir: "rtl",
    values: {
      caption: "נוף יפה",
    },
  },
}

export function AspectRatioRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <figure {...demoProps('full')} dir={dir}>
      <AspectRatio ratio={16 / 9} {...demoStyle('mutedFrame')}>
        <Image
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          fill
          {...demoProps('photo')}
        />
      </AspectRatio>
      <figcaption {...demoProps('caption')}>
        {t.caption}
      </figcaption>
    </figure>
  )
}
