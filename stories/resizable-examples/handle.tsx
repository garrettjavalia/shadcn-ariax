import {resizableDemo,resizableHandle,resizableRegistry,resizableNested} from '@resizable-customizations';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@resizable"

export default function ResizableHandleDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      {...resizableHandle}
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
  )
}
