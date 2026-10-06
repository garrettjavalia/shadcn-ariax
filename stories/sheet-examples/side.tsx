import {capitalized,limitedHeight,sides,paragraph,scroll} from '@sheet-customizations';
import { Button } from "@button"
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sheet"

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

export default function SheetSide() {
  return (
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
                <p key={index} {...paragraph}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
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
  )
}
