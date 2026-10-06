export const upstreamPort = Number(process.env.ARIAX_UPSTREAM_PORT ?? 4100);
export const stylexPort = Number(process.env.ARIAX_STYLEX_PORT ?? 4200);
export const upstreamURL = `http://127.0.0.1:${upstreamPort}`;
export const stylexURL = `http://127.0.0.1:${stylexPort}`;
