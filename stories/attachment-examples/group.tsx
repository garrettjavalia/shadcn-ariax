import {attachmentFull,attachmentWide} from '@attachment-customizations';
import {
  FileCodeIcon,
  FileTextIcon,
  TableIcon,
  XIcon,
  type LucideIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@attachment"

type Item = {
  name: string
  meta: string
  icon?: LucideIcon
  src?: string
}

const items: Item[] = [
  { name: "briefing-notes.pdf", meta: "PDF · 1.4 MB", icon: FileTextIcon },
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22900%22 height=%22600%22 viewBox=%220 0 900 600%22%3E%3Crect width=%22900%22 height=%22600%22 fill=%22%2389a3b2%22/%3E%3Cpath d=%22M0 600L450 80L900 600%22 fill=%22%23506475%22/%3E%3C/svg%3E",
  },
  { name: "customers.csv", meta: "CSV · 18 KB", icon: TableIcon },
  { name: "renderer.tsx", meta: "TSX · 12 KB", icon: FileCodeIcon },
]

export function AttachmentGroupDemo() {
  return (
    <div style={{marginInline:'auto',width:'100%',maxWidth:'24rem',paddingBlock:'3rem'}}>
      <AttachmentGroup {...attachmentFull}>
        {items.map((item) => {
          const Icon = item.icon

          return (
            <Attachment key={item.name} {...attachmentWide}>
              {item.src ? (
                <AttachmentMedia variant="image">
                  <img src={item.src} alt={item.name} />
                </AttachmentMedia>
              ) : Icon ? (
                <AttachmentMedia>
                  <Icon />
                </AttachmentMedia>
              ) : null}
              <AttachmentContent>
                <AttachmentTitle>{item.name}</AttachmentTitle>
                <AttachmentDescription>{item.meta}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label={`Remove ${item.name}`}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          )
        })}
      </AttachmentGroup>
    </div>
  )
}
