import { demoProps, demoStyle } from '@official-demo-customizations';
import { Field, FieldGroup, FieldLabel } from "@field"
import { Input } from "@input"

export function InputGrid() {
  return (
    <FieldGroup {...demoStyle('inputGrid')}>
      <Field>
        <FieldLabel htmlFor="first-name">First Name</FieldLabel>
        <Input id="first-name" placeholder="Jordan" />
      </Field>
      <Field>
        <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
        <Input id="last-name" placeholder="Lee" />
      </Field>
    </FieldGroup>
  )
}
