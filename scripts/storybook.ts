import { spawn } from 'node:child_process';
const upstream = process.argv[2] === 'upstream';
const port = process.env[upstream ? 'ARIAX_UPSTREAM_PORT' : 'ARIAX_STYLEX_PORT'] ?? (upstream ? '4100' : '4200');
const child = spawn('pnpm', ['exec', 'storybook', 'dev', '-p', port, '--host', '127.0.0.1', '--ci', '--no-open'], { stdio: 'inherit', env: { ...process.env, ARIAX_IMPLEMENTATION: upstream ? 'upstream' : 'stylex' } });
child.on('exit', code => process.exit(code ?? 1));
