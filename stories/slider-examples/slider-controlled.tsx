import {controlledRoot,controlledHeader,controlledValue} from "@slider-customizations";
"use client"

import * as React from "react"

import { Label } from "@label"
import { Slider } from "@slider"

export function SliderControlled() {
  const [value, setValue] = React.useState([0.3, 0.7])

  return (
    <div {...controlledRoot}>
      <div {...controlledHeader}>
        <Label htmlFor="slider-demo-temperature">Temperature</Label>
        <span {...controlledValue}>
          {value.join(", ")}
        </span>
      </div>
      <Slider
        aria-label="Temperature"
        id="slider-demo-temperature"
        value={value}
        onChange={(value) => setValue(value as number[])}
        minValue={0}
        maxValue={1}
        step={0.1}
      />
    </div>
  )
}
