import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { parse } from '@babel/parser';

export async function componentNames(root: string) {
  return (await readdir(resolve(root, 'registry/ariax/ui'))).filter(name => /^[a-z][a-z0-9-]*\.tsx$/.test(name)).map(name => name.slice(0, -4)).sort();
}

export async function componentSources(root: string, name: string, pins: Record<string, string>, extension = '.tsx') {
  const base = resolve(root, 'registry/ariax/ui');
  const files = new Set<string>();
  const dependencies = new Set<string>();
  const metadata = (await readdir(base)).filter(file => file.endsWith('.dependencies.json'));
  const names = new Set(await componentNames(root));
  for (const file of metadata) assert.ok(names.has(file.slice(0, -18)), `Extra UI dependency metadata: ${file}`);
  async function visit(path: string) {
    assert.ok(relative(base, path) && !relative(base, path).startsWith('..'), `UI import escapes source directory: ${path}`);
    if (files.has(path)) return;
    files.add(path);
    const declarationPath = path.replace(/\.tsx$/, '.dependencies.json');
    if (metadata.includes(relative(base, declarationPath))) {
      const declarations: unknown = JSON.parse(await readFile(declarationPath, 'utf8'));
      assert.ok(declarations && typeof declarations === 'object' && !Array.isArray(declarations), `Invalid UI dependency metadata: ${path}`);
      for (const [dependency, version] of Object.entries(declarations)) {
        assert.ok(typeof version === 'string' && /^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(version), `UI dependency must be exact: ${dependency}`);
        assert.equal(pins[dependency], version, `UI dependency differs from repository pin: ${dependency}`);
        dependencies.add(`${dependency}@${version}`);
      }
    }
    const ast = parse(await readFile(path, 'utf8'), { sourceType: 'module', plugins: ['typescript', 'jsx'] });
    for (const node of ast.program.body) {
      if (!('source' in node) || !node.source || node.source.type !== 'StringLiteral') continue;
      const specifier = node.source.value;
      if (specifier.startsWith('.')) {
        const target = resolve(dirname(path), specifier);
        const candidates = [target, `${target}.tsx`, `${target}.ts`, resolve(target, 'index.tsx'), resolve(target, 'index.ts')];
        const found = (await Promise.all(candidates.map(async candidate => (await stat(candidate).catch(() => undefined))?.isFile() ? candidate : undefined))).find(Boolean);
        assert.ok(found, `Missing relative import ${specifier} in ${path}`);
        await visit(found);
      } else {
        const dependency = specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];
        assert.ok(pins[dependency], `Pin imported package ${dependency} before registering ${name}`);
        dependencies.add(`${dependency}@${pins[dependency]}`);
      }
    }
  }
  await visit(resolve(base, `${name}${extension}`));
  return { dependencies: [...dependencies].sort(), files: [...files].sort().map(path => ({ path: relative(root, path), type: path.endsWith('.tsx') ? 'registry:ui' : 'registry:file', target: `@ui/${relative(base, path)}` })) };
}
