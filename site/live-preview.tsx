import {
  Component as ReactComponent,
  type ReactNode,
  createContext,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { useTranslation } from "react-i18next";
import type { PreviewLayout } from "./preview-layouts";

type PreviewComponents = Map<string, LazyExoticComponent<ComponentType>>;
export const PreviewModules = createContext<PreviewComponents>(new Map());

export function previewComponents(
  loaders: Record<string, () => Promise<{ default: ComponentType }>>,
): PreviewComponents {
  return new Map(
    Object.entries(loaders).map(([path, load]) => [
      path.split("/").at(-2)!,
      lazy(load),
    ]),
  );
}

class PreviewBoundary extends ReactComponent<{ children: ReactNode; fallback: ReactNode }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

type Props = {
  name: string;
  story: string;
  layout: PreviewLayout;
  documented: boolean;
  eager: boolean;
};

export function LivePreview({ name, story, layout, documented, eager }: Props) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const Component = useContext(PreviewModules).get(story);
  useEffect(() => {
    if (eager || !window.IntersectionObserver) {
      setActive(true);
      return;
    }
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [eager]);
  return (
    <div
      ref={ref}
      className="ariax-preview-surface"
      dir={layout.direction}
      data-live-story={story}
    >
      <div className={layout.outer}>
        <div
          className={layout.preview}
          data-preview-stage={name}
          data-align={layout.align}
          data-chromeless={layout.chromeless}
          data-documented={documented}
          data-viewport-block={layout.block || name.startsWith("sidebar-")}
        >
          {active && Component && (
            <PreviewBoundary key={story} fallback={<p role="status">{t("Preview unavailable")}</p>}>
              <Suspense fallback={null}>
                <Component />
              </Suspense>
            </PreviewBoundary>
          )}
        </div>
      </div>
    </div>
  );
}
