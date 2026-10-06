import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { collectInstallFixtures } from './install-fixtures';

test('install fixtures reject missing, extra and duplicate component coverage', async () => {
  const root = await mkdtemp(join(tmpdir(), 'ariax-install-fixtures-'));
  try {
    await mkdir(join(root, 'public'));
    await mkdir(join(root, 'tests/install'), { recursive: true });
    await writeFile(join(root, 'public/registry.json'), JSON.stringify({ name: 'ariax', homepage: 'https://example.com', items: [{ name: 'button', type: 'registry:ui', files: [{ path: 'registry/ariax/ui/button.tsx', type: 'registry:ui', target: '@ui/button.tsx' }] }] }));
    await assert.rejects(collectInstallFixtures(root), /Missing install fixture: button/);
    await writeFile(join(root, 'tests/install/button.tsx'), 'export default function Fixture() { return null; }');
    const result = await collectInstallFixtures(root);
    assert.equal(result.length, 1);
    assert.equal(result[0].alias, '@button');
    assert.equal(result[0].installedPath, 'src/components/ui/button.tsx');
    await writeFile(join(root, 'tests/install/extra.tsx'), '');
    await assert.rejects(collectInstallFixtures(root), /Extra install fixture: extra/);
    await rm(join(root, 'tests/install/extra.tsx'));
    await mkdir(join(root, 'tests/install/duplicate'));
    await writeFile(join(root, 'tests/install/duplicate/button.tsx'), '');
    await assert.rejects(collectInstallFixtures(root), /Duplicate install fixture: button/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
