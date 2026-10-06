import {sliderBounded} from "@slider-customizations";
import { Slider } from "@slider"

export function SliderRange() {
  return (
    <Slider
      aria-label="Range"
      defaultValue={[25, 50]}
      maxValue={100}
      step={5}
      {...sliderBounded}
    />
  )
}
