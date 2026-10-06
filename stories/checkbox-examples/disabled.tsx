import {centeredNarrow} from '@checkbox-customizations'
import { Checkbox } from "@checkbox"
import { Field, FieldGroup, FieldLabel } from "@field"

export function CheckboxDisabled() {
  return (
    <FieldGroup {...centeredNarrow}>
      <Field orientation="horizontal" data-disabled>
        <Checkbox
          id="toggle-checkbox-disabled"
          name="toggle-checkbox-disabled"
          isDisabled
        />
        <FieldLabel htmlFor="toggle-checkbox-disabled">
          Enable notifications
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
