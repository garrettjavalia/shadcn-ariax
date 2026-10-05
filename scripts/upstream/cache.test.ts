import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { root } from './common';

test('cold/concurrent download, offline reuse, missing files and selection changes', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'ariax-cache-test-'));
  try {
    await cp(resolve(root, 'scripts/upstream'), join(dir, 'scripts/upstream'), { recursive: true });
    await cp(resolve(root, 'reference'), join(dir, 'reference'), { recursive: true });
    await mkdir(join(dir, 'upstream'));
    await writeFile(join(dir, 'package.json'), '{"type":"module"}');
    const commit = 'a'.repeat(40);
    const paths = ['apps/v4/registry/bases/aria/ui/button.tsx', 'apps/v4/registry/styles/style-nova.css'];
    for (const path of paths) {
      const target = join(dir, 'archive', `ui-${commit}`, path);
      await mkdir(resolve(target, '..'), { recursive: true });
      const value = path.endsWith('.tsx') ? 'export const button = "cn-button";\n' : '.cn-button { @apply h-8; }\n';
      await writeFile(target, value);
    }
    const packed = spawnSync('tar', ['-czf', join(dir, 'fixture.tar.gz'), '-C', join(dir, 'archive'), `ui-${commit}`]);
    assert.equal(packed.status, 0);
    const config = { repository: 'shadcn-ui/ui', commit, base: 'aria', style: 'nova', paths: ['apps/v4/registry'], requiredFiles: paths };
    await writeFile(join(dir, 'upstream/source.json'), JSON.stringify(config));
    // Real archive/extraction/cache logic; only the HTTP transport is replaced.
    await writeFile(join(dir, 'transport.mjs'), `import {readFile,appendFile} from 'node:fs/promises'; globalThis.fetch=async()=>{if(process.env.NO_NETWORK==='1')throw Error('Unexpected network');await appendFile(new URL('./downloads.log',import.meta.url),'download\\n');return new Response(await readFile(new URL('./fixture.tar.gz',import.meta.url)));};`);
    const run = (offline = false) => new Promise<{ code: number | null; output: string }>((done, fail) => {
      const child = spawn(process.execPath, ['--import', fileURLToPath(import.meta.resolve('tsx')), '--import', join(dir, 'transport.mjs'), join(dir, 'scripts/upstream/prepare.ts')], { cwd: dir, env: { ...process.env, NO_NETWORK: offline ? '1' : '0' } });
      let output = '';
      child.stdout.on('data', data => { output += data; }); child.stderr.on('data', data => { output += data; });
      child.on('error', fail); child.on('close', code => done({ code, output }));
    });
    const downloads = async () => (await readFile(join(dir, 'downloads.log'), 'utf8')).trim().split('\n').length;
    for (const result of await Promise.all([run(), run()])) assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 1, 'Concurrent callers should download once.');
    let result = await run(true); assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 1, 'Warm cache must work with networking disabled.');
    assert.equal(await readFile(join(dir, 'generated/reference/aria-nova/button.tsx'), 'utf8'), 'export const button = "h-8";\n');
    const rawFile = join(dir, 'generated/upstream/shadcn', paths[0]);
    await rm(rawFile);
    result = await run(); assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 2, 'A missing required file must trigger reconstruction.');
    // Content edits are intentionally not checksummed.
    await writeFile(rawFile, 'export const button = "local edit";');
    result = await run(true); assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 2);
    const marker = join(dir, 'generated/upstream/shadcn/.download-complete.json');
    await writeFile(marker, JSON.stringify({ version: 1, source: { ...config, commit: 'b'.repeat(40) } }));
    result = await run(); assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 3, 'A different cached commit must trigger download.');
    assert.deepEqual(JSON.parse(await readFile(marker, 'utf8')).source, config);
    await rm(marker);
    result = await run(true); assert.notEqual(result.code, 0, 'An incomplete cache cannot be reused offline.');
    result = await run(); assert.equal(result.code, 0, result.output);
    assert.equal(await downloads(), 4);
    // Failed extraction must leave the previously installed cache intact.
    await writeFile(marker, '{}');
    await writeFile(join(dir, 'fixture.tar.gz'), 'invalid archive');
    result = await run(); assert.notEqual(result.code, 0);
    assert.equal(await readFile(rawFile, 'utf8'), 'export const button = "cn-button";\n');
  } finally { await rm(dir, { recursive: true, force: true }); }
});
