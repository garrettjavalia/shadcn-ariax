import {fieldHidden, settingsWidth, settingsRoot, settingsGrid, settingsPanel} from "@collapsible-customizations";
"use client"

import * as React from "react"
import { MaximizeIcon, MinimizeIcon } from "lucide-react"

import { Button } from "@button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@collapsible"
import { Field, FieldGroup, FieldLabel } from "@field"
import { Input } from "@input"

export function CollapsibleSettings() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Card {...settingsWidth} size="sm">
      <CardHeader>
        <CardTitle>Radius</CardTitle>
        <CardDescription>Set the corner radius of the element.</CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible
          isExpanded={isOpen}
          onExpandedChange={setIsOpen}
          {...settingsRoot}
        >
          <FieldGroup {...settingsGrid}>
            <Field>
              <FieldLabel htmlFor="radius-x" {...fieldHidden}>
                Radius X
              </FieldLabel>
              <Input id="radius" placeholder="0" defaultValue={0} />
            </Field>
            <Field>
              <FieldLabel htmlFor="radius-y" {...fieldHidden}>
                Radius Y
              </FieldLabel>
              <Input id="radius" placeholder="0" defaultValue={0} />
            </Field>
            <CollapsibleContent>
              <div {...settingsPanel}>
                <Field>
                  <FieldLabel htmlFor="radius-x" {...fieldHidden}>
                    Radius X
                  </FieldLabel>
                  <Input id="radius" placeholder="0" defaultValue={0} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="radius-y" {...fieldHidden}>
                    Radius Y
                  </FieldLabel>
                  <Input id="radius" placeholder="0" defaultValue={0} />
                </Field>
              </div>
            </CollapsibleContent>
          </FieldGroup>
          <Button slot="trigger" variant="outline" size="icon">
            {isOpen ? <MinimizeIcon /> : <MaximizeIcon />}
          </Button>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
