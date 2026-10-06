import * as stylex from "@stylexjs/stylex";
import {
  Questionnaire,
  QuestionnaireProgress,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireDescription,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireInput,
  QuestionnaireError,
  QuestionnaireActions,
  QuestionnairePrevious,
  QuestionnaireSkip,
  QuestionnaireNext,
  QuestionnaireSubmit,
} from "@questionnaire";
const styles = stylex.create({ custom: { gap: 12 } });
export default function Fixture() {
  return (
    <Questionnaire
      items={[{ name: "choice" }, { name: "note" }]}
      xstyle={styles.custom}
      style={{ gap: 8 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="choice">
        <QuestionnaireTitle>Choose</QuestionnaireTitle>
        <QuestionnaireDescription>One answer</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="one">
            One
            <QuestionnaireChoiceDescription>
              First
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem name="note">
        <QuestionnaireTitle>Note</QuestionnaireTitle>
        <QuestionnaireInput aria-label="Note" />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  );
}
