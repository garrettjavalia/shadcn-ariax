import {radioFit,radioMax,radioFieldset,radioNormal} from '@customizations';
import { Field, FieldLabel } from "@field"
import { RadioGroup, RadioGroupItem } from "@radio-group"

export function RadioGroupDisabled() {
  return (
    <RadioGroup aria-label="Radios" defaultValue="option2" {...radioFit}>
      <Field orientation="horizontal" data-disabled>
        <RadioGroupItem value="option1" id="disabled-1" isDisabled />
        <FieldLabel htmlFor="disabled-1" {...radioNormal}>
          Disabled
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option2" id="disabled-2" />
        <FieldLabel htmlFor="disabled-2" {...radioNormal}>
          Option 2
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option3" id="disabled-3" />
        <FieldLabel htmlFor="disabled-3" {...radioNormal}>
          Option 3
        </FieldLabel>
      </Field>
    </RadioGroup>
  )
}
