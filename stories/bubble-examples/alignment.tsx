import {bubblePre,bubbleToggle,bubbleChevron,bubbleExpanded,bubbleSmall,bubbleReactionPadding,bubbleReactionBackground,bubbleDashed} from '@bubble-customizations';
import { Bubble, BubbleContent } from "@bubble"

export function BubbleAlignmentDemo() {
  return (
    <div style={{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'2rem',paddingBlock:'3rem'}}>
      <Bubble variant="muted">
        <BubbleContent>
          This bubble is aligned to the start. This is the default alignment.
        </BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>
          This bubble is aligned to the end. Use this for user messages.
        </BubbleContent>
      </Bubble>
    </div>
  )
}
