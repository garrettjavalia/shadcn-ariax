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

Table은 별도 draft 범위로 레지스트리에 제공한다. Table·Header·Body·Footer·Row·Head·Cell·Caption과 RAC의 선택·키보드 API, caption, empty state, expanded, hover, RTL 및 가로 스크롤을 공유 스토리로 비교한다. 커스터마이징은 `xstyle`과 일반 React `style`(RAC render callback 포함)을 지원하며 충돌 시 사용자 `style`이 우선한다. 외부 `className`은 지원하지 않는다. 현재 RTL 스토리는 일반 aria-nova 레퍼런스에서 Arabic 텍스트와 `dir=rtl`을 비교한다. 공식 `ui-rtl`의 논리 방향 변환(`text-start`, `pe-0`) 검증은 후속 RTL 작업의 TODO다. 공식 `checkbox-table`의 실제 Checkbox/Table 조합 및 Label 클릭 선택은 지원 범위다. 공식 `table-actions`의 실제 DropdownMenu 조합은 DropdownMenu draft PR에서 포털·항목 동작과 함께 검증한다. Data Table/TanStack 조합도 이 범위에 포함하지 않는다. 설치 시 위 CLI 명령의 경로를 `table.json`으로 바꾸면 된다.

Label 본체는 `label.json`으로 설치할 수 있다. `htmlFor`, RAC LabelContext, `xstyle` 및 일반 `style`을 지원한다. 공식 Checkbox·Field 조합 예제의 통합이 남아 있으므로 전체 지원 완료 목록에는 아직 포함하지 않는다.

Checkbox 본체는 `checkbox.json`으로 설치할 수 있다. 선택·중간·비활성·오류·키보드 포커스, RAC context/render props와 일반 `style` 및 `xstyle`을 지원한다. 공식 checkbox-table은 실제 Table/Checkbox 조합과 Label 클릭으로 검증한다. 나머지 7개 preview(checkbox-basic, checkbox-demo, checkbox-description, checkbox-disabled, checkbox-group, checkbox-invalid, checkbox-rtl)는 Field 통합 검증이 남아 있다. Label Demo·RTL fixture는 실제 Checkbox를 사용한다.

DropdownMenu draft는 `dropdown-menu.json`으로 설치한다. 10개 원본 exports, 포털·3단 하위 메뉴·체크/라디오 선택·비활성·destructive·shortcut·키보드·동적 xstyle와 일반 style(callback 포함)을 지원한다. 공식 13개 preview 전체와 실제 table-actions를 공유 스토리로 비교하며 dropdown-menu-avatar는 실제 Avatar/AvatarImage/AvatarFallback 조합을 사용한다. 현재 RTL은 일반 aria-nova + Arabic/dir 기준이고 공식 ui-rtl CLI 방향 변환은 후속 TODO다. 진입/종료 키프레임은 원본 tw-animate-css 1.4.0 정의를 기준으로 설치 CSS의 --ariax 변수로 작성하며 별도 animation phase 검사에서 검증한다.

Avatar는 `avatar.json`으로 설치한다. 고정 원본은 RAC 래퍼가 아닌 native div/img이며 6개 exports와 sm/default/lg, 이미지 loading/loaded/error, fallback·badge·group/count 선택자를 보존한다. 일반 React style과 동적 xstyle을 지원하고 외부 className을 거부한다. 원본의 사용자 onLoad/onError 우선순위와 src 변경 시 state 계약을 유지한다. 공식 10개 preview와 실제 DropdownMenu Avatar 조합을 공유 JSX로 비교하고 이미지는 고정 SVG와 Playwright route로 성공/실패/지연을 제어한다. Avatar 자체에는 원본 애니메이션이 없고 결합 Dropdown의 enter/exit 0/50/100ms 및 실제 종료 검사를 유지한다. RTL 비교는 일반 ui + Arabic/dir 기준이며 공식 ui-rtl CLI 변환은 후속 TODO다.
