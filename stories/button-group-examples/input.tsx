import { SearchIcon } from "lucide-react"

import { Button } from "@button"
import { ButtonGroup } from "@button-group"
import { Input } from "@input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
