# AriaX

shadcn React Aria 컴포넌트를 StyleX로 제공합니다.

AriaX는 Nova 스타일과 Neutral light/dark 테마를 제공하는 shadcn 레지스트리입니다. 컴포넌트 소스를 프로젝트에 설치하고 StyleX로 수정할 수 있습니다.

[English](../../../README.md) · 한국어

## 주요 기능

- React Aria 프리미티브 기반의 컴포넌트 동작과 접근성.
- Tailwind 의존성 없는 StyleX 스타일링.
- shadcn CLI로 설치하고 직접 수정할 수 있는 컴포넌트 소스.
- 라이트·다크 테마.

제공하는 컴포넌트, 검증 범위와 남은 작업은 [컴포넌트 지원 현황](../components/ko.md)을 참고하세요.

## 설치

shadcn의 `components.json`과 import 경로 별칭이 준비된 React·TypeScript 프로젝트에서 시작합니다.

아래 예시는 Vite 7과 `@vitejs/plugin-react` 5 기준입니다. Next.js, SSR 및 다른 프레임워크 통합은 아직 이 프로젝트에서 검증하지 않았습니다.

### 1. 컴포넌트 추가

```sh
pnpm dlx shadcn@4.21.1 add garrettjavalia/shadcn_ariax/button
```

CLI가 GitHub에서 컴포넌트 소스, 공통 CSS와 필요한 의존성을 설치합니다. 설치할 Git 리비전에는 루트 `registry.json`과 참조하는 소스 파일이 포함되어 있어야 합니다. 특정 리비전을 선택하려면 컴포넌트 주소 뒤에 `#<태그 또는 커밋>`을 붙입니다.

### 2. StyleX 설정

[StyleX의 공식 Babel + PostCSS 설치 방식](https://stylexjs.com/docs/learn/installation/)을 앱마다 한 번 설정합니다. 기존 설정이 있다면 필요한 내용을 병합하세요.

```js
// babel.config.cjs
module.exports = {
  parserOpts: {
    plugins: ["typescript", "jsx"],
  },
  plugins: ["@stylexjs/babel-plugin"],
};
```

파서 옵션은 PostCSS의 CSS 추출 단계에서 TSX 소스를 읽도록 합니다. 해당 단계가 사용하는 Babel 프리셋이 이미 TypeScript와 JSX를 처리한다면 생략할 수 있습니다.

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

컴포넌트와 StyleX 코드가 있는 디렉터리를 모두 `include`에 포함하세요.

Vite에서는 기존 React 플러그인이 Babel 설정을 읽도록 연결합니다.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react({ babel: { configFile: true } })],
});
```

경로 별칭을 포함한 기존 Vite 설정에 위 내용을 병합하세요.

### 3. 스타일 불러오기

앱 진입점에서 설치된 스타일시트를 한 번 가져옵니다.

```tsx
// src/main.tsx
import "./components/ui/ariax/styles/entry.css";
```

설정한 컴포넌트 설치 위치에 맞게 경로를 조정하세요. 이 스타일시트에는 CSS 추출 지시문 `@stylex;`가 포함되어 있습니다.

### 4. 컴포넌트 사용

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Continue</Button>;
}
```

`<html>`에 `dark` 클래스를 추가하면 다크 모드가 적용됩니다. 추가 컴포넌트도 같은 CLI 명령으로 설치하며, StyleX 설정은 공유합니다.

## 커스터마이징

설치된 컴포넌트 소스를 직접 수정할 수 있습니다. 컴포넌트는 공개 `className` prop 대신 StyleX 커스터마이징용 `xstyle`과 인라인 스타일용 `style`을 제공합니다.

## 컴포넌트 검증 방식

AriaX는 원본과 StyleX용 Storybook을 분리하고, 고정한 업스트림 리비전의 컴포넌트와 비교합니다.

CI 비교는 1000px 뷰포트의 라이트·다크 테마에서 DOM 구조, 텍스트, 속성, 계산 CSS와 의사 요소를 검사합니다. 계산 CSS의 단일 색상 값은 작은 색상 변환 차이를 고려해 OKLab에서 최대 ΔE 0.002를 허용합니다. 투명도와 나머지 비교 값은 정확하게 비교합니다.

로컬 전체 검증에서는 조작, 위치·크기, 스크롤, 포커스, 픽셀, 애니메이션 시간별 상태, 설치와 빌드도 검사합니다. CI 비교는 전체 검증보다 범위가 좁으며, 컴포넌트별 검증 범위는 [컴포넌트 지원 현황](../components/ko.md)에서 관리합니다.

## 로컬 개발

Node.js 22.19+와 pnpm 10.15.1이 필요합니다.

```sh
git clone https://github.com/garrettjavalia/shadcn_ariax.git
cd shadcn_ariax
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

첫 실행은 고정된 업스트림 소스를 다운로드하고 준비합니다. 생성된 레퍼런스는 `generated/` 아래에서 자동으로 관리됩니다.

- [원본 Storybook](http://127.0.0.1:4100)
- [AriaX Storybook](http://127.0.0.1:4200)

프로젝트 구조, 수정 방법과 저장소 검사는 [개발 가이드](../development/ko.md)를 참고하세요.

## 라이선스

[MIT](../../../LICENSE) © 2026 Minsuk Jung. 외부 코드의 원래 저작권과 라이선스 고지는 [licenses/](../../../licenses/)에 보존합니다. shadcn CLI는 이 고지들을 컴포넌트와 함께 설치합니다.
