# Components

English · [한국어](ko.md)

62 registry items (61 UI components and one Typography recipe) for Nova / Neutral light and dark themes. See [Installation](../../../README.md#installation) for usage. Availability does not imply complete verification.

| Component | Install name |
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

**Composition examples:** Data Table, Date Picker (assembled from registry items).

## Verification scope and remaining work

- All 62 items have installation fixtures. Trace and Code Block passed actual CLI installation over HTTP, TypeScript checks and a production Vite build without Tailwind with the updated tools; the other 60 retain their previously verified installation coverage.
- In this upstream refresh, Trace and Code Block received full browser comparisons and interaction, keyboard, clipboard, streaming, animation and accessibility checks. Existing components received the common static E2E comparison only. AI Elements composition patterns were not added.
- CI runs static comparisons of registered stories at 1000px in light and dark themes; detailed behavior, pixel, and animation checks are separate.
- A detailed light-theme full E2E run completed 768 tests: 697 passed and 71 failed in 21m 23.5s. After correcting official-example portal/trigger discovery, Carousel API observation, spacing tokens, metadata access and scroll readiness, only failed and affected cases were rerun. All 67 previous failures outside MessageScroller passed; Sidebar focus also passed 20 repetitions. This is not a new full-suite result.
- The seven detailed MessageScroller tests passed five repetitions each (35 total) after waiting for SDK auto-scroll completion. Two related common comparison batches and three isolated opening-position comparisons also passed, but the official preview execution test failed at opening-position on all three repetitions. Conditional passes do not establish that the SDK initial-position defect is fixed.
- With the same two workers, 1,020 stories and light/dark coverage, common static CI E2E decreased from 711.895s to 449.363s (36.9%; full command 453.166s). Of 134 batches, 133 passed and one failed, completing 2,039 comparisons. The 10-minute runtime target is met, but the suite is not fully passing. The reduction includes earlier termination of stalled readiness.
- The official MessageScroller opening-position defect reproduced on 8/8 fresh pages for each implementation: a 24px anchor offset instead of 80px. This matches [upstream issue #11643](https://github.com/shadcn-ui/ui/issues/11643): the SDK calculates the destination using estimated heights from `content-visibility: auto`. Disabling that property for diagnosis produced the correct offset on 8/8 pages per implementation. Keeping it enabled and correcting with `scrollIntoView` after actual layout also succeeded on 8/8 each. This was a post-layout correction experiment, not a permanent fix or successful initial positioning. The latest published `@shadcn/react@0.3.1` remains affected and [fix PR #11670](https://github.com/shadcn-ui/ui/pull/11670) is unmerged (checked 2026-11-07). The original optimization, examples and SDK remain unchanged; tests do not force the expected position.
- The separately observed intermittent `last-anchor` failure did not reproduce on eight subsequent pages per implementation, so its cause is not assumed identical. Checking fixture readiness every frame did not resolve the earlier failures. Readiness fails after 15 seconds with phase, geometry and animation diagnostics; comparison criteria remain unchanged.
- The 493 official documentation preview occurrences have 486 connected comparisons and 7 explicit exceptions. Connected demos use the untouched official TSX on the upstream side and the StyleX adaptation on the AriaX side, under the same story ID. Their actual DOM/CSS equivalence is checked by the browser suite; a mapping alone is not a passing result.
- `upstream/original-exceptions.json` records the exceptions: the raw CVA `button-render` example is outside the resolved `buttonProps` contract, and six MessageScroller demos depend on the Radix/Rhea `MessageAnimated` renderer. These originals remain available for browsing. Missing mappings, unexplained exclusions and stale exceptions fail generation; connected examples must have an active `parity` story in the live index.

Installation has been verified with Vite, React and TypeScript; Next.js, SSR and other framework integrations remain unverified. See the [Development guide](../development/en.md#checks) for checks.

## Notes
- Native Select: OS-native popups are outside the verification scope.
- Attachment: the official example’s native trigger does not automatically open Dialog, matching upstream. An explicitly controlled Dialog composition and open/close checks are also provided.
- Trace: the official description color falls below WCAG AA text contrast in both themes. The implementation preserves the source color, and accessibility comparisons track this limitation.
- Typography provides StyleX recipes for HTML elements.
- Toast is deprecated upstream; use Sonner.
