# Development guide

English · [한국어](ko.md)

This document maps the repository's source files, generation steps, and checks to common changes. For application installation, see the [README](../../../README.md).

## Local environment

Use Node.js 22.19+ and pnpm 10.15.1. Run commands from the repository root.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

The first run downloads the pinned upstream sources and prepares reference components under `generated/`.

| Server | URL | Implementation |
| --- | --- | --- |
| Upstream Storybook | http://127.0.0.1:4100 | Prepared upstream components and examples |
| Ariax Storybook | http://127.0.0.1:4200 | Sources in `registry/ariax/` |

Both servers use `.storybook/`. `ARIAX_IMPLEMENTATION` selects the implementation; the package scripts set it for you. To change ports, set `ARIAX_UPSTREAM_PORT` and `ARIAX_STYLEX_PORT` consistently for development and test commands.

## Repository structure

| Path | Role |
| --- | --- |
| `registry/ariax/ui/` | Component implementations, internal helpers, and StyleX recipes |
| `registry/ariax/styles/` | Shared CSS, theme tokens, and the `entry.css` stylesheet |
| `stories/` | Ariax examples and comparison stories |
| `reference/` | Reference-side adapters and customization fixtures |
| `.storybook/` | Implementation aliases, preview setup, and build integration |
| `tests/` | Playwright comparisons, interaction tests, and shared test helpers |
| `tests/install/` | Consumer fixtures for each installable registry item |
| `scripts/build-registry.ts` | Registry catalog and item generation |
| `scripts/registry-sources.ts` | Source discovery and dependency collection |
| `scripts/upstream/` | Upstream download, reference installation, and example generation |
| `upstream/source.json` | Pinned upstream source revision |
| `upstream/reference.json` | Reference components and helper selections |
| `licenses/` | Third-party license files included in the registry |
| `registry.json` | Committed catalog used for GitHub installation |

## Generation and build flow

### Registry

```text
registry/ariax/ui/ + registry/ariax/styles/ + licenses/
    → pnpm registry:build
    → registry.json
    → public/registry.json + public/r/<item>.json
```

Component discovery uses `ui/<name>.tsx`. Relative imports are followed to collect accompanying source files, and imported packages are resolved against the exact versions declared in `package.json`.

`<name>.internal.tsx` files are helpers, not standalone registry items. Intrinsic HTML recipes use `<name>.recipe.stylex.ts`. Shared CSS, animations, licenses, and StyleX build dependencies are defined once in `ariax-base`. Components reference it through a commit-pinned GitHub `registryDependencies` address. HTTP/local payloads in `public/r/` include these files directly.

When changing shared files or dependencies, run `pnpm registry:build --publish-shared`, commit and push the shared item, then update `sharedRevision` and the printed digest in `scripts/build-registry.ts` and regenerate the catalog. GitHub dependency refs do not inherit the component revision; the pin keeps its shared files consistent. Normal builds reject changes that have not updated this pin.

After changing registry sources or dependency declarations:

```sh
pnpm registry:build
pnpm registry:check
```

The check compares the committed catalog with the current sources and validates it through the shadcn CLI.

### Upstream references

```text
upstream/source.json + upstream/reference.json
    → pnpm upstream:prepare
    → generated/upstream/ + generated/reference/
    → pnpm originals:generate
    → generated/original-stories/
```

Reference components are prepared through the official shadcn CLI. Original example stories are generated from the pinned upstream documentation. The preparation scripts reuse valid caches.

Change the source metadata or generator when the reference setup needs updating. See [Upstream preparation](../../upstream-structure.md) for cache handling and generation details.

### Styles and Storybook

The official StyleX Babel plugin compiles style references in JavaScript. The PostCSS plugin scans the configured sources and replaces `@stylex;` in `registry/ariax/styles/entry.css` with generated CSS.

`.storybook/main.ts` configures the build for each implementation. The preview imports `@implementation-css`, which resolves to the appropriate stylesheet. Production builds are written to `dist/upstream/` and `dist/stylex/`.

