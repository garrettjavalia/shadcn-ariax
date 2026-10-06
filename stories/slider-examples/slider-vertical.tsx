import {verticalRoot,verticalSlider} from "@slider-customizations";
import { Slider } from "@slider"

export function SliderVertical() {
  return (
    <div {...verticalRoot}>
      <Slider
        aria-label="Vertical slider"
        defaultValue={[50]}
        maxValue={100}
        step={1}
        orientation="vertical"
        {...verticalSlider}
      />
      <Slider
        aria-label="Vertical slider"
        defaultValue={[25]}
        maxValue={100}
        step={1}
        orientation="vertical"
        {...verticalSlider}
      />
    </div>
  )
}
