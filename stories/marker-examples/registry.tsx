import {markerShimmer,markerColumn,markerCenter,markerFlex,markerHover} from '@marker-customizations';
"use client"

import { toast } from "sonner"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@accordion"
import { Button } from "@button"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@marker"
import { Spinner } from "@spinner"
import {FileTextIcon,GitBranchIcon,ClockIcon,ChevronRightIcon,CircleUserIcon,SearchIcon,CheckIcon} from 'lucide-react';


export function MarkerExample() {
  return (
    <div style={{display:'flex',flexDirection:'column',width:'100%',maxWidth:'24rem',gap:'2rem'}}> 
      <Marker>
        <MarkerContent>A default marker</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <FileTextIcon/>
        </MarkerIcon>
        <MarkerContent>Marker with icon</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Marker with a spinner</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent {...markerShimmer}>
          Marker with shimmer effect
        </MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerContent {...markerShimmer}>Thinking...</MarkerContent>
      </Marker>
      <Marker render={(props) => <a href="#" {...props} />}>
        <MarkerIcon>
          <GitBranchIcon/>
        </MarkerIcon>
        <MarkerContent>Marker as a link</MarkerContent>
      </Marker>
      <Marker
        {...markerHover}
        render={(props) => (
          <button {...props} onClick={() => toast("You clicked the button")} />
        )}
      >
        <MarkerIcon>
          <ClockIcon/>
        </MarkerIcon>
        <MarkerContent {...markerFlex}>
          <div>Marker as a button</div>
        </MarkerContent>
        <MarkerIcon>
          <ChevronRightIcon/>
        </MarkerIcon>
      </Marker>
      <Marker>
        <MarkerIcon>
          <CircleUserIcon/>
        </MarkerIcon>
        <MarkerContent>Rhea joined the chat</MarkerContent>
      </Marker>
      <Marker {...markerCenter}>
        <MarkerContent>
          <strong style={{fontWeight:500}}>Olivia Rose</strong> left the chat
        </MarkerContent>
      </Marker>
      <Marker {...markerColumn}>
        <MarkerIcon>
          <FileTextIcon/>
        </MarkerIcon>
        <MarkerContent>Marker with icon at the top</MarkerContent>
      </Marker>
    </div>
  )
}

export function MarkerBorder() {
  return (
    <div style={{display:'flex',flexDirection:'column',width:'100%',maxWidth:'24rem',gap:'0.75rem'}}> 
      <Marker variant="border">
        <MarkerIcon>
          <GitBranchIcon/>
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <SearchIcon/>
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <FileTextIcon/>
        </MarkerIcon>
        <MarkerContent>Opened implementation notes</MarkerContent>
      </Marker>
    </div>
  )
}

export function MarkerSeparator() {
  return (
    <div style={{display:'flex',flexDirection:'column',width:'100%',maxWidth:'24rem',gap:'2rem'}}> 
      <Marker variant="separator">
        <MarkerContent>Worked for 42s</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Compacting conversation</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerContent {...markerShimmer}>Reading 4 files</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerIcon>
          <CheckIcon/>
        </MarkerIcon>
        <MarkerContent>Conversation compacted</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>
          With a <a href="#">link to learn more</a>
        </MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>
          <Button variant="outline">
            <GitBranchIcon/>
            Button
          </Button>
        </MarkerContent>
      </Marker>
    </div>
  )
}

export function MarkerAccordion() {
  return (
    <div style={{display:'flex',flexDirection:'column',width:'100%',maxWidth:'24rem',gap:'1rem'}}> 
      <Accordion>
        <AccordionItem id="1">
          <AccordionTrigger>
            <Marker>
              <MarkerIcon>
                <ClockIcon/>
              </MarkerIcon>
              <MarkerContent>Worked for 42s</MarkerContent>
            </Marker>
          </AccordionTrigger>
          <AccordionContent>
            <p style={{fontSize:'.875rem',lineHeight:'calc(1.25 / .875)',color:'var(--muted-foreground)'}}>
              The user asked for a list of all the files in the current
              directory. The assistant responded with a list of all the files in
              the current directory.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
