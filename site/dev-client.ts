import type { SiteProps } from "./app";

const resources = import.meta.glob<{ default: { ui: Record<string, string> } }>(
  "./i18n/*-*.ts",
  { eager: true },
);
const data = document.querySelector("#site-props")!;
const props: SiteProps = JSON.parse(data.textContent!);
props.messages = resources[`./i18n/${props.locale}.ts`].default.ui;
data.textContent = JSON.stringify(props);
void import("./client");
