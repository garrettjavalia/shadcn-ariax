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

All 62 registry items have installation fixtures. The supported installation environment is Vite with React and TypeScript, without Tailwind. Next.js, SSR and other framework integrations remain unverified.

CI compares registered stories at 1000px in light and dark themes. Detailed browser tests cover interactions, geometry, scrolling, focus, pixels and animation states. Trace and Code Block also have keyboard, clipboard, streaming and accessibility checks. See the [Development guide](../development/en.md#checks) for commands and time budgets.

### Verification status

The latest detailed full light-theme run (2026-11-07, revision `d62f42a`, four workers, static Storybooks) completed 771 tests: **768 passed, three failed, none skipped**. Command wall time was 14m 32.59s. This is not a passing full suite or a full dark-theme result.

### Known limitations

- **MessageScroller opening position:** two tests fail because the initial anchor offset is 24px instead of 80px in both implementations. The pinned `@shadcn/react@0.3.1` is affected by the estimated-height behavior of `content-visibility: auto`; see [upstream issue #11643](https://github.com/shadcn-ui/ui/issues/11643) and [proposed fix #11670](https://github.com/shadcn-ui/ui/pull/11670). AriaX does not apply a local positioning workaround.
- **Sidebar focus:** the `shortcut-expanded` pixel comparison fails despite matching DOM/CSS snapshots: the upstream search input has a focus ring that is absent from the AriaX screenshot. Intermittent `menu-badge` focus differences also remain unresolved.

### Official example coverage

The 493 official documentation preview occurrences have 486 connected comparisons and seven explicit exceptions. Connected demos use untouched official TSX upstream and the StyleX adaptation in AriaX under the same story ID. A mapping alone is not a passing browser comparison.

[Official exceptions](../../../upstream/original-exceptions.json) records the raw CVA `button-render` example outside the resolved `buttonProps` contract and six MessageScroller demos depending on the Radix/Rhea `MessageAnimated` renderer. These originals are available for browsing. Missing mappings, unexplained exclusions and stale exceptions fail generation; connected examples must have an active `parity` story in the live index.

## Notes

- Native Select: OS-native popups are outside the verification scope.
- Attachment: the official example’s native trigger does not automatically open Dialog, matching upstream. An explicitly controlled Dialog composition and open/close checks are also provided.
- Trace: the official description color falls below WCAG AA text contrast in both themes. The implementation preserves the source color, and accessibility comparisons track this limitation.
- Typography provides StyleX recipes for HTML elements.
- Toast is deprecated upstream; use Sonner.
