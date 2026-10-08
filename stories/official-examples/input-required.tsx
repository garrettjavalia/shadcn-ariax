import { demoProps, demoStyle } from '@official-demo-customizations';
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@field"
import { Input } from "@input"

export function InputRequired() {
  return (
    <Field>
      <FieldLabel htmlFor="input-required">
        Required Field <span {...demoProps('required')}>*</span>
      </FieldLabel>
      <Input
        id="input-required"
        placeholder="This field is required"
        required
      />
      <FieldDescription>This field must be filled out.</FieldDescription>
    </Field>
  )
}
