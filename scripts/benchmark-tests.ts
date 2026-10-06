import { upstreamPort, stylexPort } from '../tests/servers';
import { spawn } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';

const servers = await Promise.all([upstreamPort, stylexPort].map(async port => ({ port, ready: await fetch(`http://127.0.0.1:${port}/index.json`).then(r => r.ok, () => false) })));
const start = performance.now();
const command = ['test', ...process.argv.slice(2)];
const child = spawn('pnpm', command, { stdio: 'inherit', env: { ...process.env, PARITY_PROFILE: '1' } });
const exitCode = await new Promise<number>((done, fail) => { child.on('error', fail); child.on('close', code => done(code ?? 1)); });
const wallSeconds = (performance.now() - start) / 1000;
const report = JSON.parse(await readFile('test-results/results.json', 'utf8'));
const totals = { comparisons: 0, navigations: 0, navigationMs: 0, settleMs: 0, snapshotMs: 0, diffMs: 0, pixelsMs: 0 };
type Suite = { suites?: Suite[]; specs?: { tests: { annotations?: { type: string; description?: string }[] }[] }[] };
function visit(suites: Suite[]) {
  for (const suite of suites) {
    for (const spec of suite.specs ?? []) for (const test of spec.tests) for (const annotation of test.annotations ?? []) {
      if (!annotation.description) continue;
      if (annotation.type === 'parity-timing') {
        const timing = JSON.parse(annotation.description); totals.comparisons++;
        for (const key of ['settleMs', 'snapshotMs', 'diffMs', 'pixelsMs'] as const) totals[key] += timing[key];
      }
      if (annotation.type === 'parity-navigation') { totals.navigations++; totals.navigationMs += JSON.parse(annotation.description).ms; }
    }
    visit(suite.suites ?? []);
  }
}
visit(report.suites);
const result = { command: `pnpm ${command.join(' ')}`, wallSeconds, servers, workers: report.config.workers, exitCode, tests: report.stats, summedPhaseTimes: totals };
await writeFile('test-results/benchmark.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
process.exitCode = exitCode;
