"use client"

import * as React from "react"
import { CalendarDate, isSameDay } from "@internationalized/date"

import { Calendar } from "@calendar"
import { Card, CardContent } from "@card"

export function CalendarBookedDates() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    new CalendarDate(new Date().getFullYear(), 2, 3)
  )
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new CalendarDate(new Date().getFullYear(), 2, 12 + i)
  )

  return (
    <Card style={{marginInline:"auto",width:"fit-content",padding:0}}>
      <CardContent style={{padding:0}}>
        <Calendar
          value={date}
          onChange={setDate}
          isDateUnavailable={(date) =>
            bookedDates.some((d) => isSameDay(date, d))
          }
        />
      </CardContent>
    </Card>
  )
}
