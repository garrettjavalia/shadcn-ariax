# Development guide

English · [한국어](ko.md)

How to edit and test AriaX components. To install them in your own app, see the [README](../../../README.md).

## Run the project

You need Node.js 22.19+ and pnpm 10.15.1.

```sh
git clone https://github.com/garrettjavalia/shadcn-ariax.git
cd shadcn-ariax
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

`pnpm dev` starts two Storybooks, where you can browse component examples.

| Address | Contents |
| --- | --- |
| [localhost:4100](http://127.0.0.1:4100) | Original shadcn/ui components used for comparison |
| [localhost:4200](http://127.0.0.1:4200) | AriaX components implemented with StyleX |

Open the same example in both to compare appearance and behavior. The first run takes longer because it downloads the original source. Press Ctrl+C in the terminal to stop. Run the remaining commands from the repository root too.

## Where to make changes

| Path | Contents |
| --- | --- |
| `src/ariax/ui/` | AriaX components and styling helpers |
| `src/ariax/styles/` | Shared CSS and themes |
| `stories/` | Storybook examples. A story defines how to display and configure one example. |
| `tests/` | Behavior and style comparisons. `tests/install/` contains small test app examples used to check installed components. |
| `.storybook/` | Storybook development and build settings |
| `upstream/` | The original version and components selected for comparison |

`generated/` contains automatically prepared original code. Do not edit it directly.

## Edit a component

1. Read the [project rules](../../../convention.md), then edit a component in `src/ariax/ui/` or shared styles in `src/ariax/styles/`.
2. Check the result using the relevant examples in `stories/`, and update examples and tests as needed. Add an installation example in `tests/install/` for each new component.
3. Format the code and rebuild the installation catalog. The registry lists the components and files that the shadcn CLI installs.

   ```sh
   pnpm format:components
   pnpm format:tests
   pnpm registry:build
   ```

4. Run the checks below for your change. Update both translations of [Component status](../components/en.md) when component availability or verification coverage changes.

Commit changes to the root `registry.json` alongside your source and tests. Do not commit generated `registry/`, `generated/`, `dist/`, or test reports.

## Checks

For example, after changing Button:

```sh
pnpm typecheck
pnpm format:check
pnpm registry:check
pnpm test tests/button.spec.ts
PARITY_COMPONENT=components-button-- pnpm test:ci
```

The first three commands check types, formatting, and the installation catalog. The fourth tests Button behavior. The last compares Button stories with the originals in light and dark themes. `PARITY_COMPONENT` selects story ID prefixes; separate multiple prefixes with commas.

| Additional check | Command |
| --- | --- |
| Real CLI installation and a build of the app using the installed components | `pnpm test:install` |
| StyleX CSS extraction | `pnpm test:stylex` |
| Original source preparation and example generation | `pnpm test:upstream` and `pnpm upstream:check` |
| Both Storybook builds | `pnpm build` |
| Browser test report | `pnpm test:report` |

PR CI checks types, builds, and static DOM/CSS comparisons with the originals. Run the relevant browser tests to check interactions, pixels, and animations too. Normally, test the parts you changed. Use `pnpm test:full` only when full verification is needed; it also includes installation and builds and takes substantially longer.

## Connect stories to official examples

The generator creates **Storybook registration code for the original examples**. You write the StyleX examples used by AriaX. The existing Avatar example below shows the connection process used for other components too.

### Connect automatically by filename

[avatar-examples/avatar-demo.tsx](../../../stories/avatar-examples/avatar-demo.tsx) contains the example displayed by AriaX. [avatar.stories.tsx](../../../stories/avatar.stories.tsx) imports and registers it like this:

```tsx
import AvatarDemo from './avatar-examples/avatar-demo';

