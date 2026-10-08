import { demoProps, demoStyle } from '@official-demo-customizations';
import { ArrowUpIcon } from "lucide-react"

import { Button } from "@button"

export default function ButtonRounded() {
  return (
    <div {...demoProps('row')}>
      <Button {...demoStyle('rounded')}>Get Started</Button>
      <Button variant="outline" size="icon" {...demoStyle('rounded')}>
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
