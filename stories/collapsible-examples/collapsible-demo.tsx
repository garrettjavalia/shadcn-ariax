import {demoRoot, demoHeader, demoTitle, toggleSize, hidden, statusRow, muted, medium, panelStack, detailBox} from "@collapsible-customizations";
"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@collapsible"

export default function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      isExpanded={isOpen}
      onExpandedChange={setIsOpen}
      {...demoRoot}
    >
      <div {...demoHeader}>
        <h4 {...demoTitle}>Order #4189</h4>
        <Button slot="trigger" variant="ghost" size="icon" {...toggleSize}>
          <ChevronsUpDown />
          <span {...hidden}>Toggle details</span>
        </Button>
      </div>
      <div {...statusRow}>
        <span {...muted}>Status</span>
        <span {...medium}>Shipped</span>
      </div>
      <CollapsibleContent>
        <div {...panelStack}>
          <div {...detailBox}>
            <p {...medium}>Shipping address</p>
            <p {...muted}>
              100 Market St, San Francisco
            </p>
          </div>
          <div {...detailBox}>
            <p {...medium}>Items</p>
            <p {...muted}>2x Studio Headphones</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
