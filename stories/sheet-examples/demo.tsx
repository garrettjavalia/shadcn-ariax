import {form,field} from '@sheet-customizations';
import { Button } from "@button"
import { Input } from "@input"
import { Label } from "@label"
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sheet"

export default function SheetDemo() {
  return (
    <SheetTrigger>
      <Button variant="outline">Open</Button>
      <Sheet data-parity-portal>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div {...form}>
          <div {...field}>
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div {...field}>
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose variant="outline">Close</SheetClose>
        </SheetFooter>
      </Sheet>
    </SheetTrigger>
  )
}
