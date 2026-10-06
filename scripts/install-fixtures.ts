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
  const dependencyFiles = new Map<string, string>();
  async function visit(directory: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile() && entry.name.endsWith('.dependencies.json')) {
        const name = basename(entry.name, '.dependencies.json');
        assert.ok(!dependencyFiles.has(name), `Duplicate install fixture dependencies: ${name}`);
        dependencyFiles.set(name, path);
      } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
        const name = basename(entry.name, '.tsx');
        assert.ok(!fixtures.has(name), `Duplicate install fixture: ${name}`);
        fixtures.set(name, path);
      }
    }
  }
  await visit(resolve(root, 'tests/install'));
  const names = new Set(items.map(item => item.name));
  for (const name of fixtures.keys()) assert.ok(names.has(name), `Extra install fixture: ${name}`);
  for (const name of dependencyFiles.keys()) assert.ok(names.has(name) && fixtures.has(name), `Extra install fixture dependencies: ${name}`);
  const dependencies = new Map<string, Record<string, string>>();
  if (dependencyFiles.size) {
    const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
    for (const [component, path] of dependencyFiles) {
      const declarations: unknown = JSON.parse(await readFile(path, 'utf8'));
      assert.ok(declarations && typeof declarations === 'object' && !Array.isArray(declarations), `Invalid install fixture dependencies: ${component}`);
      for (const [name, version] of Object.entries(declarations)) {
        assert.ok(typeof version === 'string' && /^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(version), `Fixture dependency must be exact: ${name}`);
        assert.equal(version, pkg.dependencies?.[name] ?? pkg.devDependencies?.[name], `Fixture dependency differs from repository pin: ${name}`);
      }
      dependencies.set(component, declarations as Record<string, string>);
    }
  }
  return items.map(item => {
    const fixture = fixtures.get(item.name);
    assert.ok(fixture, `Missing install fixture: ${item.name}`);
    const component = item.files?.find(file => file.type === 'registry:ui' && file.target === `@ui/${item.name}.tsx`);
    assert.ok(component, `Missing primary UI target for ${item.name}`);
    return { item, fixture, alias: `@${item.name}`, installedPath: `src/components/ui/${item.name}.tsx`, dependencies: dependencies.get(item.name) ?? {} };
  }).sort((a, b) => a.item.name.localeCompare(b.item.name));
}
