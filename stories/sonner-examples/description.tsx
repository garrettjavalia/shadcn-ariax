import {fit,row,center} from '@sonner-customizations';
"use client"

import { toast } from "sonner"

import { Button } from "@button"

export function SonnerDescription() {
  return (
    <Button
      onClick={() =>
        toast("Event has been created", {
          description: "Monday, January 3rd at 6:00pm",
        })
      }
      variant="outline"
      {...fit}
    >
      Show Toast
    </Button>
  )
}
