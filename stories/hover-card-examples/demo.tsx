import {demoCard,bold,joined} from '@hover-card-customizations';
"use client"

import { Button } from "@button"
import { HoverCard, HoverCardTrigger } from "@hover-card"

export default function HoverCardDemo() {
  return (
    <HoverCardTrigger delay={10} closeDelay={100}>
      <Button variant="link">Hover Here</Button>
      <HoverCard data-parity-portal {...demoCard}>
        <div {...bold}>@nextjs</div>
        <div>The React Framework – created and maintained by @vercel.</div>
        <div {...joined}>
          Joined December 2021
        </div>
      </HoverCard>
    </HoverCardTrigger>
  )
}
