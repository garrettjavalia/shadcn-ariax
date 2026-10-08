import { demoProps, demoStyle } from '@official-demo-customizations';
import { CopyIcon, FileCodeIcon } from "lucide-react"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@input-group"

export function InputGroupBlockStart() {
  return (
    <FieldGroup {...demoStyle('maximum')}>
      <Field>
        <FieldLabel htmlFor="block-start-input">Input</FieldLabel>
        <InputGroup {...demoStyle('autoHeight')}>
          <InputGroupInput
            id="block-start-input"
            placeholder="Enter your name"
          />
          <InputGroupAddon align="block-start">
            <InputGroupText>Full Name</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>Header positioned above the input.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="block-start-textarea">Textarea</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id="block-start-textarea"
            placeholder="console.log('Hello, world!');"
            {...demoStyle('code')}
          />
          <InputGroupAddon align="block-start">
            <FileCodeIcon {...demoProps('muted')} />
            <InputGroupText {...demoStyle('mono')}>script.js</InputGroupText>
            <InputGroupButton size="icon-xs" {...demoStyle('end')}>
              <CopyIcon />
              <span {...demoProps('screenReader')}>Copy</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          Header positioned above the textarea.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
