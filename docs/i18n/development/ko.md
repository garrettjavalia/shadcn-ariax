# 개발 가이드

[English](en.md) · 한국어

AriaX 컴포넌트를 수정하고 검사하는 방법입니다. 앱에 설치해서 사용하려면 [README](../readme/ko.md)를 참고하세요.

## 처음 실행하기

Node.js 22.19+와 pnpm 10.15.1이 필요합니다.

```sh
git clone https://github.com/garrettjavalia/shadcn-ariax.git
cd shadcn-ariax
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

`pnpm dev`는 컴포넌트 예제를 볼 수 있는 Storybook 두 개를 실행합니다.

| 주소 | 내용 |
| --- | --- |
| [localhost:4100](http://127.0.0.1:4100) | 비교 기준인 shadcn/ui 원본 |
| [localhost:4200](http://127.0.0.1:4200) | StyleX로 구현한 AriaX |

두 화면에서 같은 예제를 열어 모양과 동작을 비교하세요. 처음에는 원본 소스를 다운로드하므로 시간이 더 걸립니다. 종료하려면 터미널에서 Ctrl+C를 누릅니다. 이후 명령도 저장소 루트에서 실행합니다.

## 어디를 수정하나요?

| 경로 | 내용 |
| --- | --- |
| `src/ariax/ui/` | AriaX 컴포넌트와 스타일 헬퍼 |
| `src/ariax/styles/` | 공통 CSS와 테마 |
| `stories/` | Storybook에 표시할 예제. 스토리는 예제 하나의 표시 방법과 설정입니다. |
| `tests/` | 동작·스타일 비교 검사. `tests/install/`은 설치 후 동작을 확인할 작은 테스트 앱 코드입니다. |
| `.storybook/` | Storybook 실행·빌드 설정 |
| `upstream/` | 비교에 사용할 원본 버전과 컴포넌트 목록 |

`generated/`는 자동으로 준비한 원본 코드입니다. 여기를 직접 수정하지 마세요.

## 컴포넌트 수정하기

1. [작업 규칙](../../../convention.md)을 읽고 `src/ariax/ui/`의 컴포넌트나 `src/ariax/styles/`의 공통 스타일을 수정합니다.
2. `stories/`의 관련 예제로 변경 결과를 확인하고 필요한 예제·테스트를 보완합니다. 새 컴포넌트에는 `tests/install/`의 설치 예제도 추가합니다.
3. 다음 명령으로 포맷을 맞추고 설치 목록을 갱신합니다. 레지스트리는 shadcn CLI가 설치할 컴포넌트와 파일의 목록입니다.

   ```sh
   pnpm format:components
   pnpm format:tests
   pnpm registry:build
   ```

4. 아래에서 변경에 맞는 검사를 실행합니다. 제공하는 컴포넌트나 검증 범위가 바뀌면 [컴포넌트 지원 현황](../components/ko.md)도 두 언어로 갱신합니다.

소스·테스트와 함께 루트의 `registry.json` 변경을 커밋합니다. 자동 생성되는 `registry/`, `generated/`, `dist/`와 테스트 보고서는 커밋하지 않습니다.

## 검사

예를 들어 Button을 수정했다면 다음과 같이 검사합니다.

```sh
pnpm typecheck
pnpm format:check
pnpm registry:check
pnpm test tests/button.spec.ts
PARITY_COMPONENT=components-button-- pnpm test:ci
```

첫 세 명령은 타입·포맷·설치 목록을 검사합니다. 네 번째는 Button의 동작을 검사하고, 마지막은 Button 스토리를 원본과 라이트·다크 테마에서 비교합니다. `PARITY_COMPONENT`에는 검사할 스토리 ID의 앞부분을 지정하며, 여러 개는 쉼표로 구분합니다.

| 추가로 확인할 내용 | 명령 |
| --- | --- |
| 실제 CLI 설치와 설치 후 앱 빌드 | `pnpm test:install` |
| StyleX CSS 추출 | `pnpm test:stylex` |
| 원본 준비·예제 생성 | `pnpm test:upstream` 및 `pnpm upstream:check` |
| 양쪽 Storybook 빌드 | `pnpm build` |
| 브라우저 검사 결과 보기 | `pnpm test:report` |

PR의 CI는 타입·빌드와 원본 대비 정적 DOM·CSS 등을 검사합니다. 조작·픽셀·애니메이션까지 확인하려면 관련 브라우저 테스트도 실행해야 합니다. 평소에는 수정한 부분을 검사하고, 전체 검증이 필요할 때만 `pnpm test:full`을 실행합니다. 전체 검증에는 설치와 빌드도 포함되어 시간이 오래 걸립니다.

## 업스트림 준비

이 프로젝트에서 업스트림은 비교 기준인 shadcn/ui 원본을 뜻합니다. 실행과 검사 명령이 필요한 원본을 자동으로 준비하므로 보통 별도 작업은 필요 없습니다.

- `upstream/source.json`: 사용할 원본 저장소와 커밋
- `upstream/reference.json`: 가져올 컴포넌트와 보조 코드
- `upstream/original-exceptions.json`: 비교에서 제외한 공식 예제와 그 이유

공식 예제는 원본 Storybook에 자동 등록됩니다. AriaX 쪽에는 그 예제에 대응하는 StyleX 구현이 필요합니다. 새 예제를 연결하는 코드는 `scripts/upstream/original-stories.ts`와 기존 `stories/`를 참고하세요.

원본 준비 파일이 손상되었다면 `pnpm upstream:sync`로 다시 받습니다. 이 명령은 설정된 커밋을 다시 준비하며 최신 버전으로 바꾸지는 않습니다.

## 배포하기 — 관리자용

배포할 변경을 `main`에 반영한 뒤 해당 배포 브랜치에 머지하고 푸시합니다. GitHub의 Actions 탭에서 실행 결과를 확인하세요.

### 레지스트리 디렉터리용 게시

`deploy-registry`에 푸시하면 설치 검사 후 전체 소스와 생성한 `registry/` JSON을 `published-registry`에 게시합니다. `published-registry`는 자동 생성되는 결과 브랜치이므로 직접 수정하거나 소스 브랜치로 머지하지 않습니다. 저장소의 브랜치 규칙에서 워크플로의 게시 브랜치 푸시를 허용해야 합니다.

컴포넌트 설치 주소는 다음과 같습니다. `{name}`에는 `button` 같은 컴포넌트 이름을 넣습니다.

```text
https://raw.githubusercontent.com/garrettjavalia/shadcn-ariax/refs/heads/published-registry/registry/{name}.json
```

게시한 소스 버전에서 다음 명령으로 실제 공개 주소의 설치를 확인할 수 있습니다.

```sh
ARIAX_REGISTRY_URL=https://raw.githubusercontent.com/garrettjavalia/shadcn-ariax/refs/heads/published-registry/registry/ pnpm test:install
```

shadcn/ui의 공식 레지스트리 목록 등록은 별도 절차입니다. [등록 안내](https://ui.shadcn.com/docs/registry/registry-index)를 참고하세요.

### GitHub Pages에 Storybook 게시

`deploy-github-pages`에 푸시하면 AriaX Storybook을 빌드해 [공개 Storybook](https://garrettjavalia.github.io/shadcn-ariax/)에 배포합니다. `dist/stylex/` 내부 파일을 업로드하며, 빌드 결과를 별도 브랜치에 저장하지 않습니다.

처음 설정할 때는 GitHub에서 다음 두 항목을 확인합니다.

1. **Settings → Pages → Source**를 **GitHub Actions**로 선택합니다.
2. **Settings → Environments → github-pages**의 배포 브랜치 규칙에 `deploy-github-pages`를 허용합니다.

사이트의 `/shadcn-ariax/` 경로는 워크플로가 읽어 빌드에 적용합니다. 두 배포 워크플로 모두 Actions에서 해당 배포 브랜치를 선택해 수동 실행할 수도 있습니다.
