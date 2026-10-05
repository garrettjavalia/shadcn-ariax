import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

export const root = fileURLToPath(new URL('../../', import.meta.url));
export const rawRoot = resolve(root, 'generated/upstream/shadcn');
export const markerName = '.download-complete.json';
export type Source = { repository: string; commit: string; base: string; style: string; paths: string[]; requiredFiles: string[] };
export async function source(): Promise<Source> {
  const config: Source = JSON.parse(await readFile(resolve(root, 'upstream/source.json'), 'utf8'));
  assert.match(config.repository, /^[\w.-]+\/[\w.-]+$/);
  assert.match(config.commit, /^[a-f0-9]{40}$/, 'Use a full immutable commit SHA, not a branch or tag.');
  assert.ok(config.paths.length > 0);
  assert.ok(Array.isArray(config.requiredFiles));
  for (const path of [...config.paths, ...config.requiredFiles]) assert.ok(path && !path.startsWith('/') && !path.split('/').some(p => !p || p === '..' || p === '.'), `Unsafe source path: ${path}`);
  return config;
}
export async function checkPaths(directory: string, config: Source) {
  for (const path of config.paths) await stat(resolve(directory, path));
  for (const path of config.requiredFiles) assert.ok((await stat(resolve(directory, path))).isFile(), `Missing required file: ${path}`);
}
export async function checkRaw(): Promise<Source> {
  const config = await source();
  const marker = JSON.parse(await readFile(resolve(rawRoot, markerName), 'utf8'));
  assert.deepEqual(marker, { version: 1, source: config }, 'Upstream cache selection changed.');
  await checkPaths(rawRoot, config);
  return config;
}
