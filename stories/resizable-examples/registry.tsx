import {resizableDemo,resizableHandle,resizableRegistry,resizableNested} from '@resizable-customizations';
"use client"

import * as React from "react"
import type { Layout } from "react-resizable-panels"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@resizable"


export function ResizableHorizontal() {
  return (
    <>
      <ResizablePanelGroup
        orientation="horizontal"
        {...resizableRegistry}
      >
        <ResizablePanel defaultSize="25%">
          <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
            <span style={{fontWeight:600}}>Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="75%">
          <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
            <span style={{fontWeight:600}}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export function ResizableVertical() {
  return (
    <>
      <ResizablePanelGroup
        orientation="vertical"
        {...resizableRegistry}
      >
        <ResizablePanel defaultSize="25%">
          <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
            <span style={{fontWeight:600}}>Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="75%">
          <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
            <span style={{fontWeight:600}}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export function ResizableWithHandle() {
  return (
    <>
      <ResizablePanelGroup
        orientation="horizontal"
        {...resizableRegistry}
      >
        <ResizablePanel defaultSize="25%">
          <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
            <span style={{fontWeight:600}}>Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="75%">
          <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
            <span style={{fontWeight:600}}>Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export function ResizableNested() {
  return (
    <>
      <ResizablePanelGroup
        orientation="horizontal"
        {...resizableNested}
      >
        <ResizablePanel defaultSize="50%">
          <div style={{display:'flex',height:200,alignItems:'center',justifyContent:'center',padding:24}}>
            <span style={{fontWeight:600}}>One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="50%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="25%">
              <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
                <span style={{fontWeight:600}}>Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize="75%">
              <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
                <span style={{fontWeight:600}}>Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}

export function ResizableControlled() {
  const [layout, setLayout] = React.useState<Layout>({})

  return (
    <>
      <ResizablePanelGroup
        orientation="horizontal"
        {...resizableRegistry}
        onLayoutChange={setLayout}
      >
        <ResizablePanel defaultSize="30%" id="left" minSize="20%">
          <div style={{display:'flex',height:'100%',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,padding:24}}>
            <span style={{fontWeight:600}}>
              {Math.round(layout.left ?? 30)}%
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="70%" id="right" minSize="30%">
          <div style={{display:'flex',height:'100%',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,padding:24}}>
            <span style={{fontWeight:600}}>
              {Math.round(layout.right ?? 70)}%
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
