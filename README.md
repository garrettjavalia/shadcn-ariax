# shadcn-ariax

shadcn의 React Aria 컴포넌트를 StyleX로 제공하는 독립 shadcn 레지스트리다. Nova / Neutral light·dark를 기준으로 모든 컴포넌트 제공을 목표로 한다. 배포 컴포넌트는 Tailwind 없이 동작하며, 지원 현황은 [TODOLIST.md](TODOLIST.md)에서 확인한다.

## 개발 환경 구성

Node 22.19+, pnpm 10.15.1이 필요하다.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

첫 실행에는 고정한 원본을 다운로드하므로 네트워크가 필요하다. 원본과 공식 shadcn CLI로 설치한 레퍼런스는 `generated/`에 자동 준비되며 정상 캐시는 이후 오프라인에서도 재사용한다. 이 폴더를 직접 준비하거나 Git에 추가할 필요는 없다.

- [원본 Storybook](http://127.0.0.1:4100/?path=/story/components-button--gallery)
- [StyleX Storybook](http://127.0.0.1:4200/?path=/story/components-button--gallery)

## 검증과 개발 명령

```sh
pnpm test:full      # 동작·화면·타입·CLI 설치·빌드까지 전체 검증
pnpm test           # 전체 브라우저 검사만 실행
pnpm test:ci        # 기본 1000px light/dark 스토리의 DOM·계산 CSS 비교
pnpm typecheck      # 타입 검사
pnpm test:upstream  # 다운로드·캐시 처리 테스트
pnpm verify         # 전체 검증: 타입·레지스트리·브라우저·CLI 설치·빌드
pnpm test:report    # 브라우저 테스트 보고서 열기
pnpm test:benchmark # 실행 시간 및 비교 횟수 측정
```

CI는 기본 스토리의 DOM·CSS를 비교한다. 동작·화면·실제 설치까지 확인하려면 로컬에서 `pnpm test:full`을 실행한다. `pnpm build`로 만든 Storybook을 검사하려면 `ARIAX_STATIC_STORYBOOK=1 pnpm test:ci`를 사용한다.

자원이 제한된 환경에서는 `pnpm test --workers=1`로 실행한다. 독립 작업트리의 포트는 `ARIAX_UPSTREAM_PORT=4130 ARIAX_STYLEX_PORT=4230 pnpm dev`처럼 지정하며 테스트에도 같은 환경 변수를 전달한다.

## 소비 앱에 설치

Storybook을 실행한 상태에서 레지스트리를 생성하고 소비 앱에서 설치한다.

```sh
# 이 저장소에서
pnpm registry:build

# 소비 앱에서
pnpm exec shadcn add http://127.0.0.1:4200/r/button.json
```

설치된 패치를 소비 앱의 `pnpm-workspace.yaml`에 추가하고 `pnpm install`을 실행한다. 아래 경로는 기본 `src/components/ui` 별칭 기준이며 앱의 실제 설치 경로에 맞춘다. 패치는 고정한 StyleX 0.19.1의 조건부 스타일 주입과 CSS 계산식·색상·RTL 선택자 보존에 필요하다.

```yaml
patchedDependencies:
  '@stylexjs/stylex@0.19.1': src/components/ui/ariax/setup/@stylexjs__stylex@0.19.1.patch
  '@stylexjs/unplugin@0.19.1': src/components/ui/ariax/setup/@stylexjs__unplugin@0.19.1.patch
```

소비 앱의 Vite에 `@stylexjs/unplugin`의 `stylex.vite({useCSSLayers:false, lightningcssOptions:false})`를 React 플러그인보다 먼저 등록하고 `build.cssMinify:false`를 설정한다. 추가 CSS 변환 없이 현대 브라우저용 StyleX CSS를 배출하는 설정이다. 설치된 `ui/ariax/styles/entry.css`를 한 번 import한다. `<html class="dark">`로 다크 모드를 적용한다. 실제 CLI 설치·소비 앱 빌드는 `pnpm test:install`로 확인할 수 있다.

## 개발 문서

- [컴포넌트 지원 현황](TODOLIST.md)
- [구현·검증 규칙](convention.md)
- [원본 고정 및 자동 준비 구조](docs/upstream-structure.md)
