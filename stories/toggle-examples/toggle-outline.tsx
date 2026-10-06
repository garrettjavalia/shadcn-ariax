import {toggleRow, bookmarkIcon} from "@toggle-customizations";
import { BoldIcon, ItalicIcon } from "lucide-react"

import { Toggle } from "@toggle"

export function ToggleOutline() {
  return (
    <div {...toggleRow}>
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon />
        Italic
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle bold">
        <BoldIcon />
        Bold
      </Toggle>
    </div>
  )
}
