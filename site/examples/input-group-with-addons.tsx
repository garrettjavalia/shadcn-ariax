"use client";

import {
  CopyIcon,
  EyeOffIcon,
  InfoIcon,
  MicIcon,
  RadioIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react";
import { useState } from "react";

import { Field, FieldDescription, FieldGroup, FieldLabel } from "@field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@input-group";

export default function InputGroupWithAddons() {
  const [value, setValue] = useState("");
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="input-icon-left-05">
          Addon (inline-start)
        </FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-icon-left-05" />
          <InputGroupAddon>
            <SearchIcon style={{ color: "var(--muted-foreground)" }} />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-icon-right-07">
          Addon (inline-end)
        </FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-icon-right-07" />
          <InputGroupAddon align="inline-end">
            <EyeOffIcon />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-icon-both-09">
          Addon (inline-start and inline-end)
        </FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-icon-both-09" />
          <InputGroupAddon>
            <MicIcon style={{ color: "var(--muted-foreground)" }} />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <RadioIcon style={{ color: "var(--destructive)" }} />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-addon-20">Addon (block-start)</FieldLabel>
        <InputGroup style={{ height: "auto" }}>
          <InputGroupInput id="input-addon-20" />
          <InputGroupAddon align="block-start">
            <InputGroupText>First Name</InputGroupText>
            <InfoIcon
              style={{
                marginInlineStart: "auto",
                color: "var(--muted-foreground)",
              }}
            />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-addon-21">Addon (block-end)</FieldLabel>
        <InputGroup style={{ height: "auto" }}>
          <InputGroupInput id="input-addon-21" />
          <InputGroupAddon align="block-end">
            <InputGroupText>20/240 characters</InputGroupText>
            <InfoIcon
              style={{
                marginInlineStart: "auto",
                color: "var(--muted-foreground)",
              }}
            />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-icon-both-10">Multiple Icons</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="input-icon-both-10"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          <InputGroupAddon align="inline-end">
            <StarIcon />
            <InputGroupButton
              size="icon-xs"
              aria-label="Copy input"
              onPress={() => void navigator.clipboard.writeText(value)}
            >
              <CopyIcon />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupAddon>
            <RadioIcon style={{ color: "var(--destructive)" }} />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-description-10">Description</FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-description-10" />
          <InputGroupAddon align="inline-end">
            <InfoIcon />
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          This is a description of the input group.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="input-label-10">Label</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <FieldLabel htmlFor="input-label-10">Label</FieldLabel>
          </InputGroupAddon>
          <InputGroupInput id="input-label-10" />
        </InputGroup>
        <InputGroup>
          <InputGroupInput id="input-optional-12" aria-label="Optional" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>(optional)</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
  );
}
