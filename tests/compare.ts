import { expect, type Page, type TestInfo } from '@playwright/test';
import { PNG } from 'pngjs';
import { isDeepStrictEqual } from 'node:util';

export async function snapshot(page: Page) {
  const captured = await page.evaluate(() => {
    // A non-filling CSS animation disappears from getAnimations() at its end,
    // while animation-name remains computed until React clears the state. Keep
    // the observed effect handle to compare its real metadata at that boundary.
    const scope = window as Window & { parityAnimationEffects?: WeakMap<Element, CSSAnimation[]> };
    const effects = scope.parityAnimationEffects ??= new WeakMap<Element, CSSAnimation[]>();
    const animations = (node: Element) => {
      const active = node.getAnimations().filter((animation): animation is CSSAnimation => animation instanceof CSSAnimation);
      const matching = (animation: CSSAnimation) => {
        const effect = animation.effect as KeyframeEffect;
        return getComputedStyle(node, effect.pseudoElement).animationName.split(',').map(name => name.trim()).includes(animation.animationName);
      };
      const previous = (effects.get(node) ?? []).filter(animation => matching(animation) && !active.some(current => current.animationName === animation.animationName && (current.effect as KeyframeEffect).pseudoElement === (animation.effect as KeyframeEffect).pseudoElement));
      const observed = [...active, ...previous];
      effects.set(node, observed);
      return observed;
    };
    const root = document.querySelector('#parity-root');
    if (!root) throw new Error('Missing parity root');
    // Explicitly registered portals are compared alongside the story tree.
    const roots = [root, ...document.querySelectorAll('[data-parity-portal]')];
    const elements = roots.flatMap(r => [r, ...r.querySelectorAll('*')]);
    const ids = new Map(elements.filter(e => e.id).map((e, i) => [e.id, e.id.startsWith('react-aria') ? `generated:${i}` : e.id]));
    // React Aria collection tokens are not DOM IDs. Remove only the random
    // provider prefix; retain the React-local identity and equality relationships.
    const providers = new Map<string, number>();
    const collectionToken = (value: string) => value.replace(/^react-aria\d+-/, prefix => {
      if (!providers.has(prefix)) providers.set(prefix, providers.size);
      return `react-aria-provider:${providers.get(prefix)}-`;
    });
    const references = new Set(['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns', 'aria-activedescendant', 'for']);
    const styleBank: Record<string, string>[] = [];
    const styleIds = new Map<string, number>();
    const style = (element: Element, pseudo?: string) => {
      const css = getComputedStyle(element, pseudo);
      const values = Object.fromEntries([...css].filter(k => !k.startsWith('--')).sort().map(k => [k, css.getPropertyValue(k)]));
      const key = JSON.stringify(values);
      let id = styleIds.get(key);
      if (id === undefined) { id = styleBank.length; styleBank.push(values); styleIds.set(key, id); }
      return { $style: id };
    };
    const rect = (r: DOMRect) => ({ x: r.x, y: r.y, width: r.width, height: r.height });
    const nodes = (node: Node, path: string): unknown => {
      if (node.nodeType === Node.TEXT_NODE) {
        const range = document.createRange(); range.selectNodeContents(node);
        return { path, text: node.textContent, rects: [...range.getClientRects()].map(rect) };
      }
      if (!(node instanceof Element)) return { path, type: node.nodeType };
      return {
        path, tag: node.tagName,
        attrs: Object.fromEntries([...node.attributes]
          .filter(a => !['class', 'style'].includes(a.name))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(a => [a.name, a.name === 'id' ? ids.get(a.value) : (a.name === 'data-collection' || (a.name === 'name' && node instanceof HTMLInputElement && node.type === 'radio' && /^react-aria\d+-_r_[a-z0-9]+_$/.test(a.value))) ? collectionToken(a.value) : references.has(a.name) ? a.value.split(/\s+/).map(id => ids.get(id) ?? `external:${id}`).join(' ') : a.value])),
        animations: animations(node).map(animation => {
          const effect = animation.effect;
          if (!(effect instanceof KeyframeEffect)) throw new Error('Missing CSS animation keyframe effect');
          return { name: (animation as CSSAnimation).animationName, pseudo: effect.pseudoElement,
            frames: effect.getKeyframes(), timing: { ...effect.getTiming(), iterations: effect.getTiming().iterations === Infinity ? 'Infinity' : effect.getTiming().iterations } };
        }),
        css: style(node),
        pseudos: Object.fromEntries(['::before', '::after', '::marker', ...(node.matches('input, textarea') ? ['::placeholder'] : []), ...(node.matches('input[type="file"]') ? ['::file-selector-button'] : [])].map(p => [p, style(node, p)])),
        rect: rect(node.getBoundingClientRect()),
        scroll: [node.scrollWidth, node.scrollHeight, node.scrollLeft, node.scrollTop],
        focused: document.activeElement === node,
        children: [...node.childNodes].map((n, i) => nodes(n, `${path}/${i}`)),
      };
    };
    return { roots: roots.map((r, i) => nodes(r, `root:${i}`)), styleBank };
  });
  // Intern identical computed styles to avoid sending thousands of duplicates over CDP.
  // Values are compared exactly; no hashes, property allowlists or numeric tolerances.
  const expand = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(expand);
    if (value && typeof value === "object") {
      if ("$style" in value) return captured.styleBank[(value as { $style: number }).$style];
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, expand(v)]));
    }
    return value;
  };
  return expand(captured.roots);
}

