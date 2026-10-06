import { AudioLinesIcon, PlusIcon } from "lucide-react"

import { Button } from "@button"
import { ButtonGroup } from "@button-group"
import { Input } from "@input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@input-group"
import { Tooltip, TooltipTrigger } from "@tooltip"

export function ButtonGroupNested() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." />
          <TooltipTrigger>
            <InputGroupAddon align="inline-end">
              <AudioLinesIcon />
            </InputGroupAddon>
            <Tooltip data-parity-portal>Voice Mode</Tooltip>
          </TooltipTrigger>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
