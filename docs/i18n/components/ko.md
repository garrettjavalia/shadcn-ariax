# 지원 컴포넌트

[English](en.md) · 한국어

Nova / Neutral 라이트·다크 테마의 레지스트리 항목 62개(UI 컴포넌트 61개와 Typography 레시피 1개)를 제공합니다. 사용법은 [설치 안내](../readme/ko.md#설치)를 참고하세요. 설치 가능 여부가 전체 검증 완료를 뜻하지는 않습니다.

| 컴포넌트 | 설치 이름 |
| --- | --- |
| Accordion | `accordion` |
| Alert | `alert` |
| Alert Dialog | `alert-dialog` |
| Aspect Ratio | `aspect-ratio` |
| Attachment | `attachment` |
| Avatar | `avatar` |
| Badge | `badge` |
| Breadcrumb | `breadcrumb` |
| Bubble | `bubble` |
| Button | `button` |
| Button Group | `button-group` |
| Calendar | `calendar` |
| Card | `card` |
| Carousel | `carousel` |
| Chart | `chart` |
| Checkbox | `checkbox` |
| Code Block | `code-block` |
| Collapsible | `collapsible` |
| Combobox | `combobox` |
| Command | `command` |
| Context Menu | `context-menu` |
| Dialog | `dialog` |
| Direction | `direction` |
| Drawer | `drawer` |
| Dropdown Menu | `dropdown-menu` |
| Empty | `empty` |
| Field | `field` |
| Hover Card | `hover-card` |
| Input | `input` |
| Input Group | `input-group` |
| Input OTP | `input-otp` |
| Item | `item` |
| Kbd | `kbd` |
| Label | `label` |
| Marker | `marker` |
| Message | `message` |
| Message Scroller | `message-scroller` |
| Native Select | `native-select` |
| Pagination | `pagination` |
| Popover | `popover` |
| Progress | `progress` |
| Questionnaire | `questionnaire` |
| Radio Group | `radio-group` |
| Resizable | `resizable` |
| Scroll Area | `scroll-area` |
| Select | `select` |
| Separator | `separator` |
| Sheet | `sheet` |
| Sidebar | `sidebar` |
| Skeleton | `skeleton` |
| Slider | `slider` |
| Sonner | `sonner` |
| Spinner | `spinner` |
| Switch | `switch` |
| Table | `table` |
| Tabs | `tabs` |
| Textarea | `textarea` |
| Toggle | `toggle` |
| Toggle Group | `toggle-group` |
| Tooltip | `tooltip` |
| Trace | `trace` |
| Typography | `typography` |

**조합 예제:** Data Table, Date Picker (레지스트리 항목을 조합해 구성).

## 검증 범위와 남은 작업

레지스트리 항목 62개 모두 설치 픽스처가 있습니다. 검증한 설치 환경은 Tailwind 없는 Vite + React + TypeScript입니다. Next.js·SSR 및 다른 프레임워크 통합은 미검증 상태입니다.

CI는 등록된 스토리를 1000px 라이트·다크 테마에서 비교합니다. 상세 브라우저 검사는 조작·위치와 크기·스크롤·포커스·픽셀·애니메이션 상태를 다룹니다. Trace와 Code Block에는 키보드·복사·스트리밍·접근성 검사도 있습니다. 실행 방법과 제한시간은 [개발 가이드](../development/ko.md#검사)를 참고하세요.

### 검증 상태

최신 상세 전체 라이트 테마 실행(2026-11-07, 리비전 `d62f42a`, worker 4개, 정적 Storybook)은 총 771개 중 **768개 통과·3개 실패·건너뜀 없음**입니다. 명령 전체 경과시간은 14분 32.59초입니다. 전체 통과 상태나 다크 테마 전체 검증 결과를 의미하지는 않습니다.

### 알려진 제한

- **MessageScroller 초기 위치:** 양쪽 구현의 최초 앵커 간격이 기대값 80px 대신 24px이어서 테스트 2개가 실패합니다. 고정한 `@shadcn/react@0.3.1`은 `content-visibility: auto`의 추정 높이에 영향을 받습니다. [업스트림 이슈 #11643](https://github.com/shadcn-ui/ui/issues/11643)과 [수정 제안 #11670](https://github.com/shadcn-ui/ui/pull/11670)을 참고하세요. AriaX에는 별도의 위치 보정 우회책을 적용하지 않습니다.
- **Sidebar 포커스:** `shortcut-expanded`의 DOM·CSS 스냅샷은 일치하지만 원본 검색 입력의 포커스 링이 AriaX 스크린샷에는 없어 픽셀 비교가 실패합니다. 간헐적인 `menu-badge` 포커스 차이도 미해결 상태입니다.

### 공식 예제 연결 범위

공식 문서의 493개 예제 등장 위치 중 486개를 비교에 연결하고 7개를 명시적으로 제외합니다. 연결된 데모는 upstream에서 수정하지 않은 공식 TSX를, AriaX에서 StyleX로 옮긴 대응 예제를 같은 스토리 ID로 실행합니다. 연결 자체가 브라우저 비교 통과를 뜻하지는 않습니다.

[공식 예제 예외 목록](../../../upstream/original-exceptions.json)에는 최종 스타일을 제공하는 `buttonProps` 계약 밖의 가공 전 CVA `button-render` 예제와 Radix/Rhea의 `MessageAnimated` 렌더러에 의존하는 MessageScroller 데모 6개를 기록합니다. 이 원본들도 둘러볼 수 있습니다. 미연결 예제, 이유 없는 제외, 더 이상 유효하지 않은 예외는 생성 단계에서 실패하며, 연결된 예제는 실제 Storybook 인덱스에 활성 `parity` 스토리가 있어야 합니다.

## 참고 사항

- Native Select: OS 네이티브 팝업은 검증 범위에서 제외합니다.
- Attachment: 공식 예제의 native trigger는 원본과 같이 Dialog를 자동으로 열지 않습니다. 제어 상태를 명시적으로 연결하는 Dialog 조합 예제와 열기·닫기 검사도 제공합니다.
- Trace: 공식 원본의 설명 텍스트 색상은 두 테마 모두 WCAG AA 대비 기준에 미달합니다. 원본 색상을 보존하며 접근성 비교에서 이 제한을 추적합니다.
- Typography는 HTML 요소용 StyleX 레시피를 제공합니다.
- Toast는 업스트림에서 deprecated되었으므로 Sonner를 사용합니다.
