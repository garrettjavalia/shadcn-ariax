import {radioFit,radioMax,radioFieldset,radioNormal} from '@customizations';
"use client"

import * as React from "react"


import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@radio-group"

const translations = {
  en: {
    dir: "ltr",
    values: {
      default: "Default",
      defaultDescription: "Standard spacing for most use cases.",
      comfortable: "Comfortable",
      comfortableDescription: "More space between elements.",
      compact: "Compact",
      compactDescription: "Minimal spacing for dense layouts.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      default: "افتراضي",
      defaultDescription: "تباعد قياسي لمعظم حالات الاستخدام.",
      comfortable: "مريح",
      comfortableDescription: "مساحة أكبر بين العناصر.",
      compact: "مضغوط",
      compactDescription: "تباعد أدنى للتخطيطات الكثيفة.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      default: "ברירת מחדל",
      defaultDescription: "ריווח סטנדרטי לרוב מקרי השימוש.",
      comfortable: "נוח",
      comfortableDescription: "יותר מקום בין האלמנטים.",
      compact: "קומפקטי",
      compactDescription: "ריווח מינימלי לפריסות צפופות.",
    },
  },
}

export function RadioGroupRtl() {
  const {dir,values:t}=translations.ar

  return (
    <RadioGroup
      aria-label="Density"
      defaultValue="comfortable"
      {...radioFit}
      dir={dir}
    >
      <Field orientation="horizontal">
        <RadioGroupItem value="default" id="r1-rtl" dir={dir} />
        <FieldContent>
          <FieldLabel htmlFor="r1-rtl" dir={dir}>
            {t.default}
          </FieldLabel>
          <FieldDescription dir={dir}>{t.defaultDescription}</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="comfortable" id="r2-rtl" dir={dir} />
        <FieldContent>
          <FieldLabel htmlFor="r2-rtl" dir={dir}>
            {t.comfortable}
          </FieldLabel>
          <FieldDescription dir={dir}>
            {t.comfortableDescription}
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="compact" id="r3-rtl" dir={dir} />
        <FieldContent>
          <FieldLabel htmlFor="r3-rtl" dir={dir}>
            {t.compact}
          </FieldLabel>
          <FieldDescription dir={dir}>{t.compactDescription}</FieldDescription>
        </FieldContent>
      </Field>
    </RadioGroup>
  )
}
