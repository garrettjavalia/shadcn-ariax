"use client";
import { nativeExample } from "@trace-code-block-example-customizations";

import { TerminalIcon } from "lucide-react";

import {
  useTranslation,
  type Translations,
} from "../../generated/upstream/shadcn/apps/v4/components/language-selector";
import { useHighlightedCode } from "@code-block";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@code-block";

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      description: "Install the packages, then start the dev server.",
      title: "Terminal",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      description: "ثبّت الحزم، ثم شغّل خادم التطوير.",
      title: "الطرفية",
    },
  },
  he: {
    dir: "rtl",
    values: {
      description: "התקן את החבילות, ואז הפעל את שרת הפיתוח.",
      title: "מסוף",
    },
  },
};

const code = `pnpm add ai @ai-sdk/react zod
pnpm dev`;

export function CodeBlockRtl() {
  const { dir, t } = useTranslation(translations, "ar");
  const lines = useHighlightedCode(code, "bash");

  return (
    <div {...nativeExample.s26} dir={dir}>
      <p>{t.description}</p>
      <CodeBlock>
        <CodeBlockHeader>
          <CodeBlockTitle>
            <TerminalIcon />
            {t.title}
          </CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={code} />
          </CodeBlockActions>
        </CodeBlockHeader>
        <CodeBlockContent lineNumbers>
          {lines.map((line, index) => (
            <CodeBlockLine key={index}>{line}</CodeBlockLine>
          ))}
        </CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
