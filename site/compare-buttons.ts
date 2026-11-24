export const compareButtonCoverage = {
  pseudoElements: ["::before", "::after"],
  states: [":disabled", ":focus", ":focus-visible", ":hover", ":active"],
  colorTolerance: 0.002,
} as const;

export type ButtonDifference = {
  kind: "dom" | "style";
  path: string;
  property: string;
  upstream: string | null;
  ariax: string | null;
};

export type ComparedProperty = Pick<
  ButtonDifference,
  "property" | "upstream" | "ariax"
>;
export type ComputedStylePair = {
  path: string;
  properties: ComparedProperty[];
  customProperties: ComparedProperty[];
};
export type ComparedButtonState = {
  native: Record<string, boolean>;
  applied: string | null;
};

function buttonState(button: HTMLElement): ComparedButtonState {
  const native = Object.fromEntries(
    compareButtonCoverage.states.map((state) => [state, button.matches(state)]),
  );
  const applied =
    button.getAttribute("data-compare-state") ??
    button.closest<HTMLElement>("#parity-root")?.dataset.readyState ??
    null;
  return { native, applied };
}

export type ButtonComparison = {
  states: { upstream: ComparedButtonState; ariax: ComparedButtonState };
  dom: { upstream: string; ariax: string };
  computedStyles: ComputedStylePair[];
  domChecks: number;
  styleChecks: number;
  differences: ButtonDifference[];
  cssPropertyCount: number;
  customPropertyChecks: number;
  customPropertyDifferences: ButtonDifference[];
};

const idReferences = new Set(
  `aria-labelledby aria-describedby aria-controls aria-owns aria-activedescendant
   aria-details aria-errormessage aria-flowto for form list headers itemref popovertarget commandfor`.split(
    /\s+/,
  ),
);
const booleans = new Set(
  "disabled hidden inert readonly required autofocus multiple".split(" "),
);
function referencedId(element: Element, root: Element, id: string) {
  const scope = element.getRootNode() as
    Document | ShadowRoot | DocumentFragment;
  const referenced = scope.getElementById?.(id);
  if (!referenced) return `unresolved(#${id})`;
  {
    const container = root.contains(referenced)
      ? root
      : referenced.ownerDocument.documentElement;
    let path = container === root ? "button" : "document";
    const indices: number[] = [];
    for (
      let current = referenced;
      current !== container && current.parentElement;
      current = current.parentElement
    ) {
      indices.unshift(
        Array.from(current.parentElement.children).indexOf(current) + 1,
      );
    }
    for (const index of indices) path += `/element[${index}]`;
    return container === root
      ? path
      : `${path} ${referenced.localName}: ${(referenced.getAttribute("aria-label") ?? referenced.textContent ?? "").trim().replace(/\s+/g, " ")}`;
  }
}

function attribute(attr: Attr, element: Element, root: Element) {
  const { localName: name, value } = attr;
  if (attr.namespaceURI) {
    if (
      attr.namespaceURI === "http://www.w3.org/1999/xlink" &&
      name === "href" &&
      value.startsWith("#")
    )
      return referencedId(element, root, value.slice(1));
    return value;
  }
  if (name === "id") return value ? referencedId(element, root, value) : "";
  if (name === "href" && value.startsWith("#"))
    return referencedId(element, root, value.slice(1));
  if (booleans.has(name)) return "true";
  if (idReferences.has(name))
    return value
      .trim()
      .split(/\s+/)
      .map((id) => referencedId(element, root, id))
      .join(" ");
  return value;
}

function isColor(property: string) {
  return (
    property === "color" ||
    property.endsWith("-color") ||
    property === "fill" ||
    property === "stroke"
  );
}

