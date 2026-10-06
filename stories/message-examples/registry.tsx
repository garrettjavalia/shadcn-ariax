import {messageClasses} from "@message-customizations";
import {markerShimmer} from "@marker-customizations";

import {
  Example,
  ExampleWrapper,
} from "../attachment-examples/harness"
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@bubble"
import { Button } from "@button"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@message"
import { Spinner } from "@spinner"
import { IconPlaceholder } from "../attachment-examples/harness"

export default function MessageExample() {
  return (
    <ExampleWrapper>
      <MessageDefault />
      <MessageWithAvatar />
      <MessageGroupExample />
      <MessageGroupChat />
      <MessageHeaderFooter />
      <MessageActions />
      <MessageAttachment />
      <MessageAttachmentGroup />
    </ExampleWrapper>
  )
}

export function MessageDefault() {
  return (
    <Example title="Message">
      <div {...messageClasses.registry10Min}>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>Deploying to prod real quick.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>It&apos;s a one-line change.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <BubbleGroup>
              <Bubble variant="muted">
                <BubbleContent>
                  It&apos;s always a one-line change 😭. Make sure to run the
                  tests this time.
                </BubbleContent>
              </Bubble>
              <Bubble variant="muted">
                <BubbleContent>Alright, go for it.</BubbleContent>
              </Bubble>
            </BubbleGroup>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

export function MessageWithAvatar() {
  return (
    <Example title="Avatar">
      <div {...messageClasses.registry10}>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                {...messageClasses.gray}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>Something went wrong. Any idea?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                I checked the latest deployment and found the build failed
                during dependency installation.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>Something went wrong. Any idea?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://avatar.vercel.sh/shadcn"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent {...messageClasses.space2}>
                <div>
                  I checked the latest deployment and found the build failed
                  during dependency installation.
                </div>
                <div>Can you share the exact error message from the logs?</div>
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="destructive">
              <BubbleContent>Something went wrong. Any idea?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

export function MessageGroupExample() {
  return (
    <Example title="Group">
      <div {...messageClasses.registry10}>
        <MessageGroup>
          <Message>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>I checked the registry addresses.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  The component and example JSON now live under the UI registry.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
        <MessageGroup>
          <Message align="end">
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>I checked the registry addresses.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  The component and example JSON now live under the UI registry.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
        <MessageGroup>
          <Message align="end">
            <MessageAvatar />
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>I checked the registry addresses.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message align="end">
            <MessageAvatar>
              <Avatar>
                <AvatarImage
                  src="https://avatar.vercel.sh/shadcn"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  The component and example JSON now live under the UI registry.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
        <MessageGroup>
          <Message>
            <MessageAvatar />
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>I checked the registry addresses.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <Avatar>
                <AvatarImage
                  src="https://avatar.vercel.sh/shadcn"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>
                  The component and example JSON now live under the UI registry.
                </BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
      </div>
    </Example>
  )
}

export function MessageGroupChat() {
  return (
    <Example title="Group Chat">
      <div {...messageClasses.registry10}>
        <Message align="end">
          <MessageContent>
            <Bubble variant="tinted">
              <BubbleContent>
                Why is the dashboard showing zero users
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <MessageGroup>
          <Message>
            <MessageAvatar />
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>Define &quot;zero.&quot;</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
          <Message>
            <MessageAvatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>What do you mean?</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageGroup>
        <Message align="end">
          <MessageContent>
            <Bubble variant="tinted">
              <BubbleContent>
                <span {...messageClasses.medium}>@eve</span> can you check?
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <Marker role="status">
            <MarkerIcon>
              <Spinner />
            </MarkerIcon>
            <MarkerContent>Checking the logs...</MarkerContent>
          </Marker>
        </Message>
        <Message>
          <MessageContent>
            <MessageHeader>Eve</MessageHeader>
            <Bubble variant="ghost">
              <BubbleContent>
                <span {...messageClasses.pre}>
                  {`I found the following error in the logs:

- Error: No users found
- Stack trace:
  - at src/users/services/user-service.ts:123
  - at src/users/services/get-user.ts:230

Can you check if the users are being created?`}
                </span>
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

export function MessageHeaderFooter() {
  return (
    <Example title="Header and Footer">
      <div {...messageClasses.registry12}>
        <Message align="end">
          <MessageContent>
            <MessageHeader {...messageClasses.end}>You</MessageHeader>
            <Bubble>
              <BubbleContent>
                Can we keep this style quiet and send the update today?
              </BubbleContent>
            </Bubble>
            <MessageFooter {...messageClasses.gap2}>
              <span>Delivered</span>
              <Button variant="ghost" size="xs">
                Undo
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="start">
          <MessageContent>
            <MessageHeader>
              <span>Olivia</span>
              <span {...messageClasses.timestamp}>1m ago</span>
            </MessageHeader>
            <Bubble variant="muted">
              <BubbleContent>
                I checked the logs. The retry finished and the missing invoices
                are included now.
              </BubbleContent>
              <BubbleReactions>
                <Button variant="ghost" size="xs">
                  Thanks
                </Button>
              </BubbleReactions>
            </Bubble>
            <MessageFooter {...messageClasses.gap2}>
              <span>From Support queue</span>
              <Button variant="ghost" size="xs">
                Copy
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <MessageHeader>Marina</MessageHeader>
            <Bubble variant="outline">
              <BubbleContent>
                I drafted the reply with the exact filter path and a link to the
                export history.
              </BubbleContent>
            </Bubble>
            <MessageFooter {...messageClasses.gap2}>
              <span>Draft ready</span>
              <Button variant="outline" size="xs">
                Review
              </Button>
              <Button size="xs">Send</Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="start">
          <MessageContent>
            <MessageHeader>Assistant note</MessageHeader>
            <Bubble variant="ghost">
              <BubbleContent>
                Ghost messages keep long-form assistant notes aligned with the
                surrounding text instead of adding a frame.
              </BubbleContent>
            </Bubble>
            <MessageFooter {...messageClasses.gap2}>
              <span>Internal only</span>
              <Button variant="ghost" size="xs">
                Pin
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <MessageHeader {...messageClasses.end}>
              Automation warning
            </MessageHeader>
            <Bubble variant="destructive">
              <BubbleContent>
                The old export link expires in 10 minutes. Regenerate before
                sending this transcript externally.
              </BubbleContent>
            </Bubble>
            <MessageFooter {...messageClasses.gap2}>
              <span>Needs action</span>
              <Button variant="destructive" size="xs">
                Regenerate
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

export function MessageAttachment() {
  return (
    <Example title="Attachment">
      <div {...messageClasses.registry8}>
        <Message align="end">
          <MessageContent>
            <Attachment orientation="vertical">
              <AttachmentMedia variant="image">
                <img
                  src="/avatar-controlled.svg"
                  alt="Workspace"
                />
              </AttachmentMedia>
            </Attachment>
            <Bubble>
              <BubbleContent>
                Here&apos;s the image. Can you add it to the PDF? Use it for the
                cover page.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                Done. Here&apos;s the PDF with the image added as the cover
                page.
              </BubbleContent>
            </Bubble>
            <Attachment>
              <AttachmentMedia>
                <IconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="FileIcon"
                  phosphor="FileTextIcon"
                  remixicon="RiFileTextLine"
                />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
                <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction
                  type="button"
                  aria-label="Download"
                  size="icon-sm"
                  variant="secondary"
                >
                  <IconPlaceholder
                    lucide="DownloadIcon"
                    tabler="IconDownload"
                    hugeicons="Download01Icon"
                    phosphor="DownloadIcon"
                    remixicon="RiDownloadLine"
                  />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>Thanks. Looks good.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

export function MessageAttachmentGroup() {
  return (
    <Example title="Attachment Group">
      <div {...messageClasses.registry8}>
        <Message align="end">
          <MessageContent>
            <AttachmentGroup {...messageClasses.width80}>
              <Attachment orientation="vertical">
                <AttachmentMedia variant="image">
                  <img
                    src="/avatar-controlled.svg"
                    alt="Workspace"
                  />
                </AttachmentMedia>
              </Attachment>
              <Attachment orientation="vertical">
                <AttachmentMedia variant="image">
                  <img
                    src="/avatar-controlled.svg"
                    alt="Desk"
                  />
                </AttachmentMedia>
              </Attachment>
              <Attachment orientation="vertical">
                <AttachmentMedia variant="image">
                  <img
                    src="/avatar-controlled.svg"
                    alt="Office"
                  />
                </AttachmentMedia>
              </Attachment>
            </AttachmentGroup>
            <Bubble>
              <BubbleContent>
                Here are the brand photos. Can you add them to the deck?
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                Done. Here&apos;s the draft deck and the exported assets.
              </BubbleContent>
            </Bubble>
            <AttachmentGroup {...messageClasses.full}>
              <Attachment {...messageClasses.wide}>
                <AttachmentMedia>
                  <IconPlaceholder
                    lucide="FileTextIcon"
                    tabler="IconFileText"
                    hugeicons="FileIcon"
                    phosphor="FileTextIcon"
                    remixicon="RiFileTextLine"
                  />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>brand-deck.pdf</AttachmentTitle>
                  <AttachmentDescription>PDF · 3.1 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    type="button"
                    aria-label="Download brand-deck.pdf"
                    size="icon-sm"
                    variant="secondary"
                  >
                    <IconPlaceholder
                      lucide="DownloadIcon"
                      tabler="IconDownload"
                      hugeicons="Download01Icon"
                      phosphor="DownloadIcon"
                      remixicon="RiDownloadLine"
                    />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
              <Attachment {...messageClasses.wide}>
                <AttachmentMedia>
                  <IconPlaceholder
                    lucide="PresentationIcon"
                    tabler="IconPresentation"
                    hugeicons="Presentation01Icon"
                    phosphor="PresentationIcon"
                    remixicon="RiSlideshowLine"
                  />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>brand-deck.key</AttachmentTitle>
                  <AttachmentDescription>Keynote · 9 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    type="button"
                    aria-label="Download brand-deck.key"
                    size="icon-sm"
                    variant="secondary"
                  >
                    <IconPlaceholder
                      lucide="DownloadIcon"
                      tabler="IconDownload"
                      hugeicons="Download01Icon"
                      phosphor="DownloadIcon"
                      remixicon="RiDownloadLine"
                    />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
              <Attachment {...messageClasses.wide}>
                <AttachmentMedia>
                  <IconPlaceholder
                    lucide="FileArchiveIcon"
                    tabler="IconFileZip"
                    hugeicons="File01Icon"
                    phosphor="FileZipIcon"
                    remixicon="RiFileZipLine"
                  />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>brand-assets.zip</AttachmentTitle>
                  <AttachmentDescription>ZIP · 4.2 MB</AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    type="button"
                    aria-label="Download brand-assets.zip"
                    size="icon-sm"
                    variant="secondary"
                  >
                    <IconPlaceholder
                      lucide="DownloadIcon"
                      tabler="IconDownload"
                      hugeicons="Download01Icon"
                      phosphor="DownloadIcon"
                      remixicon="RiDownloadLine"
                    />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            </AttachmentGroup>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}

export function MessageActions() {
  return (
    <Example title="Actions">
      <div {...messageClasses.registry10}>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>
                What is the status of the deployment?
              </BubbleContent>
            </Bubble>
            <MessageFooter>
              <Button variant="ghost" size="icon" aria-label="Copy">
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Retry">
                <IconPlaceholder
                  lucide="RefreshCcwIcon"
                  tabler="IconRefresh"
                  hugeicons="ReloadIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                />
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                The install failure is coming from the workspace package. I can
                open the exact log line or retry the deployment.
              </BubbleContent>
            </Bubble>
            <MessageFooter>
              <Button variant="ghost" size="icon" aria-label="Copy">
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Like: thumbs up">
                <IconPlaceholder
                  lucide="ThumbsUpIcon"
                  tabler="IconThumbUp"
                  hugeicons="ThumbsUpIcon"
                  phosphor="ThumbsUpIcon"
                  remixicon="RiThumbUpLine"
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Like: thumbs down"
              >
                <IconPlaceholder
                  lucide="ThumbsDownIcon"
                  tabler="IconThumbDown"
                  hugeicons="ThumbsDownIcon"
                  phosphor="ThumbsDownIcon"
                  remixicon="RiThumbDownLine"
                />
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble>
              <BubbleContent>
                Okay drop me a link. I&apos;ll check it out.
              </BubbleContent>
            </Bubble>
            <MessageFooter {...messageClasses.gap2}>
              <span {...messageClasses.error}>
                Failed to send
              </span>
              <Button variant="secondary" size="xs">
                Retry
              </Button>
            </MessageFooter>
          </MessageContent>
        </Message>
      </div>
    </Example>
  )
}
