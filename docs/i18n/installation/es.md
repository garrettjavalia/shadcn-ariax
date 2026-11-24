Empieza con un proyecto de React y TypeScript que tenga configurados el archivo `components.json` de shadcn/ui y los alias de importación.

### 1. Añade un componente

```sh
pnpm dlx shadcn add garrettjavalia/shadcn-ariax/button
```

La CLI instala desde GitHub el código fuente del componente, el CSS compartido y las dependencias necesarias. La revisión de Git seleccionada debe incluir el archivo `registry.json` en la raíz y los archivos fuente a los que hace referencia. Para elegir una revisión, añade `#<tag-or-commit>` a la dirección del componente.

### Vite 7

### 2. Configura StyleX

Configura una vez por aplicación la [integración oficial de StyleX con Babel y PostCSS](https://stylexjs.com/docs/learn/installation/). Si ya tienes una configuración, incorpora las siguientes opciones.

```js
// babel.config.cjs
module.exports = {
  parserOpts: {
    plugins: ["typescript", "jsx"],
  },
  plugins: ["@stylexjs/babel-plugin"],
};
```

Las opciones del analizador permiten que PostCSS lea archivos TSX durante la extracción. Puedes omitirlas si los preajustes de Babel que se usan en ese paso ya admiten TypeScript y JSX.

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

Incluye todos los directorios que contengan componentes o código de StyleX.

En Vite, habilita la carga de la configuración de Babel en el complemento de React:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ babel: { configFile: true } })],
});
```

Incorpora este ajuste a tu configuración actual de Vite y conserva los alias de importación.

### 3. Importa los estilos

Importa la hoja de estilos instalada una sola vez desde el punto de entrada de la aplicación:

```tsx
// src/main.tsx
import "./components/ui/ariax/styles/entry.css";
```

Ajusta la ruta al directorio que hayas configurado para tus componentes. La hoja de estilos incluye la directiva de extracción `@stylex;`.

### 4. Usa el componente

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Continue</Button>;
}
```

Añade la clase `dark` a `<html>` para activar el modo oscuro. Puedes instalar más componentes con el mismo comando de la CLI y reutilizar la configuración de StyleX.

### Next.js 16 · App Router

Para usar el App Router de Next.js 16, prepara un proyecto TypeScript con el directorio `src/`, el alias `@/*` apuntando a `./src/*` y el archivo `components.json` de shadcn/ui. Instala el botón con el comando anterior.

Configura Babel y PostCSS como se muestra a continuación. Importa el CSS desde el layout raíz y coloca el código que gestiona las interacciones en un componente de cliente.

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

Genera la compilación de producción y abre el servidor local. Este ejemplo se ha probado con Next.js 16.4.6 y Turbopack.

```sh
pnpm exec next build
pnpm exec next start
```
