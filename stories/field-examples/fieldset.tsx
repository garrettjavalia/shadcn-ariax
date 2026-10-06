import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@field"
import { Input } from "@input"

export function FieldFieldset() {
  return (
    <FieldSet style={{"width":"100%","maxWidth":"var(--container-sm, 24rem)"}}>
      <FieldLegend>Address Information</FieldLegend>
      <FieldDescription>
        We need your address to deliver your order.
      </FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="street">Street Address</FieldLabel>
          <Input id="street" type="text" placeholder="123 Main St" />
        </Field>
        <div style={{"display":"grid","gridTemplateColumns":"repeat(2, minmax(0, 1fr))","gap":"calc(var(--spacing, .25rem) * 4)"}}>
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input id="city" type="text" placeholder="New York" />
          </Field>
          <Field>
            <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
            <Input id="zip" type="text" placeholder="90502" />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  )
}
