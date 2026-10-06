"use client"

import * as React from "react"
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date"

import { Button } from "@button"
import { Calendar } from "@calendar"
import { Card, CardContent, CardFooter } from "@card"

export function CalendarWithPresets() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    new CalendarDate(new Date().getFullYear(), 2, 12)
  )
  const [currentMonth, setCurrentMonth] = React.useState<CalendarDate>(
    new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 1)
  )

  return (
    <Card style={{marginInline:"auto",width:"fit-content",maxWidth:300}} size="sm">
      <CardContent>
        <Calendar
          value={date}
          onChange={setDate}
          focusedValue={currentMonth}
          onFocusChange={setCurrentMonth}
          weeksInMonth={6}
          style={{padding:0,"--cell-size":"2.375rem"} as React.CSSProperties}
        />
      </CardContent>
      <CardFooter style={{display:"flex",flexWrap:"wrap",gap:".5rem",borderTop:"1px solid var(--border)"}}>
        {[
          { label: "Today", value: 0 },
          { label: "Tomorrow", value: 1 },
          { label: "In 3 days", value: 3 },
          { label: "In a week", value: 7 },
          { label: "In 2 weeks", value: 14 },
        ].map((preset) => (
          <Button
            key={preset.value}
            variant="outline"
            size="sm"
            style={{flex:1}}
            onPress={() => {
              const newDate = today(getLocalTimeZone()).add({
                days: preset.value,
              })
              setDate(newDate)
              setCurrentMonth(newDate)
            }}
          >
            {preset.label}
          </Button>
        ))}
      </CardFooter>
    </Card>
  )
}
