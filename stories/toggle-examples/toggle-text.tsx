import {toggleRow, bookmarkIcon} from "@toggle-customizations";
import { ItalicIcon } from "lucide-react"

import { Toggle } from "@toggle"

export function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}
