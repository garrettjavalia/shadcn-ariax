import {centeredNarrow} from '@checkbox-customizations'
import { Checkbox } from "@checkbox"
import { Field, FieldGroup, FieldLabel } from "@field"

export function CheckboxBasic() {
  return (
    <FieldGroup {...centeredNarrow}>
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
        <FieldLabel htmlFor="terms-checkbox-basic">
          Accept terms and conditions
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
