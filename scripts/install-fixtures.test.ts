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

test('composition fixture dependencies require matching exact repository pins and a fixture', async () => {
  const root = await mkdtemp(join(tmpdir(), 'ariax-fixture-dependencies-'));
  try {
    await mkdir(join(root,'public'));
    await mkdir(join(root,'tests/install'),{recursive:true});
    await writeFile(join(root,'public/registry.json'),JSON.stringify({name:'ariax',homepage:'https://example.com',items:[{name:'table',type:'registry:ui',files:[{path:'registry/ariax/ui/table.tsx',type:'registry:ui',target:'@ui/table.tsx'}]}]}));
    await writeFile(join(root,'tests/install/table.tsx'),'export default function Fixture(){return null}');
    await writeFile(join(root,'package.json'),JSON.stringify({devDependencies:{'@tanstack/react-table':'9.0.0'}}));
    const sidecar=join(root,'tests/install/table.dependencies.json');
    await writeFile(sidecar,JSON.stringify({'@tanstack/react-table':'9.0.0'}));
    assert.deepEqual((await collectInstallFixtures(root))[0].dependencies,{'@tanstack/react-table':'9.0.0'});
    await writeFile(sidecar,JSON.stringify({'@tanstack/react-table':'^9.0.0'}));
    await assert.rejects(collectInstallFixtures(root),/must be exact/);
    await writeFile(sidecar,JSON.stringify({'@tanstack/react-table':'9.0.1'}));
    await assert.rejects(collectInstallFixtures(root),/differs from repository pin/);
    await rm(sidecar);
    await writeFile(join(root,'tests/install/extra.dependencies.json'),'{}');
    await assert.rejects(collectInstallFixtures(root),/Extra install fixture dependencies/);
  } finally {await rm(root,{recursive:true,force:true});}
});

test('intrinsic recipe registry files install through recipe aliases without upstream UI entries',async()=>{
 const root=await mkdtemp(join(tmpdir(),'ariax-recipe-fixtures-'));
 try{
  await mkdir(join(root,'public'));await mkdir(join(root,'tests/install'),{recursive:true});
  await writeFile(join(root,'public/registry.json'),JSON.stringify({name:'ariax',homepage:'https://example.com',items:[{name:'typography',type:'registry:file',files:[{path:'registry/ariax/ui/typography.recipe.stylex.ts',type:'registry:file',target:'@ui/typography.recipe.stylex.ts'}]}]}));
  await assert.rejects(collectInstallFixtures(root),/Missing install fixture: typography/);
  await writeFile(join(root,'tests/install/typography.tsx'),'export default function Fixture(){return null}');
  const[fixture]=await collectInstallFixtures(root);assert.equal(fixture.alias,'@typography-recipes');assert.equal(fixture.installedPath,'src/components/ui/typography.recipe.stylex.ts');
 }finally{await rm(root,{recursive:true,force:true});}
});
