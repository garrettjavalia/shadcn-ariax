import {questionnaireCentered,questionnaireBottom,questionnaireMin,questionnaireFull,questionnaireStatus,questionnaireWide,questionnaireWideFull,questionnaireCenter,questionnaireSr,questionnaireAnimated} from '@questionnaire-customizations';
"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@card"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@questionnaire"

const items = [
  {
    choices: [{ value: "fix" }, { value: "refactor" }, { value: "docs" }],
    name: "task",
    required: true,
  },
  {
    choices: [{ value: "summary" }, { value: "files" }, { value: "review" }],
    name: "output",
    required: true,
  },
] as const

export function QuestionnaireCard() {
  const taskTitleId = React.useId()
  const outputTitleId = React.useId()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast("Agent task created", {
      description: `Task: ${formData.get("task") ?? "None"} · Handoff: ${formData.get("output") ?? "None"}`,
    })
  }

  return (
    <Questionnaire
      {...questionnaireCentered}
      defaultItem="task"
      items={items}
      shortcuts="numbers"
      onSubmit={handleSubmit}
    >
      <Card>
        <QuestionnaireItem aria-labelledby={taskTitleId} name="task" required>
          <CardHeader>
            <QuestionnaireTitle id={taskTitleId} render={<CardTitle />}>
              What should the agent work on?
            </QuestionnaireTitle>
            <QuestionnaireDescription render={<CardDescription />}>
              Choose the task that should be handled next.
            </QuestionnaireDescription>
            <CardAction>
              <QuestionnaireProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="fix">
                Fix the failing tests
              </QuestionnaireChoice>
              <QuestionnaireChoice value="refactor">
                Refactor the data layer
              </QuestionnaireChoice>
              <QuestionnaireChoice value="docs">
                Update the integration guide
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </CardContent>
        </QuestionnaireItem>

        <QuestionnaireItem
          aria-labelledby={outputTitleId}
          name="output"
          required
        >
          <CardHeader>
            <QuestionnaireTitle id={outputTitleId} render={<CardTitle />}>
              What should the final handoff include?
            </QuestionnaireTitle>
            <QuestionnaireDescription render={<CardDescription />}>
              Pick the level of detail needed for review.
            </QuestionnaireDescription>
            <CardAction>
              <QuestionnaireProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="summary">
                Summary only
              </QuestionnaireChoice>
              <QuestionnaireChoice value="files">
                Summary and changed files
              </QuestionnaireChoice>
              <QuestionnaireChoice value="review">
                Full review handoff
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </CardContent>
        </QuestionnaireItem>

        <CardFooter>
          <QuestionnaireActions {...questionnaireFull}>
            <QuestionnairePrevious />
            <QuestionnaireNext>Next</QuestionnaireNext>
            <QuestionnaireSubmit>Create task</QuestionnaireSubmit>
          </QuestionnaireActions>
        </CardFooter>
      </Card>
    </Questionnaire>
  )
}
