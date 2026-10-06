import { resolve } from 'node:path';

// Keep the pinned examples unchanged: resolve their official import namespace
// to the canonical files installed by the official CLI.
const reference = resolve('generated/reference/aria-nova');
export const originalAliases = [
  { find: /^@\/styles\/aria-nova\/ui(?:-rtl)?\/(.+)$/, replacement: `${reference}/ui/$1` },
  { find: /^@\/registry\/bases\/aria\/ui\/(.+)$/, replacement: `${reference}/ui/$1` },
];
