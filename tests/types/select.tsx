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
} from "../../src/ariax/ui/select";
const styles = stylex.create({ width: (width: number) => ({ width }) });
<Select
  selectionMode="multiple"
  value={["a"]}
  onChange={(keys) => keys.map(String)}
  xstyle={styles.width(200)}
  style={({ isDisabled }) => ({ opacity: isDisabled ? 0.5 : 1 })}
>
  <SelectTrigger
    size="sm"
    style={({ isPressed }) => ({ opacity: isPressed ? 0.8 : 1 })}
  >
    <SelectValue>{({ selectedItems }) => selectedItems.length}</SelectValue>
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Items</SelectLabel>
      <SelectItem
        id="a"
        style={({ isSelected }) => ({ fontWeight: isSelected ? 600 : 400 })}
      >
        {({ isFocused }) => String(isFocused)}
      </SelectItem>
    </SelectGroup>
    <SelectSeparator />
  </SelectContent>
</Select>;
<SelectPopover>
  <SelectInput />
  <SelectList renderEmptyState={() => <SelectEmpty>Empty</SelectEmpty>} />
</SelectPopover>;
// @ts-expect-error External className is unsupported.
<Select className="w-40" />;
// @ts-expect-error External className is unsupported.
<SelectTrigger className="p-2" />;
// @ts-expect-error External className is unsupported.
<SelectContent className="p-2" />;
// @ts-expect-error External className is unsupported.
<SelectInput className="p-2" />;
// @ts-expect-error External className is unsupported.
<SelectItem className="p-2" />;
// @ts-expect-error Plain CSS objects are not StyleX styles.
<Select xstyle={{ width: 200 }} />;
// @ts-expect-error Select's size is limited to its official trigger sizes.
<SelectTrigger size="lg" />;
