import {scrollVertical,scrollHorizontal,scrollSeparator,scrollRegistryVertical,scrollRegistryHorizontal} from "@scroll-area-customizations";
import * as React from "react"

import { ScrollArea } from "@scroll-area"
import { Separator } from "@separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function ScrollAreaDemo() {
  return (
    <ScrollArea {...scrollVertical}>
      <div style={{padding:16}}>
        <h4 style={{marginBottom:16,fontSize:'.875rem',lineHeight:1,fontWeight:500}}>Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div style={{fontSize:'.875rem',lineHeight:'calc(1.25 / .875)'}}>{tag}</div>
            <Separator {...scrollSeparator} />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
