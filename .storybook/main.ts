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
  async viteFinal(config) {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@skeleton': resolve(upstream ? 'reference/skeleton.tsx' : 'registry/ariax/ui/skeleton.tsx'),
      '@skeleton-customizations': resolve(upstream ? 'reference/skeleton-customizations.ts' : 'stories/skeleton-customizations.ts'),
      '@button': resolve(upstream ? 'reference/button.ts' : 'registry/ariax/ui/button.tsx'),
      '@customizations': resolve(upstream ? 'reference/customizations.ts' : 'stories/customizations.ts'),
      '@implementation-css': resolve(upstream ? 'generated/reference/aria-nova/tailwind.css' : 'registry/ariax/styles/entry.css'),
    };
    config.plugins = [
      ...(upstream ? [tailwind()] : [stylex.vite({ useCSSLayers: false, runtimeInjection: false })]),
      ...(config.plugins ?? []),
    ];
    config.server ??= {};
    config.server.watch = { ...config.server.watch, ignored: ['**/test-results/**', '**/playwright-report/**', '**/dist/**', '**/.consumer-test*/**'] };
    config.cacheDir = resolve('node_modules/.vite-' + (upstream ? 'upstream' : 'stylex'));
    return config;
  },
};
export default config;
