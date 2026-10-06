import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { root } from './common';
import { ensureRaw, acquire } from './ensure';
import { buildReference, referenceInputs } from './reference';

const config = await ensureRaw();
const inputs = await referenceInputs(config);
const references = [inputs, ...inputs.helperReferences.map(helper => ({
  ...inputs, helperReferences: [], components: helper.components,
  source: {...config, base: helper.base, style: helper.style},
}))];
for (const inputs of references) {
  const config = inputs.source;
  const output = resolve(root, `generated/reference/${config.base}-${config.style}`);
  await mkdir(resolve(root, 'generated/reference'), { recursive: true });
  const release = await acquire(resolve(root, 'generated/.reference.lock'));
  let staging: string | undefined;
  try {
    let valid = false;
    try {
      const marker = JSON.parse(await readFile(join(output, '.install-complete.json'), 'utf8'));
      assert.deepEqual(marker.inputs, inputs);
      assert.ok(marker.files.length > 0);
      for (const file of marker.files) assert.ok((await stat(join(output, file))).isFile());
      valid = true;
    } catch { /* Disposable installation is missing or outdated. */ }
    if (!valid) {
      staging = await mkdtemp(resolve(root, 'generated/.reference-stage-'));
      const files = await buildReference(staging, inputs);
      await writeFile(join(staging, '.install-complete.json'), JSON.stringify({ inputs, files }) + '\n');
      const previous = `${output}.previous`;
      await rm(previous, { recursive: true, force: true });
      const existed = await stat(output).then(() => true, () => false);
      if (existed) await rename(output, previous);
      try { await rename(staging, output); }
      catch (error) { if (existed) await rename(previous, output); throw error; }
      await rm(previous, { recursive: true, force: true });
    }
    // Local harness CSS may change without reinstalling the pinned component files.
    const css = await readFile(resolve(root, 'reference/tailwind.css'), 'utf8');
    if (await readFile(join(output, 'tailwind.css'), 'utf8').catch(() => '') !== css) await writeFile(join(output, 'tailwind.css'), css);
    console.log(`Prepared official CLI reference: ${inputs.components.join(', ')} (${config.base}-${config.style}).`);
  } finally {
    if (staging) await rm(staging, { recursive: true, force: true });
    await release();
  }

}
