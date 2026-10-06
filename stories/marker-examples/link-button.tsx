import {markerShimmer,markerColumn,markerCenter,markerFlex,markerHover} from '@marker-customizations';
"use client"

import { GitBranchIcon, RotateCcwIcon } from "lucide-react"
import { toast } from "sonner"

import { Marker, MarkerContent, MarkerIcon } from "@marker"

export function MarkerLinkButtonDemo() {
  return (
    <div style={{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'2rem',paddingBlock:'3rem'}}>
      <Marker render={(props) => <a href="#links-and-buttons" {...props} />}>
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>View the pull request</MarkerContent>
      </Marker>
      <Marker
        {...markerHover}
        render={(props) => (
          <button
            {...props}
            type="button"
            onClick={() => toast("You clicked the revert button")}
          />
        )}
      >
        <MarkerIcon>
          <RotateCcwIcon />
        </MarkerIcon>
        <MarkerContent>Revert this change</MarkerContent>
      </Marker>
    </div>
  )
}
