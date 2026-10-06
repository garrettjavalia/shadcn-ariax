import {questionnaireCentered,questionnaireBottom,questionnaireMin,questionnaireFull,questionnaireStatus,questionnaireWide,questionnaireWideFull,questionnaireCenter,questionnaireSr,questionnaireAnimated} from '@questionnaire-customizations';
"use client"

import * as React from "react"
import { toast } from "sonner"

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
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dialog"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@questionnaire"

const questionnaireItems = [
  {
    choices: [
      { value: "delegation" },
      { value: "questions" },
      { value: "both" },
    ],
    name: "direction",
    required: true,
  },
  {
    choices: [
      { value: "progress" },
      { value: "decisions" },
      { value: "risks" },
    ],
    name: "signals",
  },
  {
    choices: [{ value: "week" }, { value: "cycle" }, { value: "later" }],
    name: "timing",
    required: true,
  },
] as const

const taskItems = [
  {
    choices: [
      { value: "inspect" },
      { value: "implement" },
      { value: "review" },
    ],
    name: "task",
    required: true,
  },
] as const

const planItems = [
  {
    choices: [
      { value: "plus" },
      { value: "pro" },
      { value: "enterprise", disabled: true },
    ],
    name: "plan",
    required: true,
  },
] as const


export function QuestionnaireDisabled() {
  return (
    <section>
      <Questionnaire
        {...questionnaireWide}
        defaultItem="plan"
        items={planItems}
        onSubmit={handleSubmit}
      >
        <QuestionnaireItem name="plan" required>
          <QuestionnaireTitle>Choose a plan</QuestionnaireTitle>
          <QuestionnaireDescription>
            Enterprise is not available on your account.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="plus">
              <span style={{fontWeight:500}}>Plus</span>
              <QuestionnaireChoiceDescription>
                For individuals and small teams
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="pro">
              <span style={{fontWeight:500}}>Pro</span>
              <QuestionnaireChoiceDescription>
                For growing businesses
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="enterprise" disabled>
              <span style={{fontWeight:500}}>Enterprise</span>
              <QuestionnaireChoiceDescription>
                For large teams and enterprises
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireNavigation />
      </Questionnaire>
    </section>
  )
}

export function QuestionnaireNoDescription() {
  return (
    <section>
      <Questionnaire
        {...questionnaireWide}
        defaultItem="task"
        items={taskItems}
        shortcuts="letters"
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />
        <QuestionnaireItem name="task" required>
          <QuestionnaireTitle>
            What should the agent do next?
          </QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="inspect">
              Inspect the codebase
            </QuestionnaireChoice>
            <QuestionnaireChoice value="implement">
              Implement the change
            </QuestionnaireChoice>
            <QuestionnaireChoice value="review">
              Review the result
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
        <QuestionnaireNavigation />
      </Questionnaire>
    </section>
  )
}

export function QuestionnaireStandalone() {
  return (
    <section>
      <Questionnaire
        {...questionnaireWide}
        defaultItem="direction"
        items={questionnaireItems}
        shortcuts="letters"
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />
        <QuestionnaireQuestions />
        <QuestionnaireNavigation />
      </Questionnaire>
    </section>
  )
}

export function QuestionnaireCard() {
  return (
    <section>
      <Questionnaire
        defaultItem="direction"
        items={questionnaireItems}
        shortcuts="numbers"
        onSubmit={handleSubmit}
      >
        <QuestionnaireCardQuestions />
      </Questionnaire>
    </section>
  )
}

export function QuestionnaireDialog() {
  return (
    <section>
      <DialogTrigger>
        <Button variant="outline">Open questionnaire</Button>
        <Dialog data-parity-portal>
          <Questionnaire
            defaultItem="direction"
            items={questionnaireItems}
            onSubmit={handleSubmit}
          >
            <DialogHeader>
              <DialogTitle {...questionnaireSr}>
                Plan an agent interface
              </DialogTitle>
              <DialogDescription {...questionnaireSr}>
                Answer three questions to shape the next prototype.
              </DialogDescription>
              <QuestionnaireProgress
                style={{fontWeight:600,letterSpacing:'.1em',color:'var(--foreground)',textTransform:'uppercase'}}
                render={(props, state) => (
                  <span {...props}>
                    Question {state.current} of {state.total}
                  </span>
                )}
              />
            </DialogHeader>
            <QuestionnaireQuestions />
            <DialogFooter>
              <QuestionnaireNavigation />
            </DialogFooter>
          </Questionnaire>
        </Dialog>
      </DialogTrigger>
    </section>
  )
}

