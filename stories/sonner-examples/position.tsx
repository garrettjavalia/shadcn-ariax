import {fit,row,center} from '@sonner-customizations';
"use client"

import { toast } from "sonner"

import { Button } from "@button"

export function SonnerPosition() {
  return (
    <div {...center}>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "top-left" })
        }
      >
        Top Left
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "top-center" })
        }
      >
        Top Center
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "top-right" })
        }
      >
        Top Right
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "bottom-left" })
        }
      >
        Bottom Left
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "bottom-center" })
        }
      >
        Bottom Center
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", { position: "bottom-right" })
        }
      >
        Bottom Right
      </Button>
    </div>
  )
}
