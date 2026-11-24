import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/ariax/ui/tabs";
import { Button } from "../src/ariax/ui/button";
import {
  CodeBlockCopyButton,
  useHighlightedCode,
} from "../src/ariax/ui/code-block";
import { toastExampleApp } from "./example-setup";
import type { CatalogSource } from "./catalog";

function CodeFile({
  content,
  language,
  expanded,
}: {
  content: string;
  language: "tsx" | "css";
  expanded: boolean;
}) {
  const { t } = useTranslation();
  const lines = useHighlightedCode(
    expanded ? content : content.split("\n", 3).join("\n"),
    language,
  );
  return (
    <div className="example-file">
      <pre tabIndex={expanded ? 0 : -1} aria-hidden={!expanded || undefined}>
        <code>
          {lines.map((line, index) => (
            <Fragment key={index}>
              {index > 0 ? "\n" : ""}
              <span data-line="">{line}</span>
            </Fragment>
          ))}
        </code>
      </pre>
      {expanded && (
        <div className="example-copy">
          <CodeBlockCopyButton aria-label={t("Copy code")} value={content} />
        </div>
      )}
    </div>
  );
}

export function ExampleCode({ source }: { source: CatalogSource }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const tsx = (
    <CodeFile content={source.code} language="tsx" expanded={expanded} />
  );
  const requirements = source.requirements;
  const commands = [];
  if (requirements?.items.length)
    commands.push(
      "pnpm dlx shadcn add " +
        requirements.items
          .map((item) => "garrettjavalia/shadcn-ariax/" + item)
          .join(" "),
    );
  if (requirements?.packages.length)
    commands.push("pnpm add " + requirements.packages.join(" "));
  return (
    <div data-slot="code" className="example-code">
      {expanded && (source.stylesheet || requirements?.toaster) ? (
        <Tabs defaultSelectedKey="tsx">
          <TabsList variant="line" aria-label={t("Example files")}>
            <TabsTrigger id="tsx">example.tsx</TabsTrigger>
            {source.stylesheet && (
              <TabsTrigger id="css">example.css</TabsTrigger>
            )}
            {requirements?.toaster && (
              <TabsTrigger id="app">App.tsx</TabsTrigger>
            )}
          </TabsList>
          <TabsContent id="tsx">{tsx}</TabsContent>
          {source.stylesheet && (
            <TabsContent id="css">
              <CodeFile content={source.stylesheet} language="css" expanded />
            </TabsContent>
          )}
          {requirements?.toaster && (
            <TabsContent id="app">
              <CodeFile content={toastExampleApp} language="tsx" expanded />
            </TabsContent>
          )}
        </Tabs>
      ) : (
        tsx
      )}
      {expanded && commands.length > 0 && (
        <details className="example-requirements">
          <summary>{t("Example dependencies")}</summary>
          {commands.map((command) => (
            <div key={command}>
              <code>{command}</code>
              <CodeBlockCopyButton
                aria-label={t("Copy code")}
                value={command}
              />
            </div>
          ))}
        </details>
      )}
      {!expanded && (
        <div className="example-code-overlay">
          <Button variant="outline" size="sm" onPress={() => setExpanded(true)}>
            {t("View code")}
          </Button>
        </div>
      )}
    </div>
  );
}
