"use client";

import * as React from "react";
import { getLocalTimeZone, type CalendarDate } from "@internationalized/date";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@button";
import { Calendar } from "@calendar";
import { Field, FieldLabel } from "@field";
import { Popover, PopoverTrigger } from "@popover";

export default function DataPickerWithDropdowns() {
  const [date, setDate] = React.useState<CalendarDate>();
  const [open, setOpen] = React.useState(false);

  return (
    <Field style={{ marginInline: "auto", width: "min(100%, 18rem)" }}>
      <FieldLabel htmlFor="date-picker-with-dropdowns-desktop">Date</FieldLabel>
      <PopoverTrigger isOpen={open} onOpenChange={setOpen}>
        <Button
          variant="outline"
          id="date-picker-with-dropdowns-desktop"
          style={{
            justifyContent: "flex-start",
            paddingInline: "0.625rem",
            fontWeight: 400,
          }}
        >
          <ChevronDownIcon style={{ marginInlineStart: "auto" }} />
          {date ? (
            date
              .toDate(getLocalTimeZone())
              .toLocaleDateString(undefined, { dateStyle: "long" })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
        <Popover style={{ width: "auto", padding: 0 }} placement="bottom start">
          <Calendar value={date} onChange={setDate} captionLayout="dropdown" />
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              borderTop: "1px solid var(--border)",
              padding: "0.5rem",
            }}
          >
            <Button
              variant="outline"
              size="sm"
              style={{ width: "100%" }}
              onPress={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </Popover>
      </PopoverTrigger>
    </Field>
  );
}
