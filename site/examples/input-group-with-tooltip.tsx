"use client";

import { ChevronDownIcon, InfoIcon, StarIcon } from "lucide-react";
import { useState } from "react";

import { ButtonGroup, ButtonGroupText } from "@button-group";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dropdown-menu";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@input-group";
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@popover";
import { Tooltip, TooltipTrigger } from "@tooltip";

export default function InputGroupWithTooltip() {
  const [country, setCountry] = useState("+1");
  const [favorite, setFavorite] = useState(false);
  return (
    <>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-tooltip-20">Tooltip</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-tooltip-20" />
            <InputGroupAddon align="inline-end">
              <TooltipTrigger>
                <InputGroupButton
                  aria-label="Show help"
                  style={{ borderRadius: "9999px" }}
                  size="icon-xs"
                >
                  <InfoIcon />
                </InputGroupButton>
                <Tooltip>This is content in a tooltip.</Tooltip>
              </TooltipTrigger>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-dropdown-21">Dropdown</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-dropdown-21" />
            <InputGroupAddon>
              <DropdownMenuTrigger>
                <InputGroupButton
                  style={{
                    color: "var(--muted-foreground)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {country} <ChevronDownIcon />
                </InputGroupButton>
                <DropdownMenu
                  placement="bottom start"
                  style={{ minWidth: "4rem" }}
                  offset={10}
                  crossOffset={-8}
                >
                  <DropdownMenuItem onClick={() => setCountry("+1")}>
                    +1
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCountry("+44")}>
                    +44
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCountry("+46")}>
                    +46
                  </DropdownMenuItem>
                </DropdownMenu>
              </DropdownMenuTrigger>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-secure-19">Popover</FieldLabel>
          <InputGroup>
            <PopoverTrigger>
              <InputGroupAddon>
                <InputGroupButton
                  aria-label="Connection details"
                  variant="secondary"
                  size="icon-xs"
                >
                  <InfoIcon />
                </InputGroupButton>
              </InputGroupAddon>
              <Popover placement="bottom start">
                <PopoverHeader>
                  <PopoverTitle>Your connection is not secure.</PopoverTitle>
                  <PopoverDescription>
                    You should not enter any sensitive information on this site.
                  </PopoverDescription>
                </PopoverHeader>
              </Popover>
            </PopoverTrigger>
            <InputGroupAddon
              style={{
                paddingInlineStart: ".25rem",
                color: "var(--muted-foreground)",
              }}
            >
              https://
            </InputGroupAddon>
            <InputGroupInput id="input-secure-19" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                aria-label="Favorite website"
                aria-pressed={favorite}
                onPress={() => setFavorite(!favorite)}
              >
                <StarIcon fill={favorite ? "currentColor" : "none"} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="url">Button Group</FieldLabel>
          <ButtonGroup>
            <ButtonGroupText>https://</ButtonGroupText>
            <InputGroup>
              <InputGroupInput id="url" />
              <InputGroupAddon align="inline-end">
                <InfoIcon />
              </InputGroupAddon>
            </InputGroup>
            <ButtonGroupText>.com</ButtonGroupText>
          </ButtonGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </>
  );
}
