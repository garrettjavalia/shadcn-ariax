# shadcn-ariax

shadcn의 React Aria 컴포넌트를 StyleX로 제공하는 독립 shadcn 레지스트리다. 모든 컴포넌트 제공을 목표로 하며, 현재 구현·검증 범위는 **Button·Skeleton·Separator / Nova / Neutral light·dark**다. 배포 컴포넌트는 Tailwind 없이 동작한다.

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
pnpm test           # 브라우저 비교; 서버가 없으면 자동 실행
pnpm typecheck      # 타입 검사
pnpm test:upstream  # 다운로드·캐시 처리 테스트
pnpm verify         # 전체 검증: 타입·레지스트리·브라우저·CLI 설치·빌드
pnpm test:report    # 브라우저 테스트 보고서 열기
pnpm test:benchmark # 실행 시간 및 비교 횟수 측정
```

브라우저 검사는 worker 2개를 사용한다. 자원이 제한된 환경에서는 `pnpm test --workers=1`로 실행한다. 측정 결과는 `test-results/benchmark.json`에 저장된다.

## 소비 앱에 설치

Storybook을 실행한 상태에서 레지스트리를 생성하고 소비 앱에서 설치한다.

```sh
# 이 저장소에서
pnpm registry:build

# 소비 앱에서
pnpm exec shadcn add http://127.0.0.1:4200/r/button.json
```

소비 앱의 Vite에 `@stylexjs/unplugin`의 `stylex.vite({useCSSLayers:false})`를 React 플러그인보다 먼저 등록하고, 설치된 `ui/ariax/styles/entry.css`를 한 번 import한다. `<html class="dark">`로 다크 모드를 적용한다. `pnpm test:install`은 임시 소비 앱에서 실제 CLI 설치·타입 검사·프로덕션 빌드를 확인한다.

## 개발 문서와 지원 범위

- [구현·검증 규칙](convention.md)
- [원본 고정 및 자동 준비 구조](docs/upstream-structure.md)

비교 기준은 [고정한 shadcn 원본](https://github.com/shadcn-ui/ui/tree/3b1ae6e43f082dd82d0e5710b813cfad929abdb4)이며, 커밋과 선택 경로는 `upstream/`에 기록한다. 공식 Button·Skeleton·Separator 문서의 예제를 기준으로 별도의 DOM/CSS/픽셀 비교 수트를 구성했다. 현재 그 외 컴포넌트·디자인 스타일은 미구현이며 메뉴 조합의 그룹·메뉴는 테스트용 fixture다. 원본 및 Tailwind reset의 MIT 라이선스를 배포에 포함한다.

독립 작업트리는 `ARIAX_UPSTREAM_PORT=4130 ARIAX_STYLEX_PORT=4230 pnpm dev`처럼 포트를 지정할 수 있다. 테스트에도 같은 환경 변수를 전달한다.

Skeleton과 Separator 설치는 소비 앱 CLI 명령의 `button.json`을 각각 `skeleton.json`, `separator.json`으로 바꾸면 된다.

Textarea는 `textarea.json`으로 설치한다. `Components/Textarea`에서 공식 Demo·Button, 독립 상태와 style callback을 확인할 수 있다. Field 의존 공식 예제 4개는 아직 미완료이며 [대응표](docs/upstream-structure.md#textarea-draft)를 참고한다. 일반 React `style`(객체·RAC callback)을 지원하며, `xstyle` 동적 변수를 보존하고 충돌 시 `style`이 우선한다.

## Input Group (작업 중)

`input-group.json`은 InputGroup·InputGroupAddon·InputGroupButton·InputGroupText·InputGroupInput·InputGroupTextarea와 Button·Input·Textarea 의존 소스를 함께 설치한다. 네 가지 addon align, 네 가지 button size와 여섯 variant, disabled·invalid 및 일반 ui에 `dir="rtl"`을 적용한 상태와 addon 클릭 포커스를 공통 정밀 비교기로 검사한다. React Aria의 일반 style/콜백은 유지하고, StyleX 변수 뒤에서 사용자 style을 병합한다.

공식 문서 Demo·Icon·Text·Textarea·Custom은 공유 스토리로 구현했다. 공식 inline-start·inline-end·block-start·block-end는 Field 구현 통합 대기, Button은 Popover 및 useCopyToClipboard 통합 대기, Kbd·Dropdown·Spinner는 각 컴포넌트 대기, RTL은 Field·Spinner·LanguageSelector 및 원본 RTL 변환 검증 대기다. 추가 단위 스토리는 이런 공식 조합의 완료를 의미하지 않는다.

현재 RTL 비교는 일반 ui 레퍼런스에 `dir="rtl"`을 적용한 범위다. 공식 CLI `rtl: true` 변환은 아직 활성화하지 않았다. 실제 `transformDirection(source, true)`는 inline addon의 `pl/pr`, `ml/mr`와 부모의 입력 `pl/pr`를 `ps/pe`, `ms/me`로 바꾸므로, 공식 RTL 변환 지원에는 StyleX의 논리 방향 속성 전환과 추가 검증이 필요하다.

## Kbd (공식 ButtonGroup 조합 대기)

`kbd.json`을 CLI로 설치하면 React Aria Keyboard 기반 `Kbd`와 `KbdGroup`을 사용할 수 있다. 두 컴포넌트는 원본처럼 `kbd`로 렌더링되며 `xstyle`과 일반 `style`을 지원한다. 예: `<KbdGroup><Kbd>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup>`. 외부 `className`은 지원하지 않는다.

공식 Demo·Group·Button·Input Group·RTL과 Usage 및 SVG·스타일 덮어쓰기를 공유 Storybook에서 비교한다. Button과 Input Group은 실제 배포 컴포넌트다. 실제 Tooltip 안 Kbd·KbdGroup의 Save/Print 내용과 동작을 검사한다. 공식 KbdTooltip의 ButtonGroup 컨테이너는 아직 미구현이므로 전체 문서 지원을 완료로 표시하지 않는다. Kbd 원본은 공식 `transformDirection(source, true)` 적용 전후가 동일하며 현재 RTL 스토리는 일반 ui에 `dir="rtl"`을 적용한 조건이다.

## Tooltip

`tooltip.json`으로 `TooltipTrigger`와 `Tooltip`을 설치한다. 기본 delay=0, placement=top, offset=4, crossOffset=0과 React Aria의 상태·배치·포털 동작을 보존한다. Tooltip은 `xstyle` 및 일반 `style` 객체/상태 콜백을 지원하고 외부 className은 받지 않는다. 설치되는 tooltip.css가 enter/exit 키프레임과 Kbd 자손 스타일을 제공한다.

공식 Demo·Sides·Keyboard·Disabled·RTL과 Usage를 공유 Storybook에서 확인할 수 있다. hover·키보드 포커스·Escape·delay/closeDelay·disabled wrapper·placement·offset, 실제 enter/exit 50ms 프레임과 사용자 스타일 우선순위를 공통 비교기로 검사한다. 현재 RTL은 일반 ui에 dir=rtl을 적용한 조건이다. 공식 방향 변환은 Kbd를 포함할 때 pr-1.5를 pe-1.5로 바꾸므로 별도의 공식 ui-rtl 지원과 구별한다.
