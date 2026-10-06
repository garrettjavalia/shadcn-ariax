import {sliderBounded} from "@slider-customizations";
import { Slider } from "@slider"

export function SliderDemo() {
  return (
    <Slider
      aria-label="Slider"
      defaultValue={[75]}
      maxValue={100}
      step={1}
      {...sliderBounded}
    />
  )
}
