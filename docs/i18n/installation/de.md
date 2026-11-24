Verwenden Sie ein React- und TypeScript-Projekt, in dem die Datei `components.json` von shadcn/ui und die Import-Aliasse eingerichtet sind.

### 1. Komponente hinzufügen

```sh
pnpm dlx shadcn add garrettjavalia/shadcn-ariax/button
```

Die CLI installiert den Quellcode der Komponente, das gemeinsame CSS und die erforderlichen Abhängigkeiten von GitHub. Die gewählte Git-Revision muss die Datei `registry.json` im Stammverzeichnis und die darin referenzierten Quelldateien enthalten. Um eine Revision auszuwählen, hängen Sie `#<tag-or-commit>` an die Komponentenadresse an.

### Vite 7

### 2. StyleX konfigurieren

Richten Sie einmal pro Anwendung die [offizielle Babel- und PostCSS-Integration von StyleX](https://stylexjs.com/docs/learn/installation/) ein. Ergänzen Sie bei Bedarf Ihre vorhandene Konfiguration um die folgenden Einstellungen.

```js
// babel.config.cjs
module.exports = {
  parserOpts: {
    plugins: ["typescript", "jsx"],
  },
  plugins: ["@stylexjs/babel-plugin"],
};
```

Mit diesen Parseroptionen kann PostCSS bei der CSS-Extraktion TSX-Quellcode lesen. Wenn die dafür verwendeten Babel-Presets TypeScript und JSX bereits unterstützen, können Sie die Optionen weglassen.

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: ["src/**/*.{js,jsx,ts,tsx}"],
    },
  },
};
```

Schließen Sie alle Verzeichnisse mit Komponenten oder StyleX-Code ein.

Aktivieren Sie bei Vite in der vorhandenen Konfiguration des React-Plugins das Laden der Babel-Konfiguration.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ babel: { configFile: true } })],
});
```

Übernehmen Sie die Einstellung in Ihre bestehende Vite-Konfiguration und behalten Sie dabei Ihre Import-Aliasse bei.

### 3. Styles importieren

Importieren Sie das installierte Stylesheet einmal am Einstiegspunkt Ihrer Anwendung.

```tsx
// src/main.tsx
import "./components/ui/ariax/styles/entry.css";
```

Passen Sie den Pfad an das konfigurierte Komponentenverzeichnis an. Das Stylesheet enthält die Extraktionsdirektive `@stylex;`.

### 4. Komponente verwenden

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Continue</Button>;
}
```

Um den Dunkelmodus zu aktivieren, fügen Sie dem Element `<html>` die Klasse `dark` hinzu. Weitere Komponenten lassen sich mit demselben CLI-Befehl installieren und verwenden dieselbe StyleX-Konfiguration.

### Next.js 16 · App Router

Verwenden Sie für den App Router von Next.js 16 ein TypeScript-Projekt mit dem Verzeichnis `src/`, dem Alias `@/*` für `./src/*` und einer eingerichteten `components.json` für shadcn/ui. Installieren Sie den Button mit dem obigen Befehl.

Konfigurieren Sie Babel und PostCSS wie unten gezeigt. Importieren Sie das installierte CSS im Root-Layout und platzieren Sie den Code für Interaktionen in einer Client-Komponente.

**`babel.config.js`**

```js
module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "@stylexjs/babel-plugin",
      { runtimeInjection: false, treeshakeCompensation: true },
    ],
  ],
};
```

**`postcss.config.cjs`**

```js
module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      babelConfig: {
        babelrc: false,
        configFile: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: require("./babel.config.js").plugins,
      },
    },
  },
};
```

**`src/app/layout.tsx`**

```tsx
import "@/components/ui/ariax/styles/entry.css";
import type { ReactNode } from "react";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**`src/app/page.tsx`**

```tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export default function Page() {
  const [count, setCount] = useState(0);
  return <Button onPress={() => setCount(count + 1)}>Count {count}</Button>;
}
```

Erstellen Sie den Produktionsbuild und starten Sie den lokalen Server. Dieses Beispiel wurde mit Next.js 16.4.6 und Turbopack getestet.

```sh
pnpm exec next build
pnpm exec next start
```
