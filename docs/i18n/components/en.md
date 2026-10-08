# Components

English · [한국어](ko.md)

60 registry items (59 UI components and one Typography recipe) for Nova / Neutral light and dark themes. See [Installation](../../../README.md#installation) for usage. Availability does not imply complete verification.

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

**Composition examples:** Data Table, Date Picker (assembled from registry items).

## Verification scope and remaining work

- All 60 items have installation fixtures and passed actual shadcn CLI installation from the public HTTP endpoint, TypeScript checks, and a production Vite build without Tailwind.
- [PR #115](https://github.com/garrettjavalia/shadcn-ariax/pull/115) records 999 passing detailed cases across 94 test files. These results apply to that revision and scope, not every current usage condition. CI runs static comparisons of registered stories at 1000px in light and dark themes; detailed behavior, pixel, and animation checks are separate.
- Coverage of all official documentation examples remains incomplete. The current generated mapping has 139 of 452 previews without an automatic StyleX story counterpart. Manual stories or individual checks may still exist, so this is not a count of unimplemented components.

Tests explicitly track examples that still need complete official compositions.

| Component | Pending official examples | Scope |
| --- | --- | --- |
| Input | 14 | Field, Input Group and Button Group compositions; forms, states and RTL |
| Input Group | 9 | Addon alignment; Button, Kbd, Dropdown and Spinner compositions; RTL |
| Textarea | 4 | Field composition; disabled, invalid and RTL |

Passing individual component state or behavior checks does not establish complete coverage of official compositions. Installation has been verified with Vite, React and TypeScript; Next.js, SSR and other framework integrations remain unverified. See the [Development guide](../development/en.md#checks) for checks.

## Notes
- Native Select: OS-native popups are outside the verification scope.
- Attachment: the official example’s native trigger does not automatically open Dialog, matching upstream. An explicitly controlled Dialog composition and open/close checks are also provided.
- Typography provides StyleX recipes for HTML elements.
- Toast is deprecated upstream; use Sonner.
