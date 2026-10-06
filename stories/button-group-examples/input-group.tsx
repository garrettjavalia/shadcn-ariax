import{pill,voice}from'@button-group-customizations';
"use client"

import * as React from "react"
import { AudioLinesIcon, PlusIcon } from "lucide-react"

import { Button } from "@button"
import { ButtonGroup } from "@button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@input-group"
import { Tooltip, TooltipTrigger } from "@tooltip"

export default function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = React.useState(false)

  return (
    <ButtonGroup {...pill}>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput
            placeholder={
              voiceEnabled ? "Record and send audio..." : "Send a message..."
            }
            disabled={voiceEnabled}
          />
          <InputGroupAddon align="inline-end">
            <TooltipTrigger>
              <InputGroupButton
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                size="icon-xs"
                data-active={voiceEnabled}
                {...voice}
                aria-pressed={voiceEnabled}
              >
                <AudioLinesIcon />
              </InputGroupButton>
              <Tooltip data-parity-portal>Voice Mode</Tooltip>
            </TooltipTrigger>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
