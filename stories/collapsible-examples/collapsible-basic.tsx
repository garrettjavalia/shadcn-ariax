import {cardWidth, basicRoot, fullWidth, basicChevron, basicPanel} from "@collapsible-customizations";
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@button"
import { Card, CardContent } from "@card"
import {
  Collapsible,
  CollapsibleContent,
} from "@collapsible"

export function CollapsibleBasic() {
  return (
    <Card {...cardWidth}>
      <CardContent>
        <Collapsible {...basicRoot}>
          <Button slot="trigger" variant="ghost" {...fullWidth}>
            Product details
            <ChevronDownIcon {...basicChevron} />
          </Button>
          <CollapsibleContent>
            <div {...basicPanel}>
              <div>
                This panel can be expanded or collapsed to reveal additional
                content.
              </div>
              <Button size="xs">Learn More</Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
