import {scrollVertical,scrollHorizontal,scrollSeparator,scrollRegistryVertical,scrollRegistryHorizontal} from "@scroll-area-customizations";
import * as React from "react"
import { ScrollArea } from "@scroll-area"
import { Separator } from "@separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const works = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyav",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
] as const

export function ScrollAreaVertical() {
  return (
    <>
      <ScrollArea {...scrollRegistryVertical}>
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
    </>
  )
}

export function ScrollAreaHorizontal() {
  return (
    <>
      <ScrollArea {...scrollRegistryHorizontal}>
        <div style={{display:'flex',gap:16}}>
          {works.map((artwork) => (
            <figure key={artwork.artist} style={{flexShrink:0}}>
              <div style={{overflow:'hidden',borderRadius:'calc(var(--radius) * .8)'}}>
                <img
                  src="/avatar-controlled.svg"
                  alt={`Photo by ${artwork.artist}`}
                  style={{aspectRatio:'3/4',height:'fit-content',width:'fit-content',objectFit:'cover'}}
                  width={300}
                  height={400}
                />
              </div>
              <figcaption style={{paddingTop:8,fontSize:'.75rem',lineHeight:'calc(1 / .75)',color:'var(--muted-foreground)'}}>
                Photo by{" "}
                <span style={{fontWeight:600,color:'var(--foreground)'}}>
                  {artwork.artist}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
