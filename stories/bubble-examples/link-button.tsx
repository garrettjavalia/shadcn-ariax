import {bubblePre,bubbleToggle,bubbleChevron,bubbleExpanded,bubbleSmall,bubbleReactionPadding,bubbleReactionBackground,bubbleDashed} from '@bubble-customizations';
"use client"

import { toast } from "sonner"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@bubble"

export function BubbleLinkButtonDemo() {
  return (
    <div style={{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'2rem',paddingBlock:'3rem'}}>
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={(props) => (
              <button
                onClick={() => toast("You clicked forgot password")}
                {...props}
              />
            )}
          >
            I forgot my password
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={(props) => (
              <button
                onClick={() => toast("You clicked help with subscription")}
                {...props}
              />
            )}
          >
            I need help with my subscription
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent
            render={(props) => (
              <button
                onClick={() =>
                  toast("You clicked something else. Talk to a human.")
                }
                {...props}
              />
            )}
          >
            Something else. Talk to a human.
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
    </div>
  )
}
