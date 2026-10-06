import {resizableDemo,resizableHandle,resizableRegistry,resizableNested} from '@resizable-customizations';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      {...resizableDemo}
    >
      <ResizablePanel defaultSize="50%">
        <div style={{display:'flex',height:200,alignItems:'center',justifyContent:'center',padding:24}}>
          <span style={{fontWeight:600}}>One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="25%">
            <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
              <span style={{fontWeight:600}}>Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="75%">
            <div style={{display:'flex',height:'100%',alignItems:'center',justifyContent:'center',padding:24}}>
              <span style={{fontWeight:600}}>Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
