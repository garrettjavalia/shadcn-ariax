"use client"
import {datePopover,demoButton} from "@date-picker-customizations"

import * as React from "react"
import { getLocalTimeZone, type CalendarDate } from "@internationalized/date"
import { ChevronDownIcon } from "lucide-react"
import { I18nProvider } from "react-aria-components"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { Button } from "@button"
import { Calendar } from "@calendar"
import { Popover, PopoverTrigger } from "@popover"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      placeholder: "Pick a date",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      placeholder: "اختر تاريخًا",
    },
  },
  he: {
    dir: "rtl",
    values: {
      placeholder: "בחר תאריך",
    },
  },
}

export function DatePickerRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")
  const [date, setDate] = React.useState<CalendarDate | null>(null)

  return (
    <PopoverTrigger>
      <Button
        variant={"outline"}
        data-empty={!date}
        {...demoButton}
        dir={dir}
      >
        {date ? (
          date
            .toDate(getLocalTimeZone())
            .toLocaleDateString(language, { dateStyle: "long" })
        ) : (
          <span>{t.placeholder}</span>
        )}
        <ChevronDownIcon data-icon="inline-end" />
      </Button>
      <Popover {...datePopover} placement="bottom start" dir={dir}>
        <I18nProvider locale={language}>
          <Calendar value={date} onChange={setDate} />
        </I18nProvider>
      </Popover>
    </PopoverTrigger>
  )
}
