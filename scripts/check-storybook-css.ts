import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from '@babel/parser';

type AstNode = Record<string, unknown>;
const node = (value: unknown): AstNode | undefined => value !== null && typeof value === 'object' && !Array.isArray(value) ? value as AstNode : undefined;
function walk(value: unknown, visit: (current: AstNode) => void): void {
  if (Array.isArray(value)) { for (const child of value) walk(child, visit); return; }
  const current = node(value);
  if (!current) return;
  visit(current);
  for (const child of Object.values(current)) walk(child, visit);
}

// Every compiled StyleX class must be available before a lazy story is imported.
const directory = resolve(process.argv[2] ?? 'dist/stylex');
const html = await readFile(resolve(directory, 'iframe.html'), 'utf8');
const stylesheets = [...html.matchAll(/<link\b[^>]*>/g)].map(match => match[0])
  .filter(link => /\brel=["']stylesheet["']/.test(link))
  .map(link => /\bhref=["']([^"']+)["']/.exec(link)?.[1]).filter((href): href is string => !!href);
assert.ok(stylesheets.length > 0, 'Storybook iframe must load a stylesheet');
const base = process.env.ARIAX_STORYBOOK_BASE ?? '/';
const entryCSS = (await Promise.all(stylesheets.map(href => {
  const path = href.startsWith(base) ? href.slice(base.length) : href.replace(/^\//, '');
  return readFile(resolve(directory, path), 'utf8');
}))).join('\n');
const classes = new Set<string>();
for (const file of await readdir(resolve(directory, 'assets'))) {
  if (!file.endsWith('.js')) continue;
  const ast = parse(await readFile(resolve(directory, 'assets', file), 'utf8'), { sourceType: 'module' });
  walk(ast, current => {
    if (current.type !== 'ObjectExpression') return;
    const properties = (current.properties as unknown[]).map(node).filter((property): property is AstNode => !!property && property.type === 'ObjectProperty');
    const key = (property: AstNode) => node(property.key)?.name ?? node(property.key)?.value;
    if (!properties.some(property => key(property) === '$$css')) return;
    for (const property of properties) {
      if (key(property) === '$$css') continue;
      const value = node(property.value);
      if (value?.type === 'StringLiteral') for (const className of String(value.value).split(/\s+/)) classes.add(className);
    }
  });
}
assert.ok(classes.size > 0, 'No compiled StyleX classes found in Storybook');
const selectors = new Set([...entryCSS.matchAll(/\.([A-Za-z_][\w-]*)/g)].map(match => match[1]));
const missing = [...classes].filter(className => !selectors.has(className));
assert.equal(missing.length, 0, `StyleX classes missing from iframe entry CSS: ${missing.slice(0, 20).join(', ')} (${missing.length} total)`);
console.log(`Storybook entry CSS contains all ${classes.size} compiled StyleX classes.`);
