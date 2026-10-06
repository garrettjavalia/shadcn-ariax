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
      '@avatar': resolve(upstream ? 'generated/reference/aria-nova/ui/avatar.tsx' : 'registry/ariax/ui/avatar.tsx'),
      '@avatar-customizations': resolve(upstream ? 'reference/avatar-customizations.ts' : 'stories/avatar-customizations.ts'),
      '@dropdown-menu': resolve(upstream ? 'generated/reference/aria-nova/ui/dropdown-menu.tsx' : 'registry/ariax/ui/dropdown-menu.tsx'),
      '@dropdown-menu-customizations': resolve(upstream ? 'reference/dropdown-menu-customizations.ts' : 'stories/dropdown-menu-customizations.ts'),
      '@switch': resolve(upstream ? 'generated/reference/aria-nova/ui/switch.tsx' : 'registry/ariax/ui/switch.tsx'),
      '@button-group': resolve(upstream ? 'reference/button-group.ts' : 'registry/ariax/ui/button-group.tsx'),
      '@button-group-customizations': resolve(upstream ? 'reference/button-group-customizations.ts' : 'stories/button-group-customizations.ts'),
      '@table': resolve(upstream ? 'generated/reference/aria-nova/ui/table.tsx' : 'registry/ariax/ui/table.tsx'),
      '@table-customizations': resolve(upstream ? 'reference/table-customizations.ts' : 'stories/table-customizations.ts'),
      '@textarea': resolve(upstream ? 'generated/reference/aria-nova/ui/textarea.tsx' : 'registry/ariax/ui/textarea.tsx'),
      '@textarea-customizations': resolve(upstream ? 'reference/textarea-customizations.ts' : 'stories/textarea-customizations.ts'),
      '@input-customizations': resolve(upstream ? 'reference/input-customizations.ts' : 'stories/input-customizations.ts'),
      '@input-group': resolve(upstream ? 'generated/reference/aria-nova/ui/input-group.tsx' : 'registry/ariax/ui/input-group.tsx'),
      '@input-group-customizations': resolve(upstream ? 'reference/input-group-customizations.ts' : 'stories/input-group-customizations.ts'),
      '@textarea': resolve(upstream ? 'generated/reference/aria-nova/ui/textarea.tsx' : 'registry/ariax/ui/textarea.tsx'),
      '@textarea-customizations': resolve(upstream ? 'reference/textarea-customizations.ts' : 'stories/textarea-customizations.ts'),
      '@input': resolve(upstream ? 'generated/reference/aria-nova/ui/input.tsx' : 'registry/ariax/ui/input.tsx'),
      '@aspect-ratio': resolve(upstream ? 'generated/reference/aria-nova/ui/aspect-ratio.tsx' : 'registry/ariax/ui/aspect-ratio.tsx'),
      '@aspect-customizations': resolve(upstream ? 'reference/aspect-customizations.ts' : 'stories/aspect-customizations.ts'),
      '@badge': resolve(upstream ? 'generated/reference/aria-nova/ui/badge.tsx' : 'registry/ariax/ui/badge.tsx'),
      '@badge-customizations': resolve(upstream ? 'reference/badge-customizations.ts' : 'stories/badge-customizations.ts'),
      '@alert': resolve(upstream ? 'generated/reference/aria-nova/ui/alert.tsx' : 'registry/ariax/ui/alert.tsx'),
      '@alert-customizations': resolve(upstream ? 'reference/alert-customizations.ts' : 'stories/alert-customizations.ts'),
      '@kbd': resolve(upstream ? 'generated/reference/aria-nova/ui/kbd.tsx' : 'registry/ariax/ui/kbd.tsx'),
      '@kbd-customizations': resolve(upstream ? 'reference/kbd-customizations.ts' : 'stories/kbd-customizations.ts'),
      '@radio-group': resolve(upstream ? 'generated/reference/aria-nova/ui/radio-group.tsx' : 'registry/ariax/ui/radio-group.tsx'),
      '@tooltip': resolve(upstream ? 'generated/reference/aria-nova/ui/tooltip.tsx' : 'registry/ariax/ui/tooltip.tsx'),
      '@tooltip-customizations': resolve(upstream ? 'reference/tooltip-customizations.ts' : 'stories/tooltip-customizations.ts'),
      '@skeleton': resolve(upstream ? 'reference/skeleton.tsx' : 'registry/ariax/ui/skeleton.tsx'),
      '@skeleton-customizations': resolve(upstream ? 'reference/skeleton-customizations.ts' : 'stories/skeleton-customizations.ts'),
      '@separator': resolve(upstream ? 'generated/reference/aria-nova/ui/separator.tsx' : 'registry/ariax/ui/separator.tsx'),
      '@checkbox': resolve(upstream ? 'generated/reference/aria-nova/ui/checkbox.tsx' : 'registry/ariax/ui/checkbox.tsx'),
      '@native-select': resolve(upstream ? 'generated/reference/aria-nova/ui/native-select.tsx' : 'registry/ariax/ui/native-select.tsx'),
      '@field': resolve(upstream ? 'generated/reference/aria-nova/ui/field.tsx' : 'registry/ariax/ui/field.tsx'),
      '@label': resolve(upstream ? 'generated/reference/aria-nova/ui/label.tsx' : 'registry/ariax/ui/label.tsx'),
      '@card-customizations': resolve(upstream ? 'reference/card-customizations.ts' : 'stories/card-customizations.ts'),
      '@card': resolve(upstream ? 'generated/reference/aria-nova/ui/card.tsx' : 'registry/ariax/ui/card.tsx'),
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
