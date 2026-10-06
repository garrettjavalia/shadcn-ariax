import {radioFit,radioMax,radioFieldset,radioNormal} from '@customizations';
import { Label } from "@label"
import { RadioGroup, RadioGroupItem } from "@radio-group"

export function RadioGroupDemo() {
  return (
    <RadioGroup
      aria-label="Density"
      defaultValue="comfortable"
      {...radioFit}
    >
      <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}
