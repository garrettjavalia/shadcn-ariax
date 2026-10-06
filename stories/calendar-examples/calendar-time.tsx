import {calendarTimeInput} from "@calendar-customizations"
"use client"

import * as React from "react"
import { CalendarDate } from "@internationalized/date"
import { Clock2Icon } from "lucide-react"

import { Calendar } from "@calendar"
import { Card, CardContent, CardFooter } from "@card"
import { Field, FieldGroup, FieldLabel } from "@field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@input-group"

export function CalendarWithTime() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 12)
  )

  return (
    <Card size="sm" style={{marginInline:"auto",width:"fit-content"}}>
      <CardContent>
        <Calendar value={date} onChange={setDate} style={{padding:0}} />
      </CardContent>
      <CardFooter style={{borderTop:"1px solid var(--border)",background:"var(--card)"}}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                defaultValue="10:30:00"
                {...calendarTimeInput}
              />
              <InputGroupAddon>
                <Clock2Icon style={{color:"var(--muted-foreground)"}} />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="time-to">End Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-to"
                type="time"
                step="1"
                defaultValue="12:30:00"
                {...calendarTimeInput}
              />
              <InputGroupAddon>
                <Clock2Icon style={{color:"var(--muted-foreground)"}} />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}
