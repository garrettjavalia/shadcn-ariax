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

All 62 items have installation fixtures. Trace and Code Block received browser comparison, interaction, keyboard, clipboard, streaming, animation and accessibility checks. They also passed actual HTTP CLI installation, TypeScript checks and a production Vite build without Tailwind using shadcn CLI 4.23.0 and Zod 4.6.7. The subsequent fixes to Toggle, Questionnaire, Input Group and Tabs were also checked in an installed consumer app. This does not mean all 62 items were freshly reinstalled. AI Elements composition patterns were not added.

CI compares registered stories at 1000px in light and dark themes. Detailed behavior, geometry, focus, pixels and animation checks run separately. Installation has been verified with Vite, React and TypeScript; Next.js, SSR and other framework integrations remain unverified.

### Latest detailed E2E result

The 2026-11-07 full detailed light-theme run used four workers and prepared static Storybooks. Times below are command wall times; neither run skipped tests.

| Revision | Passed / failed | Time |
| --- | --- | --- |
| Before: `ca94b84` | 697 / 71 (768 total) | 21m 23.50s |
| After: `d62f42a` | 768 / 3 (771 total) | 14m 32.59s |

The same selection retained all 768 existing tests and added three navigation/comparator contract tests. Runtime decreased by **6m 50.91s (32.0%)**, including fixes to failures and earlier termination of stalled waits. This does not establish a 32% speedup for each passing test or a passing full suite. A new full dark-theme run was not performed.

The separate common static CI benchmark previously decreased from 711.895s to 449.363s (36.9%) with the same two workers, 1,020 stories and light/dark coverage. It completed 2,039 comparisons across 134 batches: 133 passed and one failed. Its 10-minute target applies to common CI E2E, not the detailed suite. See the [Development guide](../development/en.md#checks) for commands and budgets.

### Unresolved failures

- **MessageScroller opening position (two failing tests):** the official preview and the common comparison fail on the initial anchor position. Both implementations reproduced 24px instead of the expected 80px, consistent with [upstream issue #11643](https://github.com/shadcn-ui/ui/issues/11643) concerning estimated heights from `content-visibility: auto`. The pinned `@shadcn/react@0.3.1` is affected; [fix PR #11670](https://github.com/shadcn-ui/ui/pull/11670) was unmerged when checked on 2026-11-07. Post-layout correction experiments succeeded but were not adopted as a production fix: scrolling, cancellation and spacer contracts still need verification. Tests do not force the expected position. The seven detailed MessageScroller cases passed five repetitions each; those results do not resolve initial positioning.
- **Sidebar focus (one failing test):** the latest run failed the `shortcut-expanded` pixel comparison after its DOM/CSS comparison passed. The upstream search input showed a focus ring that was absent from the AriaX screenshot. Earlier intermittent `menu-badge` focus failures did not reproduce in 30 instrumented repetitions and passed in the latest full run; their cause remains unresolved. Comparison tolerances remain unchanged.

### Official example coverage

The 493 official documentation preview occurrences have 486 connected comparisons and seven explicit exceptions. Connected demos use untouched official TSX upstream and the StyleX adaptation in AriaX under the same story ID. A mapping alone is not a passing browser comparison.

[Official exceptions](../../../upstream/original-exceptions.json) records the raw CVA `button-render` example outside the resolved `buttonProps` contract and six MessageScroller demos depending on the Radix/Rhea `MessageAnimated` renderer. These originals remain browsable. Missing mappings, unexplained exclusions and stale exceptions fail generation; connected examples must have an active `parity` story in the live index.

## Notes

- Native Select: OS-native popups are outside the verification scope.
- Attachment: the official example’s native trigger does not automatically open Dialog, matching upstream. An explicitly controlled Dialog composition and open/close checks are also provided.
- Trace: the official description color falls below WCAG AA text contrast in both themes. The implementation preserves the source color, and accessibility comparisons track this limitation.
- Typography provides StyleX recipes for HTML elements.
- Toast is deprecated upstream; use Sonner.
