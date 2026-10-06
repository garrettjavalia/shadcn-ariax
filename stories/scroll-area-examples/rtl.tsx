import {scrollVertical,scrollHorizontal,scrollSeparator,scrollRegistryVertical,scrollRegistryHorizontal} from "@scroll-area-customizations";
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { ScrollArea } from "@scroll-area"
import { Separator } from "@separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      tags: "Tags",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      tags: "العلامات",
    },
  },
  he: {
    dir: "rtl",
    values: {
      tags: "תגיות",
    },
  },
}

export function ScrollAreaRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <ScrollArea {...scrollVertical} dir={dir}>
      <div style={{padding:16}}>
        <h4 style={{marginBottom:16,fontSize:'.875rem',lineHeight:1,fontWeight:500}}>{t.tags}</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div style={{fontSize:'.875rem',lineHeight:'calc(1.25 / .875)'}}>{tag}</div>
            <Separator {...scrollSeparator} />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
