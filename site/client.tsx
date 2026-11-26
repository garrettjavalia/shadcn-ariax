import { createRoot, hydrateRoot } from "react-dom/client";
import type { ComponentType } from "react";
import { Site, type SiteProps } from "./app";
import { PreviewModules, previewComponents } from "./live-preview";
import "../src/ariax/styles/entry.css";
import "./theme.css";
import "./site.css";

const modules = previewComponents(
  import.meta.glob<{ default: ComponentType }>(
    "/generated/site-previews/*/example.tsx",
  ),
);
const app = document.getElementById("app");
const data = document.getElementById("site-props")?.textContent;
if (app && data) {
  const content = (
    <PreviewModules.Provider value={modules}>
      <Site {...(JSON.parse(data) as SiteProps)} />
    </PreviewModules.Provider>
  );
  if (import.meta.env.DEV && !app.hasChildNodes())
    createRoot(app).render(content);
  else hydrateRoot(app, content);
}
