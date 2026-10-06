import {weightItem,weightLight,weightNormal,weightMedium,weightBold,weightLabel,weightCode} from "@toggle-group-customizations";
"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@field"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@toggle-group"

export function ToggleGroupFontWeightSelector() {
  const [fontWeight, setFontWeight] = React.useState("normal")
  return (
    <Field>
      <FieldLabel>Font Weight</FieldLabel>
      <ToggleGroup
        selectedKeys={[fontWeight]}
        onSelectionChange={(value) => setFontWeight([...value][0] as string)}
        variant="outline"
        spacing={2}
        size="lg"
      >
        <ToggleGroupItem
          id="light"
          aria-label="Light"
          {...weightItem}
        >
          <span {...weightLight}>Aa</span>
          <span {...weightLabel}>Light</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          id="normal"
          aria-label="Normal"
          {...weightItem}
        >
          <span {...weightNormal}>Aa</span>
          <span {...weightLabel}>Normal</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          id="medium"
          aria-label="Medium"
          {...weightItem}
        >
          <span {...weightMedium}>Aa</span>
          <span {...weightLabel}>Medium</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          id="bold"
          aria-label="Bold"
          {...weightItem}
        >
          <span {...weightBold}>Aa</span>
          <span {...weightLabel}>Bold</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <FieldDescription>
        Use{" "}
        <code {...weightCode}>
          font-{fontWeight}
        </code>{" "}
        to set the font weight.
      </FieldDescription>
    </Field>
  )
}
