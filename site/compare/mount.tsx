import { createRoot } from "react-dom/client";
import {
  useSyncExternalStore,
  useLayoutEffect,
  type ComponentType,
  type ReactNode,
} from "react";

const variants = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;
type Variant = (typeof variants)[number];
const states = ["rest", "hover", "focus-visible", "pressed"] as const;
const keys = ["data-disabled", "data-compare-variant", "data-compare-state"];

function subscribe(update: () => void) {
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: keys,
  });
  return () => observer.disconnect();
}

export function mount(
  Button: ComponentType<{
    children: ReactNode;
    isDisabled?: boolean;
    variant: Variant;
  }>,
) {
  const html = document.documentElement;
  const root = document.getElementById("parity-root")!;
  const params = new URLSearchParams(location.search);
  if (params.has("theme"))
    html.classList.toggle("dark", params.get("theme") === "dark");
  if (params.has("disabled"))
    html.toggleAttribute("data-disabled", params.get("disabled") === "1");
  if (params.has("variant"))
    html.dataset.compareVariant = params.get("variant")!;
  if (params.has("state")) html.dataset.compareState = params.get("state")!;
  const snapshot = () =>
    JSON.stringify(keys.map((key) => html.getAttribute(key)));
  function Fixture() {
    const [disabledFlag, requestedVariant, requestedState] = JSON.parse(
      useSyncExternalStore(subscribe, snapshot),
    ) as (string | null)[];
    const isDisabled = disabledFlag !== null;
    const variant =
      variants.find((item) => item === requestedVariant) ?? "default";
    const state = isDisabled
      ? "rest"
      : (states.find((item) => item === requestedState) ?? "rest");
    useLayoutEffect(() => {
      const button = root.querySelector("button")!;
      const hover = state === "hover" || state === "pressed",
        focused = state === "focus-visible" || state === "pressed",
        active = state === "pressed";
      for (const [key, on] of Object.entries({
        "data-compare-hover": hover,
        "data-compare-focus": focused,
        "data-compare-focus-visible": state === "focus-visible",
        "data-compare-active": active,
        "data-hovered": hover,
        "data-focused": focused,
        "data-focus-visible": state === "focus-visible",
        "data-pressed": active,
      }))
        if (on) button.setAttribute(key, "true");
        else button.removeAttribute(key);
      root.dataset.readyVariant = variant;
      root.dataset.readyState = state;
      root.dataset.readyDisabled = String(isDisabled);
    }, [variant, state, isDisabled]);
    return (
      <Button isDisabled={isDisabled} variant={variant}>
        Button
      </Button>
    );
  }
  createRoot(root).render(<Fixture />);
}
