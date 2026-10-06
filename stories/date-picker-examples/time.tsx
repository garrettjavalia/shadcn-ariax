"use client"
import {datePopover,datePopoverHidden,timeButton,timeInput} from "@date-picker-customizations"

import * as React from "react"
import { getLocalTimeZone, type CalendarDate } from "@internationalized/date"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@button"
import { Calendar } from "@calendar"
import { Field, FieldGroup, FieldLabel } from "@field"
import { Input } from "@input"
import { Popover, PopoverTrigger } from "@popover"

export function DatePickerTime() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<CalendarDate | undefined>(undefined)

  return (
    <FieldGroup style={{marginInline:"auto",maxWidth:"20rem",flexDirection:"row"}}>
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
        <PopoverTrigger isOpen={open} onOpenChange={setOpen}>
          <Button
            variant="outline"
            id="date-picker-optional"
            {...timeButton}
          >
            {date
              ? date.toDate(getLocalTimeZone()).toLocaleDateString()
              : "Select date"}
            <ChevronDownIcon data-icon="inline-end" />
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
      <Field style={{width:"8rem"}}>
        <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          defaultValue="10:30:00"
          {...timeInput}
        />
      </Field>
    </FieldGroup>
  )
}
