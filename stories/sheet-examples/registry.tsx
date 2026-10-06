import {paddedDiv,scroll,registryParagraph,sides,capitalized,limitedHeight} from '@sheet-customizations';
import { Button } from "@button"
import { Field, FieldGroup, FieldLabel } from "@field"
import { Input } from "@input"
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sheet"

export function SheetWithForm() {
  return (
    <>
      <SheetTrigger>
        <Button variant="outline">Open</Button>
        <Sheet data-parity-portal>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div {...paddedDiv}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="sheet-demo-name">Name</FieldLabel>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              </Field>
              <Field>
                <FieldLabel htmlFor="sheet-demo-username">Username</FieldLabel>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </Field>
            </FieldGroup>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose variant="outline">Close</SheetClose>
          </SheetFooter>
        </Sheet>
      </SheetTrigger>
    </>
  )
}

export function SheetNoCloseButton() {
  return (
    <>
      <SheetTrigger>
        <Button variant="outline">No Close Button</Button>
        <Sheet data-parity-portal showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>No Close Button</SheetTitle>
            <SheetDescription>
              This sheet doesn&apos;t have a close button in the top-right
              corner. You can only close it using the button below.
            </SheetDescription>
          </SheetHeader>
        </Sheet>
      </SheetTrigger>
    </>
  )
}

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

export function SheetWithSides() {
  return (
    <>
      <div {...sides}>
        {SHEET_SIDES.map((side) => (
          <SheetTrigger key={side}>
            <Button variant="outline" {...capitalized}>
              {side}
            </Button>
            <Sheet data-parity-portal
              side={side}
              {...limitedHeight}
            >
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              <div {...scroll}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <p
                    key={index}
                    {...registryParagraph}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                ))}
              </div>
              <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose variant="outline">Cancel</SheetClose>
              </SheetFooter>
            </Sheet>
          </SheetTrigger>
        ))}
      </div>
    </>
  )
}
