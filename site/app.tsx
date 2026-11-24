import { useEffect, useRef, useState } from "react";
import { createInstance } from "i18next";
import {
  I18nextProvider,
  Trans,
  initReactI18next,
  useTranslation,
} from "react-i18next";
import {
  defaultLocale,
  locales,
  localeNames,
  localePrefix,
  type Locale,
} from "./i18n/locales";
import * as stylex from "@stylexjs/stylex";
import { micromark } from "micromark";
import { gfmTable, gfmTableHtml } from "micromark-extension-gfm-table";
import {
  Monitor,
  Languages,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  ScanLine,
  Keyboard,
  PackageCheck,
  Moon,
  Search,
  Sun,
  Terminal,
  Zap,
} from "lucide-react";
import { GithubIcon } from "@storybook/icons";
import { Badge } from "../src/ariax/ui/badge";
import { Button, LinkButton } from "../src/ariax/ui/button";
import { Card, CardContent, CardHeader } from "../src/ariax/ui/card";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "../src/ariax/ui/code-block";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../src/ariax/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../src/ariax/ui/select";
import { Input } from "../src/ariax/ui/input";
import { Kbd } from "../src/ariax/ui/kbd";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/ariax/ui/tabs";
import { ComparisonDemo } from "./comparison-demo";
import { ExampleCode } from "./example-code";
import { LivePreview } from "./live-preview";
import type { PreviewLayout } from "./preview-layouts";
import { Toaster } from "../src/ariax/ui/sonner";
import type { CatalogBlock, CatalogPage } from "./catalog";

type NavItem = {
  slug: string;
  title: string;
  description: string;
  examples?: string[];
};
export type SiteProps = {
  locale: Locale;
  messages: Record<string, string>;
  assetBase: string;
  base: string;
  page: "home" | "installation" | "components" | "component" | "not-found";
  data?: CatalogPage;
  nav: NavItem[];
  guide?: { shared: string; vite: string; next: string };
  previewLayouts?: Record<
    string,
    { layout: PreviewLayout; documented: boolean }
  >;
};

const repo = "https://github.com/garrettjavalia/shadcn-ariax";
const buttonInstall = "pnpm dlx shadcn add garrettjavalia/shadcn-ariax/button";
const themeKey = "ariax-theme";
const route = (base: string, slug?: string) =>
  base + "docs/components/" + (slug ? slug + "/" : "");

function useText() {
  return useTranslation().t;
}
type ThemeMode = "system" | "light" | "dark";

function Results({
  base,
  nav,
  query,
  className,
}: {
  base: string;
  nav: NavItem[];
  query: string;
  className?: string;
}) {
  const t = useText();
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const exact = query.toLowerCase().trim();
  const includes = (value: string) =>
    terms.every((term) => value.toLowerCase().includes(term));
  const matches = nav.flatMap((item) => {
    const titleMatch = includes(
      [item.title, item.slug, item.description].join(" "),
    );
    const example =
      !titleMatch && terms.length
        ? item.examples?.find((name) => includes(name.replaceAll("-", " ")))
        : undefined;
    return titleMatch || example ? [{ ...item, example }] : [];
  });
  if (exact)
    matches.sort(
      (a, b) =>
        Number(b.title.toLowerCase() === exact || b.slug === exact) -
          Number(a.title.toLowerCase() === exact || a.slug === exact) ||
        Number(!!a.example) - Number(!!b.example),
    );
  return (
    <div className={className}>
      <span role="status" className="sr-only">
        {t("{{count}} components found", { count: matches.length })}
      </span>
      {matches.length ? (
        <ul {...stylex.props(s.results)}>
          {matches.map((item) => (
            <li key={item.slug}>
              <LinkButton
                href={
                  route(base, item.slug) +
                  (item.example ? "#example-" + item.example : "")
                }
                variant="ghost"
                xstyle={s.resultLink}
              >
                <span>
                  {item.title}
                  {item.example && (
                    <small {...stylex.props(s.matchLabel)}>
                      {" "}
                      / {item.example.replaceAll("-", " ")}
                    </small>
                  )}
                </span>
                <ArrowUpRight aria-hidden="true" />
              </LinkButton>
            </li>
          ))}
        </ul>
      ) : (
        <p {...stylex.props(s.empty)}>
          {t("No components match “{{query}}”.", { query })}
        </p>
      )}
    </div>
  );
}

