import { itemCustom } from "@item-customizations";
import { nativeItem } from "./native";
import { InboxIcon } from "lucide-react";
import { Button } from "@button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@item"
export function DefaultVariantItems() {
  return (
    <>
      <Item>
        <ItemContent>
          <ItemTitle>Title Only</ItemTitle>
        </ItemContent>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline">Action</Button>
        </ItemActions>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>Title + Description</ItemTitle>
          <ItemDescription>
            This is a description that provides additional context.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>Title + Description + Button</ItemTitle>
          <ItemDescription>
            This item includes a title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline">Action</Button>
        </ItemActions>
      </Item>
      <Item>
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title</ItemTitle>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item>
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description</ItemTitle>
          <ItemDescription>
            This item includes media, title, and description.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description + Button</ItemTitle>
          <ItemDescription>
            Complete item with all components: media, title, description, and
            button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item>
        <ItemContent>
          <ItemTitle>Multiple Actions</ItemTitle>
          <ItemDescription>
            Item with multiple action buttons in the actions area.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function OutlineVariantItems() {
  return (
    <>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Title Only</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Title + Description</ItemTitle>
          <ItemDescription>
            This is a description that provides additional context.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Title + Description + Button</ItemTitle>
          <ItemDescription>
            This item includes a title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description</ItemTitle>
          <ItemDescription>
            This item includes media, title, and description.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description + Button</ItemTitle>
          <ItemDescription>
            Complete item with all components: media, title, description, and
            button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Multiple Actions</ItemTitle>
          <ItemDescription>
            Item with multiple action buttons in the actions area.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function MutedVariantItems() {
  return (
    <>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Title Only</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Title + Description</ItemTitle>
          <ItemDescription>
            This is a description that provides additional context.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Title + Description + Button</ItemTitle>
          <ItemDescription>
            This item includes a title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description</ItemTitle>
          <ItemDescription>
            This item includes media, title, and description.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description + Button</ItemTitle>
          <ItemDescription>
            Complete item with all components: media, title, description, and
            button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Multiple Actions</ItemTitle>
          <ItemDescription>
            Item with multiple action buttons in the actions area.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function DefaultVariantItemsSmall() {
  return (
    <>
      <Item size="sm">
        <ItemContent>
          <ItemTitle>Title Only</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="sm">
        <ItemContent>
          <ItemTitle>Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item size="sm">
        <ItemContent>
          <ItemTitle>Title + Description</ItemTitle>
          <ItemDescription>
            This is a description that provides additional context.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item size="sm">
        <ItemContent>
          <ItemTitle>Title + Description + Button</ItemTitle>
          <ItemDescription>
            This item includes a title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description</ItemTitle>
          <ItemDescription>
            This item includes media, title, and description.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description + Button</ItemTitle>
          <ItemDescription>
            Complete item with all components: media, title, description, and
            button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item size="sm">
        <ItemContent>
          <ItemTitle>Multiple Actions</ItemTitle>
          <ItemDescription>
            Item with multiple action buttons in the actions area.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function OutlineVariantItemsSmall() {
  return (
    <>
      <Item variant="outline" size="sm">
        <ItemContent>
          <ItemTitle>Title Only</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemContent>
          <ItemTitle>Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm">
        <ItemContent>
          <ItemTitle>Title + Description</ItemTitle>
          <ItemDescription>
            This is a description that provides additional context.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemContent>
          <ItemTitle>Title + Description + Button</ItemTitle>
          <ItemDescription>
            This item includes a title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description</ItemTitle>
          <ItemDescription>
            This item includes media, title, and description.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description + Button</ItemTitle>
          <ItemDescription>
            Complete item with all components: media, title, description, and
            button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm">
        <ItemContent>
          <ItemTitle>Multiple Actions</ItemTitle>
          <ItemDescription>
            Item with multiple action buttons in the actions area.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function MutedVariantItemsSmall() {
  return (
    <>
      <Item variant="muted" size="sm">
        <ItemContent>
          <ItemTitle>Title Only</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="muted" size="sm">
        <ItemContent>
          <ItemTitle>Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted" size="sm">
        <ItemContent>
          <ItemTitle>Title + Description</ItemTitle>
          <ItemDescription>
            This is a description that provides additional context.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted" size="sm">
        <ItemContent>
          <ItemTitle>Title + Description + Button</ItemTitle>
          <ItemDescription>
            This item includes a title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="muted" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="muted" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description</ItemTitle>
          <ItemDescription>
            This item includes media, title, and description.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted" size="sm">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description + Button</ItemTitle>
          <ItemDescription>
            Complete item with all components: media, title, description, and
            button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="muted" size="sm">
        <ItemContent>
          <ItemTitle>Multiple Actions</ItemTitle>
          <ItemDescription>
            Item with multiple action buttons in the actions area.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function DefaultVariantItemsExtraSmall() {
  return (
    <>
      <Item size="xs">
        <ItemContent>
          <ItemTitle>Title Only</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="xs">
        <ItemContent>
          <ItemTitle>Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item size="xs">
        <ItemContent>
          <ItemTitle>Title + Description</ItemTitle>
          <ItemDescription>
            This is a description that provides additional context.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item size="xs">
        <ItemContent>
          <ItemTitle>Title + Description + Button</ItemTitle>
          <ItemDescription>
            This item includes a title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description</ItemTitle>
          <ItemDescription>
            This item includes media, title, and description.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description + Button</ItemTitle>
          <ItemDescription>
            Complete item with all components: media, title, description, and
            button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item size="xs">
        <ItemContent>
          <ItemTitle>Multiple Actions</ItemTitle>
          <ItemDescription>
            Item with multiple action buttons in the actions area.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function OutlineVariantItemsExtraSmall() {
  return (
    <>
      <Item variant="outline" size="xs">
        <ItemContent>
          <ItemTitle>Title Only</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemContent>
          <ItemTitle>Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="xs">
        <ItemContent>
          <ItemTitle>Title + Description</ItemTitle>
          <ItemDescription>
            This is a description that provides additional context.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemContent>
          <ItemTitle>Title + Description + Button</ItemTitle>
          <ItemDescription>
            This item includes a title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description</ItemTitle>
          <ItemDescription>
            This item includes media, title, and description.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description + Button</ItemTitle>
          <ItemDescription>
            Complete item with all components: media, title, description, and
            button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="xs">
        <ItemContent>
          <ItemTitle>Multiple Actions</ItemTitle>
          <ItemDescription>
            Item with multiple action buttons in the actions area.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function MutedVariantItemsExtraSmall() {
  return (
    <>
      <Item variant="muted" size="xs">
        <ItemContent>
          <ItemTitle>Title Only</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="muted" size="xs">
        <ItemContent>
          <ItemTitle>Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted" size="xs">
        <ItemContent>
          <ItemTitle>Title + Description</ItemTitle>
          <ItemDescription>
            This is a description that provides additional context.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted" size="xs">
        <ItemContent>
          <ItemTitle>Title + Description + Button</ItemTitle>
          <ItemDescription>
            This item includes a title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted" size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="muted" size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Button</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="muted" size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description</ItemTitle>
          <ItemDescription>
            This item includes media, title, and description.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted" size="xs">
        <ItemMedia variant="icon">
          <InboxIcon
            />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Media + Title + Description + Button</ItemTitle>
          <ItemDescription>
            Complete item with all components: media, title, description, and
            button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="muted" size="xs">
        <ItemContent>
          <ItemTitle>Multiple Actions</ItemTitle>
          <ItemDescription>
            Item with multiple action buttons in the actions area.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Confirm</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function DefaultLinkItems() {
  return (
    <>
      <ItemGroup>
        <Item href="#">
          <ItemContent>
            <ItemTitle>Title Only (Link)</ItemTitle>
          </ItemContent>
        </Item>
        <Item href="#">
          <ItemContent>
            <ItemTitle>Title + Description (Link)</ItemTitle>
            <ItemDescription>
              Clickable item with title and description.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item href="#">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Media + Title (Link)</ItemTitle>
          </ItemContent>
        </Item>
        <Item href="#">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Media + Title + Description (Link)</ItemTitle>
            <ItemDescription>
              Complete link item with media, title, and description.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item href="#">
          <ItemContent>
            <ItemTitle>With Actions (Link)</ItemTitle>
            <ItemDescription>
              Link item that also has action buttons.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </>
  )
}

export function OutlineLinkItems() {
  return (
    <>
      <ItemGroup>
        <Item href="#" variant="outline">
          <ItemContent>
            <ItemTitle>Title Only (Link)</ItemTitle>
          </ItemContent>
        </Item>
        <Item href="#" variant="outline">
          <ItemContent>
            <ItemTitle>Title + Description (Link)</ItemTitle>
            <ItemDescription>
              Clickable item with title and description.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item href="#" variant="outline">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Media + Title (Link)</ItemTitle>
          </ItemContent>
        </Item>
        <Item href="#" variant="outline">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Media + Title + Description (Link)</ItemTitle>
            <ItemDescription>
              Complete link item with media, title, and description.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item href="#" variant="outline">
          <ItemContent>
            <ItemTitle>With Actions (Link)</ItemTitle>
            <ItemDescription>
              Link item that also has action buttons.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </>
  )
}

export function MutedLinkItems() {
  return (
    <>
      <ItemGroup>
        <Item href="#" variant="muted">
          <ItemContent>
            <ItemTitle>Title Only (Link)</ItemTitle>
          </ItemContent>
        </Item>
        <Item href="#" variant="muted">
          <ItemContent>
            <ItemTitle>Title + Description (Link)</ItemTitle>
            <ItemDescription>
              Clickable item with title and description.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item href="#" variant="muted">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Media + Title (Link)</ItemTitle>
          </ItemContent>
        </Item>
        <Item href="#" variant="muted">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Media + Title + Description (Link)</ItemTitle>
            <ItemDescription>
              Complete link item with media, title, and description.
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item href="#" variant="muted">
          <ItemContent>
            <ItemTitle>With Actions (Link)</ItemTitle>
            <ItemDescription>
              Link item that also has action buttons.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </>
  )
}

export function DefaultItemGroup() {
  return (
    <>
      <ItemGroup>
        <Item>
          <ItemContent>
            <ItemTitle>Item 1</ItemTitle>
            <ItemDescription>First item in the group.</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Item 2</ItemTitle>
            <ItemDescription>Second item in the group.</ItemDescription>
          </ItemContent>
        </Item>
        <Item>
          <ItemContent>
            <ItemTitle>Item 3</ItemTitle>
            <ItemDescription>Third item in the group.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </>
  )
}

export function OutlineItemGroup() {
  return (
    <>
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Item 1</ItemTitle>
            <ItemDescription>First item with icon.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Item 2</ItemTitle>
            <ItemDescription>Second item with icon.</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Item 3</ItemTitle>
            <ItemDescription>Third item with icon.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </>
  )
}

export function MutedItemGroup() {
  return (
    <>
      <ItemGroup>
        <Item variant="muted">
          <ItemContent>
            <ItemTitle>Item 1</ItemTitle>
            <ItemDescription>First item in muted group.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </ItemActions>
        </Item>
        <Item variant="muted">
          <ItemContent>
            <ItemTitle>Item 2</ItemTitle>
            <ItemDescription>Second item in muted group.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </ItemActions>
        </Item>
        <Item variant="muted">
          <ItemContent>
            <ItemTitle>Item 3</ItemTitle>
            <ItemDescription>Third item in muted group.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Action
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    </>
  )
}

export function ItemSeparatorExample() {
  return (
    <>
      <ItemGroup>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Inbox</ItemTitle>
            <ItemDescription>View all incoming messages.</ItemDescription>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Sent</ItemTitle>
            <ItemDescription>View all sent messages.</ItemDescription>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Drafts</ItemTitle>
            <ItemDescription>View all draft messages.</ItemDescription>
          </ItemContent>
        </Item>
        <ItemSeparator />
        <Item variant="outline">
          <ItemMedia variant="icon">
            <InboxIcon
              />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Archive</ItemTitle>
            <ItemDescription>View archived messages.</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </>
  )
}

export function ItemHeaderExamples() {
  return (
    <>
      <Item>
        <ItemHeader>
          <span {...nativeItem("text-sm font-medium")}>Design System</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Component Library</ItemTitle>
          <ItemDescription>
            A comprehensive collection of reusable UI components for building
            consistent interfaces.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemHeader>
          <span {...nativeItem("text-sm font-medium")}>Marketing</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Campaign Analytics</ItemTitle>
          <ItemDescription>
            Track performance metrics and engagement rates across all marketing
            channels.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemHeader>
          <span {...nativeItem("text-sm font-medium")}>Engineering</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>API Documentation</ItemTitle>
          <ItemDescription>
            Complete reference guide for all available endpoints and
            authentication methods.
          </ItemDescription>
        </ItemContent>
      </Item>
    </>
  )
}

export function ItemFooterExamples() {
  return (
    <>
      <Item>
        <ItemContent>
          <ItemTitle>Quarterly Report Q4 2024</ItemTitle>
          <ItemDescription>
            Financial overview including revenue, expenses, and growth metrics
            for the fourth quarter.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span {...nativeItem("text-sm text-muted-foreground")}>
            Last updated 2 hours ago
          </span>
        </ItemFooter>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>User Research Findings</ItemTitle>
          <ItemDescription>
            Insights from interviews and surveys conducted with 50+ users across
            different demographics.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span {...nativeItem("text-sm text-muted-foreground")}>
            Created by Sarah Chen
          </span>
        </ItemFooter>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Product Roadmap</ItemTitle>
          <ItemDescription>
            Planned features and improvements scheduled for the next three
            months.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span {...nativeItem("text-sm text-muted-foreground")}>12 comments</span>
        </ItemFooter>
      </Item>
    </>
  )
}

export function ItemHeaderAndFooterExamples() {
  return (
    <>
      <Item>
        <ItemHeader>
          <span {...nativeItem("text-sm font-medium")}>Team Project</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Website Redesign</ItemTitle>
          <ItemDescription>
            Complete overhaul of the company website with modern design
            principles and improved user experience.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span {...nativeItem("text-sm text-muted-foreground")}>
            Updated 5 minutes ago
          </span>
        </ItemFooter>
      </Item>
      <Item variant="outline">
        <ItemHeader>
          <span {...nativeItem("text-sm font-medium")}>Client Work</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Mobile App Development</ItemTitle>
          <ItemDescription>
            Building a cross-platform mobile application for iOS and Android
            with React Native.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span {...nativeItem("text-sm text-muted-foreground")}>
            Status: In Progress
          </span>
        </ItemFooter>
      </Item>
      <Item variant="muted">
        <ItemHeader>
          <span {...nativeItem("text-sm font-medium")}>Documentation</span>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>API Integration Guide</ItemTitle>
          <ItemDescription>
            Step-by-step instructions for integrating third-party APIs with
            authentication and error handling.
          </ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span {...nativeItem("text-sm text-muted-foreground")}>
            Category: Technical • 3 attachments
          </span>
        </ItemFooter>
      </Item>
    </>
  )
}

export function DefaultVariantItemsWithImage() {
  return (
    <>
      <Item>
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="Project"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Project Dashboard</ItemTitle>
          <ItemDescription>
            Overview of project settings and configuration.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item>
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="Document"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document</ItemTitle>
          <ItemDescription>A document with metadata displayed.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            View
          </Button>
        </ItemActions>
      </Item>
      <Item>
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="File"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>File Attachment</ItemTitle>
          <ItemDescription>
            Complete file with image, title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Download</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function OutlineVariantItemsWithImage() {
  return (
    <>
      <Item variant="outline">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="Project"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Project Dashboard</ItemTitle>
          <ItemDescription>
            Overview of project settings and configuration.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="Document"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document</ItemTitle>
          <ItemDescription>A document with metadata displayed.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            View
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="File"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>File Attachment</ItemTitle>
          <ItemDescription>
            Complete file with image, title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Download</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function OutlineVariantItemsWithImageSmall() {
  return (
    <>
      <Item variant="outline" size="sm">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="Project"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Project Dashboard</ItemTitle>
          <ItemDescription>
            Overview of project settings and configuration.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="Document"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document</ItemTitle>
          <ItemDescription>A document with metadata displayed.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            View
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="File"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>File Attachment</ItemTitle>
          <ItemDescription>
            Complete file with image, title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Download</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function OutlineVariantItemsWithImageExtraSmall() {
  return (
    <>
      <Item variant="outline" size="xs">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="Project"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Project Dashboard</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="Document"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            View
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="File"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>File Attachment</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Download</Button>
        </ItemActions>
      </Item>
    </>
  )
}

export function MutedVariantItemsWithImage() {
  return (
    <>
      <Item variant="muted">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="Project"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Project Dashboard</ItemTitle>
          <ItemDescription>
            Overview of project settings and configuration.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="Document"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document</ItemTitle>
          <ItemDescription>A document with metadata displayed.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            View
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="image">
          <img
            src="/avatar-controlled.svg"
            alt="File"
            width={40}
            height={40}
            {...nativeItem("object-cover grayscale")}
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>File Attachment</ItemTitle>
          <ItemDescription>
            Complete file with image, title, description, and action button.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Download</Button>
        </ItemActions>
      </Item>
    </>
  )
}
