import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../src/ariax/ui/button";
import { Checkbox } from "../src/ariax/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../src/ariax/ui/select";
import { Input } from "../src/ariax/ui/input";
import { Label } from "../src/ariax/ui/label";
import { compareButtons } from "./compare-buttons";
import { focusSelectOnFrameEntry } from "./compare/frame-focus";
import { exampleNames, type Example } from "./component-example";
import "./comparison-demo.css";

type Comparison = ReturnType<typeof compareButtons>;
type Result = "ready" | "loading" | "error";

const frameNames = ["upstream", "ariax"] as const;
const labels = ["shadcn/ui", "AriaX"];
const buttonSelector = '[data-slot="button"]';
const focusProperties = new Set([
  ":focus",
  ":focus-visible",
  "data-focused",
  "data-focus-visible",
]);

const variantLabels = {
  default: "Solid",
  outline: "Outline",
  secondary: "Secondary",
  ghost: "Ghost",
  destructive: "Destructive",
  link: "Link",
};
const stateLabels = {
  rest: "Rest",
  hover: "Hover",
  "focus-visible": "Keyboard focus",
  pressed: "Pressed",
};

export function ComparisonChoice({
  translateOptions = true,
  dark = false,
  label,
  isDisabled = false,
  value,
  labels,
  onChange,
}: {
  translateOptions?: boolean;
  dark?: boolean;
  label: string;
  isDisabled?: boolean;
  value: string;
  labels: Record<string, string>;
  onChange: (key: string) => void;
}) {
  const { t } = useTranslation();
  const [portal, setPortal] = useState<HTMLElement>();
  useEffect(() => {
    if (!dark) return;
    const container = document.createElement("div");
    container.className = "dark";
    document.body.append(container);
    setPortal(container);
    return () => container.remove();
  }, [dark]);
  return (
    <div className="comparison-choice">
      <span>{t(label)}</span>
      <Select
        aria-label={t(label)}
        isDisabled={isDisabled}
        selectedKey={value}
        onSelectionChange={(key) => onChange(String(key))}
      >
        <SelectTrigger size="sm" aria-label={t(label)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent UNSTABLE_portalContainer={portal}>
          {Object.entries(labels).map(([key, text]) => {
            const name = translateOptions ? t(text) : text;
            return (
              <SelectItem key={key} id={key} textValue={name}>
                {name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

function ExamplePicker({
  value,
  onChange,
}: {
  value: Example;
  onChange: (value: Example) => void;
}) {
  return (
    <ComparisonChoice
      label="Example"
      labels={exampleNames}
      value={value}
      onChange={(key) => onChange(key as Example)}
    />
  );
}

function SnapshotInspector({ comparison }: { comparison: Comparison }) {
  const { t } = useTranslation();
  const [selection, setSelection] = useState("");
  const [query, setQuery] = useState("");
  const [custom, setCustom] = useState(false);
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const selected =
    comparison.computedStyles.find((node) => node.path === selection) ??
    comparison.computedStyles[0];
  const needle = query.trim().toLowerCase();
  const all = selection === "*";
  const nodes = all ? comparison.computedStyles : selected ? [selected] : [];
  const different = new Set(
    (custom ? comparison.customPropertyDifferences : comparison.differences)
      .filter((diff) => diff.kind === "style")
      .map((diff) => diff.path + "|" + diff.property),
  );
  const rows = nodes.flatMap((node) =>
    node[custom ? "customProperties" : "properties"]
      .filter(
        (row) =>
          (!onlyDifferences || different.has(node.path + "|" + row.property)) &&
          row.property.toLowerCase().includes(needle),
      )
      .map((row) => ({
        ...row,
        path: node.path,
        key: node.path + "|" + row.property,
      })),
  );
  const [limit, setLimit] = useState(200);
  return (
    <div className="comparison-inspector">
      <h3>{t("Rendered DOM")}</h3>
      <div className="comparison-markup">
        {frameNames.map((name, i) => (
          <div key={name}>
            <h4>{labels[i]}</h4>
            <pre
              tabIndex={0}
              aria-label={labels[i] + " · " + t("Rendered DOM")}
            >
              <code>{comparison.dom[name]}</code>
            </pre>
          </div>
        ))}
      </div>
      <details className="comparison-native">
        <summary>{t("Native pseudo-classes")}</summary>
        <table>
          <thead>
            <tr>
              <th scope="col">{t("Property")}</th>
              <th scope="col">shadcn/ui</th>
              <th scope="col">AriaX</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(comparison.states.upstream.native).map((key) => (
              <tr key={key}>
                <th scope="row">
                  <code>{key}</code>
                </th>
                {frameNames.map((name) => (
                  <td key={name}>
                    {String(comparison.states[name].native[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <h3>{t("Computed CSS")}</h3>
      <div className="comparison-filters">
        <Select
          selectedKey={all ? "*" : selected?.path}
          onSelectionChange={(key) => setSelection(String(key))}
        >
          <Label>{t("Inspect element")}</Label>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem id="*" textValue={t("All")}>
              {t("All")}
            </SelectItem>
            {comparison.computedStyles.map((node) => (
              <SelectItem key={node.path} id={node.path} textValue={node.path}>
                {node.path}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          aria-label={t("Filter properties")}
          placeholder={t("Filter properties")}
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        <div className="comparison-control">
          <Checkbox
            id="comparison-custom-properties"
            isSelected={custom}
            onChange={setCustom}
          />
          <Label htmlFor="comparison-custom-properties">
            {t("CSS custom properties")}
          </Label>
        </div>
        <div className="comparison-control">
          <Checkbox
            id="comparison-only-differences"
            isSelected={onlyDifferences}
            onChange={setOnlyDifferences}
          />
          <Label htmlFor="comparison-only-differences">
            {t("Differences only")}
          </Label>
        </div>
      </div>
      <div
        className="comparison-values"
        role="region"
        aria-label={t("Computed CSS")}
        tabIndex={0}
      >
        <table>
          <thead>
            <tr>
              <th scope="col">{t("Property")}</th>
              <th scope="col">shadcn/ui</th>
              <th scope="col">AriaX</th>
            </tr>
          </thead>
          <tbody>
            {(all ? rows.slice(0, limit) : rows).map((row) => (
              <tr
                key={row.key}
                data-different={different.has(row.key) || undefined}
              >
                <th scope="row">
                  {all && row.path + " · "}
                  {row.property}
                </th>
                <td>{row.upstream ?? "∅"}</td>
                <td>{row.ariax ?? "∅"}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={3}>{t("No matching properties")}</td>
              </tr>
            )}
          </tbody>
        </table>
        {all && rows.length > limit && (
          <Button onPress={() => setLimit(limit + 200)}>
            {t("Show more")}
          </Button>
        )}
      </div>
    </div>
  );
}

function Differences({
  title,
  values,
  empty,
}: {
  title: string;
  values: Comparison["differences"];
  empty?: string;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const needle = query.trim().toLowerCase();
  const matches = !open
    ? []
    : values.filter(
        (diff) =>
          !needle ||
          [diff.property, diff.path, diff.upstream, diff.ariax].some((value) =>
            value?.toLowerCase().includes(needle),
          ),
      );
  const pageSize = 12;
  const pages = Math.max(1, Math.ceil(matches.length / pageSize));
  const current = Math.min(page, pages - 1);
  return (
    <details onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>
        {title} ({values.length})
      </summary>
      {open &&
        (values.length === 0 ? (
          <p>{empty}</p>
        ) : (
          <>
            {values.length > pageSize && (
              <Input
                aria-label={t("Search differences")}
                placeholder={t("Search differences")}
                value={query}
                onChange={(event) => {
                  setQuery(event.currentTarget.value);
                  setPage(0);
                }}
              />
            )}
            <ul>
              {matches
                .slice(current * pageSize, (current + 1) * pageSize)
                .map((diff) => (
                  <li
                    key={JSON.stringify([diff.path, diff.property, diff.kind])}
                  >
                    <code>
                      {diff.path} · {diff.property}
                    </code>
                    <dl>
                      <div>
                        <dt>shadcn/ui</dt>
                        <dd>{diff.upstream ?? "∅"}</dd>
                      </div>
                      <div>
                        <dt>AriaX</dt>
                        <dd>{diff.ariax ?? "∅"}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
            </ul>
            {pages > 1 && (
              <div className="comparison-paging">
                <Button
                  size="sm"
                  variant="outline"
                  isDisabled={current === 0}
                  onPress={() => setPage(current - 1)}
                >
                  {t("Previous")}
                </Button>
                <span>
                  {t("Page {{page}} of {{pages}}", {
                    page: current + 1,
                    pages,
                  })}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  isDisabled={current === pages - 1}
                  onPress={() => setPage(current + 1)}
                >
                  {t("Next")}
                </Button>
              </div>
            )}
          </>
        ))}
    </details>
  );
}

export function ComparisonDemo({
  assetBase,
  theme,
}: {
  assetBase: string;
  theme: "light" | "dark";
}) {
  const { t, i18n } = useTranslation();
  const [example, setExample] = useState<Example>("button");
  const buttonExample = example === "button";
  useEffect(() => {
    window.addEventListener("pointerdown", focusSelectOnFrameEntry, true);
    return () => window.removeEventListener("pointerdown", focusSelectOnFrameEntry, true);
  }, []);
  const params = new URLSearchParams({
    example,
    lang: i18n.language,
    label: t(exampleNames[example]),
    saved: t("Saved"),
    invalidMessage: t("This selection is invalid."),
  });
  const panel = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState("default");
  const [state, setState] = useState("rest");
  const [comparison, setComparison] = useState<Comparison | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [small, setSmall] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [outline, setOutline] = useState(true);
  const [vertical, setVertical] = useState(false);
  const activeState = disabled ? "rest" : state;
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result>("loading");

  useEffect(() => {
    const frames = Array.from(panel.current!.querySelectorAll("iframe"));
    const documents = new Map<HTMLIFrameElement, Document>();
    const release = new Map<HTMLIFrameElement, () => void>();
    let raf = 0;
    let deadline = 0;
    const failed = () => {
      setComparison(null);
      setResult("error");
    };
    const pending = () => {
      setResult("loading");
      clearTimeout(deadline);
      deadline = window.setTimeout(failed, 15000);
    };
    const inspect = () => {
      try {
        const [left, right] = frames.map((frame) => {
          const doc = documents.get(frame);
          if (!doc || new URL(doc.URL).searchParams.get("example") !== example)
            return;
          const root = doc.querySelector<HTMLElement>("#parity-root");
          if (!root?.firstElementChild || doc.fonts.status === "loading")
            return;
          if (!buttonExample)
            return root.querySelector<HTMLElement>(
              example === "checkbox"
                ? '[role="group"]'
                : `[data-slot="${example}"]`,
            );
          const button = root.querySelector<HTMLButtonElement>(buttonSelector);
          if (
            root.dataset.readyVariant === variant &&
            root.dataset.readyState === activeState &&
            root.dataset.readyDisabled === String(disabled) &&
            button?.disabled === disabled
          )
            return button;
        });
        if (!left || !right) return;
        const comparison = compareButtons(left, right, example);
        clearTimeout(deadline);
        setComparison(comparison);
        setResult("ready");
      } catch {
        failed();
      }
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(inspect);
      });
    };
    const events = [
      "focusin",
      "focusout",
      "pointerover",
      "pointerout",
      "pointerdown",
      "pointerup",
      "keydown",
      "keyup",
      "change",
      "animationend",
      "transitionend",
      "transitioncancel",
    ];
    function connect(frame: HTMLIFrameElement) {
      const doc = frame.contentDocument;
      const root = doc?.documentElement;
      // A navigating frame can expose its Document before the parser creates <html>.
      // Its load listener retries the connection once the document is ready.
      if (
        !doc ||
        !root ||
        doc.URL === "about:blank" ||
        documents.get(frame) === doc
      )
        return;
      release.get(frame)?.();
      pending();
      documents.set(frame, doc);
      root.dataset.compareVariant = variant;
      root.dataset.compareState = activeState;
      root.toggleAttribute("data-small", small);
      root.toggleAttribute(
        "data-invalid",
        invalid && (example === "checkbox" || example === "select"),
      );
      root.toggleAttribute("data-borderless", !outline);
      root.toggleAttribute("data-vertical", vertical);
      root.classList.toggle("dark", theme === "dark");
      root.toggleAttribute("data-disabled", disabled);
      for (const event of events) doc.addEventListener(event, schedule, true);
      doc.fonts.addEventListener("loadingdone", schedule);
      const observer = new MutationObserver(schedule);
      observer.observe(root, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
      const clear = () => {
        observer.disconnect();
        doc.fonts.removeEventListener("loadingdone", schedule);
        for (const event of events)
          doc.removeEventListener(event, schedule, true);
        doc.defaultView?.removeEventListener("pagehide", unload);
        documents.delete(frame);
        release.delete(frame);
      };
      const unload = (event: PageTransitionEvent) => {
        if (event.persisted) return;
        clear();
        setComparison(null);
        pending();
      };
      doc.defaultView?.addEventListener("pagehide", unload);
      release.set(frame, clear);
      schedule();
    }
    const onLoad = (event: Event) =>
      connect(event.currentTarget as HTMLIFrameElement);
    setComparison(null);
    pending();
    for (const frame of frames) {
      frame.addEventListener("load", onLoad);
      connect(frame);
    }
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("resize", schedule);
      for (const frame of frames) frame.removeEventListener("load", onLoad);
      for (const clear of release.values()) clear();
      cancelAnimationFrame(raf);
      clearTimeout(deadline);
    };
  }, [
    attempt,
    disabled,
    theme,
    variant,
    activeState,
    small,
    invalid,
    outline,
    vertical,
    example,
    buttonExample,
    i18n.language,
  ]);

  const matches = comparison?.differences.length === 0;
  const domDifferences =
    comparison?.differences.filter(({ kind }) => kind === "dom") ?? [];
  const focusDiffers =
    domDifferences.length > 0 &&
    domDifferences.every(({ property }) => focusProperties.has(property));
  const styleDifferenceCount =
    (comparison?.differences.length ?? 0) - domDifferences.length;
  return (
    <div className="comparison-demo" ref={panel}>
      <div className="comparison-heading" data-section-heading>
        <h2>{t("Live component comparison")}</h2>
        <p>
          {t(
            "Compare the DOM and computed CSS. Each example tracks its own state. To compare the same state, you may need to repeat the same actions on both sides, then move focus outside both frames.",
          )}
        </p>
      </div>
      <div className="comparison-panel">
        <div className="comparison-options">
          <ExamplePicker value={example} onChange={setExample} />
          {buttonExample && (
            <>
              <ComparisonChoice
                label="Button variant"
                value={variant}
                labels={variantLabels}
                onChange={setVariant}
              />
              <ComparisonChoice
                label="Button state"
                isDisabled={disabled}
                value={activeState}
                labels={stateLabels}
                onChange={setState}
              />
            </>
          )}
          {(example === "toggle-group" || example === "select") && (
            <div className="comparison-control">
              <Checkbox
                id="comparison-example-style"
                isSelected={small}
                onChange={setSmall}
              />
              <Label htmlFor="comparison-example-style">
                {t("Small size")}
              </Label>
            </div>
          )}
          {(example === "select" || example === "checkbox") && (
            <div className="comparison-control">
              <Checkbox
                id="comparison-invalid"
                isSelected={invalid}
                onChange={setInvalid}
              />
              <Label htmlFor="comparison-invalid">{t("Invalid state")}</Label>
            </div>
          )}
          {example === "toggle-group" && (
            <>
              <div className="comparison-control">
                <Checkbox
                  id="comparison-outline"
                  isSelected={outline}
                  onChange={setOutline}
                />
                <Label htmlFor="comparison-outline">{t("Outline")}</Label>
              </div>
              <div className="comparison-control">
                <Checkbox
                  id="comparison-vertical"
                  isSelected={vertical}
                  onChange={setVertical}
                />
                <Label htmlFor="comparison-vertical">
                  {t("Vertical layout")}
                </Label>
              </div>
            </>
          )}
          <div className="comparison-control">
            <Checkbox
              id="disable-comparison-buttons"
              isSelected={disabled}
              onChange={setDisabled}
            />
            <Label htmlFor="disable-comparison-buttons">{t("Disabled")}</Label>
          </div>
        </div>
        {buttonExample && (
          <p className="comparison-state-note">
            {t(
              "The state control previews interaction styles in both frames. Keyboard focus stays on the control.",
            )}
          </p>
        )}
        <div
          className="comparison-frames"
          data-example={example}
          data-vertical={(example === "toggle-group" && vertical) || undefined}
        >
          {frameNames.map((name, i) => (
            <figure key={name}>
              <figcaption>{labels[i]}</figcaption>
              <iframe
                key={example + attempt}
                src={assetBase + "compare/" + name + "/?" + params}
                title={labels[i]}
              />
            </figure>
          ))}
        </div>
        <div
          className="comparison-reading"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <strong>
            {t(
              result === "ready"
                ? matches
                  ? "Components match"
                  : focusDiffers
                    ? "Focus state differs"
                    : "Differences found"
                : result === "loading"
                  ? "Checking components…"
                  : "Comparison unavailable",
            )}
            {result === "ready" &&
              focusDiffers &&
              styleDifferenceCount > 0 &&
              ` · ${t("Computed CSS")} (${styleDifferenceCount})`}
          </strong>
          {comparison && (
            <dl>
              <div>
                <dt>{t("DOM checks")}</dt>
                <dd>{comparison.domChecks}</dd>
              </div>
              <div>
                <dt>{t("Style checks")}</dt>
                <dd>{comparison.styleChecks}</dd>
              </div>
            </dl>
          )}
        </div>
        {result === "error" && (
          <Button
            variant="outline"
            size="sm"
            onPress={() => setAttempt((n) => n + 1)}
          >
            {t("Retry comparison")}
          </Button>
        )}
        {comparison && <SnapshotInspector comparison={comparison} />}
        {comparison && !matches && (
          <Differences
            title={t("View differences")}
            values={comparison.differences}
          />
        )}
        {comparison && (
          <Differences
            title={t("Inspect CSS variable differences")}
            values={comparison.customPropertyDifferences}
            empty={t("No CSS variable differences")}
          />
        )}
        <details>
          <summary>{t("Comparison scope")}</summary>
          <p>
            {t(
              "This comparison runs in your browser at the current frame size and component state.",
            )}
          </p>
          <p>
            {t(
              "It checks the example and any open Select popup, all computed CSS properties, and the ::before and ::after pseudo-elements. Generated classes and inline style strings are represented by their computed styles. IDs are compared by reference.",
            )}
          </p>
          {comparison && (
            <dl>
              <div>
                <dt>{t("CSS properties")}</dt>
                <dd>{comparison.cssPropertyCount}</dd>
              </div>
              <div>
                <dt>{t("CSS variable checks")}</dt>
                <dd>{comparison.customPropertyChecks}</dd>
              </div>
            </dl>
          )}
        </details>
      </div>
    </div>
  );
}
