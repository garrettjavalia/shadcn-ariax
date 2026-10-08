import { demoProps, demoStyle } from '@official-demo-customizations';
import { Button } from "@button"
import { Spinner } from "@spinner"

export default function ButtonLoading() {
  return (
    <div {...demoProps('row')}>
      <Button variant="outline" isDisabled>
        <Spinner data-icon="inline-start" />
        Generating
      </Button>
      <Button variant="secondary" isDisabled>
        Downloading
        <Spinner data-icon="inline-start" />
      </Button>
    </div>
  )
}
