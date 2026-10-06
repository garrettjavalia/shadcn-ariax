import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, writeFile, rm, copyFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';
import { collectInstallFixtures } from './install-fixtures';
const root = process.cwd();
// Fail before running the CLI when the catalog and fixtures disagree.
const fixtures = await collectInstallFixtures(root);
const dir = await mkdtemp(join(root, '.consumer-test-'));
const run = (command: string, args: string[], cwd = dir) => {
  const r = spawnSync(command, args, { cwd, stdio: 'inherit', env: { ...process.env, CI: 'true' }, timeout: 180_000 });
  if (r.status !== 0) throw new Error(`${command} ${args.join(' ')} failed (${r.status}): ${r.error ?? ''}`);
};
try {
  const pkg = JSON.parse(await readFile('package.json', 'utf8'));
  await writeFile(join(dir, 'package.json'), JSON.stringify({ name: 'ariax-consumer', private: true, type: 'module', dependencies: { react: pkg.dependencies.react, 'react-dom': pkg.dependencies['react-dom'], ...Object.assign({}, ...fixtures.map(fixture => fixture.dependencies)) }, devDependencies: { vite: pkg.devDependencies.vite, typescript: pkg.devDependencies.typescript, '@types/react': pkg.devDependencies['@types/react'], '@types/react-dom': pkg.devDependencies['@types/react-dom'] } }, null, 2));
  await mkdir(join(dir, 'src'), { recursive: true });
  await writeFile(join(dir, 'src/index.css'), '');
  await writeFile(join(dir, 'tsconfig.json'), JSON.stringify({ compilerOptions: { target: 'ES2022', lib: ['ES2022','DOM'], module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', strict: true, skipLibCheck: true, types: ['vite/client'], paths: { '@/*': ['./src/*'], ...Object.fromEntries(fixtures.map(fixture => [fixture.alias, [`./${fixture.installedPath}`]])) } }, include: ['src'] }));
  await writeFile(join(dir, 'components.json'), JSON.stringify({ $schema: 'https://ui.shadcn.com/schema.json', style: 'aria-nova', rsc: false, tsx: true, tailwind: { config: '', css: 'src/index.css', baseColor: 'neutral', cssVariables: true }, aliases: { components: '@/components', ui: '@/components/ui', utils: '@/lib/utils', lib: '@/lib', hooks: '@/hooks' } }));
  // Actual published CLI, actual generated registry file, fresh consumer files and dependencies.
  run('node', [resolve('node_modules/shadcn/dist/index.js'), 'add', ...fixtures.map(({ item }) => resolve(`public/r/${item.name}.json`)), '--yes', '--cwd', dir]);
  const installed = JSON.parse(await readFile(join(dir, 'package.json'), 'utf8'));
  for (const fixture of fixtures) for (const [name, version] of Object.entries(fixture.dependencies)) assert.equal(installed.dependencies[name], version, `CLI changed composition fixture pin: ${name}`);
  for (const { item, installedPath } of fixtures) {
    const source = await readFile(join(dir, installedPath), 'utf8');
    const original = await readFile(join(root, 'registry/ariax/ui', `${item.name}${item.type === 'registry:file' ? '.recipe.stylex.ts' : '.tsx'}`), 'utf8');
    if (original.includes('@stylexjs/stylex')) {
      assert.match(source, /@stylexjs\/stylex/, `Installed ${item.name} must retain its StyleX import`);
    }
    for (const declaration of item.dependencies ?? []) {
      const separator = declaration.lastIndexOf('@');
      const name = separator > 0 ? declaration.slice(0, separator) : declaration;
      assert.ok(installed.dependencies[name], `CLI did not install ${name} for ${item.name}`);
      if (separator > 0) {
        const installedPackage = JSON.parse(await readFile(join(dir, 'node_modules', name, 'package.json'), 'utf8'));
        assert.equal(installedPackage.version, declaration.slice(separator + 1), `CLI resolved a different runtime pin for ${name}`);
      }
    }
  }
  assert.ok(!installed.dependencies.tailwindcss && !installed.devDependencies.tailwindcss);
  await writeFile(join(dir, 'index.html'), '<html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>');
  await mkdir(join(dir, 'src/install'));
  for (const { item, fixture } of fixtures) await copyFile(fixture, join(dir, `src/install/${item.name}.tsx`));
  const imports = fixtures.map(({ item }, index) => `import Fixture${index} from ${JSON.stringify(`./install/${item.name}`)};`).join('\n');
  const components = fixtures.map((_, index) => `<Fixture${index} />`).join('');
  await writeFile(join(dir, 'src/main.tsx'), `import { createRoot } from 'react-dom/client';
import './components/ui/ariax/styles/entry.css';
${imports}
createRoot(document.getElementById('root')!).render(<>${components}</>);
`);
  const alias = Object.fromEntries(fixtures.map(fixture => [fixture.alias, join(dir, fixture.installedPath)]));
  await writeFile(join(dir, 'vite.config.ts'), `import {defineConfig} from 'vite'; import stylex from '@stylexjs/unplugin'; export default defineConfig({plugins:[stylex.vite({useCSSLayers:false})],resolve:{alias:${JSON.stringify(alias)}},esbuild:{jsx:'automatic'}});`);
  run('pnpm', ['install', '--ignore-workspace']);
  run('pnpm', ['exec', 'tsc', '--noEmit']);
  run('pnpm', ['exec', 'vite', 'build']);
  console.log('PASS: actual shadcn add, dependencies, typecheck and production Vite build without Tailwind.');
} finally { await rm(dir, { recursive: true, force: true }); }
