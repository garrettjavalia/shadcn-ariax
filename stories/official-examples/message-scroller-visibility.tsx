import { scrollerStyle, scrollerProps } from '@official-scroller-customizations';
"use client"

import { Button } from "react-aria-components"

import { createChat, getMessageText } from "../../generated/upstream/shadcn/apps/v4/lib/ai"
import { Bubble, BubbleContent } from "@bubble"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@card"
import { HoverCard, HoverCardTrigger } from "@hover-card"
import { Message, MessageContent } from "@message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerVisibility,
} from "@message-scroller"

const chat = createChat()
  .user("Review the incident handoff and tell me what to read first.", {
    id: "vis-brief",
  })
  .assistant(
    "Start with the summary and the impact section. The regression affected the upload queue, but the recovery path completed for every queued job."
  )
  .user("What was the customer impact?", {
    id: "vis-impact",
  })
  .assistant(
    "Impact was limited to delayed processing.\n\nNo records were dropped, and the reconciliation worker confirmed each retry batch. Support saw confusion from two customers, but there were no checkout or billing errors."
  )
  .user("What actions are open?", {
    id: "vis-actions",
  })
  .assistant(
    "Keep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike."
  )
  .user("Give me the follow-up checklist.", {
    id: "vis-checklist",
  })
  .assistant(
    "After that, compare the queue recovery graph with the deploy timeline so the handoff shows exactly when processing returned to baseline. That makes it easier for support and engineering to answer the same customer questions without re-reading the whole incident thread.\n\nI would also add a short owner note beside each follow-up item. The checklist is small, but ownership keeps the retry-window decision, alert tuning, and support macro from drifting into separate follow-up conversations.\n\nKeep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike."
  )

const messages = chat.get()
const userMessages = messages.filter((message) => message.role === "user")

export function MessageScrollerVisibility() {
  return (
    <MessageScrollerProvider scrollMargin={12}>
      <div {...scrollerProps('layout')}>
        <div {...scrollerProps('frame')}>
          <Card {...scrollerStyle('fullCard')}>
            <CardHeader {...scrollerStyle('header')}>
              <CardTitle>Transcript Outline</CardTitle>
              <CardDescription>
                Track the current anchored turn.
              </CardDescription>
            </CardHeader>
            <CardContent {...scrollerStyle('content')}>
              <MessageScroller>
                <MessageScrollerViewport>
                  <MessageScrollerContent {...scrollerStyle('messages')}>
                    {messages.map((message) => {
                      const isUserMessage = message.role === "user"
                      const text = getMessageText(message)

                      return (
                        <MessageScrollerItem
                          key={message.id}
                          messageId={message.id}
                          scrollAnchor={isUserMessage}
                        >
                          <Message align={isUserMessage ? "end" : "start"}>
                            <MessageContent>
                              <Bubble
                                variant={isUserMessage ? "muted" : "ghost"}
                              >
                                <BubbleContent {...scrollerStyle('lines')}>
                                  {text
                                    .split(/\n\s*\n/)
                                    .map((paragraph) => paragraph.trim())
                                    .filter(Boolean)
                                    .map((paragraph, index) => (
                                      <p
                                        key={index}
                                        {...scrollerProps('text')}
                                      >
                                        {paragraph}
                                      </p>
                                    ))}
                                </BubbleContent>
                              </Bubble>
                            </MessageContent>
                          </Message>
                        </MessageScrollerItem>
                      )
                    })}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton />
              </MessageScroller>
            </CardContent>
          </Card>
          <div {...scrollerProps('navigation')}>
            <TranscriptOutline />
          </div>
        </div>
        <div {...scrollerProps('plainCaption')}>
          Open the outline to jump between anchored turns as you read.
        </div>
      </div>
    </MessageScrollerProvider>
  )
}

function TranscriptOutline() {
  const { scrollToMessage } = useMessageScroller()
  const { currentAnchorId } = useMessageScrollerVisibility()

  return (
    <HoverCardTrigger>
      <Button
        aria-label="Open transcript outline"
        {...scrollerProps('navButton')}
      >
        {userMessages.map((message) => (
          <span
            key={message.id}
            data-current={message.id === currentAnchorId}
            {...scrollerProps('marker')}
          />
        ))}
      </Button>
      <HoverCard
        placement="left"
        offset={-28}
        {...scrollerStyle('popover')}
      >
        {userMessages.map((message) => (
          <button
            key={message.id}
            type="button"
            aria-current={
              currentAnchorId === message.id ? "location" : undefined
            }
            {...scrollerProps('jump')}
            onClick={() =>
              scrollToMessage(message.id, {
                align: "start",
                behavior: "smooth",
              })
            }
          >
            <span {...scrollerProps('clamp')}>
              {getTrimmedMessageText(message)}
            </span>
          </button>
        ))}
      </HoverCard>
    </HoverCardTrigger>
  )
}

function getTrimmedMessageText(message: (typeof userMessages)[number]) {
  const text = getMessageText(message)

  return text.length > 42 ? `${text.slice(0, 39)}...` : text
}
