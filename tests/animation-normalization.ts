// Expand translation/scale derivatives to their CSS interpolation primitive.
// Keep dimensions, function order and list length: matrix equivalence alone
// does not prove an equivalent path (for example rotate(0deg) vs rotate(360deg)).
export function normalizeKeyframeTransform(value: string): string {
  const functions = [...value.matchAll(/([a-z][a-z0-9]*)\(([^()]*)\)/gi)];
  if (
    !functions.length ||
    value.replace(/([a-z][a-z0-9]*)\(([^()]*)\)/gi, "").trim()
  )
    return value;
  const length = (value: string) => {
    const match = /^([-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(px|%)?$/i.exec(
      value,
    );
    if (!match || !Number.isFinite(Number(match[1]))) return null;
    return Number(match[1]) === 0
      ? "0px"
      : `${Number(match[1])}${match[2] ?? ""}`;
  };
  const scale = (value: string) => {
    const match = /^([-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(%)?$/i.exec(value);
    if (!match || !Number.isFinite(Number(match[1]))) return null;
    return String(Number(match[1]) / (match[2] ? 100 : 1));
  };
  return functions
    .map(([original, name, body]) => {
      const args = body.split(",").map((value) => value.trim());
      if (/^translate(?:[XYZ]|3d)?$/.test(name)) {
        const channels = args.map(length);
        if (channels.includes(null)) return original;
        if (name === "translate" && [1, 2].includes(args.length))
          return `translate(${channels[0]}, ${channels[1] ?? "0px"})`;
        if (args.length === 1 && name === "translateX")
          return `translate(${channels[0]}, 0px)`;
        if (args.length === 1 && name === "translateY")
          return `translate(0px, ${channels[0]})`;
        if (args.length === 1 && name === "translateZ")
          return `translate3d(0px, 0px, ${channels[0]})`;
        if (args.length === 3 && name === "translate3d")
          return `translate3d(${channels.join(", ")})`;
      }
      if (/^scale(?:[XYZ]|3d)?$/.test(name)) {
        const channels = args.map(scale);
        if (channels.includes(null)) return original;
        if (name === "scale" && [1, 2].includes(args.length))
          return `scale(${channels[0]}, ${channels[1] ?? channels[0]})`;
        if (args.length === 1 && name === "scaleX")
          return `scale(${channels[0]}, 1)`;
        if (args.length === 1 && name === "scaleY")
          return `scale(1, ${channels[0]})`;
        if (args.length === 1 && name === "scaleZ")
          return `scale3d(1, 1, ${channels[0]})`;
        if (args.length === 3 && name === "scale3d")
          return `scale3d(${channels.join(", ")})`;
      }
      return original;
    })
    .join(" ");
}
