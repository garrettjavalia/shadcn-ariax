# 개발 가이드

[English](en.md) · 한국어

이 문서는 저장소의 소스 파일, 생성 과정과 검사를 일반적인 수정 작업에 연결해 설명합니다. 앱에 컴포넌트를 설치하는 방법은 [README](../readme/ko.md)를 참고하세요.

## 로컬 환경

Node.js 22.19+와 pnpm 10.15.1을 사용합니다. 명령은 저장소 루트에서 실행합니다.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

첫 실행은 고정된 업스트림 소스를 다운로드하고 `generated/` 아래에 레퍼런스 컴포넌트를 준비합니다.

| 서버 | URL | 구현 |
| --- | --- | --- |
| 원본 Storybook | http://127.0.0.1:4100 | 준비된 업스트림 컴포넌트와 예제 |
| Ariax Storybook | http://127.0.0.1:4200 | `registry/ariax/`의 소스 |

두 서버는 `.storybook/`을 공유합니다. `ARIAX_IMPLEMENTATION`이 구현을 선택하며, 패키지 스크립트가 이 값을 지정합니다. 포트를 변경하려면 개발과 테스트 명령에 `ARIAX_UPSTREAM_PORT`와 `ARIAX_STYLEX_PORT`를 동일하게 지정합니다.

## 저장소 구조

| 경로 | 역할 |
| --- | --- |
| `registry/ariax/ui/` | 컴포넌트 구현, 내부 헬퍼, StyleX 레시피 |
| `registry/ariax/styles/` | 공통 CSS, 테마 토큰, `entry.css` 스타일시트 |
| `stories/` | Ariax 예제와 비교 스토리 |
| `reference/` | 원본 쪽 어댑터와 커스터마이징 픽스처 |
| `.storybook/` | 구현별 별칭, 미리보기 설정, 빌드 통합 |
| `tests/` | Playwright 비교, 동작 테스트, 공통 검사 헬퍼 |
| `tests/install/` | 설치 가능한 레지스트리 항목별 소비 앱 픽스처 |
| `scripts/build-registry.ts` | 레지스트리 카탈로그와 항목 생성 |
| `scripts/registry-sources.ts` | 소스 탐색과 의존성 수집 |
| `scripts/upstream/` | 원본 다운로드, 레퍼런스 설치, 예제 생성 |
| `upstream/source.json` | 고정한 업스트림 소스 리비전 |
| `upstream/reference.json` | 레퍼런스 컴포넌트와 헬퍼 선택 |
| `licenses/` | 레지스트리에 포함하는 외부 코드 라이선스 |
| `registry.json` | GitHub 설치에 사용하는 커밋 대상 카탈로그 |

## 생성과 빌드 흐름

### 레지스트리

```text
registry/ariax/ui/ + registry/ariax/styles/ + licenses/
    → pnpm registry:build
    → registry.json
    → public/registry.json + public/r/<item>.json
```

컴포넌트는 `ui/<name>.tsx`에서 탐색합니다. 상대 import를 따라 함께 설치할 소스를 수집하고, 외부 패키지는 `package.json`에 선언한 정확한 버전으로 연결합니다.

`<name>.internal.tsx`는 독립 설치 항목이 아닌 내부 헬퍼입니다. HTML 기본 요소용 레시피는 `<name>.recipe.stylex.ts`를 사용합니다. 공통 CSS·애니메이션·라이선스·StyleX 빌드 의존성은 `ariax-base`에 한 번 정의하며, 컴포넌트는 커밋이 고정된 GitHub `registryDependencies` 주소로 참조합니다. `public/r/`의 HTTP·로컬 설치 파일에는 공통 파일을 직접 포함합니다.

