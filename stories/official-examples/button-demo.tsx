import { demoProps, demoStyle } from '@official-demo-customizations';
import { ArrowUpIcon } from "lucide-react"

import { Button } from "@button"

export default function ButtonDemo() {
  return (
    <div {...demoProps('buttons')}>
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
