import {fileURLToPath} from 'node:url';

export const frameworkAliases = [
  {find:'next/image',replacement:fileURLToPath(new URL('../reference/framework/image.tsx',import.meta.url))},
  {find:'next/link',replacement:fileURLToPath(new URL('../reference/framework/link.tsx',import.meta.url))},
  {find:'next/font/google',replacement:fileURLToPath(new URL('../reference/framework/google-fonts.ts',import.meta.url))},
];
