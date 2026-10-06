# 컴포넌트 지원 목록

기준: upstream/source.json에 고정한 shadcn React Aria 컴포넌트 및 문서 예제. 현재 지원 범위는 Nova / Neutral light·dark다. 체크는 레지스트리 제공과 명시된 검증 완료를 뜻한다.

## 지원 중

- [x] Button — Button, LinkButton, buttonProps; 6개 variant × 8개 size
- [x] Skeleton — 크기·모양 xstyle, pulse, light·dark
- [x] Separator — 가로·세로 구분선, 공식 예제·DOM 의미·StyleX 커스터마이징

## 지원 예정

- [ ] Accordion
- [ ] Alert
- [ ] Alert Dialog
- [ ] Aspect Ratio
- [ ] Attachment
- [ ] Avatar
- [ ] Badge
- [ ] Breadcrumb
- [ ] Bubble
- [ ] Button Group
- [ ] Calendar
- [ ] Card
- [ ] Carousel
- [ ] Chart
- [ ] Checkbox — 본체 구현·검증, 공식 8개 preview의 Field/Table 통합 대기
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
- [ ] Field
- [ ] Hover Card
- [ ] Input
- [ ] Input Group
- [ ] Input OTP
- [ ] Item
- [ ] Kbd
- [ ] Label — 본체 및 실제 Checkbox Demo·RTL 구현·검증, field-demo 통합 대기
- [ ] Marker
- [ ] Message
- [ ] Message Scroller
- [ ] Native Select
- [ ] Pagination
- [ ] Popover
- [ ] Progress
- [ ] Questionnaire
- [x] Radio Group — Nova, 공식 7 예제, Label/Field 조합, light/dark·키보드/포인터·native style/xstyle 검증
- [ ] Resizable
- [ ] Scroll Area
- [ ] Select
- [ ] Sheet
- [ ] Sidebar
- [ ] Slider
- [ ] Sonner
- [ ] Spinner
- [ ] Switch
- [ ] Table
- [ ] Tabs
- [ ] Textarea
- [ ] Toggle
- [ ] Toggle Group
- [ ] Tooltip
- [ ] Typography — 텍스트 스타일 예제

Button Group과 Dropdown Menu는 현재 테스트 fixture만 있으며 배포용 지원은 아직 없다. Toast는 업스트림에서 deprecated되었으므로 Sonner로 지원한다.

Checkbox의 미완료 공식 preview: checkbox-basic, checkbox-demo, checkbox-description, checkbox-disabled, checkbox-group, checkbox-invalid, checkbox-rtl, checkbox-table. Field/Table 구현 PR에서 실제 원본 예제를 공유 스토리로 연결하고 검증한 뒤 완료 표시한다.