공통 파일이나 의존성을 변경하면 `pnpm registry:build --publish-shared`로 생성한 공통 항목을 커밋·푸시한 다음, `scripts/build-registry.ts`의 `sharedRevision`과 출력된 digest를 갱신하고 카탈로그를 다시 생성합니다. GitHub 의존 항목은 컴포넌트의 리비전을 상속하지 않으므로 따로 고정합니다. 일반 빌드는 이 고정값을 갱신하지 않은 공통 파일 변경을 거부합니다.

레지스트리 소스나 의존성 선언을 수정한 뒤 다음을 실행합니다.

```sh
pnpm registry:build
pnpm registry:check
```

검사 명령은 커밋 대상 카탈로그와 현재 소스를 비교하고, shadcn CLI로 카탈로그를 검증합니다.

### 업스트림 레퍼런스

```text
upstream/source.json + upstream/reference.json
    → pnpm upstream:prepare
    → generated/upstream/ + generated/reference/
    → pnpm originals:generate
    → generated/original-stories/
```

레퍼런스 컴포넌트는 공식 shadcn CLI로 준비합니다. 원본 예제 스토리는 고정된 업스트림 문서에서 생성합니다. 준비 스크립트는 유효한 캐시를 재사용합니다.

레퍼런스 구성을 변경하려면 소스 메타데이터나 생성기를 수정합니다. 캐시 처리와 생성 과정은 [업스트림 준비 구조](../../upstream-structure.md)를 참고하세요.

### 스타일과 Storybook

공식 StyleX Babel 플러그인은 JavaScript의 스타일 참조를 컴파일합니다. PostCSS 플러그인은 지정된 소스를 탐색하고 `registry/ariax/styles/entry.css`의 `@stylex;`를 생성된 CSS로 교체합니다.

`.storybook/main.ts`는 구현별 빌드를 설정합니다. 미리보기는 `@implementation-css`를 가져오며, 이 별칭은 해당 구현의 스타일시트로 연결됩니다. 프로덕션 빌드는 `dist/upstream/`과 `dist/stylex/`에 저장됩니다.

```sh
pnpm build:upstream
pnpm build:stylex
```

StyleX 빌드는 지연 로딩되는 스토리에서 사용하는 StyleX 클래스가 iframe 진입 CSS에 포함되어 있는지도 검사합니다.

## 컴포넌트 수정

1. `registry/ariax/ui/`의 구현을 수정합니다. 컴포넌트의 로컬 의존 파일은 같은 디렉터리에 두고 상대 import로 연결합니다.
2. 공통 선택자나 테마 변경은 `registry/ariax/styles/`에 반영합니다. 새 공통 스타일시트는 `entry.css`에서 가져옵니다.
3. 변경한 동작을 확인할 수 있도록 관련 스토리와 테스트를 수정합니다.
4. 레지스트리를 재생성하고 변경 범위를 다루는 검사를 실행합니다.
5. 제공 여부나 기록된 검증 범위가 바뀌면 [영문 지원 현황](../components/en.md)과 [한국어판](../components/ko.md)을 수정합니다.

React Aria의 동작·접근성 계약과 원본의 의미를 유지합니다. 컴포넌트는 `xstyle`과 `style`을 제공하며, 내부 스타일 뒤에 사용자 스타일을 적용하고 동적 CSS 변수를 보존합니다. 외부 의존성 버전은 정확하게 고정합니다.

새 설치 항목에는 `tests/install/`에 같은 이름의 픽스처를 추가합니다. 픽스처에 추가 의존성이 필요하면 해당 `.dependencies.json`에 선언합니다. 설치 검사는 레지스트리와 픽스처의 대응을 확인합니다.

## 스토리와 비교

비교 스토리는 `parity` 태그를 사용하고 `#parity-root` 아래에 내용을 렌더링합니다. 추가 포털 루트에는 `data-parity-portal`을 지정합니다. 390px 비교가 필요한 스토리에는 `viewport-390` 태그도 지정합니다.