function SearchDialog({ base, nav }: Pick<SiteProps, "base" | "nav">) {
  const t = useText();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
        input.current?.focus();
      }
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  return (
    <DialogTrigger
      isOpen={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <Button
        variant="outline"
        size="sm"
        aria-label={t("Search components")}
        xstyle={s.searchTrigger}
      >
        <Search aria-hidden="true" />
        <span {...stylex.props(s.searchLabel)}>{t("Search")}</span>
        <Kbd xstyle={s.shortcut}>⌘ K</Kbd>
      </Button>
      <Dialog xstyle={s.searchDialog}>
        <DialogTitle>{t("Search components")}</DialogTitle>
        <DialogDescription>
          {t("Find a component by name or description.")}
        </DialogDescription>
        <Input
          ref={input}
          type="search"
          aria-label={t("Search components")}
          autoFocus
          placeholder={t("Try Dialog or Date Picker…")}
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        <Results
          base={base}
          nav={nav}
          query={query}
          className={stylex.props(s.searchResults).className}
        />
      </Dialog>
    </DialogTrigger>
  );
}

function Header({
  assetBase,
  locale,
  base,
  nav,
  page,
  theme,
  toggle,
}: Pick<SiteProps, "base" | "nav" | "page" | "assetBase" | "locale"> & {
  theme: ThemeMode;
  toggle: () => void;
}) {
  const t = useText();
  const themeLabel = {
    system: t("Theme: System"),
    light: t("Theme: Light"),
    dark: t("Theme: Dark"),
  }[theme];
  return (
    <header {...stylex.props(s.header)}>
      <div {...stylex.props(s.headerInner)}>
        <LinkButton href={base} variant="ghost" xstyle={s.brand}>
          AriaX
        </LinkButton>
        <nav aria-label={t("Main navigation")} {...stylex.props(s.headerNav)}>
          <LinkButton
            href={base + "docs/installation/"}
            variant={page === "installation" ? "secondary" : "ghost"}
            size="sm"
            aria-current={page === "installation" ? "page" : undefined}
          >
            {t("Installation")}
          </LinkButton>
          <LinkButton
            href={route(base)}
            variant={page.startsWith("component") ? "secondary" : "ghost"}
            size="sm"
            aria-current={
              page === "components"
                ? "page"
                : page === "component"
                  ? "location"
                  : undefined
            }
          >
            {t("Components")}
          </LinkButton>
        </nav>
        <div {...stylex.props(s.headerRight)}>
          <SearchDialog base={base} nav={nav} />
          <Select
            aria-label={t("Language")}
            value={locale}
            onChange={(key) => {
              const next = locales.find((value) => value === key);
              if (!next || next === locale) return;
              const url = new URL(location.href);
              url.pathname =
                assetBase +
                localePrefix(next) +
                url.pathname.slice(base.length);
              url.searchParams.set("lang", next);
              location.assign(url);
            }}
          >
            <SelectTrigger
              size="sm"
              aria-label={t("Language")}
              xstyle={s.languageTrigger}
            >
              <Languages size={16} aria-hidden="true" />
              <SelectValue>
                {() => locale.split("-")[0].toUpperCase()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent placement="bottom end">
              {locales.map((value) => (
                <SelectItem
                  key={value}
                  id={value}
                  textValue={localeNames[value]}
                >
                  <span lang={value}>{localeNames[value]}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={themeLabel}
            onPress={toggle}
          >
            {theme === "system" ? (
              <Monitor />
            ) : theme === "light" ? (
              <Sun />
            ) : (
              <Moon />
            )}
          </Button>
          <LinkButton
            href={repo}
            variant="ghost"
            size="icon-sm"
            aria-label={t("AriaX on GitHub")}
          >
            <GithubIcon aria-hidden="true" />
          </LinkButton>
        </div>
      </div>
    </header>
  );
}

function Code({
  label,
  value,
  language = "tsx",
}: {
  label: string;
  value: string;
  language?: string;
}) {
  const t = useText();
  return (
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>{label}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton aria-label={t("Copy code")} value={value} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent data-language={language}>{value}</CodeBlockContent>
    </CodeBlock>
  );
}

function HomeLinks({ base }: Pick<SiteProps, "base">) {
  const t = useText();
  return (
    <div {...stylex.props(s.ctas)}>
      <LinkButton href={route(base)} size="lg" xstyle={s.primary}>
        {t("Explore components")} <ArrowRight />
      </LinkButton>
      <LinkButton
        href={base + "docs/installation/"}
        variant="outline"
        size="lg"
      >
        {t("Installation guide")} <ArrowUpRight />
      </LinkButton>
    </div>
  );
}

function Home({ base, assetBase, theme }: Pick<SiteProps, "base" | "assetBase"> & { theme: "light" | "dark" }) {
  const t = useText();
  const [saved, setSaved] = useState(false);
  const [variant, setVariant] = useState("outline");
  return (
    <main id="main">
      <section {...stylex.props(s.hero)}>
        <div className="hero-intro">
          <h1 {...stylex.props(s.heroTitle)}>
            {t("heroTitle")
              .split("\n")
              .map((line) => (
                <span className="hero-line" key={line}>
                  {line}
                </span>
              ))}
          </h1>
          <p {...stylex.props(s.heroCopy)}>
            {t(
              "The look of shadcn/ui, built with React Aria and StyleX. Install each component as editable source.",
            )}
          </p>
          <HomeLinks base={base} />
        </div>
        <div {...stylex.props(s.heroBoard)}>
          <div {...stylex.props(s.boardHeader)}>
            <span>
              <span {...stylex.props(s.dot)} /> {t("LIVE COMPONENT")}
            </span>
          </div>
          <div {...stylex.props(s.boardInner)}>
            <Card xstyle={s.demoCard}>
              <CardHeader>
                <Badge variant="outline" xstyle={s.demoBadge}>
                  NOVA / NEUTRAL
                </Badge>
                <h2 {...stylex.props(s.boardTitle)}>
                  {t("A button, made yours.")}
                </h2>
                <p {...stylex.props(s.boardCopy)}>
                  {t("Choose a style and try the button.")}
                </p>
              </CardHeader>
              <CardContent>
                <Tabs
                  selectedKey={variant}
                  onSelectionChange={(key) => setVariant(String(key))}
                  aria-label={t("Button variant")}
                >
                  <TabsList aria-label={t("Button variant")}>
                    <TabsTrigger id="outline">{t("Outline")}</TabsTrigger>
                    <TabsTrigger id="default">{t("Solid")}</TabsTrigger>
                    <TabsTrigger id="ghost">{t("Ghost")}</TabsTrigger>
                  </TabsList>
                  {(["outline", "default", "ghost"] as const).map((key) => (
                    <TabsContent id={key} key={key} xstyle={s.demoAction}>
                      <Button variant={key} onPress={() => setSaved(!saved)}>
                        {saved ? <Check /> : <Zap />}
                        {saved ? t("Saved") : t("Try button")}
                      </Button>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <div {...stylex.props(s.boardFooter)}>
            <Code2 size={15} /> &lt;Button variant="{variant}" /&gt;
          </div>
        </div>
      </section>
      {[
        {
          title: "toolkitTitle",
          cards: [
            {
              icon: <Terminal />,
              title: "sourceTitle",
              copy: "sourceDescription",
              url: "https://ui.shadcn.com/",
            },
            {
              icon: <Layers3 />,
              title: "stylesTitle",
              copy: "stylesDescription",
              url: "https://stylexjs.com/",
            },
            {
              icon: <Zap />,
              title: "keyboardTitle",
              copy: "keyboardDescription",
              url: "https://react-aria.adobe.com/",
            },
          ],
        },
        {
          title: "testingTitle",
          cards: [
            {
              icon: <ScanLine />,
              title: "comparisonTitle",
              copy: "comparisonDescription",
            },
            {
              icon: <Keyboard />,
              title: "interactionsTitle",
              copy: "interactionsDescription",
            },
            {
              icon: <PackageCheck />,
              title: "consumerTitle",
              copy: "consumerDescription",
            },
          ],
        },
      ].map((section) => (
        <section key={section.title} {...stylex.props(s.homeSection)}>
          <div data-section-heading {...stylex.props(s.sectionHeading)}>
            <h2>{t(section.title)}</h2>
          </div>
          <div {...stylex.props(s.featureGrid)}>
            {section.cards.map((item) => (
              <Card key={item.title} xstyle={s.feature}>
                <CardHeader>
                  <span aria-hidden="true" {...stylex.props(s.featureIcon)}>
                    {item.icon}
                  </span>
                  <h3>{t(item.title)}</h3>
                </CardHeader>
                <CardContent>
                  {"url" in item ? (
                    <Trans
                      i18nKey={item.copy}
                      components={{
                        project: (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                          />
                        ),
                      }}
                    />
                  ) : (
                    t(item.copy)
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
      <section {...stylex.props(s.homeSection)}>
        <ComparisonDemo assetBase={assetBase} theme={theme} />
      </section>
      <section {...stylex.props(s.homeSection, s.lastSection)}>
        <div data-section-heading {...stylex.props(s.sectionHeading)}>
          <h2>{t("Get started")}</h2>
        </div>
        <Code label={t("Terminal")} value={buttonInstall} language="sh" />
        <HomeLinks base={base} />
      </section>
    </main>
  );
}

function DocsNav({
  base,
  nav,
  active,
}: Pick<SiteProps, "base" | "nav"> & { active?: string }) {
  const t = useText();
  return (
    <aside {...stylex.props(s.sidebar)}>
      <nav aria-label={t("Documentation")} {...stylex.props(s.sideNav)}>
        <div {...stylex.props(s.sideLabel)}>{t("GET STARTED")}</div>
        <LinkButton
          href={base + "docs/installation/"}
          variant={active === "installation" ? "secondary" : "ghost"}
          aria-current={active === "installation" ? "page" : undefined}
          xstyle={s.sideLink}
        >
          {t("Installation")}
        </LinkButton>
        <div {...stylex.props(s.sideLabel)}>{t("COMPONENTS")}</div>
        <LinkButton
          href={route(base)}
          variant={active === "components" ? "secondary" : "ghost"}
          aria-current={active === "components" ? "page" : undefined}
          xstyle={s.sideLink}
        >
          {t("All components")}
        </LinkButton>
        {nav.map((item) => (
          <LinkButton
            key={item.slug}
            href={route(base, item.slug)}
            variant={active === item.slug ? "secondary" : "ghost"}
            aria-current={active === item.slug ? "page" : undefined}
            xstyle={s.sideLink}
          >
            {item.title}
          </LinkButton>
        ))}
      </nav>
    </aside>
  );
}

function Markdown({
  value,
  base,
  nav,
}: {
  value: string;
  base: string;
  nav: NavItem[];
}) {
  const slugs = new Set(nav.map((item) => item.slug));
  const html = micromark(value, {
    extensions: [gfmTable()],
    htmlExtensions: [gfmTableHtml()],
  })
    .replace(/href="docs\/i18n\//g, 'href="' + repo + "/blob/main/docs/i18n/")
    .replace(/href="\/(?!\/)([^"]*)"/g, (_match, path: string) => {
      const local = /^docs\/components\/aria\/([a-z0-9-]+)\/?(#[\w-]+)?$/.exec(
        path,
      );
      if (local && slugs.has(local[1]))
        return 'href="' + route(base, local[1]) + (local[2] ?? "") + '"';
      return 'href="https://ui.shadcn.com/' + path + '"';
    });
  const withAnchors = html.replace(
    /<(h[2-6])>(.*?)<\/\1>/g,
    (_match, tag: string, content: string) => {
      const id = content
        .replace(/<[^>]*>/g, "")
        .toLowerCase()
        .replace(/[^\p{L}\p{N} -]/gu, "")
        .trim()
        .replace(/ +/g, "-");
      return (
        "<" +
        tag +
        (id ? ' id="' + id + '"' : "") +
        ">" +
        content +
        "</" +
        tag +
        ">"
      );
    },
  );
  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: withAnchors }} />
  );
}

function InstallationContent({
  value,
  base,
  nav,
}: {
  value: string;
  base: string;
  nav: NavItem[];
}) {
  // Installation guides use top-level fenced blocks. Keep the original source
  // for both the rendered block and the clipboard, including indentation.
  const blocks = [];
  let start = 0;
  for (const match of value.matchAll(
    /^```([\w+-]*)\n([\s\S]*?)\n```[ \t]*$/gm,
  )) {
    const prose = value.slice(start, match.index);
    if (prose.trim())
      blocks.push(<Markdown key={start} value={prose} base={base} nav={nav} />);
    const [, language, source] = match;
    const title =
      (
        {
          sh: "Shell",
          js: "JavaScript",
          ts: "TypeScript",
          tsx: "TSX",
        } as Record<string, string>
      )[language] ?? language;
    blocks.push(
      <Code
        key={"code-" + match.index}
        label={title}
        language={language}
        value={source}
      />,
    );
    start = match.index + match[0].length;
  }
  if (value.slice(start).trim())
    blocks.push(
      <Markdown key={start} value={value.slice(start)} base={base} nav={nav} />,
    );
  return <div className="installation-content">{blocks}</div>;
}

function Example({
  block,
  preview,
  eager,
  anchor,
}: {
  block: Extract<CatalogBlock, { kind: "preview" }>;
  preview: { layout: PreviewLayout; documented: boolean };
  eager: boolean;
  anchor?: string;
}) {
  const id = block.storyId;
  const label = block.name
    .replaceAll("-", " ")
    .replace(/^./, (letter) => letter.toUpperCase());
  if (!id) return null;
  const source = block.source;
  return (
    <section
      id={anchor}
      aria-label={label}
      data-example={block.name}
      {...stylex.props(s.example)}
    >
      <h2 {...stylex.props(s.exampleHeading)}>{label}</h2>
      <div className="example-shell" data-slot="component-preview">
        <LivePreview
          name={block.name}
          story={id}
          layout={preview.layout}
          documented={preview.documented}
          eager={eager}
        />
        {source && <ExampleCode source={source} />}
      </div>
    </section>
  );
}

function Docs({ previewLayouts, base, page, data, nav, guide }: SiteProps) {
  const t = useText();
  const [query, setQuery] = useState("");
  const active = page === "component" ? data?.slug : page;
  let eagerPlaced = false;
  const anchored = new Set<string>();
  return (
    <div {...stylex.props(s.docs)}>
      <DocsNav base={base} nav={nav} active={active} />
      <main id="main" {...stylex.props(s.docMain)}>
        {page === "installation" && (
          <>
            <div data-section-heading {...stylex.props(s.sectionHeading)}>
              <p>{t("GET STARTED / INSTALLATION")}</p>
              <h1>{t("Installation")}</h1>
            </div>
            <p {...stylex.props(s.docIntro)}>
              {t("Install AriaX in a Vite or Next.js App Router project.")}
            </p>
            {guide && (
              <Tabs defaultSelectedKey="vite">
                <TabsList aria-label={t("Installation")}>
                  <TabsTrigger id="vite">Vite</TabsTrigger>
                  <TabsTrigger id="next">Next.js</TabsTrigger>
                </TabsList>
                {(["vite", "next"] as const).map((key) => (
                  <TabsContent key={key} id={key}>
                    <InstallationContent
                      value={guide.shared + "\n" + guide[key]}
                      base={base}
                      nav={nav}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            )}
            <LinkButton href={route(base)} xstyle={s.bottomLink}>
              {t("Browse components")} <ArrowRight />
            </LinkButton>
          </>
        )}
        {page === "components" && (
          <>
            <div data-section-heading {...stylex.props(s.sectionHeading)}>
              <p>{t("REFERENCE / CATALOG")}</p>
              <h1>{t("Components")}</h1>
            </div>
            <p {...stylex.props(s.docIntro)}>
              {t(
                "Browse the React Aria component docs, with live StyleX previews and the AriaX source used to render them.",
              )}
            </p>
            <Input
              type="search"
              aria-label={t("Filter component catalog")}
              placeholder={t("Filter the component catalog…")}
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
            />
            <Results
              base={base}
              nav={nav}
              query={query}
              className={stylex.props(s.catalogResults).className}
            />
          </>
        )}
        {page === "component" && data && (
          <>
            <div data-doc-breadcrumb {...stylex.props(s.breadcrumb)}>
              <a href={route(base)}>{t("Components")}</a> <span>/</span>{" "}
              {data.title}
            </div>
            <div data-section-heading {...stylex.props(s.sectionHeading)}>
              <h1>{data.title}</h1>
            </div>
            <p {...stylex.props(s.docIntro)}>{data.description}</p>
            <div {...stylex.props(s.docTools)}>
              <LinkButton
                href={base + "docs/installation/"}
                variant="outline"
                size="sm"
              >
                {t("Installation guide")} <ArrowUpRight />
              </LinkButton>
            </div>
            {data.installCommand && (
              <Code
                value={data.installCommand}
                label={
                  data.installTargets.includes(data.slug)
                    ? t("Install with shadcn")
                    : t("Install prerequisites")
                }
                language="sh"
              />
            )}
            {data.blocks.map((block, i) => {
              if (block.kind === "markdown")
                return (
                  <Markdown
                    key={i}
                    value={block.markdown}
                    base={base}
                    nav={nav}
                  />
                );
              const eager = !!block.storyId && !eagerPlaced;
              if (eager) eagerPlaced = true;
              const anchor = anchored.has(block.name)
                ? undefined
                : "example-" + block.name;
              anchored.add(block.name);
              return (
                <Example
                  key={i}
                  block={block}
                  preview={previewLayouts![block.name]}
                  eager={eager}
                  anchor={anchor}
                />
              );
            })}
          </>
        )}
        {page === "not-found" && (
          <>
            <div data-section-heading {...stylex.props(s.sectionHeading)}>
              <p>{t("404 / NOT FOUND")}</p>
              <h1>{t("This page is missing.")}</h1>
            </div>
            <LinkButton href={route(base)}>
              {t("Browse components")} <ArrowRight />
            </LinkButton>
          </>
        )}
      </main>
    </div>
  );
}

export function Site(props: SiteProps) {
  const [instance] = useState(() => {
    const i18n = createInstance();
    void i18n.use(initReactI18next).init({
      lng: props.locale,
      fallbackLng: defaultLocale,
      supportedLngs: locales,
      resources: { [props.locale]: { translation: props.messages } },
      keySeparator: false,
      nsSeparator: false,
      initImmediate: false,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
    return i18n;
  });
  return (
    <I18nextProvider i18n={instance}>
      <SiteContent {...props} />
    </I18nextProvider>
  );
}

function SiteContent(props: SiteProps) {
  const t = useText();
  const { base, nav, page } = props;
  const [mode, setMode] = useState<ThemeMode>("system");
  const [systemDark, setSystemDark] = useState(false);
  const theme = mode === "system" ? (systemDark ? "dark" : "light") : mode;
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      const saved = localStorage.getItem(themeKey);
      if (saved === "dark" || saved === "light") setMode(saved);
    } catch {}
    const apply = () => setSystemDark(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  function toggle() {
    const next =
      mode === "system" ? "light" : mode === "light" ? "dark" : "system";
    setMode(next);
    try {
      localStorage.setItem(themeKey, next);
    } catch {}
  }
  return (
    <>
      <a className="skip" href="#main">
        {t("Skip to content")}
      </a>
      <Header
        base={base}
        nav={nav}
        page={page}
        assetBase={props.assetBase}
        locale={props.locale}
        theme={mode}
        toggle={toggle}
      />
      {page === "home" ? <Home base={base} assetBase={props.assetBase} theme={theme} /> : <Docs {...props} />}
      <footer {...stylex.props(s.copyright)}>
        <small>© 2026 Minsuk Jung</small>
      </footer>
      {page === "component" && (
        <Toaster theme={theme === "dark" ? "dark" : "light"} />
      )}
    </>
  );
}

const s = stylex.create({
  copyright: {
    marginTop: "auto",
    paddingBlock: "1.5rem",
    paddingInline: "1rem",
    textAlign: "center",
    borderTop: "1px solid var(--border)",
    color: "var(--muted-foreground)",
    backgroundColor: "var(--background)",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    borderBottom: "1px solid var(--border)",
    backgroundColor: "color-mix(in oklab, var(--background) 91%, transparent)",
    backdropFilter: "blur(16px)",
  },
  headerInner: {
    maxWidth: "88rem",
    paddingInline: {
      default: "1.25rem",
      "@media (max-width: 40rem)": "0.65rem",
    },
    minHeight: "4rem",
    marginInline: "auto",
    display: { default: "flex", "@media (max-width: 40rem)": "grid" },
    gridTemplateColumns: "minmax(0, 1fr) auto",
    paddingBlock: { default: 0, "@media (max-width: 40rem)": "0.5rem 0.35rem" },
    alignItems: "center",
    gap: { default: "1rem", "@media (max-width: 40rem)": "0.14rem" },
  },
  brand: {
    justifySelf: "start",
    fontWeight: 800,
    fontSize: "1.06rem",
    gap: "0.5rem",
    paddingInline: {
      default: "0.45rem",
      "@media (max-width: 40rem)": "0.3rem",
    },
    flexShrink: 0,
  },
  headerNav: {
    gridRow: 2,
    gridColumn: "1 / -1",
    display: "flex",
    gap: "0.12rem",
    alignItems: "center",
  },
  headerRight: {
    gridRow: 1,
    gridColumn: 2,
    marginInlineStart: "auto",
    display: "flex",
    gap: "0.25rem",
    alignItems: "center",
  },
  languageTrigger: { width: "auto", minWidth: 0, gap: "0.35rem" },
  searchTrigger: { height: "2rem", gap: "0.45rem" },
  searchLabel: {
    display: { default: "inline", "@media (max-width: 47rem)": "none" },
  },
  shortcut: {
    display: { default: "inline-flex", "@media (max-width: 68rem)": "none" },
  },
  searchDialog: {
    maxWidth: {
      default: "min(100% - 2rem, 32rem)",
      "@media (width >= 40rem)": "32rem",
    },
  },
  searchResults: { maxHeight: "min(52dvh, 25rem)", overflowY: "auto" },
  results: {
    listStyle: "none",
    display: "grid",
    gap: "0.18rem",
    padding: 0,
    margin: 0,
  },
  matchLabel: {
    color: "var(--muted-foreground)",
    fontWeight: 400,
    fontSize: "0.73rem",
  },
  resultLink: {
    width: "100%",
    justifyContent: "space-between",
    height: "2.6rem",
    fontWeight: 560,
  },
  empty: { padding: "1rem", color: "var(--muted-foreground)" },
  hero: {
    maxWidth: "82rem",
    marginInline: "auto",
    minHeight: "min(44rem, 80vh)",
    paddingInline: "clamp(1.25rem, 4vw, 3rem)",
    paddingBlock: "clamp(3.25rem, 8vw, 7.75rem) clamp(3rem, 7vw, 6rem)",
    display: "grid",
    gridTemplateColumns: {
      default: "1.12fr 1fr",
      "@media (max-width: 55rem)": "minmax(0, 1fr)",
    },
    alignItems: "center",
    gap: "clamp(2.2rem, 5vw, 6rem)",
  },
  dot: {
    display: "inline-block",
    width: "0.48rem",
    height: "0.48rem",
    borderRadius: "50%",
    backgroundColor: "var(--ring)",
    flexShrink: 0,
  },
  heroTitle: {
    fontSize: "var(--hero-title-size)",
    whiteSpace: "nowrap",
    color: "var(--accent-foreground)",
    fontWeight: 780,
    letterSpacing: "-0.015em",
    lineHeight: 1.08,
    marginBlock: "1.4rem 1.5rem",
  },
  heroCopy: {
    color: "var(--muted-foreground)",
    fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
    lineHeight: 1.6,
    maxWidth: "31rem",
    marginBottom: "1.65rem",
  },
  ctas: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.55rem",
    marginTop: "1.1rem",
  },
  primary: {
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
    fontWeight: 700,
  },
  heroBoard: {
    minWidth: 0,
    backgroundColor: "var(--demo-background)",
    color: "var(--demo-foreground)",
    borderRadius: "1.15rem",
    boxShadow: "0 24px 72px rgba(23,35,20,.14)",
    overflow: "hidden",
  },
  boardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.95rem 1.1rem",
    fontFamily: "var(--font-mono)",
    fontSize: "0.67rem",
    letterSpacing: "0.09em",
    borderBottom: "1px solid var(--demo-border)",
  },
  boardInner: {
    display: "grid",
    placeItems: "center",
    padding: "clamp(1.35rem, 4vw, 3rem)",
    minHeight: "21rem",
    backgroundImage:
      "radial-gradient(circle at 1px 1px, var(--demo-dot) 1px, transparent 0)",
    backgroundSize: "18px 18px",
  },
  demoCard: {
    width: "100%",
    maxWidth: "22rem",
    color: "var(--foreground)",
    boxShadow: "0 16px 40px rgba(0,0,0,.24)",
  },
  demoBadge: {
    width: "fit-content",
    fontFamily: "var(--font-mono)",
    fontSize: "0.62rem",
    letterSpacing: "0.08em",
  },
  boardTitle: {
    fontSize: "clamp(1.26rem, 3vw, 1.65rem)",
    fontWeight: 720,
    letterSpacing: "normal",
  },
  boardCopy: { lineHeight: 1.5, color: "var(--muted-foreground)" },
  demoAction: { display: "grid", placeItems: "start", paddingTop: "0.8rem" },
  boardFooter: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.9rem 1.1rem",
    borderTop: "1px solid var(--demo-border)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.74rem",
  },
  homeSection: {
    maxWidth: "82rem",
    marginInline: "auto",
    paddingInline: "clamp(1.25rem, 4vw, 3rem)",
    paddingBlock: "clamp(3rem, 7vw, 6.35rem)",
  },
  lastSection: { borderTop: "1px solid var(--border)" },
  sectionHeading: { marginBottom: "1.1rem" },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(3, minmax(0, 1fr))",
      "@media (max-width: 48rem)": "minmax(0, 1fr)",
    },
    gap: "0.8rem",
  },
  feature: { minHeight: "11rem" },
  featureIcon: { color: "var(--accent-foreground)" },
  docs: {
    width: "100%",
    maxWidth: "88rem",
    marginInline: "auto",
    display: "grid",
    gridTemplateColumns: {
      default: "14rem minmax(0, 1fr)",
      "@media (max-width: 52rem)": "minmax(0, 1fr)",
    },
    gap: "clamp(1.3rem, 4vw, 5.5rem)",
    paddingInline: "clamp(1.5rem, 4vw, 3rem)",
  },
  sidebar: {
    display: { default: "block", "@media (max-width: 52rem)": "none" },
    position: "sticky",
    top: "4rem",
    height: "calc(100dvh - 4rem)",
    overflowY: "auto",
    borderInlineEnd: "1px solid var(--border)",
    paddingBlock: "1.5rem",
    paddingInlineEnd: "1rem",
  },
  sideNav: { display: "grid", gap: "0.12rem" },
  sideLabel: {
    padding: "0.85rem 0.6rem 0.3rem",
    color: "var(--accent-foreground)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.68rem",
    letterSpacing: "0.09em",
  },
  sideLink: {
    justifyContent: "start",
    width: "100%",
    height: "1.85rem",
    paddingInline: "0.6rem",
    fontWeight: 550,
  },
  docMain: {
    width: "100%",
    maxWidth: "40rem",
    justifySelf: "center",
    minWidth: 0,
    minHeight: "70vh",
    paddingBlock: "clamp(2.2rem, 6vw, 4.4rem) 5rem",
    scrollMarginTop: "5rem",
  },
  docIntro: {
    fontSize: "clamp(1rem, 1.6vw, 1.22rem)",
    lineHeight: 1.6,
    color: "var(--muted-foreground)",
    marginBlock: "0.65rem 1.25rem",
  },
  docTools: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.4rem",
    marginBlockEnd: "1.5rem",
  },
  breadcrumb: {
    display: "flex",
    gap: "0.55rem",
    alignItems: "center",
    fontSize: "0.82rem",
    color: "var(--muted-foreground)",
    marginBottom: "1rem",
  },
  catalogResults: {
    marginTop: "1.1rem",
    border: "1px solid var(--border)",
    borderRadius: "0.8rem",
    padding: "0.4rem",
  },
  example: {
    marginBlock: "2rem 3rem",
    scrollMarginTop: "6rem",
    minWidth: 0,
  },
  exampleHeading: {
    fontSize: "1.25rem",
    fontWeight: 650,
    lineHeight: 1.4,
    marginBottom: "0.75rem",
  },
  bottomLink: {
    marginTop: "1.5rem",
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
  },
});
