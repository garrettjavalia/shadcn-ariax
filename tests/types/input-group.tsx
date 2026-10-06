import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../../registry/ariax/ui/input-group";
<InputGroup
  style={({ isFocusWithin }) => ({ opacity: isFocusWithin ? 1 : 0.5 })}
>
  <InputGroupInput
    style={({ isFocused }) => ({ color: isFocused ? "red" : "blue" })}
  />
  <InputGroupAddon align="block-end" style={{ padding: 10 }}>
    <InputGroupButton
      size="icon-sm"
      style={({ isPressed }) => ({ opacity: isPressed ? 0.5 : 1 })}
    />
    <InputGroupText style={{ color: "red" }} />
    <InputGroupTextarea style={{ resize: "vertical" }} />
  </InputGroupAddon>
</InputGroup>;
// @ts-expect-error external classes unsupported
<InputGroup className="custom" />;
// @ts-expect-error invalid alignment
<InputGroupAddon align="top" />;
// @ts-expect-error invalid size
<InputGroupButton size="lg" />;
