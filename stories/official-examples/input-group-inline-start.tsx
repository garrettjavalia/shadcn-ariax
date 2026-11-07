import { demoProps, demoStyle } from '@official-demo-customizations';
import { SearchIcon } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@input-group"

export function InputGroupInlineStart() {
  return (
    <Field {...demoStyle('maximum')}>
      <FieldLabel htmlFor="inline-start-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput id="inline-start-input" placeholder="Search..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon {...demoProps('muted')} />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the start.</FieldDescription>
    </Field>
  )
}
