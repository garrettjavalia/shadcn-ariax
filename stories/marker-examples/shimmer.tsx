import {markerShimmer,markerColumn,markerCenter,markerFlex,markerHover} from '@marker-customizations';
import { Marker, MarkerContent } from "@marker"

export function MarkerShimmerDemo() {
  return (
    <div style={{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'2rem',paddingBlock:'3rem'}}>
      <Marker role="status">
        <MarkerContent {...markerShimmer}>Thinking...</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerContent {...markerShimmer}>Reading 4 files</MarkerContent>
      </Marker>
    </div>
  )
}
