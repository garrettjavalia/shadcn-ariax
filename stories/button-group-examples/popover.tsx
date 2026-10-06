import{popoverCustom,hiddenLabel,noResize}from'@button-group-customizations';
import { BotIcon, ChevronDownIcon } from "lucide-react"

import { Button } from "@button"
import { ButtonGroup } from "@button-group"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@field"
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@popover"
import { Textarea } from "@textarea"

export default function ButtonGroupPopover() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <BotIcon /> Copilot
      </Button>
      <PopoverTrigger>
        <Button variant="outline" size="icon" aria-label="Open Popover">
          <ChevronDownIcon />
        </Button>
        <Popover data-parity-portal placement="bottom end" {...popoverCustom}>
          <PopoverHeader>
            <PopoverTitle>Start a new task with Copilot</PopoverTitle>
            <PopoverDescription>
              Describe your task in natural language.
            </PopoverDescription>
          </PopoverHeader>
          <Field>
            <FieldLabel htmlFor="task" {...hiddenLabel}>
              Task Description
            </FieldLabel>
            <Textarea
              id="task"
              placeholder="I need to..."
              {...noResize}
            />
            <FieldDescription>
              Copilot will open a pull request for review.
            </FieldDescription>
          </Field>
        </Popover>
      </PopoverTrigger>
    </ButtonGroup>
  )
}
