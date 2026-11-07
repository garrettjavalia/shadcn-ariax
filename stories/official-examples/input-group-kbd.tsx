import { demoProps, demoStyle } from '@official-demo-customizations';
import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@input-group"
import { Kbd } from "@kbd"

export function InputGroupKbd() {
  return (
    <InputGroup {...demoStyle('maximum')}>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon {...demoProps('muted')} />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  )
}
