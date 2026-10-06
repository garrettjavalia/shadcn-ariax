import {
  Questionnaire,
  QuestionnaireChoice,
  QuestionnaireNext,
} from "@questionnaire";
// @ts-expect-error Public Tailwind class overrides are unsupported.
const bad = <Questionnaire className="p-2" />;
// @ts-expect-error Choices retain the required value.
const missing = <QuestionnaireChoice />;
const next = (
  <QuestionnaireNext
    variant="outline"
    size="sm"
    style={{ margin: 2 }}
    render={(props, state) => (
      <button {...props} data-test-disabled={state.disabled} />
    )}
  />
);
void bad;
void missing;
void next;
