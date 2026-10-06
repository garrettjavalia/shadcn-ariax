import {attachmentFull} from '@attachment-customizations';
import { FileCodeIcon, XIcon } from "lucide-react"

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
import { Spinner } from "@spinner"

const images = [
  {
    name: "workspace.png",
    meta: "PNG · 820 KB",
    src: "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22900%22 height=%22600%22 viewBox=%220 0 900 600%22%3E%3Crect width=%22900%22 height=%22600%22 fill=%22%2389a3b2%22/%3E%3Cpath d=%22M0 600L450 80L900 600%22 fill=%22%23506475%22/%3E%3C/svg%3E",
    alt: "Workspace",
  },
  {
    name: "desk-reference.jpg",
    meta: "JPG · 1.1 MB",
    src: "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22900%22 height=%22600%22 viewBox=%220 0 900 600%22%3E%3Crect width=%22900%22 height=%22600%22 fill=%22%2389a3b2%22/%3E%3Cpath d=%22M0 600L450 80L900 600%22 fill=%22%23506475%22/%3E%3C/svg%3E",
    alt: "Desk",
  },
  {
    name: "office-reference.jpg",
    meta: "JPG · 940 KB",
    src: "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22900%22 height=%22600%22 viewBox=%220 0 900 600%22%3E%3Crect width=%22900%22 height=%22600%22 fill=%22%2389a3b2%22/%3E%3Cpath d=%22M0 600L450 80L900 600%22 fill=%22%23506475%22/%3E%3C/svg%3E",
    alt: "Office",
  },
]

export function AttachmentDemo() {
  return (
    <div style={{marginInline:'auto',display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'.75rem',paddingBlock:'3rem'}}>
      <AttachmentGroup>
        {images.map((image) => (
          <Attachment key={image.name} orientation="vertical">
            <AttachmentMedia variant="image">
              <img src={image.src} alt={image.alt} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{image.name}</AttachmentTitle>
              <AttachmentDescription>{image.meta}</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        ))}
      </AttachmentGroup>
      <Attachment state="uploading" {...attachmentFull}>
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
          <AttachmentDescription>Uploading · 64%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel upload">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment {...attachmentFull}>
        <AttachmentMedia>
          <FileCodeIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
          <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove message-renderer.tsx">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </div>
  )
}
