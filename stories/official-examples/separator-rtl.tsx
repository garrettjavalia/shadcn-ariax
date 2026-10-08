import { demoProps, demoStyle } from '@official-demo-customizations';
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { Separator } from "@separator"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "shadcn/ui",
      subtitle: "The Foundation for your Design System",
      description:
        "A set of beautifully designed components that you can customize, extend, and build on.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      title: "shadcn/ui",
      subtitle: "الأساس لنظام التصميم الخاص بك",
      description:
        "مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء عليها.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      title: "shadcn/ui",
      subtitle: "הבסיס למערכת העיצוב שלך",
      description:
        "סט של רכיבים מעוצבים בצורה יפה שאתה יכול להתאים אישית, להרחיב ולבנות עליהם.",
    },
  },
}

export function SeparatorRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div {...demoProps('separator')} dir={dir}>
      <div {...demoProps('description')}>
        <div {...demoProps('heading')}>{t.title}</div>
        <div {...demoProps('muted')}>{t.subtitle}</div>
      </div>
      <Separator />
      <div>{t.description}</div>
    </div>
  )
}
