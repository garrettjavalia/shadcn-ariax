"use client"
import {datePopover,datePopoverHidden,startButton} from "@date-picker-customizations"

import * as React from "react"
import { getLocalTimeZone, type CalendarDate } from "@internationalized/date"

import { Button } from "@button"
import { Calendar } from "@calendar"
import { Field, FieldLabel } from "@field"
import { Popover, PopoverTrigger } from "@popover"

export function DatePickerSimple() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<CalendarDate | null>(null)

  return (
    <Field style={{marginInline:"auto",width:"11rem"}}>
      <FieldLabel htmlFor="date">Date of birth</FieldLabel>
      <PopoverTrigger isOpen={open} onOpenChange={setOpen}>
        <Button
          variant="outline"
          id="date"
          {...startButton}
        >
          {date
            ? date.toDate(getLocalTimeZone()).toLocaleDateString()
            : "Select date"}
        </Button>
        <Popover
          {...datePopoverHidden}
          placement="bottom start"
        >
          <Calendar
            value={date}
            captionLayout="dropdown"
            onChange={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </Popover>
      </PopoverTrigger>
    </Field>
  )
}
