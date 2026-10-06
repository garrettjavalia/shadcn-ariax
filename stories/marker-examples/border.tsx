import {markerShimmer,markerColumn,markerCenter,markerFlex,markerHover} from '@marker-customizations';
import { FileTextIcon, GitBranchIcon, SearchIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@marker"

export function MarkerBorderDemo() {
  return (
    <div style={{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'.75rem',paddingBlock:'3rem'}}>
      <Marker variant="border">
        <MarkerIcon>
          <GitBranchIcon />
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <SearchIcon />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <FileTextIcon />
        </MarkerIcon>
        <MarkerContent>Opened implementation notes</MarkerContent>
      </Marker>
    </div>
  )
}
