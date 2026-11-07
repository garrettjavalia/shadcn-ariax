import { demoProps, demoStyle } from '@official-demo-customizations';
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { Skeleton } from "@skeleton"

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

export function SkeletonRtl() {
  const { dir } = useTranslation(translations, "ar")

  return (
    <div {...demoProps('skeleton')} dir={dir}>
      <Skeleton {...demoStyle('circle')} />
      <div {...demoProps('lines')}>
        <Skeleton {...demoStyle('line250')} />
        <Skeleton {...demoStyle('line200')} />
      </div>
    </div>
  )
}
