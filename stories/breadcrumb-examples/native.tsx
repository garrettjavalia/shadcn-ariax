import type { ComponentProps, CSSProperties } from 'react';
export function FixtureLink(props: ComponentProps<'a'>) { return <a {...props} />; }
export const srOnly: CSSProperties = { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clipPath: 'inset(50%)', whiteSpace: 'nowrap', borderWidth: 0 };
