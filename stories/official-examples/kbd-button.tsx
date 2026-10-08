import { Button } from "@button"
import { Kbd } from "@kbd"

export default function KbdButton() {
  return (
    <Button variant="outline">
      Accept{" "}
      <Kbd data-icon="inline-end" style={{translate:'2px'}}>
        ⏎
      </Kbd>
    </Button>
  )
}
