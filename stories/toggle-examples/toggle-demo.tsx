import {toggleRow, bookmarkIcon} from "@toggle-customizations";
import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@toggle"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
      <BookmarkIcon {...bookmarkIcon} />
      Bookmark
    </Toggle>
  )
}
