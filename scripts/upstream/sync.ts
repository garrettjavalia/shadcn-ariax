import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { root } from './common';
import { acquire, ensureRaw } from './ensure';
await ensureRaw(true);
const release = await acquire(resolve(root, 'generated/.reference.lock'));
try { await rm(resolve(root, 'generated/reference'), { recursive: true, force: true }); }
finally { await release(); }
