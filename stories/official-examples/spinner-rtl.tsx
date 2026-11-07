import { demoProps, demoStyle } from '@official-demo-customizations';
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@item"
import { Spinner } from "@spinner"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "Processing payment...",
      amount: "$100.00",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      title: "جاري معالجة الدفع...",
      amount: "١٠٠.٠٠ دولار",
    },
  },
  he: {
    dir: "rtl",
    values: {
      title: "מעבד תשלום...",
      amount: "$100.00",
    },
  },
}

export function SpinnerRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div
      {...demoProps('payment')}
      dir={dir}
    >
      <Item variant="muted" dir={dir}>
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle {...demoStyle('clamp')}>{t.title}</ItemTitle>
        </ItemContent>
        <ItemContent {...demoStyle('paymentEnd')}>
          <span {...demoProps('amount')}>{t.amount}</span>
        </ItemContent>
      </Item>
    </div>
  )
}
