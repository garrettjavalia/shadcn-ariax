import type { Page } from "@playwright/test";

export type Difference = { path: string; upstream: unknown; stylex: unknown };

export async function filterColorDifferences(page: Page, diffs: Difference[]) {
  const candidates = diffs.filter(
    ({ path, upstream, stylex }) =>
      /\/(?:css|pseudos\/::[^/]+)\/(?:color|[\w-]+-color|fill|stroke)$/.test(
        path,
      ) &&
      typeof upstream === "string" &&
      typeof stylex === "string",
  );
  if (!candidates.length) return diffs;
  const pairs = [
    ...new Map(
      candidates.map((d) => [
        JSON.stringify([d.upstream, d.stylex]),
        [d.upstream, d.stylex] as [string, string],
      ]),
    ).values(),
  ];
  const equivalent = await page.evaluate((pairs) => {
    const probe = document.createElement("span");
    probe.style.setProperty("all", "initial", "important");
    probe.style.setProperty("display", "none", "important");
    document.documentElement.append(probe);
    const cache = new Map<string, number[] | null>();
    const convert = (value: string) => {
      if (cache.has(value)) return cache.get(value)!;
      let result: number[] | null = null;
      const relative = `oklab(from ${value} l a b / alpha)`;
      if (
        !/^(currentcolor|inherit|initial|unset|revert|revert-layer)$/i.test(
          value,
        ) &&
        CSS.supports("color", relative)
      ) {
        probe.style.setProperty("color", relative, "important");
        const match = /^oklab\(([^)]+)\)$/.exec(getComputedStyle(probe).color);
        if (match) {
          const [lab, alpha = "1"] = match[1].split("/");
          const channels = [
            ...lab.trim().split(/\s+/).map(Number),
            Number(alpha),
          ];
          if (channels.length === 4 && channels.every(Number.isFinite))
            result = channels;
        }
      }
      cache.set(value, result);
      return result;
    };
    try {
      return pairs.map(([left, right]) => {
        const a = convert(left),
          b = convert(right);
        // CSS optimization changes color notation and precision; compare unclipped OKLab instead of strings.
        // ΔE ≤ 0.002 covers the measured conversion noise (max 0.001763); alpha stays exact.
        return (
          !!a &&
          !!b &&
          a[3] === b[3] &&
          Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) <= 0.002
        );
      });
    } finally {
      probe.remove();
    }
  }, pairs);
  const accepted = new Set(
    pairs.filter((_, i) => equivalent[i]).map((pair) => JSON.stringify(pair)),
  );
  const tolerated = new Set(
    candidates.filter((d) =>
      accepted.has(JSON.stringify([d.upstream, d.stylex])),
    ),
  );
  return diffs.filter((d) => !tolerated.has(d));
}
