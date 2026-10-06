import {sliderBounded} from "@slider-customizations";
import { Slider } from "@slider"

export function SliderMultiple() {
  return (
    <Slider
      aria-label="Multiple slider"
      defaultValue={[10, 20, 70]}
      maxValue={100}
      step={10}
      {...sliderBounded}
    />
  )
}
