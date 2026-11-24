Partez d’un projet React et TypeScript dans lequel le fichier `components.json` de shadcn/ui et les alias d’import sont configurés.

### 1. Ajouter un composant

```sh
pnpm dlx shadcn add garrettjavalia/shadcn-ariax/button
```

L’outil en ligne de commande installe le code source du composant, la feuille de style commune et les dépendances nécessaires depuis GitHub. La révision Git choisie doit contenir le fichier `registry.json` à la racine et les fichiers sources qu’il référence. Pour cibler une révision, ajoutez `#<tag-or-commit>` à l’adresse du composant.

### Vite 7

### 2. Configurer StyleX

Configurez une fois par application [l’intégration officielle de StyleX avec Babel et PostCSS](https://stylexjs.com/docs/learn/installation/). Si vous disposez déjà d’une configuration, intégrez-y les options suivantes.

```js
// babel.config.cjs
module.exports = {
  parserOpts: {
    plugins: ["typescript", "jsx"],
  },
  plugins: ["@stylexjs/babel-plugin"],
};
```

Ces options permettent à PostCSS de lire les sources TSX lors de l’extraction des styles. Vous pouvez les omettre si les préréglages Babel utilisés à cette étape prennent déjà en charge TypeScript et JSX.

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

Incluez tous les répertoires qui contiennent vos composants ou votre code StyleX.

Pour Vite, activez le chargement de la configuration Babel dans la configuration du plugin React.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ babel: { configFile: true } })],
});
```

Intégrez ces options à votre configuration Vite existante en conservant notamment vos alias d’import.

### 3. Importer les styles

Importez une seule fois la feuille de style installée, depuis le point d’entrée de l’application.

```tsx
// src/main.tsx
import "./components/ui/ariax/styles/entry.css";
```

Adaptez le chemin au répertoire que vous avez configuré pour les composants. La feuille de style contient la directive d’extraction `@stylex;`.

### 4. Utiliser le composant

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Continue</Button>;
}
```

Pour activer le mode sombre, ajoutez la classe `dark` à l’élément `<html>`. Les autres composants s’installent avec la même commande et partagent la configuration StyleX.

### Next.js 16 · App Router

Pour utiliser l’App Router de Next.js 16, préparez un projet TypeScript avec un dossier `src/`, un alias `@/*` pointant vers `./src/*` et un fichier `components.json` pour shadcn/ui. Installez le bouton avec la commande ci-dessus.

Configurez Babel et PostCSS comme indiqué ci-dessous. Importez le CSS dans le layout racine et placez le code qui gère les interactions dans un composant client.

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

Compilez l’application en mode production et ouvrez le serveur local. Cet exemple a été testé avec Next.js 16.4.6 et Turbopack.

```sh
pnpm exec next build
pnpm exec next start
```
