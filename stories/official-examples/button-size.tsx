import { demoProps, demoStyle } from '@official-demo-customizations';
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@button"

export default function ButtonSize() {
  return (
    <div {...demoProps('buttonSizes')}>
      <div {...demoProps('buttonSizeRow')}>
        <Button size="xs" variant="outline">
          Extra Small
        </Button>
        <Button size="icon-xs" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div {...demoProps('buttonSizeRow')}>
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="icon-sm" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div {...demoProps('buttonSizeRow')}>
        <Button variant="outline">Default</Button>
        <Button size="icon" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div {...demoProps('buttonSizeRow')}>
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button size="icon-lg" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  )
}
