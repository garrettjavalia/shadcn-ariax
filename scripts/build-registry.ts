import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { registrySchema, registryItemSchema } from 'shadcn/schema';
import { componentNames as discoverComponents, componentSources } from './registry-sources';
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const componentNames = await discoverComponents(process.cwd());
const recipeNames = (await readdir('registry/ariax/ui')).filter(name => /^[a-z][a-z0-9-]*\.recipe\.stylex\.ts$/.test(name)).map(name => name.slice(0, -17)).sort();
const sharedFiles = [
  { path: 'LICENSE', type: 'registry:file', target: '@ui/ariax/LICENSE' },
  { path: 'registry/ariax/ui/animations.stylex.ts', type: 'registry:file', target: '@ui/animations.stylex.ts' },
  ...(await readdir('registry/ariax/styles')).filter(name => name.endsWith('.css')).sort().map(name => ({ path: `registry/ariax/styles/${name}`, type: 'registry:file', target: `@ui/ariax/styles/${name}` })),
  { path: 'licenses/STYLEX-LICENSE', type: 'registry:file', target: '@ui/ariax/setup/STYLEX-LICENSE' },
  { path: 'licenses/SHADCN-LICENSE.md', type: 'registry:file', target: '@ui/ariax/SHADCN-LICENSE.md' },
  { path: 'licenses/TW-ANIMATE-LICENSE', type: 'registry:file', target: '@ui/ariax/TW-ANIMATE-LICENSE' },
  { path: 'licenses/TAILWIND-LICENSE', type: 'registry:file', target: '@ui/ariax/TAILWIND-LICENSE' },
];
const sharedItem = {
  name: 'ariax-base', type: 'registry:item' as const,
  title: 'Ariax shared styles',
  dependencies: [`@stylexjs/stylex@${pkg.dependencies['@stylexjs/stylex']}`],
  devDependencies: ['@babel/core', '@stylexjs/babel-plugin', '@stylexjs/postcss-plugin', 'postcss'].map(name => `${name}@${pkg.devDependencies[name]}`),
  files: sharedFiles,
};
// GitHub dependency refs are independent of the selected component revision.
const sharedRevision = 'efd6a81c356547f0862261dabe89f4081189963c';
const sharedDependency = `garrettjavalia/shadcn_ariax/ariax-base#${sharedRevision}`;
const sharedHash = createHash('sha256').update(JSON.stringify(registryItemSchema.parse(sharedItem)));
for (const file of sharedFiles) sharedHash.update(await readFile(file.path));
const sharedDigest = sharedHash.digest('hex');
if (process.argv.includes('--publish-shared')) console.log(`Shared item digest: ${sharedDigest}`);
else assert.equal(sharedDigest, '04f9c6504cb39a575f75a6449ee98752bfda7ea00561c10c734283b834813279', 'Shared files changed: publish with --publish-shared, then update sharedRevision and the digest.');
const items = await Promise.all([...componentNames.map(name => ({ name, type: 'registry:ui' as const, extension: '.tsx' })), ...recipeNames.map(name => ({ name, type: 'registry:file' as const, extension: '.recipe.stylex.ts' }))].map(async ({ name, type, extension }) => {
  const source = await componentSources(process.cwd(), name, {...pkg.dependencies, ...pkg.devDependencies}, extension);
  return {
  name, type, title: `Ariax ${name[0].toUpperCase()}${name.slice(1)}`,
  description: `${type === 'registry:file' ? 'Intrinsic HTML StyleX recipes' : 'React Aria component'}: ${name}, Nova style, Neutral light/dark tokens.`,
  dependencies: source.dependencies.filter(dependency => !sharedItem.dependencies.includes(dependency)),
  registryDependencies: [sharedDependency],
  files: source.files.filter(file => !sharedFiles.some(shared => shared.path === file.path)),
  docs: 'Configure the official StyleX Babel and PostCSS plugins as described in the README, then import your ui/ariax/styles/entry.css once. Set .dark on <html> for dark mode. No Tailwind dependency is needed.',
  meta: { base: 'aria', style: 'nova', styling: 'stylex', theme: 'neutral', modes: ['light', 'dark'] },
  };
}));
assert.equal(new Set(items.map(item => item.name)).size, items.length, 'Duplicate component or recipe registry name');
const catalog = registrySchema.parse({ $schema: 'https://ui.shadcn.com/schema/registry.json', name: 'ariax', homepage: 'https://github.com/garrettjavalia/shadcn_ariax', items: [sharedItem, ...items] });
const catalogJSON = JSON.stringify(catalog, null, 2) + '\n';
if (process.argv.includes('--check')) {
  assert.equal(await readFile('registry.json', 'utf8'), catalogJSON, 'registry.json is stale. Run pnpm registry:build and commit registry.json.');
  console.log('GitHub registry catalog matches the component sources.');
  process.exit(0);
}
await mkdir('public/r', { recursive: true });
await writeFile('registry.json', catalogJSON);
for (const item of catalog.items) {
  // HTTP/local payloads are self-contained; GitHub catalogs use the pinned shared item.
  const payload = item.name === sharedItem.name ? item : { ...item, registryDependencies: [], dependencies: [...new Set([...(item.dependencies ?? []), ...sharedItem.dependencies])], devDependencies: sharedItem.devDependencies, files: [...(item.files ?? []), ...sharedFiles] };
  const built = registryItemSchema.parse({ ...payload, $schema: 'https://ui.shadcn.com/schema/registry-item.json', files: await Promise.all(payload.files!.map(async f => ({ ...f, content: await readFile(f.path, 'utf8') }))) });
  await writeFile(`public/r/${item.name}.json`, JSON.stringify(built, null, 2) + '\n');
}
await writeFile('public/registry.json', JSON.stringify(catalog, null, 2) + '\n');
console.log(`Validated and built registry: ${items.map(item => item.name).join(', ')} (source, styles, licenses).`);
