import { readFileSync, readdirSync } from 'node:fs';
import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { createRequire } from 'node:module';
import type { TransformOptions } from '@babel/core';
const require = createRequire(import.meta.url);
const stylexPostcss = require('@stylexjs/postcss-plugin');
const babel: TransformOptions = {
  babelrc: false, configFile: false,
  parserOpts: { plugins: ['typescript', 'jsx'] },
  plugins: [['@stylexjs/babel-plugin', { dev: false, runtimeInjection: false, treeshakeCompensation: true, unstable_moduleResolution: { type: 'commonJS' } }]],
};
import tailwind from '@tailwindcss/vite';
import { originalAliases } from './original-aliases';
import { frameworkAliases } from './framework-aliases';

const upstream = process.env.ARIAX_IMPLEMENTATION === 'upstream';
const linkedSources = upstream ? new Set<string>(JSON.parse(readFileSync(resolve('generated/original-stories/public/manifest.json'), 'utf8')).previews.flatMap((preview: { counterparts: { metaSource: string }[] }) => preview.counterparts.map(match => match.metaSource))) : new Set<string>();
const sharedStories = readdirSync(resolve('stories'), { recursive: true }).filter((file): file is string => typeof file === 'string' && file.endsWith('.stories.tsx')).map(file => 'stories/' + file).filter(file => !linkedSources.has(file)).map(file => '../' + file);

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [...sharedStories, ...(upstream ? ['../generated/original-stories/*.stories.tsx'] : [])],
  addons: ['@storybook/addon-docs'],
  staticDirs: ['../public', { from: '../licenses', to: '/licenses' }, { from: '../generated/upstream/shadcn/apps/v4/public/avatars', to: '/avatars' }, ...(upstream ? [{ from: '../generated/original-stories/public', to: '/original-stories' }] : [])],
  core: { disableTelemetry: true },
  async viteFinal(config) {
    config.resolve ??= {};
    // Reference namespaces and shared stories must use the same primitive contexts and singleton stores.
    config.resolve.dedupe = [...new Set([...(config.resolve.dedupe ?? []), 'react', 'react-dom', 'react-aria-components', '@shadcn/react', 'recharts', 'sonner', 'next-themes'])];
    const inheritedAliases = config.resolve.alias;
    const aliases = {
      '@avatar': resolve(upstream ? 'generated/reference/aria-nova/ui/avatar.tsx' : 'src/ariax/ui/avatar.tsx'),
      '@avatar-customizations': resolve(upstream ? 'reference/avatar-customizations.ts' : 'stories/avatar-customizations.ts'),
      '@dropdown-menu': resolve(upstream ? 'generated/reference/aria-nova/ui/dropdown-menu.tsx' : 'src/ariax/ui/dropdown-menu.tsx'),
      '@dropdown-menu-customizations': resolve(upstream ? 'reference/dropdown-menu-customizations.ts' : 'stories/dropdown-menu-customizations.ts'),
      '@switch': resolve(upstream ? 'generated/reference/aria-nova/ui/switch.tsx' : 'src/ariax/ui/switch.tsx'),
      '@button-group': resolve(upstream ? 'reference/button-group.ts' : 'src/ariax/ui/button-group.tsx'),
      '@button-group-customizations': resolve(upstream ? 'reference/button-group-customizations.ts' : 'stories/button-group-customizations.ts'),
      '@table': resolve(upstream ? 'generated/reference/aria-nova/ui/table.tsx' : 'src/ariax/ui/table.tsx'),
      '@table-customizations': resolve(upstream ? 'reference/table-customizations.ts' : 'stories/table-customizations.ts'),
      '@textarea': resolve(upstream ? 'generated/reference/aria-nova/ui/textarea.tsx' : 'src/ariax/ui/textarea.tsx'),
      '@textarea-customizations': resolve(upstream ? 'reference/textarea-customizations.ts' : 'stories/textarea-customizations.ts'),
      '@input-customizations': resolve(upstream ? 'reference/input-customizations.ts' : 'stories/input-customizations.ts'),
      '@input-group': resolve(upstream ? 'generated/reference/aria-nova/ui/input-group.tsx' : 'src/ariax/ui/input-group.tsx'),
      '@input-group-customizations': resolve(upstream ? 'reference/input-group-customizations.ts' : 'stories/input-group-customizations.ts'),
      '@textarea': resolve(upstream ? 'generated/reference/aria-nova/ui/textarea.tsx' : 'src/ariax/ui/textarea.tsx'),
      '@textarea-customizations': resolve(upstream ? 'reference/textarea-customizations.ts' : 'stories/textarea-customizations.ts'),
      '@input': resolve(upstream ? 'generated/reference/aria-nova/ui/input.tsx' : 'src/ariax/ui/input.tsx'),
      '@aspect-ratio': resolve(upstream ? 'generated/reference/aria-nova/ui/aspect-ratio.tsx' : 'src/ariax/ui/aspect-ratio.tsx'),
      '@aspect-customizations': resolve(upstream ? 'reference/aspect-customizations.ts' : 'stories/aspect-customizations.ts'),
      '@badge': resolve(upstream ? 'generated/reference/aria-nova/ui/badge.tsx' : 'src/ariax/ui/badge.tsx'),
      '@badge-customizations': resolve(upstream ? 'reference/badge-customizations.ts' : 'stories/badge-customizations.ts'),
      '@alert': resolve(upstream ? 'generated/reference/aria-nova/ui/alert.tsx' : 'src/ariax/ui/alert.tsx'),
      '@alert-customizations': resolve(upstream ? 'reference/alert-customizations.ts' : 'stories/alert-customizations.ts'),
      '@kbd': resolve(upstream ? 'generated/reference/aria-nova/ui/kbd.tsx' : 'src/ariax/ui/kbd.tsx'),
      '@kbd-customizations': resolve(upstream ? 'reference/kbd-customizations.ts' : 'stories/kbd-customizations.ts'),
      '@radio-group': resolve(upstream ? 'generated/reference/aria-nova/ui/radio-group.tsx' : 'src/ariax/ui/radio-group.tsx'),
      '@tooltip': resolve(upstream ? 'generated/reference/aria-nova/ui/tooltip.tsx' : 'src/ariax/ui/tooltip.tsx'),
      '@tooltip-customizations': resolve(upstream ? 'reference/tooltip-customizations.ts' : 'stories/tooltip-customizations.ts'),
      '@skeleton': resolve(upstream ? 'reference/skeleton.tsx' : 'src/ariax/ui/skeleton.tsx'),
      '@skeleton-customizations': resolve(upstream ? 'reference/skeleton-customizations.ts' : 'stories/skeleton-customizations.ts'),
      '@separator': resolve(upstream ? 'generated/reference/aria-nova/ui/separator.tsx' : 'src/ariax/ui/separator.tsx'),
      '@checkbox': resolve(upstream ? 'generated/reference/aria-nova/ui/checkbox.tsx' : 'src/ariax/ui/checkbox.tsx'),
      '@native-select': resolve(upstream ? 'generated/reference/aria-nova/ui/native-select.tsx' : 'src/ariax/ui/native-select.tsx'),
      '@field': resolve(upstream ? 'generated/reference/aria-nova/ui/field.tsx' : 'src/ariax/ui/field.tsx'),
      '@label': resolve(upstream ? 'generated/reference/aria-nova/ui/label.tsx' : 'src/ariax/ui/label.tsx'),
      '@card-customizations': resolve(upstream ? 'reference/card-customizations.ts' : 'stories/card-customizations.ts'),
      '@card': resolve(upstream ? 'generated/reference/aria-nova/ui/card.tsx' : 'src/ariax/ui/card.tsx'),
      '@reference': resolve('generated/reference/aria-nova'),
      '@button': resolve(upstream ? 'reference/button.ts' : 'src/ariax/ui/button.tsx'),
      '@customizations': resolve(upstream ? 'reference/customizations.ts' : 'stories/customizations.ts'),
      '@implementation-css': resolve(upstream ? 'generated/reference/aria-nova/tailwind.css' : 'src/ariax/styles/entry.css'),
    };
    config.resolve.alias = [
      ...frameworkAliases,
      ...originalAliases,
      ...Object.entries(aliases).map(([find, replacement]) => ({ find, replacement })),
      ...(Array.isArray(inheritedAliases) ? inheritedAliases : Object.entries(inheritedAliases ?? {}).map(([find, replacement]) => ({ find, replacement }))),
      { find: /^@([a-z][a-z0-9-]*)-customizations$/, replacement: resolve(upstream ? 'reference' : 'stories') + '/$1-customizations.ts' },
      { find: /^@([a-z][a-z0-9-]*)$/, replacement: resolve(upstream ? 'generated/reference/aria-nova/ui' : 'src/ariax/ui') + '/$1.tsx' },
    ];
    config.plugins = [
      ...(upstream ? [tailwind()] : [react({ babel })]),
      ...(config.plugins ?? []),
      {
        name: 'ariax-base-css-fixture',
        config(config, { command }) {
          if (command !== 'build') return;
          const options = config.build?.rollupOptions;
          if (!options?.input) throw new Error('Storybook preview build input is missing');
          const fixture = resolve('tests/fixtures/base-css.html');
          const input = options.input;
          options.input = typeof input === 'string' ? [input, fixture]
            : Array.isArray(input) ? [...input, fixture]
            : { ...input, baseCss: fixture };
        },
      },
    ];
    if (!upstream) {
      config.css = { ...config.css, postcss: { plugins: [stylexPostcss({
        include: ['src/ariax/**/*.{ts,tsx}', 'stories/**/*.{ts,tsx}'],
        babelConfig: babel, useCSSLayers: false,
      })] } };
    }
    config.server ??= {};
    config.server.watch = { ...config.server.watch, ignored: ['**/test-results/**', '**/playwright-report/**', '**/dist/**', '**/.consumer-test*/**'] };
    config.cacheDir = resolve('node_modules/.vite-' + (upstream ? 'upstream' : 'stylex'));
    return config;
  },
};
export default config;
