import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@field"
import { Input } from "@input"

export default function FieldInput() {
  return (
    <FieldSet style={{"width":"100%","maxWidth":"var(--container-xs, 20rem)"}}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" type="text" placeholder="Max Leiter" />
          <FieldDescription>
            Choose a unique username for your account.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
          <Input id="password" type="password" placeholder="••••••••" />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
