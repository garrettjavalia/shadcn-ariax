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
  status: 'mapped' | 'unmapped';
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
      const render = properties(value).get('render');
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
    preview.counterparts = (mapping.get(preview.name) ?? []).map(match => ({ ...match, storyId: toId('original-parity-' + match.stylexStoryId, 'Original') }));
    preview.stylexStoryIds = preview.counterparts.map(match => match.stylexStoryId).sort();
    preview.status = preview.counterparts.length ? 'mapped' : 'unmapped';
  }
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
    const entries = [...new Map(previews.filter(preview => preview.component === component).map(preview => [preview.name, preview])).values()];
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
  // Each counterpart inherits the actual target CSF metadata and story decorators.
  // Canonical documentation previews remain separately registered for unmapped sources.
  for (const preview of new Map(previews.map(preview => [preview.name, preview])).values()) for (const match of preview.counterparts) {
    const file = resolve(output, 'parity-' + match.stylexStoryId + '.stories.tsx');
    const imported = preview.exportName === 'default' ? 'OfficialExample' : `{ ${preview.exportName} as OfficialExample }`;
    await writeGenerated(file, `import ${imported} from ${JSON.stringify(modulePath(file, resolve(repo, preview.source)))};\nimport fixtureMeta, { ${match.exportName} as fixtureStory } from ${JSON.stringify(modulePath(file, resolve(repo, match.metaSource)))};\nexport default { ...fixtureMeta, id: ${JSON.stringify('original-parity-' + match.stylexStoryId)}, title: ${JSON.stringify('Original counterparts/' + match.stylexStoryId)}, tags: ['original-parity'] };\nexport const Original = { ...fixtureStory, tags: ['original-parity'], name: ${JSON.stringify(preview.name)}, render: () => <OfficialExample /> };\n`);
  }
  const manifest: OriginalStoriesManifest = { version: 1, previews };
  await writeGenerated(resolve(output, 'public/manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  for (const file of await readdir(output)) {
    const path = resolve(output, file);
    if (file.endsWith('.stories.tsx') && !generated.has(path)) await rm(path);
  }
  console.log(`Generated ${new Set(previews.map(preview => preview.storyId)).size} original stories for ${previews.length} official documentation previews.`);
  return manifest;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await generateOriginalStories();
