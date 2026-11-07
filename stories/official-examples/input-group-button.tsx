import { demoProps, demoStyle } from '@official-demo-customizations';
"use client"

import * as React from "react"
import {
  IconCheck,
  IconCopy,
  IconInfoCircle,
  IconStar,
} from "@tabler/icons-react"

import { useCopyToClipboard } from "../../generated/upstream/shadcn/apps/v4/hooks/use-copy-to-clipboard"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@input-group"
import { Popover, PopoverTrigger } from "@popover"

export default function InputGroupButtonExample() {
  const { copyToClipboard, isCopied } = useCopyToClipboard()
  const [isFavorite, setIsFavorite] = React.useState(false)

  return (
    <div {...demoProps('inputGroups')}>
      <InputGroup>
        <InputGroupInput placeholder="https://x.com/shadcn" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy"
            size="icon-xs"
            onClick={() => {
              copyToClipboard("https://x.com/shadcn")
            }}
          >
            {isCopied ? <IconCheck /> : <IconCopy />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...demoStyle('roundGroup')}>
        <PopoverTrigger>
          <InputGroupAddon>
            <InputGroupButton variant="secondary" size="icon-xs">
              <IconInfoCircle />
            </InputGroupButton>
          </InputGroupAddon>
          <Popover
            placement="bottom start"
            {...demoStyle('popover')}
          >
            <p {...demoProps('medium')}>Your connection is not secure.</p>
            <p>You should not enter any sensitive information on this site.</p>
          </Popover>
        </PopoverTrigger>
        <InputGroupAddon {...demoStyle('prefix')}>
          https://
        </InputGroupAddon>
        <InputGroupInput id="input-secure-19" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={() => setIsFavorite(!isFavorite)}
            size="icon-xs"
          >
            <IconStar
              data-favorite={isFavorite}
              {...demoProps('favorite')}
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Type to search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
