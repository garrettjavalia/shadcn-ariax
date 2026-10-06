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
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
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
