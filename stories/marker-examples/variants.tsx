import {markerShimmer,markerColumn,markerCenter,markerFlex,markerHover} from '@marker-customizations';
import { Marker, MarkerContent } from "@marker"

export function MarkerVariantsDemo() {
  return (
    <div style={{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'calc(var(--ariax-spacing, .25rem) * 8)',paddingBlock:'calc(var(--ariax-spacing, .25rem) * 12)'}}>
      <Marker>
        <MarkerContent>A default marker for inline notes.</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>A separator marker</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>A border marker for row boundaries.</MarkerContent>
      </Marker>
    </div>
  )
}
