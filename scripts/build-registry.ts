import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { registrySchema, registryItemSchema } from 'shadcn/schema';
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const files = [
  { path: 'registry/ariax/ui/button.tsx', type: 'registry:ui', target: '@ui/button.tsx' },
  ...['entry.css', 'reset.css', 'theme.css', 'button-children.css'].map(name => ({ path: `registry/ariax/styles/${name}`, type: 'registry:file', target: `@ui/ariax/styles/${name}` })),
  { path: 'licenses/SHADCN-LICENSE.md', type: 'registry:file', target: '@ui/ariax/SHADCN-LICENSE.md' },
  { path: 'licenses/TAILWIND-LICENSE', type: 'registry:file', target: '@ui/ariax/TAILWIND-LICENSE' },
];
const item = {
  name: 'button', type: 'registry:ui', title: 'Ariax Button',
  description: 'React Aria Button and LinkButton, Nova style, StyleX, Neutral light/dark tokens.',
  dependencies: ['react-aria-components', '@stylexjs/stylex'].map(name => `${name}@${pkg.dependencies[name]}`),
  devDependencies: [`@stylexjs/unplugin@${pkg.devDependencies['@stylexjs/unplugin']}`],
  files,
  docs: 'Configure @stylexjs/unplugin in Vite before the React plugin (useCSSLayers: false), then import your ui/ariax/styles/entry.css once. Set .dark on <html> for dark mode. No Tailwind dependency is needed.',
  meta: { base: 'aria', style: 'nova', styling: 'stylex', theme: 'neutral', modes: ['light', 'dark'] },
};
const catalog = registrySchema.parse({ $schema: 'https://ui.shadcn.com/schema/registry.json', name: 'ariax', homepage: process.env.REGISTRY_URL ?? 'http://127.0.0.1:4200', items: [item] });
await mkdir('public/r', { recursive: true });
await writeFile('registry.json', JSON.stringify(catalog, null, 2) + '\n');
const built = registryItemSchema.parse({ ...item, $schema: 'https://ui.shadcn.com/schema/registry-item.json', files: await Promise.all(files.map(async f => ({ ...f, content: await readFile(f.path, 'utf8') }))) });
await writeFile('public/r/button.json', JSON.stringify(built, null, 2) + '\n');
await writeFile('public/registry.json', JSON.stringify(catalog, null, 2) + '\n');
console.log('Validated and built registry: button (source, styles, licenses).');
