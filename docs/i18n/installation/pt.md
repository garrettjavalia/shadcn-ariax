Comece com um projeto React e TypeScript que tenha o arquivo `components.json` do shadcn/ui e os aliases de importação configurados.

### 1. Adicione um componente

```sh
pnpm dlx shadcn add garrettjavalia/shadcn-ariax/button
```

A CLI instala pelo GitHub o código-fonte do componente, o CSS compartilhado e as dependências necessárias. A revisão do Git escolhida precisa incluir o arquivo `registry.json` na raiz e os arquivos de código que ele referencia. Para escolher uma revisão, acrescente `#<tag-or-commit>` ao endereço do componente.

### Vite 7

### 2. Configure o StyleX

Configure uma vez por aplicativo a [integração oficial do StyleX com Babel e PostCSS](https://stylexjs.com/docs/learn/installation/). Se o projeto já tiver esses arquivos de configuração, incorpore as opções a seguir.

```js
// babel.config.cjs
module.exports = {
  parserOpts: {
    plugins: ["typescript", "jsx"],
  },
  plugins: ["@stylexjs/babel-plugin"],
};
```

As opções do analisador permitem que o PostCSS leia arquivos TSX durante a extração. Você pode omiti-las se os presets do Babel usados nessa etapa já derem suporte a TypeScript e JSX.

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

Inclua todos os diretórios que contêm componentes ou código do StyleX.

No Vite, habilite o carregamento da configuração do Babel no plugin React:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ babel: { configFile: true } })],
});
```

Incorpore esse ajuste à configuração atual do Vite e mantenha os aliases de importação.

### 3. Importe os estilos

Importe a folha de estilos instalada uma única vez no ponto de entrada do aplicativo:

```tsx
// src/main.tsx
import "./components/ui/ariax/styles/entry.css";
```

Ajuste o caminho para o diretório configurado para seus componentes. A folha de estilos inclui a diretiva de extração `@stylex;`.

### 4. Use o componente

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Continue</Button>;
}
```

Adicione a classe `dark` a `<html>` para ativar o modo escuro. Você pode instalar outros componentes com o mesmo comando da CLI e reutilizar a configuração do StyleX.

### Next.js 16 · App Router

Para usar o App Router do Next.js 16, prepare um projeto TypeScript com o diretório `src/`, o alias `@/*` apontando para `./src/*` e o arquivo `components.json` do shadcn/ui. Instale o botão com o comando acima.

Configure o Babel e o PostCSS como mostrado abaixo. Importe o CSS no layout raiz e coloque o código que trata as interações em um componente de cliente.

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

Gere a versão de produção e abra o servidor local. Este exemplo foi testado com Next.js 16.4.6 e Turbopack.

```sh
pnpm exec next build
pnpm exec next start
```
