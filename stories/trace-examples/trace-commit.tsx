"use client";
import { componentExample } from "@trace-code-block-example-customizations";

import {
  ChevronRightIcon,
  FilePenIcon,
  FilePlusIcon,
  GitCommitHorizontalIcon,
} from "lucide-react";
import { Button as ButtonPrimitive } from "react-aria-components";

import { CodeBlock, CodeBlockContent, CodeBlockLine } from "@code-block";
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sheet";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@trace";

const files = [
  {
    path: "app/login/page.tsx",
    added: false,
    additions: 2,
    deletions: 2,
    diff: `@@ -14,7 +14,7 @@ export default async function LoginPage({
   searchParams,
 }) {
   const { next } = await searchParams
-  const redirectTo =
-    next && next.startsWith("/") ? next : "/"
+  const redirectTo = safeRedirect(next)
+
   return <LoginForm redirectTo={redirectTo} />
 }`,
  },
  {
    path: "lib/auth/redirect.ts",
    added: true,
    additions: 7,
    deletions: 0,
    diff: `@@ -0,0 +1,7 @@
+export function safeRedirect(next: string | undefined) {
+  if (!next || !next.startsWith("/") || next.startsWith("//")) {
+    return "/"
+  }
+
+  return next
+}`,
  },
];

function DiffLines({ diff }: { diff: string }) {
  return diff.split("\n").map((line, index) => {
    if (line.startsWith("@@")) {
      return (
        <CodeBlockLine key={index} {...componentExample.s12}>
          {line}
        </CodeBlockLine>
      );
    }

    return (
      <CodeBlockLine
        key={index}
        variant={
          line.startsWith("+")
            ? "added"
            : line.startsWith("-")
              ? "removed"
              : "default"
        }
      >
        {line.slice(1)}
      </CodeBlockLine>
    );
  });
}

export function TraceCommit() {
  return (
    <Trace {...componentExample.s6}>
      <TraceCollapsible defaultExpanded>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <GitCommitHorizontalIcon />
            </TraceIcon>
            <TraceTitle>Committed a1b2c3: Fix the login redirect</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {files.map((file) => (
              <SheetTrigger key={file.path}>
                <ButtonPrimitive>
                  <TraceLine>
                    <TraceIcon>
                      {file.added ? <FilePlusIcon /> : <FilePenIcon />}
                    </TraceIcon>
                    <TraceTitle>
                      {file.added ? "Added" : "Edited"} {file.path}
                    </TraceTitle>
                    <TraceDescription {...componentExample.s7}>
                      +{file.additions} −{file.deletions}
                    </TraceDescription>
                    <TraceIcon>
                      <ChevronRightIcon />
                    </TraceIcon>
                  </TraceLine>
                </ButtonPrimitive>
                <Sheet>
                  <SheetHeader>
                    <SheetTitle {...componentExample.s7}>
                      {file.path}
                    </SheetTitle>
                    <SheetDescription>
                      {file.additions} additions, {file.deletions} deletions
                    </SheetDescription>
                  </SheetHeader>
                  <CodeBlock {...componentExample.s13}>
                    <CodeBlockContent>
                      <DiffLines diff={file.diff} />
                    </CodeBlockContent>
                  </CodeBlock>
                </Sheet>
              </SheetTrigger>
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  );
}
