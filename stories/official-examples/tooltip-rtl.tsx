import { demoProps, demoStyle } from '@official-demo-customizations';
"use client"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { Button } from "@button"
import { Tooltip, TooltipTrigger } from "@tooltip"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      content: "Add to library",
      start: "Start",
      left: "Left",
      top: "Top",
      bottom: "Bottom",
      right: "Right",
      end: "End",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      content: "إضافة إلى المكتبة",
      start: "بداية السطر",
      left: "يسار",
      top: "أعلى",
      bottom: "أسفل",
      right: "يمين",
      end: "نهاية السطر",
    },
  },
  he: {
    dir: "rtl",
    values: {
      content: "הוסף לספרייה",
      start: "תחילת השורה",
      left: "שמאל",
      top: "למעלה",
      bottom: "למטה",
      right: "ימין",
      end: "סוף השורה",
    },
  },
}

const physicalSides = ["left", "top", "bottom", "right"] as const
const logicalPlacements = ["start", "end"] as const

export function TooltipRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div {...demoProps('tooltips')}>
      <div {...demoProps('tooltipRow')}>
        {physicalSides.map((side) => (
          <TooltipTrigger key={side}>
            <Button variant="outline">{t[side]}</Button>
            <Tooltip placement={side} dir={dir}>
              {t.content}
            </Tooltip>
          </TooltipTrigger>
        ))}
      </div>
      <div {...demoProps('tooltipRow')}>
        {logicalPlacements.map((placement) => (
          <TooltipTrigger key={placement}>
            <Button variant="outline">{t[placement]}</Button>
            <Tooltip placement={placement} dir={dir}>
              {t.content}
            </Tooltip>
          </TooltipTrigger>
        ))}
      </div>
    </div>
  )
}
