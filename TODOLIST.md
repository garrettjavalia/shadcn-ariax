# 컴포넌트 지원 목록

기준: upstream/source.json에 고정한 shadcn React Aria 컴포넌트 및 문서 예제. 현재 지원 범위는 Nova / Neutral light·dark다. 체크는 레지스트리 제공과 명시된 검증 완료를 뜻한다.

## 지원 중

- [x] Button — Button, LinkButton, buttonProps; 6개 variant × 8개 size
- [x] Skeleton — 크기·모양 xstyle, pulse, light·dark
- [x] Separator — 가로·세로 구분선, 공식 예제·DOM 의미·StyleX 커스터마이징

## 지원 예정

- [ ] Accordion
- [x] Alert
- [ ] Alert Dialog
- [x] Aspect Ratio
- [ ] Attachment
- [ ] Avatar
- [x] Badge
- [ ] Breadcrumb
- [ ] Bubble
- [ ] Button Group
- [ ] Calendar
- [x] Card
- [ ] Carousel
- [ ] Chart
- [ ] Checkbox — 기본 구현; Field·데이터 테이블·폼 공식 조합 대기
- [ ] Collapsible
- [ ] Combobox
- [ ] Command
- [ ] Context Menu
- [ ] Data Table — 조합 예제 포함
- [ ] Date Picker — 조합 예제 포함
- [ ] Dialog
- [ ] Direction
- [ ] Drawer
- [ ] Dropdown Menu
- [ ] Empty
- [ ] Field — 기본 레지스트리·Checkbox 조합 구현; 나머지 공식 조합 통합 대기
- [ ] Hover Card
- [ ] Input — 기본 구현 제공; 공식 의존 조합·RTL 예제 후속 통합 검증
- [ ] Input Group — 구현; Field·Tooltip·Kbd 등 공식 교차 조합·RTL 예제 대기
- [ ] Input OTP
- [ ] Item
- [ ] Kbd
- [ ] Label — 실제 Checkbox 조합 지원; Field 공식 조합 대기
- [ ] Marker
- [ ] Message
- [ ] Message Scroller
- [ ] Native Select
- [ ] Pagination
- [ ] Popover
- [ ] Progress
- [ ] Questionnaire
- [ ] Radio Group
- [ ] Resizable
- [ ] Scroll Area
- [ ] Select
- [ ] Sheet
- [ ] Sidebar
- [ ] Slider
- [ ] Sonner
- [ ] Spinner
- [ ] Switch
- [ ] Table — 기본 구현·Checkbox 조합 제공; Dropdown Actions 후속 통합 검증
- [ ] Tabs
- [ ] Textarea — 기본 구현 제공; 공식 Field·RTL 조합 후속 통합 검증
- [ ] Toggle
- [ ] Toggle Group
- [ ] Tooltip
- [ ] Typography — 텍스트 스타일 예제

Button Group과 Dropdown Menu는 현재 테스트 fixture만 있으며 배포용 지원은 아직 없다. Toast는 업스트림에서 deprecated되었으므로 Sonner로 지원한다.
