import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { registrySchema } from 'shadcn/schema';
import { componentNames as discoverComponents, componentSources } from './registry-sources';
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const componentNames = await discoverComponents(process.cwd());
const recipeNames = (await readdir('src/ariax/ui')).filter(name => /^[a-z][a-z0-9-]*\.recipe\.stylex\.ts$/.test(name)).map(name => name.slice(0, -17)).sort();
const sharedFiles = [
  { path: 'LICENSE', type: 'registry:file', target: '@ui/ariax/LICENSE' },
  { path: 'src/ariax/ui/animations.stylex.ts', type: 'registry:file', target: '@ui/animations.stylex.ts' },
  ...(await readdir('src/ariax/styles')).filter(name => name.endsWith('.css')).sort().map(name => ({ path: `src/ariax/styles/${name}`, type: 'registry:file', target: `@ui/ariax/styles/${name}` })),
  { path: 'licenses/STYLEX-LICENSE', type: 'registry:file', target: '@ui/ariax/setup/STYLEX-LICENSE' },
  { path: 'licenses/SHADCN-LICENSE.md', type: 'registry:file', target: '@ui/ariax/SHADCN-LICENSE.md' },
  { path: 'licenses/TW-ANIMATE-LICENSE', type: 'registry:file', target: '@ui/ariax/TW-ANIMATE-LICENSE' },
  { path: 'licenses/TAILWIND-LICENSE', type: 'registry:file', target: '@ui/ariax/TAILWIND-LICENSE' },
];
const sharedDependencies = [`@stylexjs/stylex@${pkg.dependencies['@stylexjs/stylex']}`];
const sharedDevDependencies = ['@babel/core', '@stylexjs/babel-plugin', '@stylexjs/postcss-plugin', 'postcss'].map(name => `${name}@${pkg.devDependencies[name]}`);
const items = await Promise.all([...componentNames.map(name => ({ name, type: 'registry:ui' as const, extension: '.tsx' })), ...recipeNames.map(name => ({ name, type: 'registry:file' as const, extension: '.recipe.stylex.ts' }))].map(async ({ name, type, extension }) => {
  const source = await componentSources(process.cwd(), name, {...pkg.dependencies, ...pkg.devDependencies}, extension);
  return {
  name, type, title: `AriaX ${name[0].toUpperCase()}${name.slice(1)}`,
  description: `${type === 'registry:file' ? 'Intrinsic HTML StyleX recipes' : 'React Aria component'}: ${name}, Nova style, Neutral light/dark tokens.`,
  dependencies: [...new Set([...source.dependencies, ...sharedDependencies])],
  devDependencies: sharedDevDependencies,
  files: [...source.files.filter(file => !sharedFiles.some(shared => shared.path === file.path)), ...sharedFiles],
  docs: 'Configure the official StyleX Babel and PostCSS plugins as described in the README, then import your ui/ariax/styles/entry.css once. Set .dark on <html> for dark mode. No Tailwind dependency is needed.',
  meta: { base: 'aria', style: 'nova', styling: 'stylex', theme: 'neutral', modes: ['light', 'dark'] },
  };
}));
assert.equal(new Set(items.map(item => item.name)).size, items.length, 'Duplicate component or recipe registry name');
const catalog = registrySchema.parse({ $schema: 'https://ui.shadcn.com/schema/registry.json', name: 'ariax', homepage: 'https://github.com/garrettjavalia/shadcn_ariax', items });
const catalogJSON = JSON.stringify(catalog, null, 2) + '\n';
if (process.argv.includes('--check')) {
  assert.equal(await readFile('registry.json', 'utf8'), catalogJSON, 'registry.json is stale. Run pnpm registry:build and commit registry.json.');
  console.log('GitHub registry catalog matches the component sources.');
  process.exit(0);
}
await writeFile('registry.json', catalogJSON);
// The official build does not remove items deleted from the source catalog.
await rm('registry', { recursive: true, force: true });
console.log(`Generated source catalog: ${items.length} items.`);
