import {fullWidth, folderButton, folderChevron, nestedFolder, fileButton, treeWidth, treeStack} from "@collapsible-customizations";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react"

import { Button } from "@button"
import { Card, CardContent, CardHeader } from "@card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@collapsible"
import { Tabs, TabsList, TabsTrigger } from "@tabs"

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] }

export function CollapsibleFileTree() {
  const fileTree: FileTreeItem[] = [
    {
      name: "components",
      items: [
        {
          name: "ui",
          items: [
            { name: "button.tsx" },
            { name: "card.tsx" },
            { name: "dialog.tsx" },
            { name: "input.tsx" },
            { name: "select.tsx" },
            { name: "table.tsx" },
          ],
        },
        { name: "login-form.tsx" },
        { name: "register-form.tsx" },
      ],
    },
    {
      name: "lib",
      items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }],
    },
    {
      name: "hooks",
      items: [
        { name: "use-media-query.ts" },
        { name: "use-debounce.ts" },
        { name: "use-local-storage.ts" },
      ],
    },
    {
      name: "types",
      items: [{ name: "index.d.ts" }, { name: "api.d.ts" }],
    },
    {
      name: "public",
      items: [
        { name: "favicon.ico" },
        { name: "logo.svg" },
        { name: "images" },
      ],
    },
    { name: "app.tsx" },
    { name: "layout.tsx" },
    { name: "globals.css" },
    { name: "package.json" },
    { name: "tsconfig.json" },
    { name: "README.md" },
    { name: ".gitignore" },
  ]

  const renderItem = (fileItem: FileTreeItem) => {
    if ("items" in fileItem) {
      return (
        <Collapsible key={fileItem.name}>
          <Button
            slot="trigger"
            variant="ghost"
            size="sm"
            {...folderButton}
          >
            <ChevronRightIcon {...folderChevron} />
            <FolderIcon />
            {fileItem.name}
          </Button>
          <CollapsibleContent>
            <div {...nestedFolder}>
              {fileItem.items.map((child) => renderItem(child))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }
    return (
      <Button
        key={fileItem.name}
        variant="link"
        size="sm"
        {...fileButton}
      >
        <FileIcon />
        <span>{fileItem.name}</span>
      </Button>
    )
  }

  return (
    <Card {...treeWidth} size="sm">
      <CardHeader>
        <Tabs defaultSelectedKey="explorer">
          <TabsList {...fullWidth}>
            <TabsTrigger id="explorer">Explorer</TabsTrigger>
            <TabsTrigger id="settings">Outline</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div {...treeStack}>
          {fileTree.map((item) => renderItem(item))}
        </div>
      </CardContent>
    </Card>
  )
}
