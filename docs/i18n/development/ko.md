# 개발 가이드

[English](en.md) · 한국어

Ariax를 수정하는 개발자를 위한 문서입니다. 앱에 컴포넌트를 설치하는 방법은 [README](../readme/ko.md)를 참고하세요.

## 로컬 환경

Node.js 22.19+와 pnpm 10.15.1을 사용합니다. 명령은 클론한 저장소 루트에서 실행합니다.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

첫 실행은 `generated/`에 고정된 업스트림 소스를 준비합니다. Storybook은 [원본 :4100](http://127.0.0.1:4100)과 [Ariax :4200](http://127.0.0.1:4200)에서 실행됩니다. 포트를 바꾸려면 개발과 테스트에 `ARIAX_UPSTREAM_PORT`, `ARIAX_STYLEX_PORT`를 동일하게 지정합니다.

## 저장소 구조

| 경로 | 역할 |
| --- | --- |
| `registry/ariax/ui/` | 컴포넌트, `.internal.tsx` 헬퍼, `.recipe.stylex.ts` 레시피 |
| `registry/ariax/styles/` | `entry.css`에서 가져오는 공통 CSS와 테마 토큰 |
| `stories/`, `tests/` | 예제, 브라우저 비교, 설치 픽스처 |
| `.storybook/`, `reference/` | 빌드 설정과 원본 쪽 어댑터 |
| `scripts/build-registry.ts`, `scripts/registry-sources.ts` | 카탈로그 생성과 소스·의존성 탐색 |
| `upstream/`, `scripts/upstream/` | 고정 소스 메타데이터와 레퍼런스 준비 |
| `licenses/` | 배포하는 외부 코드 라이선스 |

소스, 설정, 잠금 파일, 업스트림 메타데이터와 생성된 루트 `registry.json`을 커밋합니다. `generated/`, `public/registry.json`, `public/r/`, `dist/`, 테스트 보고서는 로컬 출력물입니다.

## 컴포넌트와 레지스트리 수정

1. `registry/ariax/ui/`를 수정합니다. 로컬 의존 파일은 같은 디렉터리에 두고 상대 import를 사용합니다. React Aria의 동작·접근성을 유지하고, 내부 스타일 뒤에 `xstyle`과 `style`을 적용하며 동적 CSS 변수를 보존합니다.
2. 관련 스토리와 테스트를 수정합니다. 새 설치 항목에는 `tests/install/`에 같은 이름의 픽스처를 추가하고, 추가 패키지는 `<name>.dependencies.json`에 정확한 버전으로 선언합니다.
3. 카탈로그를 재생성하고 검사합니다.

   ```sh
   pnpm registry:build
   pnpm registry:check
   ```

4. 영향받는 동작을 검사하고, 제공 여부나 검증 범위가 바뀌면 [컴포넌트 지원 현황](../components/ko.md)의 두 언어판을 수정합니다.

생성기는 `ui/<name>.tsx`와 레시피를 탐색하고 상대 import를 따라 파일을 수집하며, `package.json`의 정확한 패키지 버전을 사용합니다. 루트 `registry.json`은 GitHub 설치용 파일 경로를 담고, `public/r/<item>.json`은 HTTP·로컬 설치에 필요한 내용을 직접 포함합니다.

공통 CSS·애니메이션·라이선스·StyleX 의존성은 `ariax-base`에 둡니다. 의존 항목은 컴포넌트의 리비전을 상속하지 않으므로 별도 GitHub 커밋으로 고정합니다. 공통 파일이나 의존성을 변경한 경우:

1. `pnpm registry:build --publish-shared`를 실행하고 공통 항목과 소스를 커밋·푸시합니다.
2. `scripts/build-registry.ts`의 `sharedRevision`과 출력된 digest를 갱신합니다.
3. 카탈로그를 재생성하고 검사합니다. 일반 빌드는 기록되지 않은 공통 파일 변경을 거부합니다.

StyleX Babel 플러그인은 JavaScript의 스타일 참조를 컴파일하고, PostCSS 플러그인은 `entry.css`의 `@stylex;`를 추출한 CSS로 교체합니다. `.storybook/main.ts`가 두 구현을 설정합니다. `pnpm build:upstream`과 `pnpm build:stylex`는 `dist/upstream/`과 `dist/stylex/`에 출력하며, 후자는 지연 로딩 스토리의 CSS도 검사합니다.

## 업스트림 준비

```text
upstream/source.json + upstream/reference.json
  → upstream:prepare → generated/upstream/shadcn/ + generated/reference/
  → originals:generate → generated/original-stories/
```

`source.json`은 저장소·커밋·선택 경로·필수 파일을 고정하고, `reference.json`은 컴포넌트와 보조 레퍼런스를 선택합니다. 레퍼런스를 추가하려면 `components`나 `helperReferences`를 수정하고 필요한 npm 패키지를 이 프로젝트에 정확한 버전으로 선언합니다.

준비 과정은 원본 `*/_registry.ts`를 읽고 공식 `createStyleMap`·`transformStyle` API를 적용한 뒤 격리된 프로젝트에서 shadcn CLI `build`와 `add`를 실행합니다. Neutral 색상도 같은 커밋에서 가져와 로컬 레지스트리로 제공합니다. 해당 커밋과 고정된 CLI·패키지가 재현 기준입니다. `rtl: true`로 공식 논리 방향 변환을 적용해 LTR·RTL을 비교합니다.

`generated/reference/aria-nova/`에는 기본 설치 결과를, `base-nova/`와 `radix-rhea/`에는 예제용 헬퍼를 둡니다. `@reference/*`는 기본 설치를 가리킵니다. CLI 소유 `cli.css`와 비교 환경의 `tailwind.css`는 분리합니다.

`originals:generate`는 MDX의 `ComponentPreview`에서 공식 TSX 예제를 찾아 JSX·클래스를 바꾸지 않고 스토리를 생성합니다. `/original-stories/manifest.json`에 대응 관계를 기록하며, 미대응 예제도 표시합니다. Next Image·Link와 예제 폰트는 `reference/`의 React 어댑터로 연결합니다.

테스트·타입 검사·Storybook 명령은 레퍼런스를 자동 준비합니다. `scripts/upstream/ensure.ts`는 다운로드, `reference.ts`는 설치 생성, `prepare.ts`는 설치 캐시를 담당합니다. 완료 기록·소스 설정·필수 파일로 재사용 여부를 판단하며 유효한 캐시는 오프라인에서도 동작합니다. 공유 잠금과 임시 디렉터리로 동시 실행을 보호하고 실패 시 기존 캐시를 보존합니다. 설치 파일 누락은 재생성하며, 수동 변경이나 손상이 의심되면 `pnpm upstream:sync`를 실행합니다. 일반 검사는 고정한 소스 리비전을 갱신하지 않습니다.

## 검사

저장소 개발용 검사입니다. 변경 범위에 맞게 선택하세요. 전체 검증은 약 1시간 걸릴 수 있습니다.

| 변경 | 검사 |
| --- | --- |
| 문서 | 링크, 명령 이름, 번역 일치 |
| 컴포넌트 | `pnpm typecheck`, 관련 브라우저 테스트와 CI 비교 |
| 레지스트리·의존성 | `pnpm registry:check`, `pnpm test:install` |
| StyleX 통합 | `pnpm test:stylex`, 설치 검사, StyleX 빌드 |
| 업스트림 준비 | `pnpm test:upstream`, `pnpm upstream:check` |
| 비교기 | 비교기 계약 테스트와 영향받는 비교 |

개별 테스트나 컴포넌트 비교부터 실행합니다.

```sh
pnpm test tests/button.spec.ts
PARITY_COMPONENT=components-button-- pnpm test:ci:light
```

`test:ci:light`와 `test:ci:dark`는 한 테마를, `test:ci`는 두 테마를 검사합니다. CI 비교는 1000px에서 DOM·텍스트·속성·계산 CSS·의사 요소를 검사합니다. 단일 색상은 OKLab ΔE ≤ 0.002를 허용하고 투명도와 나머지 값은 정확하게 비교합니다. 조작·위치·크기·픽셀·포커스·스크롤·애니메이션은 더 넓은 검사 범위에 포함됩니다.

비교 스토리는 `parity`를 사용하고 `#parity-root` 안에 렌더링하며, 포털에는 `data-parity-portal`을 표시합니다. `viewport-390`은 모바일 비교를 추가합니다. 공통 비교 코드는 `tests/parity.spec.ts`, `tests/compare.ts`, `tests/color-differences.ts`에 있습니다.

프로덕션 비교는 소스 수정 후 다시 빌드합니다.

```sh
pnpm build
ARIAX_STATIC_STORYBOOK=1 pnpm test:ci:light
```

`pnpm test:upstream`은 로컬 원본 아카이브와 실제 CLI로 변환·동시 준비·오프라인 재사용·캐시 복구를 검사합니다. `pnpm test:install`은 별도로 소비 앱에 Ariax 레지스트리를 설치합니다.

`pnpm test`는 브라우저 검사를, `pnpm test:full`은 설치와 빌드를 포함한 전체 검증을 실행합니다. 결과는 `pnpm test:report`로 보고 테스트 포맷은 `pnpm format:tests`로 맞춥니다. 구현·검증의 세부 규칙은 [convention.md](../../../convention.md)를 참고하세요.
