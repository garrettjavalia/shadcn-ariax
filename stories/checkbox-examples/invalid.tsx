import {centeredNarrow} from '@checkbox-customizations'
import { Checkbox } from "@checkbox"
import { Field, FieldGroup, FieldLabel } from "@field"

export function CheckboxInvalid() {
  return (
    <FieldGroup {...centeredNarrow}>
      <Field orientation="horizontal" data-invalid>
        <Checkbox
          id="terms-checkbox-invalid"
          name="terms-checkbox-invalid"
          isInvalid
        />
        <FieldLabel htmlFor="terms-checkbox-invalid">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
