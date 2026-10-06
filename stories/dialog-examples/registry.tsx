import {Button} from '@button';
import {Dialog,DialogTrigger,DialogHeader,DialogTitle,DialogDescription,DialogFooter,DialogClose} from '@dialog';
import {Field,FieldGroup,FieldLabel} from '@field';
import {Input} from '@input';
export function DialogWithForm() {
  return (
    <>
      <DialogTrigger>
        <form>
          <Button variant="outline">Edit Profile</Button>
          <Dialog data-parity-portal>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done. Your profile will be updated immediately.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name-1">Name</FieldLabel>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </Field>
              <Field>
                <FieldLabel htmlFor="username-1">Username</FieldLabel>
                <Input
                  id="username-1"
                  name="username"
                  defaultValue="@peduarte"
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose variant="outline">Cancel</DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </Dialog>
        </form>
      </DialogTrigger>
    </>
  )
}

export function DialogScrollableContent() {
  return (
    <>
      <DialogTrigger>
        <Button variant="outline">Scrollable Content</Button>
        <Dialog data-parity-portal>
          <DialogHeader>
            <DialogTitle>Scrollable Content</DialogTitle>
            <DialogDescription>
              This is a dialog with scrollable content.
            </DialogDescription>
          </DialogHeader>
          <div style={{scrollbarWidth:"none",maxHeight:"70vh",overflowY:"auto",marginInline:-16,paddingInline:16}}>
            {Array.from({ length: 10 }).map((_, index) => (
              <p
                key={index}
                style={{marginBottom:16,lineHeight:1.5}}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            ))}
          </div>
        </Dialog>
      </DialogTrigger>
    </>
  )
}

export function DialogWithStickyFooter() {
  return (
    <>
      <DialogTrigger>
        <Button variant="outline">Sticky Footer</Button>
        <Dialog data-parity-portal>
          <DialogHeader>
            <DialogTitle>Scrollable Content</DialogTitle>
            <DialogDescription>
              This is a dialog with scrollable content.
            </DialogDescription>
          </DialogHeader>
          <div style={{scrollbarWidth:"none",maxHeight:"70vh",overflowY:"auto",marginInline:-16,paddingInline:16}}>
            {Array.from({ length: 10 }).map((_, index) => (
              <p
                key={index}
                style={{marginBottom:16,lineHeight:1.5}}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            ))}
          </div>
          <DialogFooter>
            <DialogClose variant="outline">Close</DialogClose>
          </DialogFooter>
        </Dialog>
      </DialogTrigger>
    </>
  )
}

export function DialogNoCloseButton() {
  return (
    <>
      <DialogTrigger>
        <Button variant="outline">No Close Button</Button>
        <Dialog data-parity-portal showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>No Close Button</DialogTitle>
            <DialogDescription>
              This dialog doesn&apos;t have a close button in the top-right
              corner.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose variant="outline">Close</DialogClose>
          </DialogFooter>
        </Dialog>
      </DialogTrigger>
    </>
  )
}

