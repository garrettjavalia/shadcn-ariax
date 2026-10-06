import {bubblePre,bubbleToggle,bubbleChevron,bubbleExpanded,bubbleSmall,bubbleReactionPadding,bubbleReactionBackground,bubbleDashed} from '@bubble-customizations';
import { CheckIcon } from "lucide-react"

import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@bubble"
import { Button } from "@button"
import { Tooltip, TooltipTrigger } from "@tooltip"

export function BubbleTooltipDemo() {
  return (
    <div style={{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'1rem',paddingBlock:'3rem'}}>
      <Bubble variant="secondary">
        <BubbleContent>Did you remove the stale route?</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Yes, removed it from the registry.</BubbleContent>
        <BubbleReactions>
          <TooltipTrigger>
            <Button variant="ghost" size="icon-xs">
              <CheckIcon />
            </Button>
            <Tooltip>Read on Jan 5, 2026 at 4:32 PM</Tooltip>
          </TooltipTrigger>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}
