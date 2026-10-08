import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { loadCsf } from 'storybook/internal/csf-tools';
import { generateOriginalStories } from './original-stories';

test('official examples keep the fixture IDs and test tags without duplicate upstream registrations', async () => {
  const repo = await mkdtemp(resolve(tmpdir(), 'ariax-originals-'));
  const upstream = resolve(repo, 'upstream-source');
  const save = async (file: string, source: string) => { const path = resolve(repo, file); await mkdir(resolve(path, '..'), { recursive: true }); await writeFile(path, source); };
  const fixture = `
    const meta = { title: 'Components/Example', tags: ['parity'], excludeStories: ['helper'], decorators: [Story => <main id="parity-root"><Story /></main>] };
    export default meta;
    export const helper = ['not a story'];
    export const Demo = { parameters: { originalExample: 'example-demo' }, tags: ['viewport-390'], render: () => <div>adapted</div> };
    export const State = { tags: ['!parity'], render: () => <div>state</div> };
    export function FunctionStory() { return <div>function</div>; }
  `;
  try {
    await save('stories/example.stories.tsx', fixture);
    await save('upstream-source/apps/v4/content/docs/components/aria/example.mdx', '<ComponentPreview name="example-demo" />\n<ComponentPreview name="example-external" />');
    await save('upstream-source/apps/v4/examples/aria/example-demo.tsx', 'export default function ExampleDemo() { return <div className="p-4">official</div> }');
    await save('upstream-source/apps/v4/examples/aria/example-external.tsx', 'export default function External() { return <div /> }');
    await save('upstream/original-exceptions.json', JSON.stringify({ 'example-external': 'Requires an external renderer outside this implementation.' }));
    const manifest = await generateOriginalStories(repo, upstream);
    assert.equal(manifest.previews[0].counterparts[0].storyId, 'components-example--demo');
    assert.equal(manifest.previews[1].status, 'excluded');
    const output = resolve(repo, 'generated/original-stories');
    const linked = await readFile(resolve(output, 'linked-stories-example-stories-tsx.stories.tsx'), 'utf8');
    const originalIndex = loadCsf(fixture, { makeTitle: title => title, fileName: 'example.stories.tsx' }).parse().indexInputs;
    const linkedIndex = loadCsf(linked, { makeTitle: title => title, fileName: 'example.stories.tsx' }).parse().indexInputs;
    assert.deepEqual(linkedIndex.map(x => x.type === 'story' ? x.__id : x.type), originalIndex.map(x => x.type === 'story' ? x.__id : x.type));
    assert.ok(linkedIndex.find(x => x.exportName === 'Demo')?.tags?.includes('viewport-390'));
    assert.ok(linkedIndex.find(x => x.exportName === 'State')?.tags?.includes('!parity'));
    assert.ok(linked.includes('export const FunctionStory = fixtures.FunctionStory;'));
    assert.ok(!linked.includes('className="p-4"'), 'The official TSX is imported, not rewritten');
    const standalone = await readFile(resolve(output, 'example.stories.tsx'), 'utf8');
    assert.ok(!standalone.includes('example-demo.tsx'));
    assert.ok(standalone.includes('example-external.tsx'));
    await save('upstream/original-exceptions.json', '{}');
    await assert.rejects(generateOriginalStories(repo, upstream), /example-external/);
    await save('upstream/original-exceptions.json', JSON.stringify({ 'example-demo': 'Stale exclusion', 'example-external': 'External renderer' }));
    await assert.rejects(generateOriginalStories(repo, upstream), /Remove the exclusion/);
    await save('upstream/original-exceptions.json', JSON.stringify({ 'unknown-example': 'Stale name' }));
    await assert.rejects(generateOriginalStories(repo, upstream), /Stale official example exclusion/);
    await save('stories/example.stories.tsx', fixture.replace('example-demo', 'typo-demo'));
    await assert.rejects(generateOriginalStories(repo, upstream), /Unknown official example/);
  } finally { await rm(repo, { recursive: true, force: true }); }
});