export const Demo = {
  tags: ['viewport-390'],
  render: () => <AvatarDemo />,
};
```

The generator finds the imported filename `avatar-demo` in the official example list and connects it. This automatic detection supports directly returning an imported component without props or children. Use `render: () => <AvatarDemo />` as above. Wrapping it in `<div><AvatarDemo /></div>` prevents this form of detection.

### Specify the original name explicitly

If the filename differs or the render function is more complex, set `parameters.originalExample`. **Replace** the `Demo` definition above with:

```tsx
export const Demo = {
  tags: ['viewport-390'],
  parameters: { originalExample: 'avatar-demo' },
  render: () => <AvatarDemo />,
};
```

`avatar-demo` is the official example name in the pinned shadcn/ui documentation, not the story export name `Demo`. This setting takes priority over automatic detection. Connecting examples does not translate styles: the AriaX example must still match the original content, structure, and styling.

Both snippets use the imports and default metadata in the existing Avatar file. For a new story file, also include `tags: ['parity']` to enable comparisons and a decorator that wraps examples in `#parity-root`. Refer to the existing Avatar file for these settings.

### Generate and check the comparison

`pnpm dev` includes original story generation. To run just the preparation and generation steps:

```sh
pnpm upstream:prepare
pnpm originals:generate
```

`scripts/upstream/original-stories.ts` recursively reads every `*.stories.tsx` under `stories/` and parses the code into an AST (syntax tree). It inspects imports, default metadata such as `title` and `id`, and exported stories' `originalExample` settings and simple render functions. It does not execute these files or evaluate function calls or dynamically calculated settings, so use static definitions as shown above.

Connections are recorded in `generated/original-stories/public/manifest.json`, and original stories are written to `generated/original-stories/`. You do not need to edit generated files or import them from `stories/`.

`Components/Avatar → Demo` uses the same story ID in both Storybooks. AriaX renders your example; the original Storybook renders the official example. The generator preserves the existing settings and decorators and replaces the original side's render function. Compare their actual DOM and CSS with:

```sh
PARITY_COMPONENT=components-avatar--demo pnpm test:ci
```

If `originalExample` names an example that is not in the official list, the generation script fails its assertion. For example, the typo `avatar-demoo` produces an error like:

```text
AssertionError [ERR_ASSERTION]: Unknown official example avatar-demoo in .../stories/avatar.stories.tsx#Demo
```

This happens **while the generation script runs**, rather than during typechecking or browser rendering. It is also detected by the generation step in `pnpm dev`, tests, and the original Storybook build. Use the file path and export name in the error to find and correct `originalExample`.

## Upstream preparation

In this project, upstream means the original shadcn/ui source used for comparison. Development and test commands prepare it automatically, so you usually do not need a separate preparation step.

- `upstream/source.json`: the original repository and commit to use
- `upstream/reference.json`: components and supporting code to install
- `upstream/original-exceptions.json`: official examples excluded from comparison, with reasons

If the prepared original files are damaged, run `pnpm upstream:sync` to download and prepare them again. This uses the configured commit; it does not upgrade to the latest version.

## Deploy — for maintainers

Merge release changes into `main`, then merge them into the appropriate deployment branch and push. Check the result in the repository's Actions tab.

### Publishing for the registry directory

Pushing to `deploy-registry` runs installation checks, then publishes the complete source and generated `registry/` JSON to `published-registry`. That branch contains generated publication output; do not edit it directly or merge it into a source branch. Repository branch rules must allow the workflow to push to the publication branch.

Component installation URLs use this template. Replace `{name}` with a component name such as `button`.

```text
https://raw.githubusercontent.com/garrettjavalia/shadcn-ariax/refs/heads/published-registry/registry/{name}.json
```

From the source revision you published, check installation from the public endpoint:

```sh
ARIAX_REGISTRY_URL=https://raw.githubusercontent.com/garrettjavalia/shadcn-ariax/refs/heads/published-registry/registry/ pnpm test:install
```

Listing the registry in shadcn/ui's official directory is a separate step. See the [submission guide](https://ui.shadcn.com/docs/registry/registry-index).

### Publishing Storybook to GitHub Pages

Pushing to `deploy-github-pages` builds AriaX Storybook and deploys it to the [public Storybook](https://garrettjavalia.github.io/shadcn-ariax/). The contents of `dist/stylex/` are uploaded; build output is not stored on a separate branch.

For initial setup, check these two GitHub settings:

1. Set **Settings → Pages → Source** to **GitHub Actions**.
2. Allow `deploy-github-pages` in the deployment branch rules under **Settings → Environments → github-pages**.

The workflow reads the site's `/shadcn-ariax/` path and applies it to the build. Both deployment workflows can also be run manually from Actions by selecting their deployment branch.
