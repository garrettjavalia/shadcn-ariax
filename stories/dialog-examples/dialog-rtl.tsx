import {narrow,wide,footerStart,hiddenLabel} from '@dialog-customizations';
import { Button } from "@button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dialog"
import { Field, FieldGroup } from "@field"
import { Input } from "@input"
import { Label } from "@label"

export function DialogRtl() {
  return (
    <DialogTrigger>
      <form>
        <Button variant="outline">فتح الحوار</Button>
        <Dialog dir="rtl" data-lang="ar" data-parity-portal {...narrow}>
          <DialogHeader>
            <DialogTitle>تعديل الملف الشخصي</DialogTitle>
            <DialogDescription>
              قم بإجراء تغييرات على ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">الاسم</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">اسم المستخدم</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose variant="outline">إلغاء</DialogClose>
            <Button type="submit">حفظ التغييرات</Button>
          </DialogFooter>
        </Dialog>
      </form>
    </DialogTrigger>
  )
}
