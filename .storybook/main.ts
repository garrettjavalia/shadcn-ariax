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
      '@skeleton': resolve(upstream ? 'reference/skeleton.tsx' : 'registry/ariax/ui/skeleton.tsx'),
      '@skeleton-customizations': resolve(upstream ? 'reference/skeleton-customizations.ts' : 'stories/skeleton-customizations.ts'),
      '@table-customizations': resolve(upstream ? 'reference/table-customizations.ts' : 'stories/table-customizations.ts'),
      '@dropdown-menu-customizations': resolve(upstream ? 'reference/dropdown-menu-customizations.ts' : 'stories/dropdown-menu-customizations.ts'),
      '@dropdown-menu': resolve(upstream ? 'generated/reference/aria-nova/ui/dropdown-menu.tsx' : 'registry/ariax/ui/dropdown-menu.tsx'),
      '@avatar': resolve(upstream ? 'generated/reference/aria-nova/ui/avatar.tsx' : 'registry/ariax/ui/avatar.tsx'),
      '@avatar-customizations': resolve(upstream ? 'reference/avatar-customizations.ts' : 'stories/avatar-customizations.ts'),
      '@table': resolve(upstream ? 'generated/reference/aria-nova/ui/table.tsx' : 'registry/ariax/ui/table.tsx'),
      '@separator': resolve(upstream ? 'generated/reference/aria-nova/ui/separator.tsx' : 'registry/ariax/ui/separator.tsx'),
      '@checkbox': resolve(upstream ? 'generated/reference/aria-nova/ui/checkbox.tsx' : 'registry/ariax/ui/checkbox.tsx'),
      '@label': resolve(upstream ? 'generated/reference/aria-nova/ui/label.tsx' : 'registry/ariax/ui/label.tsx'),
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
