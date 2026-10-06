import {resizableDemo,resizableHandle,resizableRegistry,resizableNested} from '@resizable-customizations';
"use client"

import * as React from "react"

import {
  useTranslation,
  type Translations,
} from "../dropdown-menu-examples/language-selector"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@resizable"

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      one: "One",
      two: "Two",
      three: "Three",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      one: "واحد",
      two: "اثنان",
      three: "ثلاثة",
    },
  },
  he: {
    dir: "rtl",
    values: {
      one: "אחד",
      two: "שניים",
      three: "שלושה",
    },
  },
}

export function ResizableRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      {...resizableDemo}
      dir={dir}
    >
      <ResizablePanel defaultSize="50%">
        <div style={{display:'flex',height:200,alignItems:'center',justifyContent:'center',padding:24}}>
          <span style={{fontWeight:600}}>{t.one}</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical" dir={dir}>
          <ResizablePanel defaultSize="25%">
            <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
              <span style={{fontWeight:600}}>{t.two}</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="75%">
            <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
              <span style={{fontWeight:600}}>{t.three}</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