`tests/parity.spec.ts`는 등록된 스토리를 수집하고 배치로 나눕니다. `tests/compare.ts`는 DOM과 계산 스타일을 캡처하며, `tests/color-differences.ts`는 OKLab 색상 비교를 처리합니다. 컴포넌트별 조작은 관련 테스트에 추가하고 공통 비교 헬퍼를 사용합니다.

CI 비교는 1000px에서 DOM, 텍스트, 속성, 계산 CSS와 의사 요소를 검사합니다. 계산 CSS의 단일 색상 값은 OKLab 거리 0.002를 허용하고, 투명도와 나머지 값은 정확하게 비교합니다. 위치·크기, 픽셀, 스크롤, 포커스와 명시적인 애니메이션 시간별 검사는 더 넓은 브라우저 검사 범위에 포함됩니다.

## 검사 선택

수정한 컴포넌트나 하위 시스템부터 검사하고, 영향을 받는 공통 동작까지 범위를 넓힙니다.

| 변경 | 검사 |
| --- | --- |
| 문서 | 상대 링크, 명령 이름, 코드 예제, 번역 일치 |
| 컴포넌트 마크업·스타일 | 타입 검사, 해당 컴포넌트 테스트, 관련 CI 비교 |
| 조작·애니메이션 동작 | 관련 조작·애니메이션 테스트 |
| 레지스트리 내용·의존성 | 레지스트리 생성·검증, CLI 설치 검사 |
| StyleX 통합 | 추출 테스트, 소비 앱 설치·빌드 검사, StyleX Storybook 빌드 |
| 업스트림 준비 | 업스트림 테스트와 소스 검사 |
| 공통 비교 코드 | 비교기 계약 테스트와 영향받는 비교 |

개별 브라우저 테스트를 실행하거나 스토리 ID 접두사로 CI 비교 범위를 제한할 수 있습니다.

```sh
pnpm test tests/button.spec.ts
PARITY_COMPONENT=components-button-- pnpm test:ci:light
```

경량 비교의 테마를 선택합니다.

```sh
pnpm test:ci:light
pnpm test:ci:dark
pnpm test:ci
```

마지막 명령은 두 테마를 모두 검사합니다. `ARIAX_TEST_THEME=light` 또는 `dark`는 CI 비교 모드에서만 테마를 선택합니다. 한 테마 실행의 검증 범위는 해당 테마에 한정됩니다.

프로덕션 빌드를 비교하려면 다음을 실행합니다.

```sh
pnpm build
ARIAX_STATIC_STORYBOOK=1 pnpm test:ci:light
```

정적 Storybook을 사용하는 경우 소스 수정 후 다시 빌드합니다.

다른 검사 명령은 다음과 같습니다.

```sh
pnpm typecheck
pnpm test:stylex
pnpm test:install
pnpm test:upstream
pnpm upstream:check
pnpm format:tests
```

`pnpm test`는 브라우저 검사를 실행합니다. `pnpm test:full`은 브라우저 검사, 설치와 빌드를 포함하는 전체 검증을 실행합니다. 브라우저 결과는 `pnpm test:report`로 엽니다.

## 소스와 생성 파일

컴포넌트 소스, 공통 스타일, 스토리, 테스트, 도구 코드, 의존성 선언과 잠금 파일, 업스트림 메타데이터, 라이선스 파일과 생성된 루트 `registry.json`을 커밋합니다.

다음은 다시 생성할 수 있거나 로컬에서 사용하는 출력물이며 Git에서 제외합니다.

- `generated/`: 업스트림 소스, 설치된 레퍼런스, 생성된 스토리.
- `public/registry.json`과 `public/r/`: 생성된 레지스트리 배포 파일.
- `dist/`: 프로덕션 Storybook.
- `test-results/`와 `playwright-report/`: 테스트 결과.
- `.consumer-test-*/`: 임시 설치 픽스처.

루트 `registry.json`은 예외입니다. 생성 파일이지만 GitHub 설치 진입점이므로 커밋합니다.
