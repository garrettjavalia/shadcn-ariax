import {narrow,wide,footerStart,hiddenLabel} from '@dialog-customizations';
import { Button } from "@button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dialog"
import { Field, FieldGroup } from "@field"
import { Input } from "@input"
import { Label } from "@label"

export function DialogDemo() {
  return (
    <DialogTrigger>
      <form>
        <Button variant="outline">Open Dialog</Button>
        <Dialog data-parity-portal {...narrow}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose variant="outline">Cancel</DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </Dialog>
      </form>
    </DialogTrigger>
  )
}
