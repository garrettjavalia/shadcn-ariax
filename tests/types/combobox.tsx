import * as stylex from "@stylexjs/stylex";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxChips,
  ComboboxChipList,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
} from "../../src/ariax/ui/combobox";
const styles = stylex.create({ width: (width: number) => ({ width }) });
<Combobox
  selectionMode="multiple"
  value={["apple"]}
  onChange={(keys) => keys.map(String)}
  xstyle={styles.width(200)}
  style={({ isDisabled }) => ({ opacity: isDisabled ? 0.5 : 1 })}
>
  <ComboboxChips>
    <ComboboxChipList<{ name: string }>>
      {(item) => <ComboboxChip>{item.name}</ComboboxChip>}
    </ComboboxChipList>
    <ComboboxChipsInput
      style={({ isDisabled }) => ({ opacity: isDisabled ? 0.5 : 1 })}
    />
  </ComboboxChips>
  <ComboboxContent
    style={({ isEntering }) => ({ opacity: isEntering ? 0.8 : 1 })}
  >
    <ComboboxList style={({ isEmpty }) => ({ minHeight: isEmpty ? 40 : 0 })}>
      <ComboboxItem
        id="apple"
        style={({ isSelected }) => ({ fontWeight: isSelected ? 600 : 400 })}
      >
        {({ isFocused }) => String(isFocused)}
      </ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>;
<ComboboxInput
  xstyle={styles.width(200)}
  style={{ lineHeight: 1.75 }}
  showClear
/>;
<ComboboxTrigger style={({ isPressed }) => ({ opacity: isPressed ? 0.8 : 1 })}>
  <ComboboxValue>{({ selectedItems }) => selectedItems.length}</ComboboxValue>
</ComboboxTrigger>;
// @ts-expect-error External className is unsupported.
<Combobox className="w-40" />;
// @ts-expect-error External className is unsupported.
<ComboboxInput className="p-2" />;
// @ts-expect-error External className is unsupported.
<ComboboxContent className="p-2" />;
// @ts-expect-error External className is unsupported.
<ComboboxItem className="p-2" />;
// @ts-expect-error External className is unsupported.
<ComboboxChipList className="p-2" />;
// @ts-expect-error Plain CSS objects are not StyleX styles.
<Combobox xstyle={{ width: 200 }} />;
// @ts-expect-error Multiple value must be an array.
<Combobox selectionMode="multiple" value="apple" />;
