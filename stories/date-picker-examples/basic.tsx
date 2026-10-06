"use client"
import {datePopover,startButton} from "@date-picker-customizations"

import * as React from "react"
import { getLocalTimeZone, type CalendarDate } from "@internationalized/date"

import { Button } from "@button"
import { Calendar } from "@calendar"
import { Field, FieldLabel } from "@field"
import { Popover, PopoverTrigger } from "@popover"

export function DatePickerSimple() {
  const [date, setDate] = React.useState<CalendarDate | null>(null)

  return (
    <Field style={{marginInline:"auto",width:"11rem"}}>
      <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
      <PopoverTrigger>
        <Button
          variant="outline"
          id="date-picker-simple"
          {...startButton}
        >
          {date ? (
            date
              .toDate(getLocalTimeZone())
              .toLocaleDateString(undefined, { dateStyle: "long" })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
        <Popover {...datePopover} placement="bottom start">
          <Calendar value={date} onChange={setDate} />
        </Popover>
      </PopoverTrigger>
    </Field>
  )
}
