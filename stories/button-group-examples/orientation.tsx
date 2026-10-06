import{fitHeight}from'@button-group-customizations';
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@button"
import { ButtonGroup } from "@button-group"

export default function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      {...fitHeight}
    >
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
