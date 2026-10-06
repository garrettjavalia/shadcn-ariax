"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChipList,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "@combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

export function ComboboxMultiple() {
  return (
    <Combobox
      aria-label="Frameworks"
      selectionMode="multiple"
      defaultValue={[frameworks[0]]}
      allowsEmptyCollection
      style={{ width: 250, maxWidth: "100%" }}
    >
      <ComboboxChips>
        <ComboboxChipList<{ name: string }>>
          {(value) => <ComboboxChip id={value.name}>{value.name}</ComboboxChip>}
        </ComboboxChipList>
        <ComboboxChipsInput />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxList
          renderEmptyState={() => (
            <ComboboxEmpty>No items found.</ComboboxEmpty>
          )}
        >
          {frameworks.map((item) => (
            <ComboboxItem key={item} id={item} value={{ name: item }}>
              {item}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
