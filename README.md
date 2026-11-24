# AriaX

shadcn/ui React Aria components styled with StyleX.

AriaX brings the Nova style and Neutral light/dark themes to a shadcn/ui registry. Install component source into your project and customize it with StyleX.

English · [한국어](docs/i18n/readme/ko.md)

## Features

- React Aria primitives for component behavior and accessibility.
- StyleX styling without a Tailwind dependency.
- Editable component source installed through the shadcn CLI.
- Light and dark themes.

See [Component status](docs/i18n/components/en.md) for available components, verification coverage, and remaining work.

## Try the components

Browse examples and try component interactions in the [AriaX component viewer](https://garrettjavalia.github.io/shadcn-ariax/docs/components/).

Run the AriaX Storybook locally to browse examples and try component interactions. Requires Node.js 22.19+ and pnpm 10.15.1.

```sh
git clone https://github.com/garrettjavalia/shadcn-ariax.git
cd shadcn-ariax
pnpm install --frozen-lockfile
pnpm storybook
```

Open the local URL printed in the terminal. The first run downloads and prepares the required upstream sources and builds the registry, so it may take longer. Later runs reuse the prepared sources. Stop the server with Ctrl+C.

## Installation

Start with a React and TypeScript project with shadcn/ui’s `components.json` and import aliases configured.

### 1. Add a component

```sh
pnpm dlx shadcn add garrettjavalia/shadcn-ariax/button
```

The CLI installs the component source, shared CSS, and required dependencies from GitHub. The selected Git revision must contain the root `registry.json` and its referenced source files. Append `#<tag-or-commit>` to the component address to select a revision.

### Vite 7

### 2. Configure StyleX

Configure [StyleX's official Babel + PostCSS integration](https://stylexjs.com/docs/learn/installation/) once per application. Merge the following into your existing configuration if needed.

```js
// babel.config.cjs
module.exports = {
  parserOpts: {
    plugins: ["typescript", "jsx"],
  },
  plugins: ["@stylexjs/babel-plugin"],
};
```

The parser options let the PostCSS extraction step read TSX source. You can omit them if the Babel presets used by that step already handle TypeScript and JSX.

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

Include every directory containing your components and StyleX code.

For Vite, enable loading the Babel configuration in your existing React plugin setup:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ babel: { configFile: true } })],
});
```

Merge this into your existing Vite configuration, including your import aliases.

### 3. Import the styles

Import the installed stylesheet once from your application entry:

```tsx
// src/main.tsx
import "./components/ui/ariax/styles/entry.css";
```

Adjust the path to match your configured component directory. The stylesheet includes the `@stylex;` extraction directive.

### 4. Use the component

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Continue</Button>;
}
```

Add the `dark` class to `<html>` to enable dark mode. Additional components use the same CLI installation command and share the StyleX setup.

### Next.js 16 · App Router

For Next.js 16 with the App Router, use a TypeScript project with a `src/` directory, the `@/*` alias mapped to `./src/*`, and shadcn/ui’s `components.json` configured. Install the button with the command above.

Use the following Babel and PostCSS configuration for Next.js. Import the installed CSS from the root layout and place interactive code in a Client Component.

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

Run the production build and open the local server. This example was tested with Next.js 16.4.6 and Turbopack.

```sh
pnpm exec next build
pnpm exec next start
```

## Customization

Edit the installed component source directly. Components expose `xstyle` for StyleX customization and `style` for inline styles, rather than a public `className` prop.

## How we verify components

AriaX compares components against a pinned upstream revision using separate upstream and StyleX Storybooks.

The CI comparison checks DOM structure, text, attributes, computed CSS, and pseudo-elements at a 1000px viewport in light and dark themes. Standalone computed color values are compared in OKLab with a maximum ΔE of 0.002 to account for small color-conversion differences. Alpha and other compared values remain exact.

The full local suite also checks interactions, geometry, scrolling, focus, pixels, animation timing, installation, and builds. CI comparison results cover a smaller scope than the full suite; component-specific coverage is tracked in [Component status](docs/i18n/components/en.md).

## Website development

The public site is a Vite static build with an AriaX home page, installation guide, and searchable component catalog. It generates pages in English, Korean, Japanese, Spanish, Brazilian Portuguese, French, and German with interactive AriaX variants and their example source. The site detects the browser language on first load.

The home page includes a live button comparison. It renders the pinned shadcn/ui button and the installed AriaX button in separate frames so you can inspect their DOM and computed styles in your browser.

```sh
pnpm build:site
pnpm check:site:examples
pnpm preview:site
# Stop the preview server, then run tests with Chromium installed:
pnpm test:site
```

GitHub Pages serves the [AriaX home page](https://garrettjavalia.github.io/shadcn-ariax/) from `dist/site/index.html` at the repository root path, `/shadcn-ariax/`. Each translated guide and component page has its own HTML file. Set `ARIAX_SITE_BASE` to build for another base path. Storybook runs separately for development and parity testing.

## Local development

For development and comparison with the upstream implementation, start both Storybooks. Requires Node.js 22.19+ and pnpm 10.15.1.

```sh
git clone https://github.com/garrettjavalia/shadcn-ariax.git
cd shadcn-ariax
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

The first run downloads and prepares the pinned upstream sources. Generated references are managed automatically under `generated/`.

After startup, open the local URLs printed in the terminal to view the Upstream and AriaX Storybooks.

See the [Development guide](docs/i18n/development/en.md) for project structure, modification guidelines, and repository checks.

## License

[MIT](LICENSE) © 2026 Minsuk Jung. Third-party code retains its original copyright and license notices in [licenses/](licenses/). The shadcn CLI installs these notices alongside the components.