// Convert only differing absolute computed colors, preserving the source alpha.
// A detached canvas serializes CSS colors without DOM mutations or gamut-clipped pixel reads.
function colorReader(doc: Document) {
  let context: CanvasRenderingContext2D | null | undefined;
  const cache = new Map<string, number[] | null>();
  function read(value: string) {
    if (
      !/^(?:rgba?|hsla?|hwb|oklab|oklch|lab|lch|color)\(/i.test(value) &&
      value !== "transparent"
    )
      return null;
    if (cache.has(value)) return cache.get(value)!;
    let parsed: number[] | null = null;
    const relative = `oklab(from ${value} l a b / 1)`;
    if (doc.defaultView?.CSS.supports("color", relative)) {
      const alphaText =
        value.match(/\/\s*([\d.e+-]+%?)\s*\)$/i)?.[1] ??
        value.match(/^rgba?\([^,]+,[^,]+,[^,]+,\s*([\d.e+-]+%?)\s*\)$/i)?.[1] ??
        (value === "transparent" ? "0" : "1");
      const alpha = parseFloat(alphaText) / (alphaText.endsWith("%") ? 100 : 1);
      if (context === undefined)
        context = doc.createElement("canvas").getContext("2d");
      if (!context) return null;
      // Unsupported canvas paint values leave fillStyle unchanged.
      context.fillStyle = "#010203";
      context.fillStyle = relative;
      const computed = context.fillStyle;
      const channels = computed
        .match(/^oklab\(([^/)]+)(?:\/[^)]+)?\)$/)?.[1]
        .trim()
        .split(/\s+/)
        .map(Number);
      if (
        channels?.length === 3 &&
        channels.every(Number.isFinite) &&
        Number.isFinite(alpha)
      )
        parsed = [...channels, alpha];
    }
    cache.set(value, parsed);
    return parsed;
  }
  return {
    equivalent(a: string, b: string) {
      const first = read(a),
        second = read(b);
      return Boolean(
        first &&
        second &&
        first[3] === second[3] &&
        Math.hypot(
          first[0] - second[0],
          first[1] - second[1],
          first[2] - second[2],
        ) <= compareButtonCoverage.colorTolerance,
      );
    },
  };
}

