import {grid,centered} from '@popover-customizations';
"use client"

import { Button } from "@button"
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@popover"

const translations = {
  en: {
    dir: "ltr",
    values: {
      title: "Dimensions",
      description: "Set the dimensions for the layer.",
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
      title: "الأبعاد",
      description: "تعيين الأبعاد للطبقة.",
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
      title: "מימדים",
      description: "הגדר את המימדים לשכבה.",
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

export function PopoverRtl() {
  const {dir, values:t}=translations.ar

  return (
    <div {...grid}>
      <div {...centered}>
        {physicalSides.map((side) => (
          <PopoverTrigger key={side}>
            <Button variant="outline">{t[side]}</Button>
            <Popover data-parity-portal placement={side} dir={dir}>
              <PopoverHeader>
                <PopoverTitle>{t.title}</PopoverTitle>
                <PopoverDescription>{t.description}</PopoverDescription>
              </PopoverHeader>
            </Popover>
          </PopoverTrigger>
        ))}
      </div>
      <div {...centered}>
        {logicalPlacements.map((placement) => (
          <PopoverTrigger key={placement}>
            <Button variant="outline">{t[placement]}</Button>
            <Popover data-parity-portal placement={placement} dir={dir}>
              <PopoverHeader>
                <PopoverTitle>{t.title}</PopoverTitle>
                <PopoverDescription>{t.description}</PopoverDescription>
              </PopoverHeader>
            </Popover>
          </PopoverTrigger>
        ))}
      </div>
    </div>
  )
}
