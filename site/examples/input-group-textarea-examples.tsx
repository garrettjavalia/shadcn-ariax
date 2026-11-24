import { useId } from "react";
import {
  ArrowUpIcon,
  CodeIcon,
  CopyIcon,
  InfoIcon,
  RefreshCwIcon,
} from "lucide-react";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "@field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@input-group";
import { Textarea } from "@textarea";

export default function InputGroupTextareaExamples() {
  const id = useId();
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor={`${id}-textarea-header-footer-12`}>
          Default Textarea (No Input Group)
        </FieldLabel>
        <Textarea
          id={`${id}-textarea-header-footer-12`}
          placeholder="Enter your text here..."
        />
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-textarea-header-footer-13`}>Input Group</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id={`${id}-textarea-header-footer-13`}
            placeholder="Enter your text here..."
          />
        </InputGroup>
        <FieldDescription>
          This is a description of the input group.
        </FieldDescription>
      </Field>
      <Field data-invalid="true">
        <FieldLabel htmlFor={`${id}-textarea-header-footer-14`}>Invalid</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id={`${id}-textarea-header-footer-14`}
            placeholder="Enter your text here..."
            aria-invalid="true"
          />
        </InputGroup>
        <FieldDescription>
          This is a description of the input group.
        </FieldDescription>
      </Field>
      <Field data-disabled="true">
        <FieldLabel htmlFor={`${id}-textarea-header-footer-15`}>Disabled</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id={`${id}-textarea-header-footer-15`}
            placeholder="Enter your text here..."
            disabled
          />
        </InputGroup>
        <FieldDescription>
          This is a description of the input group.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-prompt-31`}>Addon (block-start)</FieldLabel>
        <InputGroup>
          <InputGroupTextarea id={`${id}-prompt-31`} />
          <InputGroupAddon align="block-start">
            <InputGroupText>Ask, Search or Chat...</InputGroupText>
            <InfoIcon
              style={{
                marginInlineStart: "auto",
                color: "var(--muted-foreground)",
              }}
            />
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          This is a description of the input group.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-textarea-header-footer-30`}>
          Addon (block-end)
        </FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id={`${id}-textarea-header-footer-30`}
            placeholder="Enter your text here..."
          />
          <InputGroupAddon align="block-end">
            <InputGroupText>0/280 characters</InputGroupText>
            <InputGroupButton
              aria-label="Send"
              variant="default"
              size="icon-xs"
              style={{ marginInlineStart: "auto", borderRadius: "9999px" }}
            >
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-textarea-comment-31`}>Addon (Buttons)</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id={`${id}-textarea-comment-31`}
            placeholder="Share your thoughts..."
            style={{ minHeight: 120 }}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              variant="ghost"
              style={{ marginInlineStart: "auto" }}
              size="sm"
            >
              Cancel
            </InputGroupButton>
            <InputGroupButton variant="default" size="sm">
              Post Comment
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-textarea-code-32`}>Code Editor</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            id={`${id}-textarea-code-32`}
            placeholder="console.log('Hello, world!');"
            style={{ minHeight: 300, paddingBlock: ".75rem" }}
          />
          <InputGroupAddon
            align="block-start"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <InputGroupText
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 500,
              }}
            >
              <CodeIcon />
              script.js
            </InputGroupText>
            <InputGroupButton
              aria-label="Refresh"
              size="icon-xs"
              style={{ marginInlineStart: "auto" }}
            >
              <RefreshCwIcon />
            </InputGroupButton>
            <InputGroupButton
              aria-label="Copy code"
              size="icon-xs"
              variant="ghost"
            >
              <CopyIcon />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupAddon
            align="block-end"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <InputGroupText>Line 1, Column 1</InputGroupText>
            <InputGroupText style={{ marginInlineStart: "auto" }}>
              JavaScript
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
  );
}
