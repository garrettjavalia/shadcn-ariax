import {attachmentFull} from '@attachment-customizations';
import { XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@attachment"

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

export function AttachmentImage() {
  return (
    <div style={{marginInline:'auto',width:'100%',maxWidth:'24rem',paddingBlock:'3rem'}}>
      <AttachmentGroup {...attachmentFull}>
        {images.map((image) => (
          <Attachment key={image.name} orientation="vertical">
            <AttachmentMedia variant="image">
              <img src={image.src} alt={image.alt} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{image.name}</AttachmentTitle>
              <AttachmentDescription>{image.meta}</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label={`Remove ${image.name}`}>
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
            <AttachmentTrigger
              render={(props) => (
                <a
                  {...props}
                  href={image.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${image.name}`}
                />
              )}
            />
          </Attachment>
        ))}
      </AttachmentGroup>
    </div>
  )
}
