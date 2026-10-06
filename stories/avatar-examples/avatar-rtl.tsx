"use client"
// Fixed official example; imports and customization adapters are shared.
import {avatarCustom,avatarLayout} from "@avatar-customizations";

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@avatar"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      moreUsers: "+3",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      moreUsers: "+٣",
    },
  },
  he: {
    dir: "rtl",
    values: {
      moreUsers: "+3",
    },
  },
}

export function AvatarRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div
      {...avatarLayout("layout")}
      dir={dir}
    >
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          {...avatarCustom('grayscale')}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
        <AvatarBadge {...avatarCustom('bg-green-600 dark:bg-green-800')} />
      </Avatar>
      <AvatarGroup {...avatarCustom('grayscale')}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>{t.moreUsers}</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
