import { InfoIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@input-group";
import { Label } from "@label";
import { Tooltip, TooltipTrigger } from "@tooltip";

export default function InputGroupLabel() {
  return (
    <div
      style={{ display: "grid", width: "100%", maxWidth: "24rem", gap: "1rem" }}
    >
      <InputGroup>
        <InputGroupInput id="email" placeholder="username" />
        <InputGroupAddon>
          <Label htmlFor="email">@</Label>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="email-2" placeholder="user@example.com" />
        <InputGroupAddon align="block-start">
          <Label htmlFor="email-2" style={{ color: "var(--foreground)" }}>
            Email
          </Label>
          <TooltipTrigger>
            <InputGroupButton
              variant="ghost"
              aria-label="Help"
              style={{ marginInlineStart: "auto", borderRadius: "9999px" }}
              size="icon-xs"
            >
              <InfoIcon />
            </InputGroupButton>
            <Tooltip>
              <p>We&apos;ll use this to send you notifications</p>
            </Tooltip>
          </TooltipTrigger>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
