import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { registrySchema, registryItemSchema } from 'shadcn/schema';
import { componentNames as discoverComponents, componentSources } from './registry-sources';
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const componentNames = await discoverComponents(process.cwd());
const recipeNames = (await readdir('registry/ariax/ui')).filter(name => /^[a-z][a-z0-9-]*\.recipe\.stylex\.ts$/.test(name)).map(name => name.slice(0, -17)).sort();
const sharedFiles = [
  { path: 'registry/ariax/ui/animations.stylex.ts', type: 'registry:file', target: '@ui/animations.stylex.ts' },
  ...(await readdir('registry/ariax/styles')).filter(name => name.endsWith('.css')).sort().map(name => ({ path: `registry/ariax/styles/${name}`, type: 'registry:file', target: `@ui/ariax/styles/${name}` })),
  { path: 'licenses/SHADCN-LICENSE.md', type: 'registry:file', target: '@ui/ariax/SHADCN-LICENSE.md' },
  { path: 'licenses/TW-ANIMATE-LICENSE', type: 'registry:file', target: '@ui/ariax/TW-ANIMATE-LICENSE' },
  { path: 'licenses/TAILWIND-LICENSE', type: 'registry:file', target: '@ui/ariax/TAILWIND-LICENSE' },
];
const items = await Promise.all([...componentNames.map(name => ({ name, type: 'registry:ui' as const, extension: '.tsx' })), ...recipeNames.map(name => ({ name, type: 'registry:file' as const, extension: '.recipe.stylex.ts' }))].map(async ({ name, type, extension }) => {
  const source = await componentSources(process.cwd(), name, {...pkg.dependencies, ...pkg.devDependencies}, extension);
  return {
  name, type, title: `Ariax ${name[0].toUpperCase()}${name.slice(1)}`,
  description: `${type === 'registry:file' ? 'Intrinsic HTML StyleX recipes' : 'React Aria component'}: ${name}, Nova style, Neutral light/dark tokens.`,
  dependencies: [...new Set([`@stylexjs/stylex@${pkg.dependencies['@stylexjs/stylex']}`, ...source.dependencies])],
  devDependencies: [`@stylexjs/unplugin@${pkg.devDependencies['@stylexjs/unplugin']}`],
  files: [...source.files, ...sharedFiles.filter(file => !source.files.some(source => source.path === file.path))],
  docs: 'Configure @stylexjs/unplugin in Vite before the React plugin (useCSSLayers: false), then import your ui/ariax/styles/entry.css once. Set .dark on <html> for dark mode. No Tailwind dependency is needed.',
  meta: { base: 'aria', style: 'nova', styling: 'stylex', theme: 'neutral', modes: ['light', 'dark'] },
  };
}));
assert.equal(new Set(items.map(item => item.name)).size, items.length, 'Duplicate component or recipe registry name');
const catalog = registrySchema.parse({ $schema: 'https://ui.shadcn.com/schema/registry.json', name: 'ariax', homepage: process.env.REGISTRY_URL ?? 'http://127.0.0.1:4200', items });
await mkdir('public/r', { recursive: true });
await writeFile('registry.json', JSON.stringify(catalog, null, 2) + '\n');
for (const item of items) {
  const built = registryItemSchema.parse({ ...item, $schema: 'https://ui.shadcn.com/schema/registry-item.json', files: await Promise.all(item.files.map(async f => ({ ...f, content: await readFile(f.path, 'utf8') }))) });
  await writeFile(`public/r/${item.name}.json`, JSON.stringify(built, null, 2) + '\n');
}
await writeFile('public/registry.json', JSON.stringify(catalog, null, 2) + '\n');
console.log(`Validated and built registry: ${items.map(item => item.name).join(', ')} (source, styles, licenses).`);
