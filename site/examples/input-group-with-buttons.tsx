import { useState } from "react";
import { CopyIcon, TrashIcon } from "lucide-react";

import { Field, FieldGroup, FieldLabel } from "@field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@input-group";

export default function InputGroupWithButtons() {
  const [copyValue, setCopyValue] = useState("");
  const [clearValue, setClearValue] = useState("");
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="input-button-13">Button</FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-button-13" />
          <InputGroupAddon>
            <InputGroupButton>Default</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput aria-label="Text with outline button" />
          <InputGroupAddon>
            <InputGroupButton variant="outline">Outline</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput aria-label="Text with secondary button" />
          <InputGroupAddon>
            <InputGroupButton variant="secondary">Secondary</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput aria-label="Text with trailing button" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary">Button</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput
            id="input-button-17"
            aria-label="Text to copy"
            value={copyValue}
            onChange={(event) => setCopyValue(event.currentTarget.value)}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Copy"
              size="icon-xs"
              onPress={() => void navigator.clipboard.writeText(copyValue)}
            >
              <CopyIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput
            id="input-button-18"
            aria-label="Text to clear"
            value={clearValue}
            onChange={(event) => setClearValue(event.currentTarget.value)}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Clear"
              variant="secondary"
              size="icon-xs"
              onPress={() => setClearValue("")}
            >
              <TrashIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
  );
}
