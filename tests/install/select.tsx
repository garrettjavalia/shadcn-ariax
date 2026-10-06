import { Autocomplete, useFilter } from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectInput,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectPopover,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectEmpty,
  type SelectProps,
} from "@select";
const styles = stylex.create({
  width: (width: number) => ({ width }),
  item: { fontWeight: 500 },
});
const typed: SelectProps<{ id: string }, "multiple"> = {
  selectionMode: "multiple",
  defaultValue: ["apple"],
};
export default function SelectInstallFixture() {
  const { contains } = useFilter({ sensitivity: "base" });
  return (
    <>
      <Select
        {...typed}
        aria-label="Multiple fruits"
        xstyle={styles.width(220)}
        style={({ isDisabled }) => ({ opacity: isDisabled ? 0.5 : 1 })}
      >
        <SelectTrigger
          size="sm"
          xstyle={styles.width(240)}
          style={({ isPressed }) => ({ opacity: isPressed ? 0.8 : 1 })}
        >
          <SelectValue
            style={({ isPlaceholder }) => ({
              fontWeight: isPlaceholder ? 400 : 500,
            })}
          >
            {({ selectedText }) => selectedText}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          style={({ isEntering }) => ({ opacity: isEntering ? 0.9 : 1 })}
        >
          <SelectGroup style={{ padding: 8 }}>
            <SelectLabel xstyle={styles.item}>Fruits</SelectLabel>
            <SelectItem
              id="apple"
              xstyle={styles.item}
              style={({ isSelected }) => ({
                fontWeight: isSelected ? 600 : 400,
              })}
            >
              Apple
            </SelectItem>
          </SelectGroup>
          <SelectSeparator style={{ height: 2 }} />
          <SelectGroup>
            <SelectItem id="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select aria-label="Search fruit" placeholder="Search">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <Autocomplete filter={contains}>
          <SelectPopover>
            <SelectInput
              style={({ isDisabled }) => ({ opacity: isDisabled ? 0.5 : 1 })}
            />
            <SelectList
              style={({ isEmpty }) => ({ minHeight: isEmpty ? 40 : 0 })}
              renderEmptyState={() => (
                <SelectEmpty style={{ padding: 8 }}>No fruits</SelectEmpty>
              )}
            >
              <SelectGroup>
                <SelectItem id="pear">Pear</SelectItem>
              </SelectGroup>
            </SelectList>
          </SelectPopover>
        </Autocomplete>
      </Select>
    </>
  );
}
