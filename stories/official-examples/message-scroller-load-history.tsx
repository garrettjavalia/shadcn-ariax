import { scrollerStyle, scrollerProps } from '@official-scroller-customizations';
"use client"

import * as React from "react"
import { RotateCwIcon } from "lucide-react"
import { toast } from "sonner"

import { createChat, getMessageText } from "../../generated/upstream/shadcn/apps/v4/lib/ai"
import { Bubble, BubbleContent } from "@bubble"
import { Button } from "@button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@card"
import { Marker, MarkerContent } from "@marker"
import { Message, MessageContent } from "@message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@message-scroller"
import { Tooltip, TooltipTrigger } from "@tooltip"

const chat = createChat()
  .user("Can you summarize the incident channel?")
  .assistant(
    "The first alert was a delayed export job. It started backing up around 09:42 UTC and triggered the warning once the retry queue crossed the threshold.\n\nNo customer-facing checkout paths were affected, but exports for larger workspaces were running about 12 minutes behind."
  )
  .user("Was checkout affected?")
  .assistant(
    "No checkout errors were reported. Payment authorization, order creation, and confirmation emails stayed inside their normal latency bands.\n\nThe only elevated metric was export queue depth, which maps to analytics downloads instead of checkout."
  )
  .user("What changed in the last deploy?")
  .assistant(
    "Only the export queue worker changed. The deploy moved large CSV jobs onto the shared retry policy, which made each failed attempt hold a worker slot longer than before.\n\nThe app deploy did not include checkout, pricing, or billing API changes."
  )
  .user("Do we need to roll back?")
  .assistant(
    "Not yet. Queue depth is recovering after we reduced retry concurrency, and the oldest pending job is now under five minutes old.\n\nKeep rollback ready if the queue starts climbing again, but the current trend points toward recovery."
  )
  .user("Keep watching for customer-visible issues.")
  .assistant(
    "I will watch the queue and support tags for another 15 minutes. I am tracking export failures, delayed download requests, and any support thread that mentions missing reports.\n\nIf those stay quiet through the next batch window, we can close this as an internal degradation."
  )

const history = chat.get()
const INITIAL_VISIBLE_COUNT = 5

export function MessageScrollerLoadHistory() {
  const [demoKey, setDemoKey] = React.useState(0)
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_VISIBLE_COUNT)
  const visibleMessages = history.slice(-visibleCount)
  const canLoadHistory = visibleCount < history.length

  return (
    <MessageScrollerProvider>
      <div {...scrollerProps('layout')}>
        <Card {...scrollerStyle('card')}>
          <CardHeader {...scrollerStyle('header')}>
            <CardTitle>Load History</CardTitle>
            <CardDescription>
              Prepended messages keep your place.
            </CardDescription>
            <CardAction>
              <TooltipTrigger>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Reset loaded messages"
                  isDisabled={visibleCount === INITIAL_VISIBLE_COUNT}
                  onPress={() => {
                    setVisibleCount(INITIAL_VISIBLE_COUNT)
                    setDemoKey((key) => key + 1)
                  }}
                >
                  <RotateCwIcon />
                </Button>
                <Tooltip>
                  <p>Reset</p>
                </Tooltip>
              </TooltipTrigger>
            </CardAction>
          </CardHeader>
          <CardContent {...scrollerStyle('content')}>
            <MessageScroller key={demoKey}>
              <MessageScrollerViewport>
                <MessageScrollerContent {...scrollerStyle('messages')}>
                  {visibleMessages.map((message) => {
                    const isUserMessage = message.role === "user"

                    return (
                      <MessageScrollerItem
                        key={message.id}
                        messageId={message.id}
                      >
                        <Message align={isUserMessage ? "end" : "start"}>
                          <MessageContent>
                            <Bubble variant={isUserMessage ? "muted" : "ghost"}>
                              <BubbleContent {...scrollerStyle('lines')}>
                                {getMessageText(message)
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
                  <MessageScrollerItem scrollAnchor={false}>
                    <Marker variant="separator">
                      <MarkerContent>End of Conversation</MarkerContent>
                    </Marker>
                  </MessageScrollerItem>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </CardContent>
          <CardFooter {...scrollerStyle('footer')}>
            <Button
              type="button"
              isDisabled={!canLoadHistory}
              onPress={() => {
                setVisibleCount(history.length)
                toast("History loaded", {
                  description: "Scroll up to see earlier messages.",
                })
              }}
              {...scrollerStyle('full')}
              variant="secondary"
            >
              {canLoadHistory ? "Load History" : "History Loaded"}
            </Button>
            <p {...scrollerProps('hint')}>
              Restore earlier messages while keeping your place.
            </p>
          </CardFooter>
        </Card>
        <div {...scrollerProps('caption')}>
          Click Load History to load the entire conversation
        </div>
      </div>
    </MessageScrollerProvider>
  )
}
