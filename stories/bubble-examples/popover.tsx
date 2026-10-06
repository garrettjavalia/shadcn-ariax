import {bubblePre,bubbleToggle,bubbleChevron,bubbleExpanded,bubbleSmall,bubbleReactionPadding,bubbleReactionBackground,bubbleDashed} from '@bubble-customizations';
import { InfoIcon } from "lucide-react"

import {
  Bubble,
  BubbleContent,
  BubbleReactions,
} from "@bubble"
import { Button } from "@button"
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@popover"

export function BubblePopoverDemo() {
  return (
    <div style={{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'1rem',paddingBlock:'3rem'}}>
      <Bubble align="end">
        <BubbleContent>Run the build script.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>Failed to run the command.</BubbleContent>
        <BubbleReactions>
          <PopoverTrigger>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Show error details"
              {...bubbleExpanded}
            >
              <InfoIcon />
            </Button>
            <Popover data-parity-portal>
              <PopoverHeader>
                <PopoverTitle {...bubbleSmall}>
                  Command failed with exit code 1
                </PopoverTitle>
                <PopoverDescription {...bubbleSmall}>
                  ENOENT: no such file or directory, open pnpm-lock.yaml
                </PopoverDescription>
              </PopoverHeader>
            </Popover>
          </PopoverTrigger>
        </BubbleReactions>
      </Bubble>
    </div>
  )
}
