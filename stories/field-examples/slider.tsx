"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldTitle,
} from "@field"
import { Slider } from "@slider"

export default function FieldSlider() {
  const [value, setValue] = React.useState([200, 800])

  return (
    <Field style={{"width":"100%","maxWidth":"var(--container-xs, 20rem)"}}>
      <FieldTitle>Price Range</FieldTitle>
      <FieldDescription>
        Set your budget range ($
        <span style={{"fontWeight":500,"fontVariantNumeric":"tabular-nums"}}>{value[0]}</span> -{" "}
        <span style={{"fontWeight":500,"fontVariantNumeric":"tabular-nums"}}>{value[1]}</span>).
      </FieldDescription>
      <Slider
        value={value}
        onChange={(value) => setValue(value as [number, number])}
        maxValue={1000}
        minValue={0}
        step={10}
        style={{"marginTop":"calc(var(--spacing, .25rem) * 2)","width":"100%"}}
        aria-label="Price Range"
      />
    </Field>
  )
}
