import {sliderBounded} from "@slider-customizations";
import { Slider } from "@slider"

export function SliderDisabled() {
  return (
    <Slider
      aria-label="Disabled slider"
      defaultValue={[50]}
      maxValue={100}
      step={1}
      isDisabled
      {...sliderBounded}
    />
  )
}
