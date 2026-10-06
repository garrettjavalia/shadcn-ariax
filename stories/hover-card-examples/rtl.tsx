import {grid,centered,rtlCard,bold,muted} from '@hover-card-customizations';
"use client"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { Button } from "@button"
import {
  HoverCard,
  HoverCardTrigger,
} from "@hover-card"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      name: "Wireless Headphones",
      price: "$99.99",
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
      name: "سماعات لاسلكية",
      price: "٩٩.٩٩ $",
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
      name: "אוזניות אלחוטיות",
      price: "99.99 $",
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

export function HoverCardRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div {...grid}>
      <div {...centered}>
        {physicalSides.map((side) => (
          <HoverCardTrigger key={side} delay={10} closeDelay={100}>
            <Button variant="outline">{t[side]}</Button>
            <HoverCard data-parity-portal
              placement={side}
              dir={dir}
              {...rtlCard}
            >
              <div {...bold}>{t.name}</div>
              <div {...muted}>{t.price}</div>
            </HoverCard>
          </HoverCardTrigger>
        ))}
      </div>
      <div {...centered}>
        {logicalPlacements.map((placement) => (
          <HoverCardTrigger key={placement} delay={10} closeDelay={100}>
            <Button variant="outline">{t[placement]}</Button>
            <HoverCard data-parity-portal
              placement={placement}
              dir={dir}
              {...rtlCard}
            >
              <div {...bold}>{t.name}</div>
              <div {...muted}>{t.price}</div>
            </HoverCard>
          </HoverCardTrigger>
        ))}
      </div>
    </div>
  )
}
