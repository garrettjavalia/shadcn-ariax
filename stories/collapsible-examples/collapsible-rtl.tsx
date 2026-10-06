import {demoRoot, demoHeader, demoTitle, toggleSize, hidden, statusRow, muted, medium, panelStack, detailBox} from "@collapsible-customizations";
"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import { Button } from "@button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@collapsible"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      orderNumber: "Order #4189",
      status: "Status",
      shipped: "Shipped",
      shippingAddress: "Shipping address",
      address: "100 Market St, San Francisco",
      items: "Items",
      itemsDescription: "2x Studio Headphones",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      orderNumber: "الطلب #4189",
      status: "الحالة",
      shipped: "تم الشحن",
      shippingAddress: "عنوان الشحن",
      address: "100 Market St, San Francisco",
      items: "العناصر",
      itemsDescription: "2x سماعات الاستوديو",
    },
  },
  he: {
    dir: "rtl",
    values: {
      orderNumber: "הזמנה #4189",
      status: "סטטוס",
      shipped: "נשלח",
      shippingAddress: "כתובת משלוח",
      address: "100 Market St, San Francisco",
      items: "פריטים",
      itemsDescription: "2x אוזניות סטודיו",
    },
  },
}

export function CollapsibleRtl() {
  const { dir, t } = useTranslation(translations, "ar")
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      isExpanded={isOpen}
      onExpandedChange={setIsOpen}
      {...demoRoot}
      dir={dir}
    >
      <div {...demoHeader}>
        <h4 {...demoTitle}>{t.orderNumber}</h4>
        <Button slot="trigger" variant="ghost" size="icon" {...toggleSize}>
          <ChevronsUpDown />
          <span {...hidden}>Toggle details</span>
        </Button>
      </div>
      <div {...statusRow}>
        <span {...muted}>{t.status}</span>
        <span {...medium}>{t.shipped}</span>
      </div>
      <CollapsibleContent>
        <div {...panelStack}>
          <div {...detailBox}>
            <p {...medium}>{t.shippingAddress}</p>
            <p {...muted}>{t.address}</p>
          </div>
          <div {...detailBox}>
            <p {...medium}>{t.items}</p>
            <p {...muted}>{t.itemsDescription}</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