export function QuestionnaireCardQuestions() {
  const directionTitleId = React.useId()
  const signalsTitleId = React.useId()
  const timingTitleId = React.useId()

  return (
    <>
      <QuestionnaireItem
        aria-labelledby={directionTitleId}
        name="direction"
        required
      >
        <Card {...questionnaireWideFull}>
          <CardHeader>
            <QuestionnaireTitle id={directionTitleId} render={<CardTitle />}>
              What should we prototype next?
            </QuestionnaireTitle>
            <QuestionnaireDescription render={<CardDescription />}>
              Choose one direction or write another answer.
            </QuestionnaireDescription>
            <CardAction>
              <QuestionnaireProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="delegation">
                <span style={{fontWeight:500}}>Sub-agent delegation</span>
                <QuestionnaireChoiceDescription>
                  Show when work is delegated and what comes back.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="questions">
                <span style={{fontWeight:500}}>Question prompts</span>
                <QuestionnaireChoiceDescription>
                  Show choices while the agent waits for input.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="both">
                <span style={{fontWeight:500}}>Both together</span>
                <QuestionnaireChoiceDescription>
                  Explore one unified interaction pattern.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireInput
                aria-label="Another direction"
                placeholder="Type another direction…"
              />
            </QuestionnaireChoices>
            <QuestionnaireError />
          </CardContent>
          <CardFooter>
            <QuestionnaireNavigation />
          </CardFooter>
        </Card>
      </QuestionnaireItem>
      <QuestionnaireItem
        aria-labelledby={signalsTitleId}
        name="signals"
        multiple
      >
        <Card {...questionnaireWideFull}>
          <CardHeader>
            <QuestionnaireTitle id={signalsTitleId} render={<CardTitle />}>
              What should every progress update include?
            </QuestionnaireTitle>
            <QuestionnaireDescription render={<CardDescription />}>
              Select all that apply, or skip this question.
            </QuestionnaireDescription>
            <CardAction>
              <QuestionnaireProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="progress">
                Progress
              </QuestionnaireChoice>
              <QuestionnaireChoice value="decisions">
                Decisions
              </QuestionnaireChoice>
              <QuestionnaireChoice value="risks">Risks</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </CardContent>
          <CardFooter>
            <QuestionnaireNavigation />
          </CardFooter>
        </Card>
      </QuestionnaireItem>
      <QuestionnaireItem aria-labelledby={timingTitleId} name="timing" required>
        <Card {...questionnaireWideFull}>
          <CardHeader>
            <QuestionnaireTitle id={timingTitleId} render={<CardTitle />}>
              When should this be revisited?
            </QuestionnaireTitle>
            <QuestionnaireDescription render={<CardDescription />}>
              Choose when this should be revisited.
            </QuestionnaireDescription>
            <CardAction>
              <QuestionnaireProgress />
            </CardAction>
          </CardHeader>
          <CardContent>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="week">This week</QuestionnaireChoice>
              <QuestionnaireChoice value="cycle">
                Next cycle
              </QuestionnaireChoice>
              <QuestionnaireChoice value="later">
                Revisit later
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </CardContent>
          <CardFooter>
            <QuestionnaireNavigation />
          </CardFooter>
        </Card>
      </QuestionnaireItem>
    </>
  )
}

export function QuestionnaireQuestions() {
  return (
    <>
      <QuestionnaireItem name="direction" required>
        <QuestionnaireTitle>What should we prototype next?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose one direction or write another answer.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="delegation">
            <span style={{fontWeight:500}}>Sub-agent delegation</span>
            <QuestionnaireChoiceDescription>
              Show when work is delegated and what comes back.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="questions">
            <span style={{fontWeight:500}}>Question prompts</span>
            <QuestionnaireChoiceDescription>
              Show choices while the agent waits for input.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="both">
            <span style={{fontWeight:500}}>Both together</span>
            <QuestionnaireChoiceDescription>
              Explore one unified interaction pattern.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireInput
            aria-label="Another direction"
            placeholder="Type another direction…"
          />
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="signals" multiple>
        <QuestionnaireTitle>
          What should every progress update include?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Select all that apply, or skip this question.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="progress">Progress</QuestionnaireChoice>
          <QuestionnaireChoice value="decisions">Decisions</QuestionnaireChoice>
          <QuestionnaireChoice value="risks">Risks</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="timing" required>
        <QuestionnaireTitle>When should this be revisited?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Choose when this should be revisited.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="week">This week</QuestionnaireChoice>
          <QuestionnaireChoice value="cycle">Next cycle</QuestionnaireChoice>
          <QuestionnaireChoice value="later">Revisit later</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
    </>
  )
}

export function QuestionnaireNavigation() {
  return (
    <QuestionnaireActions {...questionnaireFull}>
      <QuestionnairePrevious />
      <QuestionnaireSkip />
      <QuestionnaireNext>Next</QuestionnaireNext>
      <QuestionnaireSubmit>Save answers</QuestionnaireSubmit>
    </QuestionnaireActions>
  )
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const formData = new FormData(event.currentTarget)
  const values = {
    direction: formData.get("direction"),
    signals: formData.getAll("signals"),
    timing: formData.get("timing"),
  }

  toast("Questionnaire submitted", {
    description: `Direction: ${values.direction ?? "None"} · Progress signals: ${values.signals.join(", ") || "None"} · Timing: ${values.timing ?? "None"}`,
  })
}
