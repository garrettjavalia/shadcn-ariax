import { demoProps, demoStyle } from '@official-demo-customizations';
import { IconGitBranch, IconGitFork } from "@tabler/icons-react"

import { Button } from "@button"

export default function ButtonWithIcon() {
  return (
    <div {...demoProps('row')}>
      <Button variant="outline">
        <IconGitBranch data-icon="inline-start" /> New Branch
      </Button>
      <Button variant="outline">
        Fork
        <IconGitFork data-icon="inline-end" />
      </Button>
    </div>
  )
}
