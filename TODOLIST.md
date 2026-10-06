# 컴포넌트 지원 목록

기준: upstream/source.json에 고정한 shadcn React Aria 컴포넌트 및 문서 예제. 현재 지원 범위는 Nova / Neutral light·dark다. 체크는 레지스트리 제공과 명시된 검증 완료를 뜻한다.

## 지원 중

- [x] Button — Button, LinkButton, buttonProps; 6개 variant × 8개 size
- [x] Skeleton — 크기·모양 xstyle, pulse, light·dark
- [x] Separator — 가로·세로 구분선, 공식 예제·DOM 의미·StyleX 커스터마이징

## 지원 예정

- [x] Accordion
- [x] Alert
- [x] Alert Dialog
- [x] Aspect Ratio
- [ ] Attachment
- [ ] Avatar — 기본 구현·Dropdown Avatar 제공; 통합 회귀 후속 검증
- [x] Badge
- [x] Breadcrumb
- [x] Bubble
- [ ] Button Group — 기본 구현·실제 Tooltip/Kbd 조합; Select·Popover 미구현; Dropdown·Field 공식 조합 후속 통합
- [x] Calendar
- [x] Card
- [x] Carousel
- [x] Chart
- [ ] Checkbox — 기본 구현; Field·데이터 테이블·폼 공식 조합 대기
- [x] Collapsible
- [x] Combobox
- [x] Command
- [x] Context Menu
- [x] Data Table — 조합 예제 포함
- [x] Date Picker — 조합 예제 포함
- [x] Dialog
- [x] Direction — locale·방향 상속, 동적 전환, 실제 Card RTL 조합
- [ ] Drawer
- [ ] Dropdown Menu — 기본 구현·Table Actions 제공; Avatar 조합 제공; 통합 회귀 후속 검증
- [x] Empty — 공식 문서·registry 조합, RTL·반응형·StyleX 커스터마이징
- [ ] Field — 기본 레지스트리·Checkbox 조합 구현; 나머지 공식 조합 통합 대기
- [ ] Form
- [x] Hover Card
- [ ] Input — 기본 구현 제공; 공식 의존 조합·RTL 예제 후속 통합 검증
- [ ] Input Group — 구현; Field·Tooltip·Kbd 등 공식 교차 조합·RTL 예제 대기
- [x] Input OTP
- [x] Item — 공식 문서·registry 조합, 링크·메뉴·RTL·미디어
- [ ] Kbd — 기본 설치·Tooltip 내용 구현; 공식 ButtonGroup 컨테이너 통합 대기
- [ ] Label — 실제 Checkbox 조합 지원; Field 공식 조합 대기
- [ ] Marker — 구현·문서 예제 검증; Drawer 조합 통합 대기
- [ ] Message
- [ ] Message Scroller
- [ ] Native Select — 구현; OS 네이티브 팝업 검증 제외
- [x] Pagination
- [x] Popover
- [x] Progress
- [ ] Questionnaire
- [x] Radio Group
- [x] Resizable
- [x] Scroll Area
- [x] Select — 공식 예제·검색·다중 선택·RTL
- [x] Sheet
- [ ] Sidebar
- [x] Slider
- [ ] Sonner
- [x] Spinner
- [x] Switch
- [ ] Table — 기본 구현·Checkbox 조합 제공; Table Actions 후속 통합 회귀
- [x] Tabs
- [ ] Textarea — 기본 구현 제공; 공식 Field·RTL 조합 후속 통합 검증
- [x] Toggle
- [x] Toggle Group
- [x] Tooltip — 기본 설치·실제 Kbd 조합; 공식 ButtonGroup 컨테이너 대기
- [x] Typography — 공식 intrinsic 텍스트 스타일 예제

Toast는 업스트림에서 deprecated되었으므로 Sonner로 지원한다.
