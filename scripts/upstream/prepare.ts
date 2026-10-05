import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { root, rawRoot } from './common';
import { ensureRaw } from './ensure';

const config = await ensureRaw();
assert.equal(config.base, 'aria');
assert.equal(config.style, 'nova', 'Only the Nova adapters is currently implemented.');
const css = await readFile(resolve(rawRoot, 'apps/v4/registry/styles/style-nova.css'), 'utf8');
const utilities = new Map([...css.matchAll(/\.(cn-button[\w-]*)\s*\{\s*@apply\s+([^;]+);\s*\}/g)].map(m => [m[1], m[2].trim()]));
const original = await readFile(resolve(rawRoot, 'apps/v4/registry/bases/aria/ui/button.tsx'), 'utf8');
const expanded = original.replace(/\bcn-button[\w-]*\b/g, token => {
  const utility = utilities.get(token);
  assert.ok(utility, `Missing supported Nova definition: ${token}`);
  return utility;
});
const output = resolve(root, 'generated/reference/aria-nova');
await mkdir(output, { recursive: true });
async function writeChanged(name: string, text: string) {
  const path = resolve(output, name);
  if (await readFile(path, 'utf8').catch(() => null) !== text) {
    const temporary = `${path}.${process.pid}.tmp`;
    await writeFile(temporary, text);
    await rename(temporary, path);
  }
}
await writeChanged('button.tsx', expanded);
await writeChanged('separator.tsx', await readFile(resolve(rawRoot, 'apps/v4/registry/bases/aria/ui/separator.tsx'), 'utf8'));
await writeChanged('tailwind.css', await readFile(resolve(root, 'reference/tailwind.css'), 'utf8'));
console.log('Prepared generated/reference/aria-nova (Button, Separator); original source is unchanged.');
