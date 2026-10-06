import {centered,capitalized,column,medium} from '@hover-card-customizations';
"use client"

import { Button } from "@button"
import { HoverCard, HoverCardTrigger } from "@hover-card"

const HOVER_CARD_PLACEMENTS = ["left", "top", "bottom", "right"] as const

export function HoverCardSides() {
  return (
    <div {...centered}>
      {HOVER_CARD_PLACEMENTS.map((placement) => (
        <HoverCardTrigger key={placement} delay={100} closeDelay={100}>
          <Button variant="outline" {...capitalized}>
            {placement}
          </Button>
          <HoverCard data-parity-portal placement={placement}>
            <div {...column}>
              <h4 {...medium}>Hover Card</h4>
              <p>
                This hover card appears on the {placement} side of the trigger.
              </p>
            </div>
          </HoverCard>
        </HoverCardTrigger>
      ))}
    </div>
  )
}
