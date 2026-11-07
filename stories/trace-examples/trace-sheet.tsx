"use client";
import {
  componentExample,
  nativeExample,
} from "@trace-code-block-example-customizations";

import { ChevronRightIcon, FolderSearchIcon } from "lucide-react";
import { Button as ButtonPrimitive } from "react-aria-components";

import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sheet";
import { Trace, TraceIcon, TraceLine, TraceTitle } from "@trace";

export function TraceSheet() {
  return (
    <Trace {...componentExample.s6}>
      <SheetTrigger>
        <ButtonPrimitive>
          <TraceLine>
            <TraceIcon>
              <FolderSearchIcon />
            </TraceIcon>
            <TraceTitle>Explored 4 files</TraceTitle>
            <TraceIcon>
              <ChevronRightIcon />
            </TraceIcon>
          </TraceLine>
        </ButtonPrimitive>
        <Sheet>
          <SheetHeader>
            <SheetTitle>Explored 4 files</SheetTitle>
            <SheetDescription>
              Files read while preparing the response.
            </SheetDescription>
          </SheetHeader>
          <ul {...nativeExample.s10}>
            <li>apps/v4/lib/docs.ts</li>
            <li>apps/v4/lib/components.ts</li>
            <li>apps/v4/next.config.mjs</li>
            <li>apps/v4/package.json</li>
          </ul>
        </Sheet>
      </SheetTrigger>
    </Trace>
  );
}
