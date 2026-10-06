import {padded} from '@sheet-customizations';
"use client"

import { Button } from "@button"
import { Field, FieldGroup, FieldLabel } from "@field"
import { Input } from "@input"
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sheet"

const translations = {
  en: {
    dir: "ltr",
    values: {
      open: "Open",
      editProfile: "Edit profile",
      description:
        "Make changes to your profile here. Click save when you're done.",
      name: "Name",
      username: "Username",
      save: "Save changes",
      close: "Close",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      open: "فتح",
      editProfile: "تعديل الملف الشخصي",
      description:
        "قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.",
      name: "الاسم",
      username: "اسم المستخدم",
      save: "حفظ التغييرات",
      close: "إغلاق",
    },
  },
  he: {
    dir: "rtl",
    values: {
      open: "פתח",
      editProfile: "עריכת פרופיל",
      description: "בצע שינויים בפרופיל שלך כאן. לחץ שמור כשתסיים.",
      name: "שם",
      username: "שם משתמש",
      save: "שמור שינויים",
      close: "סגור",
    },
  },
}

export function SheetRtl() {
  const language = "ar"; const {dir, values: t} = translations.ar

  return (
    <SheetTrigger>
      <Button variant="outline">{t.open}</Button>
      <Sheet data-parity-portal
        dir={dir}
        side={dir === "rtl" ? "left" : "right"}
        data-lang={dir === "rtl" ? language : undefined}
      >
        <SheetHeader>
          <SheetTitle>{t.editProfile}</SheetTitle>
          <SheetDescription>{t.description}</SheetDescription>
        </SheetHeader>
        <FieldGroup {...padded}>
          <Field>
            <FieldLabel htmlFor="sheet-rtl-name">{t.name}</FieldLabel>
            <Input id="sheet-rtl-name" defaultValue="Pedro Duarte" />
          </Field>
          <Field>
            <FieldLabel htmlFor="sheet-rtl-username">{t.username}</FieldLabel>
            <Input id="sheet-rtl-username" defaultValue="peduarte" />
          </Field>
        </FieldGroup>
        <SheetFooter>
          <Button type="submit">{t.save}</Button>
          <SheetClose variant="outline">{t.close}</SheetClose>
        </SheetFooter>
      </Sheet>
    </SheetTrigger>
  )
}
