import {calendarCellSize} from "@calendar-customizations"
"use client"

import * as React from "react"
import { CalendarDate, isWeekend } from "@internationalized/date"
import { useLocale, type DateRange } from "react-aria-components"

import { RangeCalendar } from "@calendar"
import { Card, CardContent } from "@card"

export function CalendarCustomDays() {
  const { locale } = useLocale()
  const [range, setRange] = React.useState<DateRange | undefined>({
    start: new CalendarDate(new Date().getFullYear(), 12, 8),
    end: new CalendarDate(new Date().getFullYear(), 12, 8).add({ days: 10 }),
  })

  return (
    <Card style={{marginInline:"auto",width:"fit-content",padding:0}}>
      <CardContent style={{padding:0}}>
        <RangeCalendar
          value={range}
          onChange={setRange}
          numberOfMonths={1}
          captionLayout="dropdown"
          {...calendarCellSize}
          headerFormat={{ month: "long" }}
          renderCell={({ isOutsideMonth, date, defaultChildren }) => (
            <>
              {defaultChildren}
              {!isOutsideMonth && (
                <span>{isWeekend(date, locale) ? "$120" : "$100"}</span>
              )}
            </>
          )}
        />
      </CardContent>
    </Card>
  )
}
