import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
const root = process.cwd();
const dir = await mkdtemp(join(root, '.consumer-test-'));
const run = (command: string, args: string[], cwd = dir) => {
  const r = spawnSync(command, args, { cwd, stdio: 'inherit', env: { ...process.env, CI: 'true' }, timeout: 180_000 });
  if (r.status !== 0) throw new Error(`${command} ${args.join(' ')} failed (${r.status}): ${r.error ?? ''}`);
};
try {
  const pkg = JSON.parse(await readFile('package.json', 'utf8'));
  await writeFile(join(dir, 'package.json'), JSON.stringify({ name: 'ariax-consumer', private: true, type: 'module', dependencies: { react: pkg.dependencies.react, 'react-dom': pkg.dependencies['react-dom'] }, devDependencies: { vite: pkg.devDependencies.vite, typescript: pkg.devDependencies.typescript, '@types/react': pkg.devDependencies['@types/react'], '@types/react-dom': pkg.devDependencies['@types/react-dom'] } }, null, 2));
  await mkdir(join(dir, 'src'), { recursive: true });
  await writeFile(join(dir, 'src/index.css'), '');
  await writeFile(join(dir, 'tsconfig.json'), JSON.stringify({ compilerOptions: { target: 'ES2022', lib: ['ES2022','DOM'], module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', strict: true, skipLibCheck: true, types: ['vite/client'], paths: { '@/*': ['./src/*'] } }, include: ['src'] }));
  await writeFile(join(dir, 'components.json'), JSON.stringify({ $schema: 'https://ui.shadcn.com/schema.json', style: 'aria-nova', rsc: false, tsx: true, tailwind: { config: '', css: 'src/index.css', baseColor: 'neutral', cssVariables: true }, aliases: { components: '@/components', ui: '@/components/ui', utils: '@/lib/utils', lib: '@/lib', hooks: '@/hooks' } }));
  // Actual published CLI, actual generated registry file, fresh consumer files and dependencies.
  run('node', [resolve('node_modules/shadcn/dist/index.js'), 'add', resolve('public/r/button.json'), resolve('public/r/skeleton.json'), resolve('public/r/separator.json'), resolve('public/r/label.json'), '--yes', '--cwd', dir]);
  const button = await readFile(join(dir, 'src/components/ui/button.tsx'), 'utf8');
  assert.match(button, /react-aria-components/);
  assert.match(button, /@stylexjs\/stylex/);
  const installed = JSON.parse(await readFile(join(dir, 'package.json'), 'utf8'));
  assert.ok(installed.dependencies['react-aria-components']);
  assert.ok(installed.dependencies['@stylexjs/stylex']);
  assert.ok(!installed.dependencies.tailwindcss && !installed.devDependencies.tailwindcss);
  await writeFile(join(dir, 'index.html'), '<html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>');
  await writeFile(join(dir, 'src/main.tsx'), "import React from 'react'; import {createRoot} from 'react-dom/client'; import {Label} from './components/ui/label'; import {Skeleton} from './components/ui/skeleton'; import {Separator} from './components/ui/separator'; import {Button,buttonProps} from './components/ui/button'; import * as stylex from '@stylexjs/stylex'; import './components/ui/ariax/styles/entry.css'; const styles=stylex.create({custom:{minWidth:160},dynamic:(width:number)=>({width})}); createRoot(document.getElementById('root')!).render(<><Label htmlFor='installed' style={{color:'red'}}>Installed label</Label><Skeleton xstyle={styles.dynamic(200)} /><Separator orientation={'vertical'} xstyle={styles.custom}/><Button xstyle={[styles.custom,styles.dynamic(200)]}>Installed</Button><a {...buttonProps({xstyle:styles.custom})}>Link</a></>);");
  await writeFile(join(dir, 'vite.config.ts'), "import {defineConfig} from 'vite'; import stylex from '@stylexjs/unplugin'; export default defineConfig({plugins:[stylex.vite({useCSSLayers:false})],esbuild:{jsx:'automatic'}});");
  run('pnpm', ['install', '--ignore-workspace']);
  run('pnpm', ['exec', 'tsc', '--noEmit']);
  run('pnpm', ['exec', 'vite', 'build']);
  console.log('PASS: actual shadcn add, dependencies, typecheck and production Vite build without Tailwind.');
} finally { await rm(dir, { recursive: true, force: true }); }
