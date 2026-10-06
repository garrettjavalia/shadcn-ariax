import {toggleRow, bookmarkIcon} from "@toggle-customizations";
import { Toggle } from "@toggle"

export function ToggleSizes() {
  return (
    <div {...toggleRow}>
      <Toggle variant="outline" aria-label="Toggle small" size="sm">
        Small
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle default" size="default">
        Default
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle large" size="lg">
        Large
      </Toggle>
    </div>
  )
}
