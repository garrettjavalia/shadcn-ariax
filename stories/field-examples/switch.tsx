import { Field, FieldLabel } from "@field"
import { Switch } from "@switch"

export default function FieldSwitch() {
  return (
    <Field orientation="horizontal" style={{"width":"fit-content"}}>
      <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
      <Switch id="2fa" />
    </Field>
  )
}
