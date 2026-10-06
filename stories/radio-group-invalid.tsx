import {radioFit,radioMax,radioFieldset,radioNormal} from '@customizations';
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@field"
import { RadioGroup, RadioGroupItem } from "@radio-group"

export function RadioGroupInvalid() {
  return (
    <FieldSet {...radioFieldset}>
      <FieldLegend variant="label">Notification Preferences</FieldLegend>
      <FieldDescription>
        Choose how you want to receive notifications.
      </FieldDescription>
      <RadioGroup
        aria-label="Notification Preferences"
        defaultValue="email"
        isInvalid
      >
        <Field orientation="horizontal" data-invalid>
          <RadioGroupItem value="email" id="invalid-email" />
          <FieldLabel htmlFor="invalid-email" {...radioNormal}>
            Email only
          </FieldLabel>
        </Field>
        <Field orientation="horizontal" data-invalid>
          <RadioGroupItem value="sms" id="invalid-sms" />
          <FieldLabel htmlFor="invalid-sms" {...radioNormal}>
            SMS only
          </FieldLabel>
        </Field>
        <Field orientation="horizontal" data-invalid>
          <RadioGroupItem value="both" id="invalid-both" />
          <FieldLabel htmlFor="invalid-both" {...radioNormal}>
            Both Email & SMS
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  )
}
