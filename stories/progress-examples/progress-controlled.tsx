import { progressCustom, progressNative } from "@progress-customizations";
"use client";
import * as React from "react";
import { Progress } from "@progress";
import { Slider } from "@slider";
export function ProgressControlled() {
  const [value, setValue] = React.useState(50);
  return <div {...progressNative("boundedColumn")}>
      <Progress aria-label="Loading" value={value} {...progressCustom("full")} />
      <Slider aria-label="Progress" value={value} onChange={value => setValue(value as number)} minValue={0} maxValue={100} step={1} />
    </div>;
}
