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

- 62개 항목 모두 설치 픽스처가 있습니다. Trace와 Code Block은 갱신한 도구로 HTTP 주소에서 실제 CLI 설치·타입 검사·Tailwind 없는 Vite 프로덕션 빌드를 통과했으며, 나머지 60개는 앞서 확인한 설치 검증 범위를 유지합니다.
- 이번 업스트림 갱신에서 Trace와 Code Block은 전체 브라우저 비교 및 조작·키보드·복사·스트리밍·애니메이션·접근성 검사를 수행했습니다. 기존 컴포넌트는 공통 정적 E2E 비교만 수행했습니다. AI Elements 조합 예제는 추가하지 않았습니다.
- CI는 등록된 스토리의 1000px 라이트·다크 정적 비교를 수행하며, 상세 동작·픽셀·애니메이션 검사는 별도입니다.
- 라이트 테마 상세 전체 E2E 768개를 실행해 697개 통과·71개 실패를 확인했습니다(21분 23.5초). 이후 공식 예제 포털·트리거·Carousel API 관찰, 간격 토큰, 메타데이터 경로와 스크롤 대기를 수정하고 실패·영향 범위만 재검증했습니다. MessageScroller 외 기존 실패 67개는 통과했고 Sidebar 포커스도 20회 반복 통과했습니다. 수정 후 전체 수트를 다시 실행한 결과는 아닙니다.
- MessageScroller 상세 동작 7개는 SDK 자동 스크롤 완료를 기다리도록 보완한 뒤 5회씩, 총 35회 통과했습니다. 관련 공통 비교 2개 배치와 opening-position 단독 비교 3회도 통과했지만, 공식 원본 미리보기 검사는 opening-position에서 3회 연속 실패했습니다. 실행 조건에 따른 통과를 SDK 초기 위치 결함 해결로 간주하지 않습니다.
- 공통 정적 CI E2E는 동일한 worker 2개·1,020개 스토리·라이트/다크 조건에서 711.895초 → 449.363초로 줄었습니다(36.9%, 명령 전체 453.166초). 134개 배치 중 133개 통과·1개 실패로 2,039개 비교를 완료했습니다. 10분 실행시간 목표는 충족했지만 전체 통과는 아닙니다. 단축에는 실패 대기를 조기에 종료한 효과도 포함됩니다.
- MessageScroller의 공식 opening-position 초기 위치 결함은 원본과 AriaX에서 각각 새 페이지 8/8회 재현했습니다(기대 앵커 간격 80px, 실제 24px). `content-visibility: auto`의 추정 높이로 SDK가 이동 위치를 계산하는 [업스트림 이슈 #11643](https://github.com/shadcn-ui/ui/issues/11643)과 일치합니다. 진단용으로 이 속성을 해제하면 양쪽 8/8회 정상이고, 속성을 유지하면서 실제 레이아웃 이후 `scrollIntoView`로 보정해도 각각 8/8회 정상입니다. 이는 사후 보정 실험이며 영구 수정이나 최초 이동 성공을 의미하지 않습니다. 최신 배포판 `@shadcn/react@0.3.1`에도 남아 있고 [수정 PR #11670](https://github.com/shadcn-ui/ui/pull/11670)은 미병합 상태입니다(2026-11-07 확인). 원본 최적화·예제·SDK를 임의 변경하거나 테스트에서 위치를 강제 보정하지 않습니다.
- 별도로 관찰했던 `last-anchor` 초기 위치 실패는 후속 원본·AriaX 각 8회 검사에서는 재현되지 않았으므로 같은 원인으로 단정하지 않습니다. 프레임별 준비 재확인만으로는 기존 실패를 해결하지 못했습니다. 준비 대기는 15초 후 단계·실제 위치·애니메이션 진단과 함께 실패하며 비교 기준은 유지합니다.
- 공식 문서의 493개 예제 등장 위치 중 486개는 비교에 연결했고 7개는 명시적으로 제외합니다. 연결된 데모는 upstream에서 수정하지 않은 공식 TSX를, AriaX에서 StyleX로 옮긴 대응 예제를 같은 스토리 ID로 실행합니다. 연결 자체가 통과를 뜻하지 않으며 실제 DOM·CSS 일치는 브라우저 검사로 확인합니다.
- `upstream/original-exceptions.json`에 예외를 기록합니다. 가공 전 CVA를 쓰는 `button-render`는 최종 Button 스타일을 제공하는 `buttonProps` 계약 밖이고, MessageScroller 데모 6개는 Radix/Rhea의 `MessageAnimated` 렌더러에 의존합니다. 이 원본들은 계속 둘러볼 수 있습니다. 미연결 예제, 이유 없는 제외, 더 이상 유효하지 않은 예외는 생성 단계에서 실패하며, 연결된 예제는 실제 Storybook 인덱스에 활성 `parity` 스토리가 있어야 합니다.

설치 환경은 Vite + React + TypeScript를 확인했으며, Next.js·SSR 및 다른 프레임워크 통합은 아직 검증하지 않았습니다. 검사 방법은 [개발 가이드](../development/ko.md#검사)를 참고하세요.

## 참고 사항
- Native Select: OS 네이티브 팝업은 검증 범위에서 제외합니다.
- Attachment: 공식 예제의 native trigger는 원본과 같이 Dialog를 자동으로 열지 않습니다. 제어 상태를 명시적으로 연결하는 Dialog 조합 예제와 열기·닫기 검사도 제공합니다.
- Trace: 공식 원본의 설명 텍스트 색상은 두 테마 모두 WCAG AA 대비 기준에 미달합니다. 원본 색상을 보존하며 접근성 비교에서 이 제한을 추적합니다.
- Typography는 HTML 요소용 StyleX 레시피를 제공합니다.
- Toast는 업스트림에서 deprecated되었으므로 Sonner를 사용합니다.
