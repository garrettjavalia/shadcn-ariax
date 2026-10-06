import {toggleRow, bookmarkIcon} from "@toggle-customizations";
import { Toggle } from "@toggle"

export function ToggleDisabled() {
  return (
    <div {...toggleRow}>
      <Toggle aria-label="Toggle disabled" isDisabled>
        Disabled
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle disabled outline" isDisabled>
        Disabled
      </Toggle>
    </div>
  )
}
