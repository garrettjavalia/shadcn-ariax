import {fit} from '@sonner-customizations';
"use client"

import { toast } from "sonner"

import { Button } from "@button"

export default function SonnerExample() {
  return (
    <>
      <SonnerBasic />
      <SonnerWithDescription />
    </>
  )
}

export function SonnerBasic() {
  return (
    <>
      <Button
        onPress={() => toast("Event has been created")}
        variant="outline"
        {...fit}
      >
        Show Toast
      </Button>
    </>
  )
}

export function SonnerWithDescription() {
  return (
    <>
      <Button
        onPress={() =>
          toast("Event has been created", {
            description: "Monday, January 3rd at 6:00pm",
          })
        }
        variant="outline"
        {...fit}
      >
        Show Toast
      </Button>
    </>
  )
}
