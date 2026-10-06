import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'node:path';
import stylex from '@stylexjs/unplugin';
import tailwind from '@tailwindcss/vite';

const upstream = process.env.ARIAX_IMPLEMENTATION === 'upstream';
const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  staticDirs: ['../public'],
  core: { disableTelemetry: true },
  async viteFinal(config, { configType }) {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@button-group': resolve(upstream ? 'reference/button-group.ts' : 'registry/ariax/ui/button-group.tsx'),
      '@button-group-customizations': resolve(upstream ? 'reference/button-group-customizations.ts' : 'stories/button-group-customizations.ts'),
      '@tooltip': resolve(upstream ? 'generated/reference/aria-nova/ui/tooltip.tsx' : 'registry/ariax/ui/tooltip.tsx'),
      '@tooltip-customizations': resolve(upstream ? 'reference/tooltip-customizations.ts' : 'stories/tooltip-customizations.ts'),
      '@kbd': resolve(upstream ? 'generated/reference/aria-nova/ui/kbd.tsx' : 'registry/ariax/ui/kbd.tsx'),
      '@kbd-customizations': resolve(upstream ? 'reference/kbd-customizations.ts' : 'stories/kbd-customizations.ts'),
      '@input-group-customizations': resolve(upstream ? 'reference/input-group-customizations.ts' : 'stories/input-group-customizations.ts'),
      '@input-group': resolve(upstream ? 'generated/reference/aria-nova/ui/input-group.tsx' : 'registry/ariax/ui/input-group.tsx'),
      '@input-customizations': resolve(upstream ? 'reference/input-customizations.ts' : 'stories/input-customizations.ts'),
      '@textarea': resolve(upstream ? 'generated/reference/aria-nova/ui/textarea.tsx' : 'registry/ariax/ui/textarea.tsx'),
      '@textarea-customizations': resolve(upstream ? 'reference/textarea-customizations.ts' : 'stories/textarea-customizations.ts'),
      '@input': resolve(upstream ? 'generated/reference/aria-nova/ui/input.tsx' : 'registry/ariax/ui/input.tsx'),
      '@skeleton': resolve(upstream ? 'reference/skeleton.tsx' : 'registry/ariax/ui/skeleton.tsx'),
      '@skeleton-customizations': resolve(upstream ? 'reference/skeleton-customizations.ts' : 'stories/skeleton-customizations.ts'),
      '@separator': resolve(upstream ? 'generated/reference/aria-nova/ui/separator.tsx' : 'registry/ariax/ui/separator.tsx'),
      '@reference': resolve('generated/reference/aria-nova'),
      '@button': resolve(upstream ? 'reference/button.ts' : 'registry/ariax/ui/button.tsx'),
      '@customizations': resolve(upstream ? 'reference/customizations.ts' : 'stories/customizations.ts'),
      '@implementation-css': resolve(upstream ? 'generated/reference/aria-nova/tailwind.css' : 'registry/ariax/styles/entry.css'),
    };
    config.plugins = [
      ...(upstream ? [tailwind()] : [stylex.vite({ useCSSLayers: false, runtimeInjection: configType === 'DEVELOPMENT' })]),
      ...(config.plugins ?? []),
    ];
    config.server ??= {};
    config.server.watch = { ...config.server.watch, ignored: ['**/test-results/**', '**/playwright-report/**', '**/dist/**', '**/.consumer-test*/**'] };
    config.cacheDir = resolve('node_modules/.vite-' + (upstream ? 'upstream' : 'stylex'));
    return config;
  },
};
export default config;
