import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@resizable";
import type {
  GroupImperativeHandle,
  PanelImperativeHandle,
} from "react-resizable-panels";
import type { RefObject } from "react";
declare const group: RefObject<GroupImperativeHandle | null>,
  panel: RefObject<PanelImperativeHandle | null>;
<ResizablePanelGroup
  groupRef={group}
  orientation="vertical"
  style={{ height: 200 }}
>
  <ResizablePanel panelRef={panel} defaultSize="50%" />
  <ResizableHandle withHandle />
</ResizablePanelGroup>;
// @ts-expect-error external className is unsupported
<ResizableHandle className="w-1" />;
// @ts-expect-error panel also uses StyleX
<ResizablePanel className="p-2" />;
