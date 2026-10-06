import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { registrySchema } from 'shadcn/schema';

export async function collectInstallFixtures(root: string) {
  const catalog = registrySchema.parse(JSON.parse(await readFile(resolve(root, 'public/registry.json'), 'utf8')));
  const items = catalog.items.filter(item => item.type === 'registry:ui');
  assert.ok(items.length, 'Registry has no installable UI items');
  assert.equal(new Set(items.map(item => item.name)).size, items.length, 'Duplicate registry UI item');
  const fixtures = new Map<string, string>();
  async function visit(directory: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile() && entry.name.endsWith('.tsx')) {
        const name = basename(entry.name, '.tsx');
        assert.ok(!fixtures.has(name), `Duplicate install fixture: ${name}`);
        fixtures.set(name, path);
      }
    }
  }
  await visit(resolve(root, 'tests/install'));
  const names = new Set(items.map(item => item.name));
  for (const name of fixtures.keys()) assert.ok(names.has(name), `Extra install fixture: ${name}`);
  return items.map(item => {
    const fixture = fixtures.get(item.name);
    assert.ok(fixture, `Missing install fixture: ${item.name}`);
    const component = item.files?.find(file => file.type === 'registry:ui' && file.target === `@ui/${item.name}.tsx`);
    assert.ok(component, `Missing primary UI target for ${item.name}`);
    return { item, fixture, alias: `@${item.name}`, installedPath: `src/components/ui/${item.name}.tsx` };
  }).sort((a, b) => a.item.name.localeCompare(b.item.name));
}
