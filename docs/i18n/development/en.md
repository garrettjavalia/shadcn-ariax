# Development guide

English · [한국어](ko.md)

For developers working on AriaX. For application installation, see the [README](../../../README.md).

## Local environment

Use Node.js 22.19+ and pnpm 10.15.1. Run commands from the cloned repository root.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

The first run prepares pinned upstream sources under `generated/`. Storybooks run at [upstream :4100](http://127.0.0.1:4100) and [AriaX :4200](http://127.0.0.1:4200). To change ports, use `ARIAX_UPSTREAM_PORT` and `ARIAX_STYLEX_PORT` consistently for development and tests.

## Repository structure

| Path | Role |
| --- | --- |
| `src/ariax/ui/` | Components, `.internal.tsx` helpers, and `.recipe.stylex.ts` recipes |
| `src/ariax/styles/` | Shared CSS and theme tokens, imported by `entry.css` |
| `stories/`, `tests/` | Examples, browser comparisons, and installation fixtures |
| `.storybook/`, `reference/` | Build configuration and reference-side adapters |
| `scripts/generate-registry-catalog.ts`, `scripts/registry-sources.ts` | Catalog generation and source/dependency discovery |
| `upstream/`, `scripts/upstream/` | Pinned source metadata and reference preparation |
| `licenses/` | Distributed third-party licenses |

Commit sources, configuration, lockfiles, upstream metadata, and the generated root `registry.json`. `generated/`, `registry/`, `dist/`, and test reports are local outputs.

## Modifying components and the registry

1. Edit `src/ariax/ui/`; keep local dependencies in the same directory and use relative imports. Preserve React Aria behavior and accessibility. Apply internal styles before `xstyle` and `style`, preserving dynamic CSS variables.
2. Update the relevant stories and tests. New installable items need a matching fixture in `tests/install/`; additional fixture packages go in `<name>.dependencies.json` with exact versions.
3. Regenerate the catalog and validate it:

   ```sh
   pnpm registry:build
   pnpm registry:check
   ```

4. Run checks for the affected behavior and update both translations of [Component status](../components/en.md) if coverage or availability changes.

The generator discovers `ui/<name>.tsx` and recipes, follows relative imports, and uses exact package versions from `package.json`. Root `registry.json` contains file paths for GitHub installation; `registry/<item>.json` contains self-contained HTTP/local payloads.

Both catalogs are identical and generated from one item definition. Each item includes its shared CSS, animations, licenses, and StyleX dependencies. The official `shadcn build registry.json --output registry` command produces the public catalog and individual installation JSON, adding the item schema and actual file contents. `pnpm registry:build` runs catalog generation and this official build together. GitHub installation reads all files from the selected source revision; no separately pinned shared item is required. After any source or dependency change, run `pnpm registry:build` and commit the root `registry.json` with the source.

StyleX's Babel plugin compiles JavaScript references; its PostCSS plugin replaces `@stylex;` in `entry.css` with extracted CSS. `.storybook/main.ts` configures the two implementations. `pnpm build:upstream` and `pnpm build:stylex` write to `dist/upstream/` and `dist/stylex/`; the latter also checks CSS for lazy-loaded stories.

## Publishing for the registry directory

The `Publish registry to GitHub Raw` workflow runs on pushes to `main`, or manually from `main`. It validates the source catalog, installs all component fixtures with the real CLI, and builds the consumer app before publishing. It publishes the complete tracked `main` snapshot plus generated `registry/` JSON to the `deploy/shadcn-registry` branch using the repository's `GITHUB_TOKEN` (`contents: write`). Branch rules must allow that workflow to update `deploy/shadcn-registry`. The workflow creates this branch on first publication. Each deployment descends from its source commit and, after the first publication, the previous deployment. Its file tree is the source snapshot plus generated JSON, so removed files do not survive from previous deployments. Identical snapshots do not create another commit. Make source edits through `main`; do not merge generated deployment files back into it. GitHub Pages and a separate server are not required.

`registry/registry.json` is the HTTP catalog: it matches the self-contained item payloads, but omits file contents. Builds clear `registry/` so removed items are not published. Generated JSON stays out of the source branch; publication commits preserve history on the separate `deploy/shadcn-registry` branch.

After the first successful publication, the URL template is:

```text
https://raw.githubusercontent.com/garrettjavalia/shadcn_ariax/refs/heads/deploy/shadcn-registry/registry/{name}.json
```

The catalog is at the same URL with `registry` substituted for `{name}`. Verify the published endpoint against the matching source revision:

```sh
ARIAX_REGISTRY_URL=https://raw.githubusercontent.com/garrettjavalia/shadcn_ariax/refs/heads/deploy/shadcn-registry/registry/ pnpm test:install
```

For reproducible checks, replace the entire `refs/heads/deploy/shadcn-registry` segment with its publication commit SHA. `ARIAX_REGISTRY_URL` must be an HTTP(S) directory URL ending in `/`. This installs all component fixtures from the endpoint and checks dependencies, TypeScript, and a production Vite build without Tailwind.

Submit `@ariax`, the repository homepage, this URL template, a description, and an SVG logo in `apps/v4/registry/directory.json` of `shadcn-ui/ui`. Run its `pnpm validate:registries` before opening the submission PR; see the [official requirements](https://ui.shadcn.com/docs/registry/registry-index). Publication does not register the namespace automatically. Until acceptance, use the existing GitHub installation address, or configure the namespace explicitly in `components.json` after publication:

```json
{
  "registries": {
    "@ariax": "https://raw.githubusercontent.com/garrettjavalia/shadcn_ariax/refs/heads/deploy/shadcn-registry/registry/{name}.json"
  }
}
```

## Upstream preparation

```text
upstream/source.json + upstream/reference.json
  → upstream:prepare → generated/upstream/shadcn/ + generated/reference/
  → originals:generate → generated/original-stories/
```

`source.json` pins the repository, commit, selected paths, and required files. `reference.json` selects components and helper references. To add a reference, update its `components` or `helperReferences` and declare any required npm packages at exact versions in this project.

Preparation reads upstream `*/_registry.ts`, applies the official `createStyleMap` and `transformStyle` APIs, and runs shadcn CLI `build` and `add` in isolated projects. Neutral colors come from the same commit through a local registry. The reference is determined by that commit and the locked CLI/packages. `rtl: true` enables official logical-direction transforms for both LTR and RTL comparisons.

`generated/reference/aria-nova/` holds the primary installed UI; `base-nova/` and `radix-rhea/` supply example helpers. `@reference/*` resolves to the primary installation. CLI-owned `cli.css` is separate from the comparison harness's `tailwind.css`.

`originals:generate` finds official TSX examples through MDX `ComponentPreview` entries and creates stories without changing their JSX or classes. `/original-stories/manifest.json` records matches; unmatched examples remain visible. `reference/` supplies React adapters for Next Image/Link and example fonts.

Tests, typechecks, and Storybook commands prepare references automatically. `scripts/upstream/ensure.ts` handles downloads, `reference.ts` builds installations, and `prepare.ts` manages the installation cache. Completion records, source settings, and required files determine reuse; valid caches work offline. Shared locks and temporary directories protect concurrent preparation and preserve the old cache on failure. Missing installation files are rebuilt; suspected manual damage requires `pnpm upstream:sync`. Normal checks do not update the pinned source revision.

## Checks

These are repository development checks. Choose the affected scope; the full verification pipeline can take about an hour.

| Change | Checks |
| --- | --- |
| Documentation | Links, command names, and matching translations |
| Components | `pnpm typecheck`, affected browser tests and CI comparisons |
| Registry or dependencies | `pnpm registry:check`, `pnpm test:install` |
| StyleX integration | `pnpm test:stylex`, installation test, StyleX build |
| Upstream preparation | `pnpm test:upstream`, `pnpm upstream:check` |
| Comparator | Comparator contract tests and affected comparisons |

Start with an individual test or component comparison:

```sh
pnpm test tests/button.spec.ts
PARITY_COMPONENT=components-button-- pnpm test:ci:light
```

`test:ci:light` and `test:ci:dark` select one theme; `test:ci` runs both. CI comparisons cover DOM, text, attributes, computed CSS, and pseudo-elements at 1000px. Standalone colors allow OKLab ΔE ≤ 0.002; alpha and other values remain exact. Interaction, geometry, pixels, focus, scrolling, and animation checks belong to the broader suite.

Comparison stories use `parity`, render inside `#parity-root`, and mark portals with `data-parity-portal`; `viewport-390` adds mobile coverage. Shared comparison logic is in `tests/parity.spec.ts`, `tests/compare.ts`, and `tests/color-differences.ts`.

For production comparisons, rebuild after source changes:

```sh
pnpm build
ARIAX_STATIC_STORYBOOK=1 pnpm test:ci:light
```

`pnpm test:upstream` uses local source archives with the real CLI to check transforms, concurrent preparation, offline reuse, and cache recovery. `pnpm test:install` separately installs the AriaX registry into a consumer app.

`pnpm test` runs the browser suite; `pnpm test:full` runs full verification, including installation and builds. View results with `pnpm test:report`; format tests with `pnpm format:tests` and components/shipped CSS with `pnpm format:components`. `pnpm format:check` checks both scopes during full local verification and CI. Detailed implementation and verification rules are in [convention.md](../../../convention.md).
