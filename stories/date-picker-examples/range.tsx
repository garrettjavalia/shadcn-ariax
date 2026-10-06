"use client"
import {datePopover,startButton} from "@date-picker-customizations"

import * as React from "react"
import { CalendarDate, getLocalTimeZone } from "@internationalized/date"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-aria-components"

import { Button } from "@button"
import { RangeCalendar } from "@calendar"
import { Field, FieldLabel } from "@field"
import { Popover, PopoverTrigger } from "@popover"

export function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    start: new CalendarDate(new Date().getFullYear(), 1, 20),
    end: new CalendarDate(new Date().getFullYear(), 1, 20).add({ days: 20 }),
  })

  return (
    <Field style={{marginInline:"auto",width:"15rem"}}>
      <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
      <PopoverTrigger>
        <Button
          variant="outline"
          id="date-picker-range"
          {...startButton}
        >
          <CalendarIcon data-icon="inline-start" />
          {date?.start && date.end ? (
            new Intl.DateTimeFormat(undefined, {
              dateStyle: "long",
            }).formatRange(
              date.start.toDate(getLocalTimeZone()),
              date.end.toDate(getLocalTimeZone())
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
        <Popover {...datePopover} placement="bottom start">
          <RangeCalendar value={date} onChange={setDate} numberOfMonths={2} />
        </Popover>
      </PopoverTrigger>
    </Field>
  )
}
