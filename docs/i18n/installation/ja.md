shadcn/ui の `components.json` とインポートエイリアスを設定した React・TypeScript プロジェクトを用意します。

### 1. コンポーネントを追加

```sh
pnpm dlx shadcn add garrettjavalia/shadcn-ariax/button
```

CLI は GitHub からコンポーネントのソース、共通 CSS、必要な依存パッケージをインストールします。選択する Git リビジョンには、ルートの `registry.json` と、そこから参照されるソースファイルが必要です。リビジョンを指定するには、コンポーネントのアドレスの末尾に `#<tag-or-commit>` を付けます。

### Vite 7

### 2. StyleX を設定

アプリケーションごとに一度、[StyleX 公式の Babel と PostCSS の連携](https://stylexjs.com/docs/learn/installation/)を設定します。既存の設定がある場合は、以下の内容を組み込んでください。

```js
// babel.config.cjs
module.exports = {
  parserOpts: {
    plugins: ["typescript", "jsx"],
  },
  plugins: ["@stylexjs/babel-plugin"],
};
```

これらのパーサーオプションにより、PostCSS が CSS を抽出する際に TSX ソースを読み取れます。この処理で使う Babel プリセットがすでに TypeScript と JSX に対応していれば、省略できます。

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

コンポーネントと StyleX コードを含むディレクトリをすべて対象にします。

Vite では、既存の React プラグイン設定で Babel 設定の読み込みを有効にします。

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ babel: { configFile: true } })],
});
```

インポートエイリアスなど、既存の Vite 設定にこの内容を組み込んでください。

### 3. スタイルを読み込む

アプリケーションのエントリーポイントで、インストールしたスタイルシートを一度だけインポートします。

```tsx
// src/main.tsx
import "./components/ui/ariax/styles/entry.css";
```

コンポーネントの配置先に合わせてパスを調整します。スタイルシートには CSS 抽出用の `@stylex;` ディレクティブが含まれます。

### 4. コンポーネントを使う

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Continue</Button>;
}
```

ダークモードにするには、`<html>` に `dark` クラスを追加します。他のコンポーネントも同じ CLI コマンドで追加でき、StyleX の設定を共用できます。

### Next.js 16 · App Router

Next.js 16 の App Router では、TypeScript プロジェクトに `src/` を作り、`@/*` を `./src/*` に割り当てます。shadcn/ui の `components.json` を設定し、上のコマンドでボタンをインストールします。

Next.js 用の Babel と PostCSS を以下のように設定します。インストールした CSS はルートレイアウトで読み込み、状態やイベントハンドラーなど、操作を処理するコードはクライアントコンポーネントに配置します。

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

本番ビルドを実行してローカルサーバーを開きます。この例は Next.js 16.4.6 と Turbopack で動作確認済みです。

```sh
pnpm exec next build
pnpm exec next start
```
