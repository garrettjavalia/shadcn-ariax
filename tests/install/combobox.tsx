import * as stylex from "@stylexjs/stylex";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipList,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@combobox";
import { Group } from "react-aria-components";
const styles = stylex.create({
  width: (width: number) => ({ width }),
  item: { fontWeight: 500 },
});
const items = [
  { id: "apple", name: "Apple" },
  { id: "pear", name: "Pear" },
];
export default function ComboboxInstallFixture() {
  const anchor = useComboboxAnchor();
  return (
    <>
      <Combobox
        aria-label="Fruit"
        xstyle={styles.width(220)}
        style={({ isDisabled }) => ({ opacity: isDisabled ? 0.5 : 1 })}
      >
        <ComboboxInput
          style={{ lineHeight: 1.75 }}
          xstyle={styles.width(200)}
          showClear
        />
        <ComboboxContent
          xstyle={styles.width(240)}
          style={({ isEntering }) => ({ opacity: isEntering ? 0.9 : 1 })}
        >
          <ComboboxList
            renderEmptyState={() => (
              <ComboboxEmpty style={{ padding: 8 }}>Empty</ComboboxEmpty>
            )}
            style={({ isEmpty }) => ({ minHeight: isEmpty ? 40 : 0 })}
          >
            <ComboboxGroup>
              <ComboboxLabel xstyle={styles.item}>Fruits</ComboboxLabel>
              <ComboboxCollection items={items}>
                {(item) => (
                  <ComboboxItem
                    id={item.id}
                    xstyle={styles.item}
                    style={({ isSelected }) => ({
                      fontWeight: isSelected ? 600 : 400,
                    })}
                  >
                    {item.name}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              <ComboboxSeparator style={{ height: 2 }} />
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <Combobox
        selectionMode="multiple"
        defaultValue={["apple"]}
        aria-label="Many fruits"
      >
        <ComboboxChips
          xstyle={styles.width(260)}
          style={({ isFocusWithin }) => ({ opacity: isFocusWithin ? 1 : 0.9 })}
        >
          <ComboboxChipList<{ name: string }>>
            {(item) => (
              <ComboboxChip
                style={({ isFocused }) => ({
                  fontWeight: isFocused ? 600 : 400,
                })}
              >
                {item.name}
              </ComboboxChip>
            )}
          </ComboboxChipList>
          <ComboboxChipsInput
            style={({ isDisabled }) => ({ opacity: isDisabled ? 0.5 : 1 })}
          />
        </ComboboxChips>
        <Group ref={anchor}>
          <ComboboxTrigger
            style={({ isPressed }) => ({ opacity: isPressed ? 0.8 : 1 })}
          >
            <ComboboxValue>{({ selectedText }) => selectedText}</ComboboxValue>
          </ComboboxTrigger>
        </Group>
        <ComboboxContent anchor={anchor}>
          <ComboboxList items={items}>
            {(item) => <ComboboxItem id={item.id}>{item.name}</ComboboxItem>}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
}
