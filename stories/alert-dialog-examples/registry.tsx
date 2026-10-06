import{AlertDialog,AlertDialogTrigger,AlertDialogHeader,AlertDialogTitle,AlertDialogDescription,AlertDialogFooter,AlertDialogCancel,AlertDialogAction,AlertDialogMedia}from'@alert-dialog';
import{Dialog,DialogTrigger,DialogHeader,DialogTitle,DialogDescription,DialogFooter}from'@dialog';
import{Button}from'@button';
import{BluetoothIcon,Trash2Icon}from'lucide-react';
import{destructive}from'@alert-dialog-customizations';
export function AlertDialogBasic() {
  return (
    <>
      <AlertDialogTrigger>
        <Button variant="outline">Default</Button>
        <AlertDialog data-parity-portal>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </AlertDialogTrigger>
    </>
  )
}

export function AlertDialogSmall() {
  return (
    <>
      <AlertDialogTrigger>
        <Button variant="outline">Small</Button>
        <AlertDialog data-parity-portal size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
            <AlertDialogAction>Allow</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </AlertDialogTrigger>
    </>
  )
}

export function AlertDialogWithMedia() {
  return (
    <>
      <AlertDialogTrigger>
        <Button variant="outline">Default (Media)</Button>
        <AlertDialog data-parity-portal>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <BluetoothIcon/>
            </AlertDialogMedia>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account and remove your data
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </AlertDialogTrigger>
    </>
  )
}

export function AlertDialogSmallWithMedia() {
  return (
    <>
      <AlertDialogTrigger>
        <Button variant="outline">Small (Media)</Button>

        <AlertDialog data-parity-portal size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <BluetoothIcon/>
            </AlertDialogMedia>
            <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
            <AlertDialogAction>Allow</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </AlertDialogTrigger>
    </>
  )
}

export function AlertDialogDestructive() {
  return (
    <>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete Chat</Button>
        <AlertDialog data-parity-portal size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia {...destructive}>
              <Trash2Icon/>
            </AlertDialogMedia>
            <AlertDialogTitle>Delete chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this chat conversation. View{" "}
              <a href="#">Settings</a> delete any memories saved during this
              chat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </AlertDialogTrigger>
    </>
  )
}

export function AlertDialogInDialog() {
  return (
    <>
      <DialogTrigger>
        <Button variant="outline">Open Dialog</Button>
        <Dialog data-parity-portal>
          <DialogHeader>
            <DialogTitle>Alert Dialog Example</DialogTitle>
            <DialogDescription>
              Click the button below to open an alert dialog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <AlertDialogTrigger>
              <Button>Open Alert Dialog</Button>
              <AlertDialog data-parity-portal size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialog>
            </AlertDialogTrigger>
          </DialogFooter>
        </Dialog>
      </DialogTrigger>
    </>
  )
}
