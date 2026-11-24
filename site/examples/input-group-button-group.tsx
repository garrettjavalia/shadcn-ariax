import { Link2Icon } from "lucide-react";

import { ButtonGroup, ButtonGroupText } from "@button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@input-group";

export default function InputGroupButtonGroup() {
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        maxWidth: "24rem",
        gap: "1.5rem",
      }}
    >
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <InputGroup>
          <InputGroupInput aria-label="Domain name" />
          <InputGroupAddon align="inline-end">
            <Link2Icon />
          </InputGroupAddon>
        </InputGroup>
        <ButtonGroupText>.com</ButtonGroupText>
      </ButtonGroup>
    </div>
  );
}
