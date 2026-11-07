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
- The 493 official documentation preview occurrences have 486 connected comparisons and 7 explicit exceptions. Connected demos use the untouched official TSX on the upstream side and the StyleX adaptation on the AriaX side, under the same story ID. Their actual DOM/CSS equivalence is checked by the browser suite; a mapping alone is not a passing result.
- `upstream/original-exceptions.json` records the exceptions: the raw CVA `button-render` example is outside the resolved `buttonProps` contract, and six MessageScroller demos depend on the Radix/Rhea `MessageAnimated` renderer. These originals remain available for browsing. Missing mappings, unexplained exclusions and stale exceptions fail generation; connected examples must have an active `parity` story in the live index.

Installation has been verified with Vite, React and TypeScript; Next.js, SSR and other framework integrations remain unverified. See the [Development guide](../development/en.md#checks) for checks.

## Notes
- Native Select: OS-native popups are outside the verification scope.
- Attachment: the official example’s native trigger does not automatically open Dialog, matching upstream. An explicitly controlled Dialog composition and open/close checks are also provided.
- Trace: the official description color falls below WCAG AA text contrast in both themes. The implementation preserves the source color, and accessibility comparisons track this limitation.
- Typography provides StyleX recipes for HTML elements.
- Toast is deprecated upstream; use Sonner.
