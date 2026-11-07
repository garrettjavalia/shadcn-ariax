import { demoProps, demoStyle } from '@official-demo-customizations';
"use client"

import * as React from "react"
import { BadgeCheck, BookmarkIcon } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { Badge } from "@badge"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      badge: "Badge",
      secondary: "Secondary",
      destructive: "Destructive",
      outline: "Outline",
      verified: "Verified",
      bookmark: "Bookmark",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      badge: "شارة",
      secondary: "ثانوي",
      destructive: "مدمر",
      outline: "مخطط",
      verified: "متحقق",
      bookmark: "إشارة مرجعية",
    },
  },
  he: {
    dir: "rtl",
    values: {
      badge: "תג",
      secondary: "משני",
      destructive: "הרסני",
      outline: "קווי מתאר",
      verified: "מאומת",
      bookmark: "סימנייה",
    },
  },
}

export function BadgeRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div {...demoProps('badgeCenter')} dir={dir}>
      <Badge>{t.badge}</Badge>
      <Badge variant="secondary">{t.secondary}</Badge>
      <Badge variant="destructive">{t.destructive}</Badge>
      <Badge variant="outline">{t.outline}</Badge>
      <Badge variant="secondary">
        <BadgeCheck data-icon="inline-start" />
        {t.verified}
      </Badge>
      <Badge variant="outline">
        {t.bookmark}
        <BookmarkIcon data-icon="inline-end" />
      </Badge>
    </div>
  )
}
