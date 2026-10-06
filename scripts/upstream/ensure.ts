import { mkdir, mkdtemp, open, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';
import assert from 'node:assert/strict';
import { root, rawRoot, markerName, source, checkPaths, checkRaw } from './common';

// Concurrent commands share a download. A terminated owner's lock can be recovered.
export async function acquire(path: string) {
  for (let i = 0; i < 1200; i++) {
    try {
      const handle = await open(path, 'wx');
      await handle.writeFile(JSON.stringify({ pid: process.pid }));
      return async () => { await handle.close(); await rm(path, { force: true }); };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      try {
        const { pid } = JSON.parse(await readFile(path, 'utf8'));
        try { process.kill(pid, 0); }
        catch (e) { if ((e as NodeJS.ErrnoException).code === 'ESRCH') await rm(path, { force: true }); }
      } catch {
        const info = await stat(path).catch(() => undefined);
        if (info && Date.now() - info.mtimeMs > 10_000) await rm(path, { force: true });
      }
      await setTimeout(250);
    }
  }
  throw new Error('Timed out waiting for upstream preparation.');
}

export async function ensureRaw(force = false) {
  const config = await source();
  const generated = resolve(root, 'generated');
  await mkdir(generated, { recursive: true });
  const release = await acquire(join(generated, '.upstream.lock'));
  let staging: string | undefined;
  try {
    if (!force) {
      try { return await checkRaw(); } catch { /* Missing or outdated disposable cache. */ }
    }
    staging = await mkdtemp(join(generated, '.upstream-stage-'));
    const archive = join(staging, 'source.tar.gz');
    console.log(`Downloading pinned upstream ${config.repository}@${config.commit} ...`);
    const response = await fetch(`https://codeload.github.com/${config.repository}/tar.gz/${config.commit}`, { signal: AbortSignal.timeout(180_000) });
    assert.ok(response.ok, `Archive request failed: HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    await writeFile(archive, bytes);
    const tar = (args: string[]) => {
      const r = spawnSync('tar', args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, timeout: 120_000 });
      assert.equal(r.status, 0, `tar failed: ${r.error ?? r.stderr}`);
      return r.stdout;
    };
    const names = tar(['-tzf', archive]).trim().split('\n');
    const prefix = `${config.repository.split('/')[1]}-${config.commit}/`;
    for (const name of names) assert.ok(name.startsWith(prefix) && !name.split('/').includes('..'), `Unsafe archive path: ${name}`);
    for (const path of config.paths) assert.ok(names.some(name => name === prefix + path || name.startsWith(prefix + path + '/')), `Missing pinned path: ${path}`);
    const selected = join(staging, 'selected');
    await mkdir(selected);
    tar(['-xzf', archive, '-C', selected, '--strip-components=1', ...config.paths.map(path => prefix + path)]);
    await checkPaths(selected, config);
    await writeFile(join(selected, markerName), JSON.stringify({ version: 1, source: config }) + '\n');
    await mkdir(resolve(generated, 'upstream'), { recursive: true });
    const backup = join(staging, 'previous');
    const hadCache = await stat(rawRoot).then(() => true, () => false);
    if (hadCache) await rename(rawRoot, backup);
    try {
      await rename(selected, rawRoot);

    } catch (error) {
      await rm(rawRoot, { recursive: true, force: true });
      if (hadCache) await rename(backup, rawRoot);
      throw error;
    }
    console.log('Prepared pinned upstream in generated/upstream/shadcn.');
    return config;
  } finally {
    if (staging) await rm(staging, { recursive: true, force: true });
    await release();
  }
}
