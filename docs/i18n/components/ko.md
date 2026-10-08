# 지원 컴포넌트

[English](en.md) · 한국어

Nova / Neutral 라이트·다크 테마의 레지스트리 항목 60개(UI 컴포넌트 59개와 Typography 레시피 1개)를 제공합니다. 사용법은 [설치 안내](../readme/ko.md#설치)를 참고하세요. 설치 가능 여부가 전체 검증 완료를 뜻하지는 않습니다.

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
| Typography | `typography` |

**조합 예제:** Data Table, Date Picker (레지스트리 항목을 조합해 구성).

## 검증 범위와 남은 작업

- 60개 항목 모두 설치 픽스처가 있으며, 공개 HTTP 주소에서 실제 shadcn CLI 설치·타입 검사·Tailwind 없는 Vite 프로덕션 빌드를 통과했습니다.
- CI는 등록된 스토리의 1000px 라이트·다크 정적 비교를 수행하며, 상세 동작·픽셀·애니메이션 검사는 별도입니다.
- 공식 문서의 452개 예제 등장 위치 중 445개는 비교에 연결했고 7개는 명시적으로 제외합니다. 연결된 데모는 upstream에서 수정하지 않은 공식 TSX를, AriaX에서 StyleX로 옮긴 대응 예제를 같은 스토리 ID로 실행합니다. 연결 자체가 통과를 뜻하지 않으며 실제 DOM·CSS 일치는 브라우저 검사로 확인합니다.
- `upstream/original-exceptions.json`에 예외를 기록합니다. 가공 전 CVA를 쓰는 `button-render`는 최종 Button 스타일을 제공하는 `buttonProps` 계약 밖이고, MessageScroller 데모 6개는 Radix/Rhea의 `MessageAnimated` 렌더러에 의존합니다. 이 원본들은 계속 둘러볼 수 있습니다. 미연결 예제, 이유 없는 제외, 더 이상 유효하지 않은 예외는 생성 단계에서 실패하며, 연결된 예제는 실제 Storybook 인덱스에 활성 `parity` 스토리가 있어야 합니다.

설치 환경은 Vite + React + TypeScript를 확인했으며, Next.js·SSR 및 다른 프레임워크 통합은 아직 검증하지 않았습니다. 검사 방법은 [개발 가이드](../development/ko.md#검사)를 참고하세요.

## 참고 사항
- Native Select: OS 네이티브 팝업은 검증 범위에서 제외합니다.
- Attachment: 공식 예제의 native trigger는 원본과 같이 Dialog를 자동으로 열지 않습니다. 제어 상태를 명시적으로 연결하는 Dialog 조합 예제와 열기·닫기 검사도 제공합니다.
- Typography는 HTML 요소용 StyleX 레시피를 제공합니다.
- Toast는 업스트림에서 deprecated되었으므로 Sonner를 사용합니다.
