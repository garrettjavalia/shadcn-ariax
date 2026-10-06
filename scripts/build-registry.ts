import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { registrySchema, registryItemSchema } from 'shadcn/schema';
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const componentNames = ['button', 'skeleton', 'separator', 'card', 'alert', 'badge', 'aspect-ratio'];
const sharedFiles = [
  ...['entry.css', 'reset.css', 'theme.css', 'button-children.css', 'skeleton.css', 'card.css', 'alert.css', 'badge.css'].map(name => ({ path: `registry/ariax/styles/${name}`, type: 'registry:file', target: `@ui/ariax/styles/${name}` })),
  { path: 'licenses/SHADCN-LICENSE.md', type: 'registry:file', target: '@ui/ariax/SHADCN-LICENSE.md' },
  { path: 'licenses/TAILWIND-LICENSE', type: 'registry:file', target: '@ui/ariax/TAILWIND-LICENSE' },
];
const items = componentNames.map(name => ({
  name, type: 'registry:ui', title: `Ariax ${name[0].toUpperCase()}${name.slice(1)}`,
  description: `React Aria ${name}, Nova style, StyleX, Neutral light/dark tokens.`,
  dependencies: ['react-aria-components', '@stylexjs/stylex'].map(name => `${name}@${pkg.dependencies[name]}`),
  devDependencies: [`@stylexjs/unplugin@${pkg.devDependencies['@stylexjs/unplugin']}`],
  files: [{ path: `registry/ariax/ui/${name}.tsx`, type: 'registry:ui', target: `@ui/${name}.tsx` }, ...sharedFiles],
  docs: 'Configure @stylexjs/unplugin in Vite before the React plugin (useCSSLayers: false), then import your ui/ariax/styles/entry.css once. Set .dark on <html> for dark mode. No Tailwind dependency is needed.',
  meta: { base: 'aria', style: 'nova', styling: 'stylex', theme: 'neutral', modes: ['light', 'dark'] },
}));
const catalog = registrySchema.parse({ $schema: 'https://ui.shadcn.com/schema/registry.json', name: 'ariax', homepage: process.env.REGISTRY_URL ?? 'http://127.0.0.1:4200', items });
await mkdir('public/r', { recursive: true });
await writeFile('registry.json', JSON.stringify(catalog, null, 2) + '\n');
for (const item of items) {
  const built = registryItemSchema.parse({ ...item, $schema: 'https://ui.shadcn.com/schema/registry-item.json', files: await Promise.all(item.files.map(async f => ({ ...f, content: await readFile(f.path, 'utf8') }))) });
  await writeFile(`public/r/${item.name}.json`, JSON.stringify(built, null, 2) + '\n');
}
await writeFile('public/registry.json', JSON.stringify(catalog, null, 2) + '\n');
console.log('Validated and built registry: button, skeleton, separator, card, alert, badge, aspect-ratio (source, styles, licenses).');
