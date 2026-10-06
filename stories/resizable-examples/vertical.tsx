import {resizableDemo,resizableHandle,resizableRegistry,resizableNested} from '@resizable-customizations';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@resizable"

export function ResizableVertical() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      {...resizableHandle}
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
  )
}
