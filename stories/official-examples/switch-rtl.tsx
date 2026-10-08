import { demoProps, demoStyle } from '@official-demo-customizations';
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@field"
import { Switch } from "@switch"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      label: "Share across devices",
      description:
        "Focus is shared across devices, and turns off when you leave the app.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      label: "المشاركة عبر الأجهزة",
      description:
        "يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      label: "שיתוף בין מכשירים",
      description: "המיקוד משותף בין מכשירים, וכבה כשאתה עוזב את האפליקציה.",
    },
  },
}

export function SwitchRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <Field orientation="horizontal" {...demoStyle('maximum')} dir={dir}>
      <FieldContent>
        <FieldLabel htmlFor="switch-focus-mode-rtl" dir={dir}>
          {t.label}
        </FieldLabel>
        <FieldDescription dir={dir}>{t.description}</FieldDescription>
      </FieldContent>
      <Switch id="switch-focus-mode-rtl" dir={dir} />
    </Field>
  )
}
