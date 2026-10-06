import {registryRow,capitalized,novaColumn,medium,fit} from '@hover-card-customizations';
"use client"

import { Button } from "@button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dialog"
import {
  HoverCard,
  HoverCardTrigger,
} from "@hover-card"


const HOVER_CARD_PLACEMENTS = [
  "start",
  "left",
  "top",
  "bottom",
  "right",
  "end",
] as const

export function HoverCardSides() {
  return (
    <>
      <div {...registryRow}>
        {HOVER_CARD_PLACEMENTS.map((placement) => (
          <HoverCardTrigger key={placement} delay={100} closeDelay={100}>
            <Button variant="outline" {...capitalized}>
              {placement}
            </Button>
            <HoverCard data-parity-portal placement={placement}>
              <div {...novaColumn}>
                <h4 {...medium}>Hover Card</h4>
                <p>
                  This hover card appears on the {placement} side of the
                  trigger.
                </p>
              </div>
            </HoverCard>
          </HoverCardTrigger>
        ))}
      </div>
    </>
  )
}

export function HoverCardInDialog() {
  return (
    <>
      <DialogTrigger>
        <Button variant="outline">Open Dialog</Button>
        <Dialog data-parity-portal>
          <DialogHeader>
            <DialogTitle>Hover Card Example</DialogTitle>
            <DialogDescription>
              Hover over the button below to see the hover card.
            </DialogDescription>
          </DialogHeader>
          <HoverCardTrigger delay={100} closeDelay={100}>
            <Button variant="outline" {...fit}>
              Hover me
            </Button>
            <HoverCard data-parity-portal>
              <div {...novaColumn}>
                <h4 {...medium}>Hover Card</h4>
                <p>
                  This hover card appears inside a dialog. Hover over the button
                  to see it.
                </p>
              </div>
            </HoverCard>
          </HoverCardTrigger>
        </Dialog>
      </DialogTrigger>
    </>
  )
}
