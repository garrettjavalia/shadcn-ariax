# 개발 목표

- shadcn의 React Aria 버전을 StyleX로 이식하여 모든 shadcn 컴포넌트를 제공하는 독립 shadcn 레지스트리를 만든다.
- 원본의 기본 동작·DOM·스타일과 variant/size API를 보존한다. 커스터마이징은 StyleX 객체를 받는 xstyle만 지원하고 외부 className·인라인 style은 받지 않는다. 배포 컴포넌트는 Tailwind 없이 동작한다.
- 스타일 호환 기준은 원본 버튼에 최종 적용되는 CSS 속성이다. 헬퍼는 같은 스타일을 외부 요소에 적용할 수 있게 제공하며, Tailwind 클래스 문자열이나 병합 전 동작은 재현하지 않는다.
- 비교 기준인 원본 커밋·디자인 스타일·의존성 버전을 고정하고, 전체 컴포넌트의 구현·검증 현황을 관리한다.

# 자동 검증 원칙

- Storybook + Vite를 원본(Tailwind)과 이식본(StyleX)으로 각각 실행한다. 예제 JSX·stories·기본 props를 공유한다. 커스터마이징은 원본의 유틸리티와 StyleX 객체를 각각 적용하는 어댑터로 같은 결과를 검증한다.
- Playwright가 동일한 story의 독립 렌더링 페이지에 같은 조작을 수행한다. 두 환경의 CSS는 격리하고 브라우저·폰트·뷰포트·테마·언어·시간 조건을 고정한다.
- 모든 하위 DOM과 포털의 구조·텍스트·동작 관련 속성을 재귀 비교한다. 생성 ID는 참조 관계로 정규화하고 스타일 클래스명은 제외한다. 대응 요소 누락은 실패다.
- 모든 대응 요소와 지원 의사 요소의 계산된 CSS 속성을 비교한다. CSS 변수명 자체는 제외하고 실제 속성에 적용된 값을 검사한다. 위치·크기·스크롤·스크린샷·접근성 및 동작 결과도 검증한다.
- 변형·크기·상태·테마·뷰포트·컴포넌트 조합을 검증 목록으로 명시한다. 애니메이션은 재생 시점을 통제하며, 비활성화만으로 동등성을 주장하지 않는다.
- 허용 차이는 근거와 함께 명시하며 그 외 차이는 실패시킨다. 실패 보고서는 컴포넌트·조건·요소·속성·양쪽 값을 포함한다. 의도적으로 삽입한 차이를 탐지하는 테스트로 검증기도 검사한다.
- CI에서 서버 실행부터 비교·보고서 생성까지 자동화한다. 실제 CLI 설치·타입 검사·프로덕션 빌드도 검증한다.
- 검증 코드는 TypeScript로 작성하고 LLM·Python 없이 실행한다. `parity` 태그의 Storybook 스토리를 자동 수집하여 공통 비교기를 재사용한다. 컴포넌트 추가 시 예제·상태·고유 조작만 선언하고 DOM/CSS 검사 코드는 복제하지 않는다.
- 원본과 처리된 레퍼런스는 generated/ 아래에 최초 필요 시 자동 준비하고 Git에서 제외한다. 캐시는 다운로드 완료 기록·소스 설정·필수 파일 존재 여부를 확인해 재사용한다. 파일별 내용 해시는 검사하지 않으며 일반 테스트가 기준 커밋을 갱신하지 않는다.

# 완료 기준

전체 대상 컴포넌트가 레지스트리로 설치 가능하고, 명시된 지원 범위의 DOM/CSS 동일성 및 동작 검증을 모두 통과해야 한다. 미구현·미검증·제외 항목을 숨기지 않으며, 유한한 테스트를 모든 사용 조건에 대한 동등성 증명으로 표현하지 않는다.

## StyleX 커스터마이징

외부 `className`과 일반 인라인 `style`은 받지 않는다. `stylex.create()`로 만든 객체를 `xstyle`에 전달한다. 내부 스타일 뒤에서 병합하므로 충돌 속성은 사용자 스타일이 우선한다. 배열·조건부 스타일·동적 스타일도 지원한다. `xstyle`은 이 프로젝트의 prop 이름이며 StyleX가 강제하는 이름은 아니다.

```tsx
const styles = stylex.create({ wide: { height: 44, minWidth: 160 } });
<Button xstyle={styles.wide}>저장</Button>
<LinkButton href="/" xstyle={styles.wide}>홈</LinkButton>
<a href="/" {...buttonProps({ variant: 'secondary', xstyle: styles.wide })}>홈</a>
```

타입 검사로 외부 클래스·인라인 CSS·일반 CSS 객체 전달을 거부한다. 브라우저 검증은 크기·여백·hover·배열의 우선순위·동적 값의 React 갱신을 검사한다. 둥근 버튼은 원본의 실제 Tailwind `rounded-full`과 StyleX 정의를 비교하며, 공용 CSS로 흉내 내지 않는다. 테마 토큰은 기존 CSS 변수 기반을 유지한다.

## 컴포넌트 확장

