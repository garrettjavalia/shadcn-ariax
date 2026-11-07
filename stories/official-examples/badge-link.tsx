import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@badge"

export function BadgeAsLink() {
  return (
    <Badge render={(props) => <a {...props} href="#link" />}>
      Open Link <ArrowUpRightIcon data-icon="inline-end" />
    </Badge>
  )
}