export function compareButtons(
  upstream: HTMLElement,
  ariax: HTMLElement,
): ButtonComparison {
  if (
    ![upstream, ariax].every(
      (button) => button.isConnected && button.ownerDocument.defaultView,
    )
  )
    throw new Error(
      "Both comparison buttons must be mounted in browser documents.",
    );
  const result: ButtonComparison = {
    states: { upstream: buttonState(upstream), ariax: buttonState(ariax) },
    dom: { upstream: upstream.outerHTML, ariax: ariax.outerHTML },
    computedStyles: [],
    domChecks: 0,
    styleChecks: 0,
    differences: [],
    cssPropertyCount: 0,
    customPropertyChecks: 0,
    customPropertyDifferences: [],
  };
  const colors = colorReader(document);
  const cssNames = new Set<string>();
  function check(
    kind: ButtonDifference["kind"],
    path: string,
    property: string,
    a: string | null,
    b: string | null,
  ) {
    if (kind === "dom") result.domChecks++;
    else result.styleChecks++;
    if (
      a === b ||
      (kind === "style" &&
        isColor(property) &&
        a &&
        b &&
        colors.equivalent(a, b))
    )
      return;
    result.differences.push({ kind, path, property, upstream: a, ariax: b });
  }
  function styles(
    path: string,
    a: CSSStyleDeclaration | null,
    b: CSSStyleDeclaration | null,
  ) {
    const group: ComputedStylePair = {
      path,
      properties: [],
      customProperties: [],
    };
    result.computedStyles.push(group);
    const left = new Set(a ? Array.from(a) : []);
    const right = new Set(b ? Array.from(b) : []);
    const names = new Set([...left, ...right]);
    for (const property of [...names].sort()) {
      const upstream = left.has(property)
        ? a!.getPropertyValue(property)
        : null;
      const ariax = right.has(property) ? b!.getPropertyValue(property) : null;
      if (property.startsWith("--")) {
        group.customProperties.push({ property, upstream, ariax });
        result.customPropertyChecks++;
        if (upstream !== ariax)
          result.customPropertyDifferences.push({
            kind: "style",
            path,
            property,
            upstream,
            ariax,
          });
      } else {
        group.properties.push({ property, upstream, ariax });
        cssNames.add(property);
        check("style", path, property, upstream, ariax);
      }
    }
  }
  function compare(a: Element, b: Element, path: string) {
    check("dom", path, "tag", a.localName, b.localName);
    if (a.localName === "button" || b.localName === "button") {
      const labels = (element: Element) =>
        Array.from((element as HTMLButtonElement).labels ?? [])
          .map((label) => label.textContent?.trim().replace(/\s+/g, " ") ?? "")
          .join(" | ");
      check("dom", path, "associated labels", labels(a), labels(b));
    }
    check("dom", path, "namespace", a.namespaceURI, b.namespaceURI);
    function attributes(element: Element, root: Element) {
      const values = new Map<string, string>();
      for (const attr of Array.from(element.attributes)) {
        if (
          !attr.namespaceURI &&
          (attr.localName === "class" || attr.localName === "style")
        )
          continue;
        const key = attr.namespaceURI
          ? `{${attr.namespaceURI}}${attr.localName}`
          : attr.localName;
        values.set(key, attribute(attr, element, root));
      }
      return values;
    }
    const aa = attributes(a, upstream),
      ba = attributes(b, ariax);
    for (const name of [...new Set([...aa.keys(), ...ba.keys()])].sort()) {
      check("dom", path, name, aa.get(name) ?? null, ba.get(name) ?? null);
    }
    for (const state of compareButtonCoverage.states)
      check(
        "dom",
        path,
        state,
        String(a.matches(state)),
        String(b.matches(state)),
      );
    const ar = a.getBoundingClientRect(),
      br = b.getBoundingClientRect();
    check("style", path, "rendered width", String(ar.width), String(br.width));
    check(
      "style",
      path,
      "rendered height",
      String(ar.height),
      String(br.height),
    );
    if (a !== upstream && b !== ariax) {
      const rootA = upstream.getBoundingClientRect(),
        rootB = ariax.getBoundingClientRect();
      check(
        "style",
        path,
        "offset x",
        String(ar.left - rootA.left),
        String(br.left - rootB.left),
      );
      check(
        "style",
        path,
        "offset y",
        String(ar.top - rootA.top),
        String(br.top - rootB.top),
      );
    }
    const aw = a.ownerDocument.defaultView!,
      bw = b.ownerDocument.defaultView!;
    styles(path, aw.getComputedStyle(a), bw.getComputedStyle(b));
    for (const pseudo of compareButtonCoverage.pseudoElements) {
      const ap = aw.getComputedStyle(a, pseudo),
        bp = bw.getComputedStyle(b, pseudo);
      styles(path + pseudo, ap, bp);
    }
    compareChildren(a, b, path);
    // Open shadow roots expose their own independent DOM tree.
    if (a.shadowRoot || b.shadowRoot) {
      check(
        "dom",
        path,
        "shadow root",
        a.shadowRoot?.mode ?? null,
        b.shadowRoot?.mode ?? null,
      );
      compareChildren(a.shadowRoot, b.shadowRoot, path + "/shadow");
    }
    if (
      a.localName === "template" &&
      b.localName === "template" &&
      "content" in a &&
      "content" in b
    ) {
      compareChildren(
        (a as HTMLTemplateElement).content,
        (b as HTMLTemplateElement).content,
        path + "/template",
      );
    }
  }
  function inspectUnpaired(
    element: Element,
    path: string,
    side: "upstream" | "ariax",
  ) {
    const view = element.ownerDocument.defaultView!;
    for (const pseudo of ["", ...compareButtonCoverage.pseudoElements]) {
      const values = view.getComputedStyle(element, pseudo || null);
      styles(
        path + pseudo,
        side === "upstream" ? values : null,
        side === "ariax" ? values : null,
      );
    }
    function children(owner: ParentNode, prefix: string) {
      Array.from(owner.childNodes).forEach((node, index) => {
        if (node.nodeType === 1)
          inspectUnpaired(
            node as Element,
            prefix + `/child[${index + 1}]`,
            side,
          );
      });
    }
    children(element, path);
    if (element.shadowRoot) children(element.shadowRoot, path + "/shadow");
    if (element.localName === "template" && "content" in element)
      children((element as HTMLTemplateElement).content, path + "/template");
  }
  function compareChildren(
    a: ParentNode | null,
    b: ParentNode | null,
    path: string,
  ) {
    const left = a?.childNodes ?? [],
      right = b?.childNodes ?? [];
    check(
      "dom",
      path,
      "child count",
      String(left.length),
      String(right.length),
    );
    function describe(node: ChildNode | undefined) {
      if (!node) return null;
      return node.nodeType === 1
        ? `<${(node as Element).localName}>`
        : node.nodeValue;
    }
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      const l = left[i],
        r = right[i],
        child = path + `/child[${i + 1}]`;
      check(
        "dom",
        child,
        "node type",
        l?.nodeName ?? null,
        r?.nodeName ?? null,
      );
      if (l?.nodeType === 1 && r?.nodeType === 1)
        compare(l as Element, r as Element, child);
      else {
        check("dom", child, "content", describe(l), describe(r));
        if (l?.nodeType === 1) inspectUnpaired(l as Element, child, "upstream");
        if (r?.nodeType === 1) inspectUnpaired(r as Element, child, "ariax");
      }
    }
  }
  compare(upstream, ariax, "button");
  result.cssPropertyCount = cssNames.size;
  return result;
}
