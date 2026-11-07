import { Button } from "@button"
import { Field } from "@field"
import { Input } from "@input"

export function InputInline() {
  return (
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>
  )
}