```sh
pnpm build:upstream
pnpm build:stylex
```

The StyleX build also checks that the iframe entry CSS contains the compiled StyleX classes used by lazy-loaded stories.

## Modifying a component

1. Edit the implementation in `registry/ariax/ui/`. Keep component dependencies in that directory and use relative imports between local source files.
2. Put shared selectors or theme changes in `registry/ariax/styles/`. Import new shared stylesheets from `entry.css`.
3. Update the relevant story and tests to exercise the changed behavior.
4. Regenerate the registry and run checks that cover the change.
5. Update [Component status](../components/en.md) and its [Korean translation](../components/ko.md) if availability or documented coverage changes.

Preserve the React Aria behavior, accessibility contract, and upstream semantics. Components expose `xstyle` and `style`; apply internal styles before user styles and preserve dynamic CSS variables. Keep external dependency versions exact.

For a new installable item, add a fixture with the matching name under `tests/install/`. Declare additional fixture dependencies in its `.dependencies.json` file when required. Installation validation checks fixture coverage against the registry.

## Stories and comparisons

Comparison stories use the `parity` tag and render their content under `#parity-root`. Register additional portal roots with `data-parity-portal`. Stories needing the 390px comparison also use `viewport-390`.

`tests/parity.spec.ts` discovers and partitions the registered stories. `tests/compare.ts` captures the DOM and computed styles; `tests/color-differences.ts` handles the OKLab color comparison. Add component-specific interactions in the relevant test rather than duplicating the comparison helpers.

The CI comparison covers DOM, text, attributes, computed CSS, and pseudo-elements at 1000px. It allows an OKLab distance of 0.002 for standalone computed color values; alpha and other values remain exact. Geometry, pixels, scrolling, focus, and explicit animation-time samples are covered by the broader browser suite.

## Choosing checks

Run the following commands from a clone of this repository when developing Ariax.

Start with the changed component or subsystem, then expand to the affected shared behavior.

| Change | Checks |
| --- | --- |
| Documentation | Relative links, command names, code examples, and matching translations |
| Component markup or styles | Typecheck, affected component tests, and relevant CI comparisons |
| Interaction or animation behavior | Relevant interaction or animation tests |
| Registry contents or dependencies | Registry generation, validation, and CLI installation test |
| StyleX integration | Extraction tests, consumer installation/build test, and StyleX Storybook build |
| Upstream preparation | Upstream tests and source checks |
| Shared comparison code | Comparator contract tests and affected comparisons |

Run an individual browser test or restrict the CI comparison by story ID prefix:

```sh
pnpm test tests/button.spec.ts
PARITY_COMPONENT=components-button-- pnpm test:ci:light
```

Select a theme for the lightweight comparison:

```sh
pnpm test:ci:light
pnpm test:ci:dark
pnpm test:ci
```

The last command runs both themes. `ARIAX_TEST_THEME=light` or `dark` selects a theme only in CI comparison mode. A single-theme run covers only that theme.

To compare production builds:

```sh
pnpm build
ARIAX_STATIC_STORYBOOK=1 pnpm test:ci:light
```

Rebuild after source changes when using static Storybooks.

Other checks:

```sh
pnpm typecheck
pnpm test:stylex
pnpm test:install
pnpm test:upstream
pnpm upstream:check
pnpm format:tests
```

`pnpm test` runs the browser suite. `pnpm test:full` runs the broader verification pipeline, including browser tests, installation, and builds. Open browser results with `pnpm test:report`.

## Source and generated files

Commit component sources, shared styles, stories, tests, tooling, dependency declarations and lockfiles, upstream metadata, license files, and the generated root `registry.json`.

The following are regenerated or local outputs excluded from Git:

- `generated/`: upstream sources, reference installations, and generated stories.
- `public/registry.json` and `public/r/`: generated registry payloads.
- `dist/`: production Storybooks.
- `test-results/` and `playwright-report/`: test output.
- `.consumer-test-*/`: temporary installation fixtures.

The root `registry.json` is the exception: it is generated and committed because it is the GitHub installation entry point.
