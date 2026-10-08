import { demoProps, demoStyle } from '@official-demo-customizations';
import { EyeOffIcon } from "lucide-react"

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

export function InputGroupInlineEnd() {
  return (
    <Field {...demoStyle('maximum')}>
      <FieldLabel htmlFor="inline-end-input">Input</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="inline-end-input"
          type="password"
          placeholder="Enter password"
        />
        <InputGroupAddon align="inline-end">
          <EyeOffIcon />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>Icon positioned at the end.</FieldDescription>
    </Field>
  )
}
