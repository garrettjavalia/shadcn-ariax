import assert from 'node:assert/strict';
import { readFile, readdir, mkdir, rm, writeFile, stat, rename } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { dirname, relative, resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from '@babel/parser';
import { toId, storyNameFromExport } from 'storybook/internal/csf';
import { root, rawRoot } from './common';

type Node = Record<string, unknown>;
const node = (value: unknown): Node | undefined => value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Node : undefined;
function unwrap(value: unknown): Node | undefined {
  const current = node(value);
  return current && ['TSAsExpression', 'TSSatisfiesExpression', 'TSNonNullExpression'].includes(String(current.type)) ? unwrap(current.expression) : current;
}
function properties(value: unknown): Map<string, Node> {
  const object = unwrap(value);
  return new Map(object?.type === 'ObjectExpression' ? (object.properties as unknown[]).flatMap(value => {
    const property = node(value);
    const key = node(property?.key);
    const name = key?.name ?? key?.value;
    return property?.type === 'ObjectProperty' && typeof name === 'string' ? [[name, unwrap(property.value)!] as const] : [];
  }) : []);
}
async function files(directory: string, suffix: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error: NodeJS.ErrnoException) => { if (error.code === 'ENOENT') return []; throw error; });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(resolve(directory, entry.name), suffix) : entry.name.endsWith(suffix) ? [resolve(directory, entry.name)] : []))).flat().sort();
}
const modulePath = (from: string, to: string) => { const path = relative(dirname(from), to).replaceAll('\\', '/'); return path.startsWith('.') ? path : './' + path; };

export type OriginalPreview = {
  document: string;
  line: number;
  component: string;
  name: string;
  source: string;
  exportName: string;
  storyId: string;
  stylexStoryIds: string[];
  status: 'mapped' | 'unmapped' | 'excluded';
  exclusionReason?: string;
  counterparts: { stylexStoryId: string; storyId: string; metaSource: string; exportName: string }[];
};
export type OriginalStoriesManifest = { version: 1; previews: OriginalPreview[] };

