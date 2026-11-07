import { scrollerStyle, scrollerProps } from '@official-scroller-customizations';
"use client"

import * as React from "react"

import { Bubble, BubbleContent } from "@bubble"
import { Button } from "@button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@card"
import { Message, MessageContent } from "@message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "@message-scroller"
import { Tabs, TabsList, TabsTrigger } from "@tabs"

const messages = [
  {
    id: "open-1",
    role: "user",
    text: "This is the first message the user sent in the conversation.",
  },
  {
    id: "open-2",
    role: "assistant",
    text: "Workspace creation rose 8%, but first invite completion only rose 2%.",
  },
  {
    id: "open-3",
    role: "user",
    text: "This is the last message the user sent in the conversation.",
  },
  {
    id: "open-4",
    role: "assistant",
    text: "Start with the invite step. Teams are creating workspaces but waiting to add collaborators.\n\nRecommended follow-up:\n\n1. Compare invite drop-off by account size.\n2. Check whether users who skip invites still return within 24 hours.\n3. Review the empty-state copy on the first project screen.\n4. Segment activation by template, since template users may not need invites right away.\n\nIf that pattern holds, the next experiment should make collaboration useful earlier instead of prompting for invites harder.",
  },
] satisfies Array<{
  id: string
  role: "user" | "assistant"
  text: string
}>

const positions = [
  { value: "start", label: "start" },
  { value: "end", label: "end" },
  { value: "last-anchor", label: "last-anchor" },
] satisfies Array<{
  value: "start" | "end" | "last-anchor"
  label: string
}>

export function MessageScrollerOpeningPosition() {
  const [positionKey, setPositionKey] = React.useState(0)
  const [position, setPosition] = React.useState<
    "start" | "end" | "last-anchor"
  >("last-anchor")

  return (
    <div {...scrollerProps('layout')}>
      <Card {...scrollerStyle('card')}>
        <CardHeader {...scrollerStyle('header')}>
          <CardTitle>Opening Position</CardTitle>
          <CardDescription>
            Choose where a saved transcript opens.
          </CardDescription>
        </CardHeader>
        <CardContent {...scrollerStyle('content')}>
          <MessageScrollerProvider>
            <OpeningPositionScroller
              position={position}
              positionKey={positionKey}
            />
          </MessageScrollerProvider>
        </CardContent>
        <CardFooter {...scrollerStyle('positionFooter')}>
          <Tabs
            selectedKey={position}
            onSelectionChange={(value) => {
              if (
                value === "start" ||
                value === "end" ||
                value === "last-anchor"
              ) {
                setPosition(value)
                setPositionKey((key) => key + 1)
              }
            }}
            {...scrollerStyle('full')}
          >
            <TabsList {...scrollerStyle('full')}>
              {positions.map((option) => (
                <TabsTrigger key={option.value} id={option.value}>
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardFooter>
      </Card>
      <div {...scrollerProps('plainCaption')}>
        Toggle the defaultScrollPosition to see where the transcript starts when
        you open the thread
      </div>
    </div>
  )
}

function OpeningPositionScroller({
  position,
  positionKey,
}: {
  position: "start" | "end" | "last-anchor"
  positionKey: number
}) {
  const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScroller()

  React.useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (position === "start") {
        scrollToStart({ behavior: "auto" })
        return
      }

      if (position === "end") {
        scrollToEnd({ behavior: "auto" })
        return
      }

      scrollToMessage("open-3", {
        align: "start",
        behavior: "auto",
        scrollMargin: 64,
      })
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [position, positionKey, scrollToEnd, scrollToMessage, scrollToStart])

  return (
    <MessageScroller>
      <MessageScrollerViewport>
        <MessageScrollerContent {...scrollerStyle('messages')}>
          {messages.map((message) => {
            const isUserMessage = message.role === "user"

            return (
              <MessageScrollerItem
                key={message.id}
                messageId={message.id}
                scrollAnchor={isUserMessage}
              >
                <Message align={isUserMessage ? "end" : "start"}>
                  <MessageContent>
                    <Bubble variant={isUserMessage ? "muted" : "ghost"}>
                      <BubbleContent {...scrollerStyle('lines')}>
                        {message.text
                          .split(/\n\s*\n/)
                          .map((paragraph) => paragraph.trim())
                          .filter(Boolean)
                          .map((paragraph, index) => (
                            <p key={index} {...scrollerProps('text')}>
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
  )
}
