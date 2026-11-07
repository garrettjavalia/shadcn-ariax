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

62개 항목 모두 설치 픽스처가 있습니다. Trace와 Code Block은 브라우저 비교와 조작·키보드·복사·스트리밍·애니메이션·접근성 검사를 수행했습니다. shadcn CLI 4.23.0과 Zod 4.6.7로 HTTP 주소에서 실제 CLI 설치·타입 검사·Tailwind 없는 Vite 프로덕션 빌드도 통과했습니다. 이후 수정한 Toggle·Questionnaire·Input Group·Tabs도 설치된 소비 앱에서 검증했습니다. 62개 전체를 새로 설치 검증했다는 뜻은 아닙니다. AI Elements 조합 예제는 추가하지 않았습니다.

CI는 등록된 스토리를 1000px 라이트·다크 테마에서 비교합니다. 상세 동작·위치와 크기·포커스·픽셀·애니메이션 검사는 별도로 실행합니다. 설치 환경은 Vite + React + TypeScript를 확인했으며, Next.js·SSR 및 다른 프레임워크 통합은 아직 검증하지 않았습니다.

### 최신 상세 E2E 결과

2026-11-07 상세 전체 라이트 테마 검사는 worker 4개와 준비된 정적 Storybook으로 실행했습니다. 아래 시간은 명령 전체 경과시간이며 두 실행 모두 건너뛴 테스트는 없습니다.

| 리비전 | 통과 / 실패 | 소요시간 |
| --- | --- | --- |
| 개선 전: `ca94b84` | 697 / 71 (총 768개) | 21분 23.50초 |
| 개선 후: `d62f42a` | 768 / 3 (총 771개) | 14분 32.59초 |

동일한 선택 조건으로 기존 768개 검사를 모두 유지하고 탐색·비교기 계약 검사 3개를 추가했습니다. **6분 50.91초(32.0%) 단축**에는 오류 수정과 지연된 실패 대기를 조기에 종료한 효과도 포함됩니다. 정상 테스트 각각이 32% 빨라졌거나 전체 검증을 통과했다는 뜻은 아닙니다. 다크 테마 상세 전체 검사는 새로 실행하지 않았습니다.

별도로 측정한 공통 정적 CI E2E는 동일한 worker 2개·1,020개 스토리·라이트/다크 조건에서 711.895초 → 449.363초로 줄었습니다(36.9%). 134개 배치 중 133개 통과·1개 실패로 2,039개 비교를 완료했습니다. 10분 목표는 상세 전체 수트가 아닌 공통 CI E2E에 적용합니다. 실행 방법과 제한시간은 [개발 가이드](../development/ko.md#검사)를 참고하세요.

### 남은 실패

- **MessageScroller 초기 위치(테스트 2개 실패):** 공식 미리보기와 공통 비교에서 최초 앵커 위치가 맞지 않습니다. 양쪽 구현에서 기대 간격 80px 대신 24px을 재현했으며, `content-visibility: auto`의 추정 높이와 관련된 [업스트림 이슈 #11643](https://github.com/shadcn-ui/ui/issues/11643)과 일치합니다. 고정한 `@shadcn/react@0.3.1`이 영향을 받으며, [수정 PR #11670](https://github.com/shadcn-ui/ui/pull/11670)은 2026-11-07 확인 당시 미병합 상태였습니다. 실제 레이아웃 이후 보정 실험은 성공했지만 스크롤·취소·spacer 계약 검증이 더 필요해 제품 코드에 적용하지 않았습니다. 테스트에서 기대 위치를 강제로 맞추지 않습니다. 상세 MessageScroller 검사 7개는 5회씩 통과했으나 최초 위치 문제의 해결을 의미하지는 않습니다.
- **Sidebar 포커스(테스트 1개 실패):** 최신 실행에서 `shortcut-expanded`의 DOM·CSS 비교는 통과했지만 픽셀 비교가 실패했습니다. 원본 검색 입력의 포커스 링이 AriaX 스크린샷에는 없었습니다. 이전의 간헐적 `menu-badge` 포커스 실패는 이벤트를 기록한 30회 반복에서 재현되지 않았고 최신 전체 실행에서도 통과했으나 원인은 미해결입니다. 비교 허용 오차는 유지합니다.

### 공식 예제 연결 범위

공식 문서의 493개 예제 등장 위치 중 486개를 비교에 연결했고 7개를 명시적으로 제외합니다. 연결된 데모는 upstream에서 수정하지 않은 공식 TSX를, AriaX에서 StyleX로 옮긴 대응 예제를 같은 스토리 ID로 실행합니다. 연결 자체가 브라우저 비교 통과를 뜻하지는 않습니다.

[공식 예제 예외 목록](../../../upstream/original-exceptions.json)에는 최종 스타일을 제공하는 `buttonProps` 계약 밖의 가공 전 CVA `button-render` 예제와 Radix/Rhea의 `MessageAnimated` 렌더러에 의존하는 MessageScroller 데모 6개를 기록합니다. 이 원본들은 계속 둘러볼 수 있습니다. 미연결 예제, 이유 없는 제외, 더 이상 유효하지 않은 예외는 생성 단계에서 실패하며, 연결된 예제는 실제 Storybook 인덱스에 활성 `parity` 스토리가 있어야 합니다.

## 참고 사항

- Native Select: OS 네이티브 팝업은 검증 범위에서 제외합니다.
- Attachment: 공식 예제의 native trigger는 원본과 같이 Dialog를 자동으로 열지 않습니다. 제어 상태를 명시적으로 연결하는 Dialog 조합 예제와 열기·닫기 검사도 제공합니다.
- Trace: 공식 원본의 설명 텍스트 색상은 두 테마 모두 WCAG AA 대비 기준에 미달합니다. 원본 색상을 보존하며 접근성 비교에서 이 제한을 추적합니다.
- Typography는 HTML 요소용 StyleX 레시피를 제공합니다.
- Toast는 업스트림에서 deprecated되었으므로 Sonner를 사용합니다.
