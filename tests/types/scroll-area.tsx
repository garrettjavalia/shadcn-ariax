import { createRef } from "react";
import { ScrollArea } from "@scroll-area";
<ScrollArea
  ref={createRef<HTMLDivElement>()}
  tabIndex={0}
  onScroll={(event) => event.currentTarget.scrollTop}
  style={{ height: 100 }}
/>;
// @ts-expect-error external Tailwind classes are unsupported
<ScrollArea className="h-72" />;
