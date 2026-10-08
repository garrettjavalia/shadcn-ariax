# AriaX

shadcn React Aria components styled with StyleX.

AriaX brings the Nova style and Neutral light/dark themes to a shadcn registry. Install component source into your project and customize it with StyleX.

English · [한국어](docs/i18n/readme/ko.md)

## Features

- React Aria primitives for component behavior and accessibility.
- StyleX styling without a Tailwind dependency.
- Editable component source installed through the shadcn CLI.
- Light and dark themes.

See [Component status](docs/i18n/components/en.md) for available components, verification coverage, and remaining work.

## Installation

Start with a React and TypeScript project with shadcn's `components.json` and import aliases configured.

The example below targets Vite 7 with `@vitejs/plugin-react` 5. Next.js, SSR, and other framework integrations have not yet been verified by this project.

### 1. Add a component

```sh
pnpm dlx shadcn@4.21.1 add garrettjavalia/shadcn_ariax/button
```

The CLI installs the component source, shared CSS, and required dependencies from GitHub. The selected Git revision must contain the root `registry.json` and its referenced source files. Append `#<tag-or-commit>` to the component address to select a revision.

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

Registry maintainers: see [GitHub Raw publication and directory submission](docs/i18n/development/en.md#publishing-for-the-registry-directory). The GitHub installation address above works without directory registration.

## Customization

Edit the installed component source directly. Components expose `xstyle` for StyleX customization and `style` for inline styles, rather than a public `className` prop.

## How we verify components

AriaX compares components against a pinned upstream revision using separate upstream and StyleX Storybooks.

The CI comparison checks DOM structure, text, attributes, computed CSS, and pseudo-elements at a 1000px viewport in light and dark themes. Standalone computed color values are compared in OKLab with a maximum ΔE of 0.002 to account for small color-conversion differences. Alpha and other compared values remain exact.

The full local suite also checks interactions, geometry, scrolling, focus, pixels, animation timing, installation, and builds. CI comparison results cover a smaller scope than the full suite; component-specific coverage is tracked in [Component status](docs/i18n/components/en.md).

## Local development

Requires Node.js 22.19+ and pnpm 10.15.1.

```sh
git clone https://github.com/garrettjavalia/shadcn_ariax.git
cd shadcn_ariax
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

The first run downloads and prepares the pinned upstream sources. Generated references are managed automatically under `generated/`.

After startup, open the local URLs printed in the terminal to view the Upstream and AriaX Storybooks.

See the [Development guide](docs/i18n/development/en.md) for project structure, modification guidelines, and repository checks.

## License

[MIT](LICENSE) © 2026 Minsuk Jung. Third-party code retains its original copyright and license notices in [licenses/](licenses/). The shadcn CLI installs these notices alongside the components.
