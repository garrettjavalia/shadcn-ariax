import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { componentNames, componentSources } from './registry-sources';

test('registry discovers primary components and follows imports, reexports, type imports and cycles', async () => {
  const root = await mkdtemp(join(tmpdir(), 'ariax-registry-'));
  const sources = {
    'parent.tsx': 'import type { CSSProperties } from "react"; import { Child } from "./child"; export { styles } from "./styles.stylex"; export const Parent = () => <Child />;',
    'child.tsx': 'import "./parent"; import { Icon } from "icons/subpath"; export const Child = () => <Icon />;',
    'styles.stylex.ts': 'import * as stylex from "@stylexjs/stylex"; export const styles = stylex.create({base:{color:"red"}});',
    'helper.internal.tsx': 'export const Internal = () => null;',
  };
  try {
    for (const [file, content] of Object.entries(sources)) {
      const path = join(root, 'registry/ariax/ui', file);
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, content);
    }
    assert.deepEqual(await componentNames(root), ['child', 'parent']);
    const result = await componentSources(root, 'parent', { react: '1.0.0', icons: '2.0.0', '@stylexjs/stylex': '3.0.0' });
    assert.deepEqual(result.dependencies, ['@stylexjs/stylex@3.0.0', 'icons@2.0.0', 'react@1.0.0']);
    assert.deepEqual(result.files.map(file => file.target), ['@ui/child.tsx', '@ui/parent.tsx', '@ui/styles.stylex.ts']);
    await assert.rejects(componentSources(root, 'parent', { react: '1.0.0' }), /Pin imported package icons/);
    await writeFile(join(root, 'registry/ariax/ui/parent.tsx'), 'import "./missing";');
    await assert.rejects(componentSources(root, 'parent', {}), /Missing relative import/);
    await writeFile(join(root, 'registry/ariax/ui/parent.tsx'), 'import "../../../outside.ts";');
    await writeFile(join(root, 'outside.ts'), 'export {};');
    await assert.rejects(componentSources(root, 'parent', {}), /escapes source directory/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('UI runtime dependency metadata preserves exact peer pins and rejects unmatched declarations', async () => {
  const root = await mkdtemp(join(tmpdir(), 'ariax-registry-peers-'));
  const base = join(root, 'registry/ariax/ui');
  try {
    await mkdir(base, { recursive: true });
    await writeFile(join(base, 'chart.tsx'), 'import "recharts"; export const Chart = () => null;');
    await writeFile(join(base, 'chart.dependencies.json'), JSON.stringify({ 'react-is': '18.3.1' }));
    const pins = { recharts: '3.8.0', 'react-is': '18.3.1' };
    assert.deepEqual((await componentSources(root, 'chart', pins)).dependencies, ['react-is@18.3.1', 'recharts@3.8.0']);
    await assert.rejects(componentSources(root, 'chart', { ...pins, 'react-is': '19.3.0' }), /differs from repository pin/);
    await writeFile(join(base, 'chart.dependencies.json'), JSON.stringify({ 'react-is': '^18.3.1' }));
    await assert.rejects(componentSources(root, 'chart', pins), /must be exact/);
    await writeFile(join(base, 'missing.dependencies.json'), '{}');
    await assert.rejects(componentSources(root, 'chart', pins), /Extra UI dependency metadata/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
