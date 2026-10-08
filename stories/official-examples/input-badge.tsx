import { demoProps, demoStyle } from '@official-demo-customizations';
import { Badge } from "@badge"
import { Field, FieldLabel } from "@field"
import { Input } from "@input"

export function InputBadge() {
  return (
    <Field>
      <FieldLabel htmlFor="input-badge">
        Webhook URL{" "}
        <Badge variant="secondary" {...demoStyle('end')}>
          Beta
        </Badge>
      </FieldLabel>
      <Input
        id="input-badge"
        type="url"
        placeholder="https://api.example.com/webhook"
      />
    </Field>
  )
}
