import { useId, useState } from "react";
import { FieldError } from "react-aria-components";
import type * as Controls from "./example-controls";

export const exampleNames = {
  button: "Button",
  "toggle-group": "Toggle group",
  checkbox: "Three-state checkbox",
  select: "Select",
} as const;
export type Example = keyof typeof exampleNames;

export function ComponentExample({
  example,
  controls,
  locale,
  label,
  isDisabled = false,
  isInvalid = false,
  size = "default",
  outline = true,
  vertical = false,
  invalidMessage,
}: {
  example: Exclude<Example, "button">;
  controls: typeof Controls;
  locale: string;
  label: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  size?: "sm" | "default";
  outline?: boolean;
  vertical?: boolean;
  invalidMessage?: string;
}) {
  const {
    Checkbox,
    ToggleGroup,
    ToggleGroupItem,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } = controls;
  const id = useId();
  const [days, setDays] = useState([true, false]);
  const format = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    timeZone: "UTC",
  });
  const weekdays = [1, 2, 3].map((day) =>
    format.format(Date.UTC(2024, 0, day)),
  );
  if (example === "toggle-group")
    return (
      <ToggleGroup
        size={size}
        isDisabled={isDisabled}
        aria-label={label}
        variant={outline ? "outline" : "default"}
        orientation={vertical ? "vertical" : "horizontal"}
        selectionMode="multiple"
        defaultSelectedKeys={["0"]}
      >
        {weekdays.map((day, i) => (
          <ToggleGroupItem key={i} id={String(i)}>
            {day}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    );
  if (example === "select")
    return (
      <Select
        aria-label={label}
        defaultValue="0"
        validationBehavior="aria"
        isDisabled={isDisabled}
        isInvalid={isInvalid}
      >
        <SelectTrigger size={size}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {weekdays.map((day, i) => (
            <SelectItem key={i} id={String(i)} textValue={day}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
        <FieldError style={{ color: "var(--destructive)" }}>
          {invalidMessage}
        </FieldError>
      </Select>
    );
  const count = days.filter(Boolean).length;
  return (
    <div
      role="group"
      aria-label={label}
      style={{ display: "grid", gap: "0.75rem" }}
    >
      {[weekdays.slice(0, 2).join(" + "), ...weekdays.slice(0, 2)].map(
        (name, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Checkbox
              isDisabled={isDisabled}
              isInvalid={isInvalid}
              id={id + i}
              aria-label={name}
              isIndeterminate={i === 0 && count === 1}
              isSelected={i === 0 ? count === 2 : days[i - 1]}
              onChange={(selected) =>
                setDays((previous) =>
                  previous.map((day, index) =>
                    i === 0 || i === index + 1 ? selected : day,
                  ),
                )
              }
            />
            <label htmlFor={id + i}>
              {name}
              {i === 0 && ` (${count}/2)`}
            </label>
          </div>
        ),
      )}
    </div>
  );
}