1. 원본과 StyleX 구현을 추가하고 `.storybook/main.ts`에 같은 import 별칭을 연결한다.
2. 공통 스토리에 `tags: ['parity']`를 지정하고 렌더링 영역을 `#parity-root`로 감싼다. 포털에는 `data-parity-portal`을 지정한다.
3. 변형·크기·예제는 스토리로 선언한다. 공통 비교기가 1000px의 light/dark에서 검사한다. 반응형 분기가 있는 스토리만 `viewport-390` 태그로 추가 검사하고, 확인용 중복 스토리는 `!parity`로 제외한다.
4. 키보드·선택·열림 등 고유 조작만 별도 시나리오에 추가한다. 조작 후 `compare()`를 호출하며 DOM/CSS 검사 로직은 재작성하지 않는다.
5. 공식 문서 예제와 스토리의 대응표를 유지한다. Button·Separator는 고정한 공식 MDX의 모든 `ComponentPreview`가 대응되는지 자동 검사한다.

```sh
PARITY_COMPONENT=components-button pnpm test tests/parity.spec.ts
```

공통 비교기는 재귀 DOM·텍스트·속성·생성 ID 참조, 모든 계산 CSS 속성, `::before/::after/::marker`, 요소와 텍스트 위치·크기, 스크롤, 포커스, RGBA 스크린샷을 검사한다. 클래스·인라인 스타일 표현과 CSS 변수명은 비교하지 않으며 실제 적용값은 비교한다. DOM·계산 CSS·위치·크기 수치는 허용 오차 없이 비교한다. 이 검사가 통과한 경우에만 픽셀별 RGBA 채널 차이 최대 1/255이면서 변경 픽셀 비율 0.1% 이하인 렌더링 노이즈를 허용한다. 원본끼리도 재현된 브라우저 래스터 차이를 위한 예외이며 나머지 화면 차이는 실패다. 무한 애니메이션은 250ms 시점에 정지하고 유한 전환은 완료 후 비교한다. CSS·DOM·의사 요소·크기 변조를 실제로 탐지하는 검증기 테스트도 포함한다.

기본 환경은 Chromium, 1000px, light/dark다. Group과 Separator Menu는 반응형 분기 검증을 위해 390px를 추가한다. 6개 variant × 8개 size, 아이콘·링크·RTL·둥근 버튼·로딩·disabled·pending·expanded와 포인터/키보드 조작을 검사한다. React Aria가 aria-invalid를 제거하므로 해당 중복 예제는 삭제했으며 invalid CSS는 검증 범위에 포함하지 않는다. axe 검사는 StyleX의 disabled/pending에 적용한다.

## Git에 포함할 파일

소스·설정·스토리·검증 코드·`pnpm-lock.yaml`·업스트림 선택 정보·배포 라이선스를 커밋한다. 다운로드한 원본과 변환 결과인 `generated/`는 제외한다. 의존성, 빌드 결과, 테스트 보고서, 캐시, 임시 소비 앱, 로컬 `.env`는 제외한다. 환경 변수 템플릿 `.env.example`은 포함할 수 있다.

이 프로젝트의 `registry.json`, `public/registry.json`, `public/r/`는 `scripts/build-registry.ts`의 생성물이므로 제외한다. `pnpm registry:build`로 복원되며 StyleX Storybook 실행·빌드 및 설치 테스트도 먼저 생성한다. `registry/ariax/`의 실제 컴포넌트 소스는 반드시 포함한다.

최초 자동 다운로드·캐시·전체 컴포넌트 확장 범위는 [docs/upstream-structure.md](docs/upstream-structure.md)를 참고한다.


## 테스트 비용

기본 너비는 1000px로 통일하고 반응형 분기가 있는 예제만 추가 너비를 선언한다. 같은 상태의 반복 비교는 제거하되 서로 다른 동작·선택자 조건은 유지한다. 독립 worker 2개를 기본으로 사용하고, 속도 개선을 위해 비교 정밀도나 실패 기준을 완화하지 않는다. 픽셀 노이즈 예외는 위에 명시한 한계만 적용한다.

## Separator 검증 범위

공식 기본·세로·메뉴·목록·RTL 예제를 light/dark에서 비교한다. 메뉴는 390px도 검사한다. 기본 hr, elementType=div, 세로 전환, SeparatorContext, DOM props, xstyle 치수·색상 덮어쓰기를 검증한다. 원본의 horizontal div는 aria-orientation 속성이 없어 높이 1px 스타일이 적용되지 않으므로 같은 조건을 보존한다. 사용자 스타일 비교는 원본의 hr 선택자와 동등한 Tailwind 유틸리티를 사용한다.

## Skeleton

Skeleton은 원본 div 구조·Nova muted 배경·radius·2초 pulse를 보존한다. 크기와 모양은 `xstyle`로 지정한다. 전역 `pulse` 키프레임은 설치되는 `skeleton.css`에 정의하고 StyleX가 애니메이션 속성을 적용한다. 고정한 `apps/v4/examples/aria/skeleton-*.tsx`의 Demo·Avatar·Card·Text·Form·Table·RTL과 사용 예제를 공유 스토리로 검증한다. Card는 Skeleton 배치를 위한 공유 레이아웃 fixture이며 Card 컴포넌트 지원을 의미하지 않는다. 기본 비교는 250ms 위상의 DOM/CSS/픽셀을 확인하고 별도 테스트가 pulse의 0/1000/2000ms opacity를 확인한다.
