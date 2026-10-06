import { createServer } from 'node:http';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, relative, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { RegistryItem } from 'shadcn/schema';
import { createStyleMap, transformStyle } from 'shadcn/utils';
import { root, rawRoot, type Source } from './common';

export async function referenceInputs(config: Source) {
  const selection: { components: string[] } = JSON.parse(await readFile(resolve(root, 'upstream/reference.json'), 'utf8'));
  assert.ok(selection.components.length && selection.components.every(name => /^[a-z][a-z0-9-]*$/.test(name)), 'Invalid reference components');
  const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
  const installed = JSON.parse(await readFile(resolve(root, 'node_modules/shadcn/package.json'), 'utf8'));
  assert.equal(pkg.devDependencies.shadcn, installed.version, 'Install the pinned shadcn CLI before preparing references');
  return { version: 5, rtl: true, source: config, components: selection.components, cli: installed.version, dependencies: pkg.dependencies, devDependencies: pkg.devDependencies };
}

export async function buildReference(directory: string, inputs: Awaited<ReturnType<typeof referenceInputs>>) {
  const { source: config } = inputs;
  const base = resolve(rawRoot, `apps/v4/registry/bases/${config.base}`);
  const catalog = new Map<string, RegistryItem>();
  for (const group of await readdir(base, { withFileTypes: true })) {
    if (!group.isDirectory()) continue;
    const registry = resolve(base, group.name, '_registry.ts');
    try { await readFile(registry); } catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') continue; throw error; }
    const exported = await import(pathToFileURL(registry).href);
    for (const item of Object.values(exported).flat() as RegistryItem[]) {
      assert.ok(item.name && !catalog.has(item.name), `Duplicate or invalid registry item: ${item.name}`);
      catalog.set(item.name, item);
    }
  }
  const selected = new Map<string, RegistryItem>();
  function visit(name: string) {
    if (selected.has(name)) return;
    const item = catalog.get(name);
    assert.ok(item, `Pinned registry has no local item: ${name}`);
    selected.set(name, item);
    for (const dependency of item.registryDependencies ?? []) visit(dependency);
  }
  inputs.components.forEach(visit);
  const styleMap = createStyleMap(await readFile(resolve(rawRoot, `apps/v4/registry/styles/style-${config.style}.css`), 'utf8'));
  const items: RegistryItem[] = [];
  for (const item of selected.values()) {
    // Installation uses only dependencies already pinned in the development project.
    // Preserve official metadata; refuse an implicit network/package update.
    for (const dependency of [...item.dependencies ?? [], ...item.devDependencies ?? []]) {
      const name = dependency.startsWith('@') ? dependency.split('@').slice(0, 2).join('@') : dependency.split('@')[0];
      const pinned = inputs.dependencies[name] || inputs.devDependencies[name];
      assert.ok(pinned, `Pin ${dependency} in package.json before preparing ${item.name}`);
      const requested = dependency.slice(name.length).replace(/^@/, '');
      assert.ok(!requested || requested === pinned, `Reference requires ${dependency}; pin that exact version before preparing ${item.name}`);
    }
    const files = [];
    for (const file of item.files ?? []) {
      const path = resolve(base, file.path);
      assert.ok(!relative(base, path).startsWith('..') && relative(base, path), `Unsafe registry file: ${file.path}`);
      const target = resolve(directory, 'source', file.path);
      await mkdir(dirname(target), { recursive: true });
      const source = await readFile(path, 'utf8');
      const styled = /\.[cm]?[jt]sx?$/.test(file.path) ? await transformStyle(source, { styleMap }) : source;
      // The official build-registry pipeline relocates this import namespace too.
      await writeFile(target, styled.split(`@/registry/bases/${config.base}/`).join(`@/registry/${config.base}-${config.style}/`));
      files.push({ ...file, path: relative(directory, target) });
    }
    items.push({ ...item, files, registryDependencies: item.registryDependencies?.map(name => resolve(directory, 'registry', `${name}.json`)) });
  }
  await writeFile(resolve(directory, 'registry.json'), JSON.stringify({ name: 'pinned-shadcn-reference', homepage: 'https://ui.shadcn.com', items }));
  await writeFile(resolve(directory, 'package.json'), JSON.stringify({ name: 'ariax-reference', private: true, type: 'module', dependencies: inputs.dependencies, devDependencies: inputs.devDependencies }));
  await writeFile(resolve(directory, 'tsconfig.json'), JSON.stringify({ compilerOptions: { jsx: 'react-jsx', baseUrl: '.', paths: { '@reference/*': ['./*'] } } }));
  await writeFile(resolve(directory, 'cli.css'), '');
  await writeFile(resolve(directory, 'tailwind.css'), await readFile(resolve(root, 'reference/tailwind.css'), 'utf8'));
  await writeFile(resolve(directory, 'components.json'), JSON.stringify({ $schema: 'https://ui.shadcn.com/schema.json', style: `${config.base}-${config.style}`, rtl: inputs.rtl, rsc: false, tsx: true, tailwind: { config: '', css: 'cli.css', baseColor: 'neutral', cssVariables: true }, aliases: { components: '@reference/components', ui: '@reference/ui', utils: '@reference/lib/utils', lib: '@reference/lib', hooks: '@reference/hooks' } }));
  const cli = resolve(root, 'node_modules/shadcn/dist/index.js');
  // CLI add also requests base-color metadata. Serve the committed response locally;
  // unknown endpoints fail closed instead of falling through to the live registry.
  const neutral = await readFile(resolve(rawRoot, 'apps/v4/public/r/colors/neutral.json'));
  const registry = createServer((request, response) => {
    if (request.url !== '/colors/neutral.json') { response.writeHead(404).end(); return; }
    response.writeHead(200, { 'Content-Type': 'application/json' }).end(neutral);
  });
  await new Promise<void>((done, fail) => { registry.once('error', fail); registry.listen(0, '127.0.0.1', done); });
  const address = registry.address();
  assert.ok(address && typeof address !== 'string');
  const registryURL = `http://127.0.0.1:${address.port}`;
  async function run(args: string[]) {
    await new Promise<void>((done, fail) => {
      const child = spawn(process.execPath, [cli, ...args, '--cwd', directory], { cwd: directory, env: { ...process.env, CI: 'true', npm_config_offline: 'true', REGISTRY_URL: registryURL }, timeout: 120_000 });
      let output = '';
      child.stdout.on('data', data => { output += data; }); child.stderr.on('data', data => { output += data; });
      child.on('error', fail);
      child.on('close', code => code === 0 ? done() : fail(new Error(`Official CLI failed (${code}): ${output}`)));
    });
  }
  try {
    await run(['build', resolve(directory, 'registry.json'), '--output', resolve(directory, 'registry')]);
    await run(['add', ...inputs.components.map(name => resolve(directory, 'registry', `${name}.json`)), '--yes', '--overwrite']);
  } finally {
    await new Promise<void>((done, fail) => registry.close(error => error ? fail(error) : done()));
  }
  const installedFiles = ['package.json', 'tsconfig.json', 'components.json', 'cli.css'];
  for (const group of ['ui', 'lib', 'hooks', 'components']) {
    async function collect(path: string) {
      for (const entry of await readdir(path, { withFileTypes: true }).catch(() => [])) {
        const file = resolve(path, entry.name);
        if (entry.isDirectory()) await collect(file); else installedFiles.push(relative(directory, file));
      }
    }
    await collect(resolve(directory, group));
  }
  assert.ok(installedFiles.length > 4, 'Official CLI installed no reference files');
  return installedFiles;
}