function componentExport(source: string, file: string): string {
  const ast = parse(source, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
  const names: string[] = [];
  for (const statement of ast.program.body) {
    if (statement.type === 'ExportDefaultDeclaration') return 'default';
    if (statement.type !== 'ExportNamedDeclaration') continue;
    const declaration = statement.declaration;
    if (declaration?.type === 'FunctionDeclaration' && declaration.id && /^[A-Z]/.test(declaration.id.name)) names.push(declaration.id.name);
    if (declaration?.type === 'VariableDeclaration') for (const binding of declaration.declarations) if (binding.id.type === 'Identifier' && /^[A-Z]/.test(binding.id.name)) names.push(binding.id.name);
  }
  const expected = basename(file, '.tsx').split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('');
  if (names.includes(expected)) return expected;
  assert.equal(names.length, 1, `Cannot identify one original preview component in ${file}: ${names.join(', ')}`);
  return names[0];
}

/** Only map renders that directly use a fixture corresponding to an official source. */
async function fixtureMappings(repo: string, names: Set<string>) {
  const mapping = new Map<string, { stylexStoryId: string; metaSource: string; exportName: string }[]>();
  const metas = new Map<string, string>();
  for (const file of await files(resolve(repo, 'stories'), '.stories.tsx')) {
    const ast = parse(await readFile(file, 'utf8'), { sourceType: 'module', plugins: ['typescript', 'jsx'] });
    const imports = new Map<string, string>();
    const declarations = new Map<string, Node>();
    const exports = new Map<string, Node>();
    let meta: Node | undefined;
    for (const statement of ast.program.body) {
      if (statement.type === 'ImportDeclaration' && statement.source.value.startsWith('.')) for (const specifier of statement.specifiers) {
        if (specifier.type === 'ImportNamespaceSpecifier') continue;
        const path = resolve(dirname(file), statement.source.value);
        const filename = basename(path).replace(/\.[jt]sx?$/, '');
        const parent = basename(dirname(path)).replace(/-examples$/, '');
        const imported = specifier.type === 'ImportSpecifier' ? (specifier.imported.type === 'Identifier' ? specifier.imported.name : specifier.imported.value) : '';
        const exportedName = imported.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        const original = [`${parent}-${exportedName}`, filename, `${parent}-${filename}`].find(name => names.has(name));
        if (original) imports.set(specifier.local.name, original);
      }
      const declaration = statement.type === 'ExportNamedDeclaration' ? statement.declaration : statement;
      if (declaration?.type === 'VariableDeclaration') for (const binding of declaration.declarations) if (binding.id.type === 'Identifier') {
        const value = unwrap(binding.init);
        if (value) { declarations.set(binding.id.name, value); if (statement.type === 'ExportNamedDeclaration') exports.set(binding.id.name, value); }
      }
      if (statement.type === 'ExportDefaultDeclaration') meta = statement.declaration.type === 'Identifier' ? declarations.get(statement.declaration.name) : unwrap(statement.declaration);
    }
    const fields = properties(meta);
    const title = fields.get('title')?.value;
    const id = fields.get('id')?.value;
    if (typeof title !== 'string') continue;
    const titleComponent = title.split('/').at(-1)!.toLowerCase().replaceAll(/[^a-z0-9]/g, '');
    const sourceComponent = [...names].map(name => name.slice(0, name.lastIndexOf('-'))).find(component => component.replaceAll('-', '') === titleComponent);
    if (sourceComponent) metas.set(sourceComponent, file);
    for (const [exportName, value] of exports) {
      const storyFields = properties(value);
      const explicit = properties(storyFields.get('parameters')).get('originalExample')?.value;
      if (explicit !== undefined) {
        assert.ok(typeof explicit === 'string' && names.has(explicit), `Unknown official example ${String(explicit)} in ${file}#${exportName}`);
        const matches = mapping.get(explicit) ?? [];
        matches.push({ stylexStoryId: toId(typeof id === 'string' ? id : title, storyNameFromExport(exportName)), metaSource: relative(repo, file), exportName });
        mapping.set(explicit, matches);
        continue;
      }
      const render = storyFields.get('render');
      if (!render || !['ArrowFunctionExpression', 'FunctionExpression'].includes(String(render.type))) continue;
      const body = unwrap(render.body);
      const opening = node(body?.openingElement);
      const jsxName = node(opening?.name);
      if (body?.type !== 'JSXElement' || jsxName?.type !== 'JSXIdentifier' || (opening?.attributes as unknown[]).length !== 0) continue;
      if ((body.children as unknown[]).some(child => node(child)?.type !== 'JSXText' || String(node(child)?.value).trim())) continue;
      const original = imports.get(String(jsxName.name));
      if (!original) continue;
      const matches = mapping.get(original) ?? [];
      matches.push({ stylexStoryId: toId(typeof id === 'string' ? id : title, storyNameFromExport(exportName)), metaSource: relative(repo, file), exportName });
      mapping.set(original, matches);
    }
  }
  return { mapping, metas };
}

export async function generateOriginalStories(repo = root, upstream = rawRoot): Promise<OriginalStoriesManifest> {
  const docs = resolve(upstream, 'apps/v4/content/docs/components/aria');
  const examples = resolve(upstream, 'apps/v4/examples/aria');
  const previews: OriginalPreview[] = [];
  for (const document of await files(docs, '.mdx')) {
    const content = await readFile(document, 'utf8');
    for (const match of content.matchAll(/<ComponentPreview\b[^>]*>/g)) {
      const name = /\bname="([^"]+)"/.exec(match[0])?.[1];
      assert.ok(name && /^[a-z][a-z0-9-]*$/.test(name), `Unsupported ComponentPreview name in ${document}: ${match[0]}`);
      const source = resolve(examples, name + '.tsx');
      assert.ok((await stat(source).catch(() => undefined))?.isFile(), `Missing official preview source: ${source}`);
      const component = basename(document, '.mdx');
      const exportName = componentExport(await readFile(source, 'utf8'), source);
      previews.push({ document: relative(repo, document), line: content.slice(0, match.index).split('\n').length, component, name, source: relative(repo, source), exportName, storyId: toId(`original-docs-${component}`, name), stylexStoryIds: [], status: 'unmapped', counterparts: [] });
    }
  }
  assert.ok(previews.length, 'No official documentation previews found');
  const { mapping, metas } = await fixtureMappings(repo, new Set(previews.map(preview => preview.name)));
  for (const preview of previews) {
    preview.counterparts = (mapping.get(preview.name) ?? []).map(match => ({ ...match, storyId: match.stylexStoryId }));
    preview.stylexStoryIds = preview.counterparts.map(match => match.stylexStoryId).sort();
    preview.status = preview.counterparts.length ? 'mapped' : 'unmapped';
    if (preview.counterparts.length) preview.storyId = preview.counterparts[0].storyId;
  }
  const exclusions: Record<string, string> = JSON.parse(await readFile(resolve(repo, 'upstream/original-exceptions.json'), 'utf8'));
  for (const [name, reason] of Object.entries(exclusions)) {
    assert.ok(typeof reason === 'string' && reason.trim(), `Missing exclusion reason for ${name}`);
    const entries = previews.filter(preview => preview.name === name);
    assert.ok(entries.length, `Stale official example exclusion: ${name}`);
    for (const preview of entries) {
      assert.equal(preview.status, 'unmapped', `Remove the exclusion for connected example ${name}`);
      preview.status = 'excluded';
      preview.exclusionReason = reason;
    }
  }
  const missing = previews.filter(preview => preview.status === 'unmapped');
  assert.equal(missing.length, 0, `Official examples need a counterpart or a documented exception: ${missing.map(preview => preview.name).join(', ')}`);
  const output = resolve(repo, 'generated/original-stories');
  await mkdir(resolve(output, 'public'), { recursive: true });
  const generated = new Set<string>();
  const writeGenerated = async (file: string, content: string) => {
    generated.add(file);
    const previous = await readFile(file, 'utf8').catch((error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return undefined;
      throw error;
    });
    if (previous === content) return;
    // Preserve the live preview index on unchanged runs and never expose partial source.
    const temporary = `${file}.${randomUUID()}.tmp`;
    try {
      await writeFile(temporary, content);
      await rename(temporary, file);
    } finally {
      await rm(temporary, { force: true });
    }
  };
  for (const component of new Set(previews.map(preview => preview.component))) {
    const entries = [...new Map(previews.filter(preview => preview.component === component && preview.status !== 'mapped').map(preview => [preview.name, preview])).values()];
    if (!entries.length) continue;
    const file = resolve(output, component + '.stories.tsx');
    const meta = metas.get(component);
    const imports = entries.map((preview, index) => `import ${preview.exportName === 'default' ? `Original${index}` : `{ ${preview.exportName} as Original${index} }`} from ${JSON.stringify(modulePath(file, resolve(repo, preview.source)))};`).join('\n');
    const harness = meta ? `import fixtureMeta from ${JSON.stringify(modulePath(file, meta))};\n` : '';
    const fallbackDecorator = '[Story => <main id="parity-root"><Story /></main>]';
    const decorators = meta ? `fixtureMeta.decorators ?? ${fallbackDecorator}` : fallbackDecorator;
    const identifier = (name: string) => 'Original' + name.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('');
    const stories = entries.map((preview, index) => `export const ${identifier(preview.name)} = { name: ${JSON.stringify(preview.name)}, parameters: { originalSource: ${JSON.stringify(preview.source)}, stylexStoryIds: ${JSON.stringify(preview.stylexStoryIds)} }, render: () => <Original${index} /> };`).join('\n');
    // Explicit story IDs are derived from exported identifiers, not display names.
    for (const preview of entries) for (const occurrence of previews.filter(item => item.component === component && item.name === preview.name)) occurrence.storyId = toId(`original-docs-${component}`, storyNameFromExport(identifier(preview.name)));
    await writeGenerated(file, `${imports}\n${harness}export default { id: ${JSON.stringify(`original-docs-${component}`)}, title: ${JSON.stringify(`Original documentation/${component}`)}, tags: ['original-documentation'], decorators: ${decorators} };\n${stories}\n`);
  }
  // Replace the upstream registration of a mapped fixture module with one proxy.
  // Keep its public IDs/decorators; render the untouched official example exactly once.
  const modules = new Map<string, Map<string, OriginalPreview>>();
  for (const preview of previews) for (const counterpart of preview.counterparts) {
    const entries = modules.get(counterpart.metaSource) ?? new Map();
    const previous = entries.get(counterpart.exportName);
    assert.ok(!previous || previous.name === preview.name, `Ambiguous original for ${counterpart.stylexStoryId}`);
    entries.set(counterpart.exportName, preview);
    modules.set(counterpart.metaSource, entries);
  }
  for (const [source, matches] of modules) {
    const fixtureSource = await readFile(resolve(repo, source), 'utf8');
    const ast = parse(fixtureSource, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
    const exports = ast.program.body.flatMap(statement => {
      if (statement.type !== 'ExportNamedDeclaration') return [];
      const declaration = statement.declaration;
      if (declaration?.type === 'VariableDeclaration') return declaration.declarations.flatMap(binding => binding.id.type === 'Identifier' ? [binding.id.name] : []);
      if (declaration?.type === 'FunctionDeclaration' && declaration.id) return [declaration.id.name];
      return [];
    });
    const file = resolve(output, 'linked-' + source.replaceAll(/[/.]/g, '-') + '.stories.tsx');
    const lines = [`import fixtureMeta, * as fixtures from ${JSON.stringify(modulePath(file, resolve(repo, source)))};`];
    for (const [name, preview] of matches) lines.push(`import ${preview.exportName === 'default' ? '__Official' + name : `{ ${preview.exportName} as __Official${name} }`} from ${JSON.stringify(modulePath(file, resolve(repo, preview.source)))};`);
    // CSF needs literal title/id metadata, even though the rest comes from the fixture.
    const fixtureAst = ast.program.body;
    const declarations = new Map<string, Node>();
    let meta: Node | undefined;
    for (const statement of fixtureAst) {
      const declaration = statement.type === 'ExportNamedDeclaration' ? statement.declaration : statement;
      if (declaration?.type === 'VariableDeclaration') for (const binding of declaration.declarations) if (binding.id.type === 'Identifier') declarations.set(binding.id.name, unwrap(binding.init)!);
      if (statement.type === 'ExportDefaultDeclaration') meta = statement.declaration.type === 'Identifier' ? declarations.get(statement.declaration.name) : unwrap(statement.declaration);
    }
    const fields = properties(meta);
    const title = fields.get('title')?.value;
    const id = fields.get('id')?.value;
    const staticMeta = ['tags', 'includeStories', 'excludeStories'].flatMap(key => { const field = fields.get(key); return field ? [`${key}: ${fixtureSource.slice(Number(field.start), Number(field.end))}`] : []; }).join(', ');
    lines.push(`export default { ...fixtureMeta, ${staticMeta}, title: ${JSON.stringify(title)}, id: ${JSON.stringify(typeof id === 'string' ? id : toId(String(title)))} };`);
    for (const name of exports) {
      const field = properties(declarations.get(name)).get('tags');
      const tags = field?.type === 'ArrayExpression' ? (field.elements as unknown[]).map(value => node(value)?.value) : [];
      if (matches.has(name)) tags.push('original-parity');
      if (!matches.has(name) && !declarations.has(name)) { lines.push(`export const ${name} = fixtures.${name};`); continue; }
      lines.push(`export const ${name} = { ...fixtures.${name}, tags: ${JSON.stringify(tags)}${matches.has(name) ? `, render: () => <__Official${name} />` : ''} };`);
    }
    await writeGenerated(file, lines.join('\n') + '\n');
  }
  const manifest: OriginalStoriesManifest = { version: 1, previews };
  await writeGenerated(resolve(output, 'public/manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  for (const file of await readdir(output)) {
    const path = resolve(output, file);
    if (file.endsWith('.stories.tsx') && !generated.has(path)) await rm(path);
  }
  console.log(`Generated ${new Set(previews.map(preview => preview.name)).size} original stories for ${previews.length} official documentation previews.`);
  return manifest;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await generateOriginalStories();
