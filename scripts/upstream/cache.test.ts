import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { root } from './common';
import { literalStyleItem } from './reference';

test('cold/concurrent download, offline reuse, missing files and selection changes', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'ariax-cache-test-'));
  try {
    await cp(resolve(root, 'scripts/upstream'), join(dir, 'scripts/upstream'), { recursive: true });
    await cp(resolve(root, 'reference'), join(dir, 'reference'), { recursive: true });
    await mkdir(join(dir, 'upstream'));
    await cp(resolve(root, 'package.json'), join(dir, 'package.json'));
    const parentLock = await readFile(resolve(root, 'pnpm-lock.yaml'), 'utf8');
    await writeFile(join(dir, 'pnpm-lock.yaml'), parentLock);
    await cp(resolve(root, 'pnpm-workspace.yaml'), join(dir, 'pnpm-workspace.yaml'));
    await cp(resolve(root, 'patches'), join(dir, 'patches'), { recursive: true });
    await writeFile(join(dir, 'upstream/reference.json'), JSON.stringify({ components: ['button'], helperReferences: [{base:'base',style:'nova',components:['button']}] }));
    await symlink(resolve(root, 'node_modules'), join(dir, 'node_modules'), 'dir');
    const commit = 'a'.repeat(40);
    const buttonSource = 'import { helper } from "@/registry/bases/aria/lib/utils"; export function Button() { return <button className="cn-button">{helper}</button>; }';
    const fixtures: Record<string, string> = {
      'apps/v4/registry/bases/aria/ui/button.tsx': buttonSource,
      'apps/v4/registry/bases/aria/registry.ts': 'const ARIA_STYLE = {type:"registry:style",registryDependencies:["utils"],css:{"@layer base":{"*":{"@apply border-border outline-ring/50":{}},body:{"@apply bg-background text-foreground":{}}}},cssVars:{},files:[]};',
      'apps/v4/registry/styles/style-nova.css': '.cn-button { @apply h-8 ml-2; }',
      'apps/v4/public/r/colors/neutral.json': JSON.stringify({ inlineColors: {light:{background:'white'},dark:{background:'black'}}, cssVars: {light:{background:'0 0% 100%'},dark:{background:'0 0% 0%'}}, cssVarsV4:{light:{background:'oklch(1 0 0)'},dark:{background:'oklch(0 0 0)'}}, inlineColorsTemplate:'',cssVarsTemplate:'' }),
      'apps/v4/registry/bases/aria/ui/_registry.ts': 'export const ui = [{name:"button",type:"registry:ui",registryDependencies:["utils"],css:{".reference-fixture":{color:"red"}},files:[{path:"ui/button.tsx",type:"registry:ui"}]}];',
      'apps/v4/registry/bases/aria/lib/_registry.ts': 'export const lib = [{name:"utils",type:"registry:lib",dependencies:["cn"],files:[{path:"lib/utils.ts",type:"registry:lib"}]}];',
      'apps/v4/registry/bases/aria/lib/utils.ts': 'export const helper = "fixture";',
    };
    // A minimal different framework installs in its own namespace and cache.
    for (const [path, content] of Object.entries({...fixtures})) {
      if (path.includes('/bases/aria/')) fixtures[path.replace('/bases/aria/', '/bases/base/')] = content.replaceAll('/bases/aria/', '/bases/base/').replace('ARIA_STYLE', 'BASE_STYLE');
    }
    const paths = Object.keys(fixtures);
    for (const path of paths) {
      const target = join(dir, 'archive', `ui-${commit}`, path);
      await mkdir(resolve(target, '..'), { recursive: true });
      const value = fixtures[path];
      await writeFile(target, value);
    }
    const packed = spawnSync('tar', ['-czf', join(dir, 'fixture.tar.gz'), '-C', join(dir, 'archive'), `ui-${commit}`]);
    assert.equal(packed.status, 0);
    const config = { repository: 'shadcn-ui/ui', commit, base: 'aria', style: 'nova', paths: ['apps/v4/registry', 'apps/v4/public/r/colors/neutral.json'], requiredFiles: paths };
    await writeFile(join(dir, 'upstream/source.json'), JSON.stringify(config));
    // Real archive/extraction/cache logic; only the HTTP transport is replaced.
    await writeFile(join(dir, 'transport.mjs'), `import {readFile,appendFile} from 'node:fs/promises'; globalThis.fetch=async()=>{if(process.env.NO_NETWORK==='1')throw Error('Unexpected network');await appendFile(new URL('./downloads.log',import.meta.url),'download\\n');return new Response(await readFile(new URL('./fixture.tar.gz',import.meta.url)));};`);
    // The guard is inherited by the real CLI process, unlike the download fetch stub.
    await writeFile(join(dir, 'offline-guard.mjs'), `import http from 'node:http'; import https from 'node:https'; import {syncBuiltinESMExports} from 'node:module';
for (const module of [http, https]) { const request=module.request; module.request=function(input,...args) { const host=typeof input==='string' ? new URL(input).hostname : input.hostname ?? input.host; if(host!=='127.0.0.1' && host!=='localhost') throw Error('Unexpected external CLI HTTP request: '+host); return request.call(this,input,...args); }; } syncBuiltinESMExports();`);
    const run = (offline = false) => new Promise<{ code: number | null; output: string }>((done, fail) => {
      const child = spawn(process.execPath, ['--import', fileURLToPath(import.meta.resolve('tsx')), '--import', join(dir, 'transport.mjs'), join(dir, 'scripts/upstream/prepare.ts')], { cwd: dir, env: { ...process.env, NO_NETWORK: offline ? '1' : '0', NODE_OPTIONS: [process.env.NODE_OPTIONS, '--import', join(dir, 'offline-guard.mjs')].filter(Boolean).join(' ') } });
      let output = '';
      child.stdout.on('data', data => { output += data; }); child.stderr.on('data', data => { output += data; });
      child.on('error', fail); child.on('close', code => done({ code, output }));
    });
    const downloads = async () => (await readFile(join(dir, 'downloads.log'), 'utf8')).trim().split('\n').length;
    for (const result of await Promise.all([run(), run()])) assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 1, 'Concurrent callers should download once.');
    let result = await run(true); assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 1, 'Warm cache must work with networking disabled.');
    const installed = join(dir, 'generated/reference/aria-nova/ui/button.tsx');
    const installedSource = await readFile(installed, 'utf8');
    assert.match(installedSource, /className="h-8 ms-2"/);
    assert.equal(JSON.parse(await readFile(join(dir, 'generated/reference/aria-nova/components.json'), 'utf8')).rtl, true);
    assert.match(installedSource, /@reference\/lib\/utils/);
    assert.doesNotMatch(installedSource, /cn-button/);
    const helperInstalled = join(dir, 'generated/reference/base-nova/ui/button.tsx');
    assert.equal(await readFile(helperInstalled, 'utf8'), installedSource, 'Crossbase CLI output remains isolated from the primary reference.');
    assert.equal(JSON.parse(await readFile(join(dir, 'generated/reference/base-nova/components.json'), 'utf8')).style, 'base-nova');
    const cliCss = join(dir, 'generated/reference/aria-nova/cli.css');
    const originalCss = await readFile(cliCss, 'utf8');
    assert.match(originalCss, /reference-fixture/);
    assert.match(originalCss, /@apply border-border outline-ring\/50/);
    assert.match(originalCss, /@apply bg-background text-foreground/);
    assert.match(originalCss, /--background: oklch\(1 0 0\)/);
    assert.doesNotMatch(originalCss, /scroll-padding-top/);
    await writeFile(join(dir, 'reference/tailwind.css'), (await readFile(join(dir, 'reference/tailwind.css'), 'utf8')) + '\n/* local harness change */\n');
    const before = (await stat(installed)).mtimeMs;
    result = await run(true); assert.equal(result.code, 0, result.output);
    assert.equal((await stat(installed)).mtimeMs, before, 'Warm preparation must not rerun the CLI.');
    assert.equal(await readFile(cliCss, 'utf8'), originalCss, 'Harness changes must preserve CLI-owned CSS.');
    const tsconfig = join(dir, 'generated/reference/aria-nova/tsconfig.json');
    await rm(tsconfig);
    result = await run(true); assert.equal(result.code, 0, result.output);
    assert.equal(JSON.parse(await readFile(tsconfig, 'utf8')).compilerOptions.jsx, 'react-jsx');
    await rm(installed);
    result = await run(true); assert.equal(result.code, 0, result.output);
    assert.equal(await readFile(installed, 'utf8'), installedSource, 'Missing installed output is recreated offline by the official CLI.');
    assert.equal(await readFile(join(dir, 'package.json'), 'utf8'), await readFile(resolve(root, 'package.json'), 'utf8'), 'CLI must not modify the development package.');
    assert.equal(await readFile(join(dir, 'pnpm-lock.yaml'), 'utf8'), parentLock, 'Reference installation must not modify the parent workspace lockfile.');
    await writeFile(join(dir, 'upstream/reference.json'), JSON.stringify({ components: ['missing'] }));
    result = await run(true); assert.notEqual(result.code, 0, 'Unknown reference selection must fail.');
    assert.equal(await readFile(installed, 'utf8'), installedSource, 'Failed preparation must preserve the successful installation.');
    await writeFile(join(dir, 'upstream/reference.json'), JSON.stringify({ components: ['button'] }));
    const registryMetadata = join(dir, 'generated/upstream/shadcn/apps/v4/registry/bases/aria/ui/_registry.ts');
    await rm(registryMetadata);
    result = await run(); assert.equal(result.code, 0, result.output);
    assert.ok(await stat(registryMetadata), 'Missing required registry metadata must be redownloaded.');
    const rawFile = join(dir, 'generated/upstream/shadcn', paths[0]);
    await rm(rawFile);
    result = await run(); assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 3, 'A missing required file must trigger reconstruction.');
    // Content edits are intentionally not checksummed.
    await writeFile(rawFile, 'export const button = "local edit";');
    result = await run(true); assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 3);
    const marker = join(dir, 'generated/upstream/shadcn/.download-complete.json');
    await writeFile(marker, JSON.stringify({ version: 1, source: { ...config, commit: 'b'.repeat(40) } }));
    result = await run(); assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 4, 'A different cached commit must trigger download.');
    assert.deepEqual(JSON.parse(await readFile(marker, 'utf8')).source, config);
    await rm(marker);
    result = await run(true); assert.notEqual(result.code, 0, 'An incomplete cache cannot be reused offline.');
    result = await run(); assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 5);
    // Failed extraction must leave the previously installed cache intact.
    await writeFile(marker, '{}');
    await writeFile(join(dir, 'fixture.tar.gz'), 'invalid archive');
    result = await run(); assert.notEqual(result.code, 0);
    assert.equal(await readFile(rawFile, 'utf8'), buttonSource);
  } finally { await rm(dir, { recursive: true, force: true }); }
});


test('official style literal metadata is retained without executing registry imports', () => {
  const css = {'@layer base': {'*': {'@apply border-border outline-ring/50': {}}, body: {'@apply bg-background text-foreground': {}}}, '@media (forced-colors: active)': {button: {color:'CanvasText'}}};
  const source = `import { fonts } from "@/registry/fonts"; const ARIA_STYLE = ${JSON.stringify({type:'registry:style',css,cssVars:{},files:[]})};`;
  assert.deepEqual(literalStyleItem(source).css, css);
  assert.throws(() => literalStyleItem('const ARIA_STYLE = getStyle();'), /literals only/);
  assert.throws(() => literalStyleItem('const ARIA_STYLE = {...sharedStyle};'), /must not spread or execute code/);
});
