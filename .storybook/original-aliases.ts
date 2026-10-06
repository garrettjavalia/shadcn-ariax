import { resolve } from 'node:path';

// Keep the pinned examples unchanged: resolve their official import namespace
// to the canonical files installed by the official CLI.
const pinned = resolve('generated/upstream/shadcn/apps/v4');
const helpers = {
  '@/components/language-selector':'components/language-selector.tsx',
  '@/components/markdown':'components/markdown.tsx',
  '@/components/message-animated':'components/message-animated.tsx',
  '@/hooks/use-copy-to-clipboard':'hooks/use-copy-to-clipboard.ts',
  '@/hooks/use-media-query':'hooks/use-media-query.tsx',
  '@/hooks/use-mobile':'hooks/use-mobile.ts',
  '@/lib/ai':'lib/ai.ts',
  '@/lib/message-animations':'lib/message-animations.ts',
  '@/registry/icons/__lucide__':'registry/icons/__lucide__.ts',
};
const reference = resolve('generated/reference/aria-nova');
export const originalAliases = [
  { find: /^@\/styles\/base-nova\/ui\/(.+)$/, replacement: resolve('generated/reference/base-nova/ui') + '/$1' },
  { find: /^@\/styles\/radix-rhea\/ui\/(.+)$/, replacement: resolve('generated/reference/radix-rhea/ui') + '/$1' },
  ...Object.entries(helpers).map(([find, path]) => ({ find, replacement: resolve(pinned, path) })),
  { find: /^@\/styles\/aria-(?:nova|rhea)\/ui(?:-rtl)?\/(.+)$/, replacement: `${reference}/ui/$1` },
  { find: /^@\/registry\/bases\/aria\/ui\/(.+)$/, replacement: `${reference}/ui/$1` },
];
