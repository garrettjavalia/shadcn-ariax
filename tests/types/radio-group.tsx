import * as stylex from "@stylexjs/stylex";
import { RadioGroup, RadioGroupItem } from "../../src/ariax/ui/radio-group";
const styles = stylex.create({
  custom: { width: 32 },
  dynamic: (width: number) => ({ width }),
});
<RadioGroup
  style={(state) => ({ opacity: state.isDisabled ? 0.5 : 1 })}
  xstyle={[styles.custom, styles.dynamic(240)]}
>
  <RadioGroupItem
    value="one"
    style={(state) => ({ opacity: state.isSelected ? 1 : 0.8 })}
  >
    {(state) => (state.isSelected ? "Selected" : "Option")}
  </RadioGroupItem>
</RadioGroup>;
// @ts-expect-error External classes are unsupported.
<RadioGroup className="grid" />;
// @ts-expect-error External classes are unsupported.
<RadioGroupItem value="one" className="rounded" />;
// @ts-expect-error Ordinary CSS objects are not StyleX styles.
<RadioGroupItem value="one" xstyle={{ width: 32 }} />;