// Generated CSS animation names are identifiers, but only equivalent effects may
// share an identifier. Compare resolved keyframes and timing before rewriting CSS.
export function normalizeAnimationSnapshots(left: unknown, right: unknown): [unknown, unknown] {
  const collect = (value: unknown): unknown[] => {
    if (Array.isArray(value)) return value.flatMap(collect);
    if (!value || typeof value !== 'object') return [];
    const node = value as Record<string, unknown>;
    const own = Array.isArray(node.animations) && node.animations.length ? [{ path: node.path, effects: node.animations.map(({ name: _name, ...effect }) => effect) }] : [];
    return [...own, ...collect(node.children)];
  };
  if (!isDeepStrictEqual(collect(left), collect(right))) return [left, right];
  const normalize = (value: unknown): unknown => {
    if (!value || typeof value !== 'object') return value;
    if (Array.isArray(value)) {
      const items = value.map(normalize);
      return items.every((item, index) => item === value[index]) ? value : items;
    }
    const node = value as Record<string, unknown>;
    if (Array.isArray(node.animations) && node.animations.length) {
      const effects = node.animations as { name: string; pseudo: string | null }[];
      const css = (value: unknown, pseudo: string | null) => {
        const properties = value as Record<string, string>;
        const names = new Map(effects.flatMap((effect, index) => effect.pseudo === pseudo ? [[effect.name, `effect:${index}`] as const] : []));
        if (!names.size) return properties;
        const normalized = { ...properties };
        if (properties['animation-name']) normalized['animation-name'] = properties['animation-name'].split(',').map(name => names.get(name.trim()) ?? name.trim()).join(', ');
        if (properties.animation) normalized.animation = properties.animation.split(' ').map(token => names.get(token) ?? token).join(' ');
        return normalized;
      };
      return { ...node, animations: effects.map((effect, index) => ({ ...effect, name: `effect:${index}` })),
        css: css(node.css, null), pseudos: Object.fromEntries(Object.entries(node.pseudos as Record<string, unknown>).map(([pseudo, value]) => [pseudo, css(value, pseudo)])),
        children: normalize(node.children) };
    }
    const children = normalize(node.children);
    return children === node.children ? node : { ...node, children };
  };
  return [normalize(left), normalize(right)];
}

export function differences(a: unknown, b: unknown, path = ''): { path: string; upstream: unknown; stylex: unknown }[] {
  if (Object.is(a, b)) return [];
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    return [...new Set([...Object.keys(a), ...Object.keys(b)])].flatMap(k => differences((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], `${path}/${k}`));
  }
  return [{ path, upstream: a, stylex: b }];
}

export async function settle(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const frames = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    // Let React effects and focus restoration start their transitions before sampling.
    await frames();
    for (;;) {
      const animations = document.getAnimations();
      // Infinite spinners are sampled at a fixed phase, not disabled.
      for (const animation of animations) if (animation.effect?.getComputedTiming().iterations === Infinity) { animation.pause(); animation.currentTime = 250; }
      const finite = animations.filter(a => a.effect?.getComputedTiming().iterations !== Infinity && (a.playState === 'running' || a.pending));
      if (!finite.length) break;
      await Promise.all(finite.map(a => a.finished.catch(() => {})));
      await frames();
    }
  });
}

export function pixelsMatch(a: PNG, b: PNG): boolean {
  if (a.width !== b.width || a.height !== b.height) return false;
  let changed = 0;
  for (let i = 0; i < a.data.length; i += 4) {
    let different = false;
    for (let channel = 0; channel < 4; channel++) {
      const delta = Math.abs(a.data[i + channel] - b.data[i + channel]);
      if (delta > 1) return false;
      different ||= delta !== 0;
    }
    if (different && ++changed > a.width * a.height * 0.001) return false;
  }
  return true;
}

export async function compare(a: Page, b: Page, info: TestInfo, state: string, pixels = true, settleAnimations = true) {
  const started = performance.now();
  if (settleAnimations) await Promise.all([settle(a), settle(b)]);
  else await Promise.all([a, b].map(page => page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  })));
  const settled = performance.now();
  const raw = await Promise.all([snapshot(a), snapshot(b)]);
  const [left, right] = normalizeAnimationSnapshots(raw[0], raw[1]);
  const captured = performance.now();
  // Passing comparisons need only exact equality. Build detailed path/value
  // differences on failure, avoiding per-property path strings and arrays on success.
  const diff = isDeepStrictEqual(left, right) ? [] : differences(left, right);
  const compared = performance.now();
  if (diff.length) await info.attach(`${state}-dom-css-diff`, { body: JSON.stringify(diff, null, 2), contentType: 'application/json' });
  expect(diff.length, `${state}: ${JSON.stringify(diff.slice(0, 8))} (full diff attached)`).toBe(0);
  if (pixels) {
    const portals = await a.locator('[data-parity-portal]').count();
    const shots = await Promise.all([a, b].map(p => portals ? p.screenshot({ caret: 'hide', fullPage: true }) : p.locator('#parity-root').screenshot({ caret: 'hide' })));
    const [x, y] = shots.map(buffer => PNG.sync.read(buffer));
    // Only after exact DOM/CSS/geometry agreement: tolerate sparse 1/255 raster noise.
    const equal = pixelsMatch(x, y);
    if (!equal) for (let i = 0; i < 2; i++) await info.attach(`${state}-${i ? 'stylex' : 'upstream'}`, { body: shots[i], contentType: 'image/png' });
    expect(equal, `${state}: RGBA difference exceeds 1/255 per channel or 0.1% of pixels`).toBe(true);
  }
  if (process.env.PARITY_PROFILE === '1') info.annotations.push({
    type: 'parity-timing',
    description: JSON.stringify({ state, settleMs: settled - started, snapshotMs: captured - settled, diffMs: compared - captured, pixelsMs: performance.now() - compared }),
  });
}
