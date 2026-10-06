import {questionnaireCentered,questionnaireBottom,questionnaireMin,questionnaireFull,questionnaireStatus,questionnaireWide,questionnaireWideFull,questionnaireCenter,questionnaireSr,questionnaireAnimated} from '@questionnaire-customizations';
"use client"

import * as React from "react"
import { toast } from "sonner"

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
  { name: "scope", required: true },
  { name: "checks", required: true },
  { name: "output", required: true },
] as const

const itemLabels: Record<string, string> = {
  scope: "Change scope",
  checks: "Verification",
  output: "Final output",
}

export function QuestionnaireControlled() {
  const [item, setItem] = React.useState("scope")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    toast("Agent workflow configured", {
      description: `Scope: ${formData.get("scope") ?? "None"} · Verification: ${formData.get("checks") ?? "None"} · Output: ${formData.get("output") ?? "None"}`,
    })
  }

  return (
    <div style={{position:'relative',marginInline:'auto',display:'flex',height:'100%',width:'100%',maxWidth:'28rem',flexDirection:'column'}}>
      <p
        style={{position:'absolute',insetInlineEnd:0,top:0,fontSize:'.875rem',lineHeight:'calc(1.25 / .875)',color:'var(--muted-foreground)'}}
        role="status"
      >
        Current checkpoint: {itemLabels[item]}
      </p>

      <Questionnaire
        {...questionnaireBottom}
        item={item}
        items={items}
        onItemChange={setItem}
        onSubmit={handleSubmit}
      >
        <QuestionnaireProgress />

        <QuestionnaireItem name="scope" required>
          <QuestionnaireTitle>What may the agent change?</QuestionnaireTitle>
          <QuestionnaireDescription>
            The host stores the active checkpoint while Questionnaire navigates.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="component">
              Only the target component
            </QuestionnaireChoice>
            <QuestionnaireChoice value="tests">
              Component and related tests
            </QuestionnaireChoice>
            <QuestionnaireChoice value="feature">
              The complete feature area
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="checks" required>
          <QuestionnaireTitle>
            Which verification level should it use?
          </QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="targeted">
              Targeted tests
            </QuestionnaireChoice>
            <QuestionnaireChoice value="package">
              Package tests and typecheck
            </QuestionnaireChoice>
            <QuestionnaireChoice value="full">
              Full workspace verification
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="output" required>
          <QuestionnaireTitle>
            What should the agent return when finished?
          </QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="summary">
              Concise summary
            </QuestionnaireChoice>
            <QuestionnaireChoice value="diff">
              Summary with changed files
            </QuestionnaireChoice>
            <QuestionnaireChoice value="handoff">
              Detailed implementation handoff
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Save workflow</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}
