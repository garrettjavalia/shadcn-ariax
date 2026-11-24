import assert from "node:assert/strict";
import { dirname, posix } from "node:path";
import { parse } from "@babel/parser";
import {
  traverse,
  types as t,
  transformFromAstSync,
  type NodePath,
} from "@babel/core";
import { format } from "prettier";

export type ExampleFile = { path: string; contents: string };
type ImportBinding = { source: string; imported: string; typeOnly: boolean };
type ExportBinding = { local: string } | ImportBinding;
type Module = {
  file: string;
  ast: t.File;
  imports: Map<string, ImportBinding>;
  exports: Map<string, ExportBinding>;
  star: string[];
  names: Map<string, string>;
};

function uniqueName(preferred: string, used: Set<string>) {
  let name = preferred;
  let suffix = 2;
  while (used.has(name)) name = preferred + suffix++;
  used.add(name);
  return name;
}
const exportedName = (name: t.Identifier | t.StringLiteral) =>
  t.isIdentifier(name) ? name.name : name.value;

function readModule(file: ExampleFile): Module {
  const ast = parse(file.contents, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });
  const result: Module = {
    file: file.path,
    ast,
    imports: new Map(),
    exports: new Map(),
    star: [],
    names: new Map(),
  };
  const body: t.Statement[] = [];
  function declare(statement: t.Declaration, exported: boolean) {
    const items = t.isVariableDeclaration(statement)
      ? statement.declarations.map((d) =>
          t.variableDeclaration(statement.kind, [d]),
        )
      : [statement];
    for (const item of items) {
      const names = Object.keys(t.getOuterBindingIdentifiers(item));
      if (t.isTSTypeAliasDeclaration(item) || t.isTSInterfaceDeclaration(item))
        names.push(item.id.name);
      for (const name of names) {
        result.names.set(name, name);
        if (exported) result.exports.set(name, { local: name });
      }
      body.push(item);
    }
  }
  for (const node of ast.program.body) {
    if (t.isImportDeclaration(node)) {
      for (const spec of node.specifiers)
        result.imports.set(spec.local.name, {
          source: node.source.value,
          imported: t.isImportSpecifier(spec)
            ? exportedName(spec.imported)
            : t.isImportDefaultSpecifier(spec)
              ? "default"
              : "*",
          typeOnly:
            node.importKind === "type" ||
            (t.isImportSpecifier(spec) && spec.importKind === "type"),
        });
    } else if (t.isExportNamedDeclaration(node)) {
      if (node.declaration) declare(node.declaration, true);
      for (const spec of node.specifiers) {
        assert.ok(
          t.isExportSpecifier(spec),
          "Unsupported export in " + file.path,
        );
        result.exports.set(
          exportedName(spec.exported),
          node.source
            ? {
                source: node.source.value,
                imported: spec.local.name,
                typeOnly:
                  node.exportKind === "type" || spec.exportKind === "type",
              }
            : { local: spec.local.name },
        );
      }
    } else if (t.isExportAllDeclaration(node)) {
      result.star.push(node.source.value);
    } else if (t.isExportDefaultDeclaration(node)) {
      const dec = node.declaration;
      let name: string;
      if (t.isIdentifier(dec)) name = dec.name;
      else if (t.isFunctionDeclaration(dec) || t.isClassDeclaration(dec)) {
        name = dec.id?.name || "Example";
        dec.id = t.identifier(name);
        declare(dec, false);
      } else {
        assert.ok(
          t.isExpression(dec),
          "Unsupported default export in " + file.path,
        );
        name = "Example";
        declare(
          t.variableDeclaration("const", [
            t.variableDeclarator(t.identifier(name), dec),
          ]),
          false,
        );
      }
      result.exports.set("default", { local: name });
    } else if (t.isDeclaration(node)) declare(node, false);
    else body.push(node);
  }
  // Imports stay in scope until their local bindings have been linked and renamed.
  ast.program.body = [
    ...ast.program.body.filter((n) => t.isImportDeclaration(n)),
    ...body,
  ];
  return result;
}

function print(program: t.File) {
  const result = transformFromAstSync(program, undefined, {
    babelrc: false,
    configFile: false,
    comments: false,
  });
  assert.ok(result?.code);
  return result.code;
}

function publicModule(
  imports: Map<string, ImportBinding>,
  local: string,
  source: string,
  imported: string,
  typeOnly: boolean,
) {
  const old = imports.get(local);
  imports.set(local, {
    source,
    imported,
    typeOnly: typeOnly && (old?.typeOnly ?? true),
  });
}

function importStatements(bindings: Map<string, ImportBinding>) {
  const groups = new Map<string, t.ImportDeclaration>();
  for (const [local, { source, imported, typeOnly }] of bindings) {
    const key =
      source +
      (imported === "*"
        ? ":namespace"
        : imported === "default"
          ? ":default"
          : ":named") +
      (typeOnly ? ":type" : "");
    const group =
      groups.get(key) ?? t.importDeclaration([], t.stringLiteral(source));
    if (typeOnly) group.importKind = "type";
    group.specifiers.push(
      imported === "*"
        ? t.importNamespaceSpecifier(t.identifier(local))
        : imported === "default"
          ? t.importDefaultSpecifier(t.identifier(local))
          : t.importSpecifier(t.identifier(local), t.identifier(imported)),
    );
    groups.set(key, group);
  }
  return [...groups.values()];
}

function link(files: ExampleFile[]) {
  const modules = new Map(files.map((file) => [file.path, readModule(file)]));
  const [entry] = modules.values();
  const used = new Set<string>();
  const publicBindings = new Map<string, ImportBinding>();
  const externalNames = new Map<string, string>();
  const ordered: Module[] = [];
  const visited = new Set<string>();
  function dependency(module: Module, source: string) {
    const path = posix.normalize(posix.join(dirname(module.file), source));
    const result =
      modules.get(path) ??
      modules.get(path + ".ts") ??
      modules.get(path + ".tsx");
    assert.ok(result, `Missing ${source} imported by ${module.file}`);
    return result;
  }
  function resolveImport(
    module: Module,
    spec: ImportBinding,
    suggest: string,
  ): string {
    if (spec.source.startsWith("."))
      return resolveExport(
        dependency(module, spec.source),
        spec.imported,
        suggest,
      );
    const key = spec.source + "#" + spec.imported;
    let name = externalNames.get(key);
    if (!name) {
      name = uniqueName(suggest, used);
      externalNames.set(key, name);
    }
    publicModule(
      publicBindings,
      name,
      spec.source,
      spec.imported,
      spec.typeOnly,
    );
    return name;
  }
  function resolveExport(
    module: Module,
    exported: string,
    suggest: string,
  ): string {
    const binding = module.exports.get(exported);
    if (binding && "local" in binding) {
      const imp = module.imports.get(binding.local);
      if (imp) return resolveImport(module, imp, suggest);
      const name = module.names.get(binding.local);
      assert.ok(
        name,
        "Missing local export " + module.file + "#" + binding.local,
      );
      return name;
    }
    if (binding) return resolveImport(module, binding, suggest);
    assert.equal(
      module.star.length,
      1,
      "Cannot resolve " + module.file + "#" + exported,
    );
    return resolveImport(
      module,
      { source: module.star[0], imported: exported, typeOnly: false },
      suggest,
    );
  }
  for (const module of modules.values()) {
    for (const name of module.names.keys())
      module.names.set(name, uniqueName(name, used));
  }
  function append(module: Module) {
    if (visited.has(module.file)) return;
    visited.add(module.file);
    for (const [local, spec] of module.imports) {
      module.names.set(local, resolveImport(module, spec, local));
      if (spec.source.startsWith(".")) append(dependency(module, spec.source));
    }
    for (const spec of module.exports.values())
      if ("source" in spec && spec.source.startsWith("."))
        append(dependency(module, spec.source));
    for (const source of module.star)
      if (source.startsWith(".")) append(dependency(module, source));
    ordered.push(module);
  }
  append(entry);
  for (const module of ordered) {
    traverse(module.ast, {
      Program(path) {
        // Babel bindings cover JS, JSX, and imported TS names. Interfaces/type
        // aliases need their own identifier handling because Babel erases them.
        const types = new Map<string, string>();
        for (const [original, name] of module.names) {
          if (original === name) continue;
          if (path.scope.hasOwnBinding(original))
            path.scope.rename(original, name);
          else types.set(original, name);
        }
        if (types.size)
          path.traverse({
            Identifier(p) {
              const next = types.get(p.node.name);
              if (
                next &&
                ((p.parentPath.isTSTypeReference() && p.key === "typeName") ||
                  (p.parentPath.isTSExpressionWithTypeArguments() &&
                    p.key === "expression") ||
                  ((p.parentPath.isTSTypeAliasDeclaration() ||
                    p.parentPath.isTSInterfaceDeclaration()) &&
                    p.key === "id"))
              )
                p.node.name = next;
            },
          });
        path.stop();
      },
    });
  }
  const declarations = ordered.flatMap((m) =>
    m.ast.program.body.filter((n) => !t.isImportDeclaration(n)),
  );
  const helpers = new Set<t.Node>();
  for (const mod of ordered.filter((mod) => mod !== entry)) {
    for (const statement of mod.ast.program.body) {
      if (t.isFunctionDeclaration(statement)) helpers.add(statement);
      if (t.isVariableDeclaration(statement))
        for (const decl of statement.declarations) {
          if (t.isArrowFunctionExpression(decl.init)) helpers.add(decl.init);
        }
    }
  }
  const program = t.file(
    t.program(
      [
        ...importStatements(publicBindings),
        ...declarations,
        t.exportDefaultDeclaration(
          t.identifier(resolveExport(entry, "default", "Example")),
        ),
      ],
      entry.ast.program.directives,
    ),
  );
  return { program, helpers };
}

// Build the closure of top-level bindings from the default export. Keeping
// declarations in dependency/module order preserves initialization semantics.
function retained(program: t.File) {
  traverse(program, {
    Program(path) {
      path.scope.crawl();
      const statements = path.get("body");
      const types = new Map<string, NodePath>();
      const dependencies = new Map<t.Node, Set<t.Node>>();
      for (const s of statements) {
        if (s.isTSInterfaceDeclaration() || s.isTSTypeAliasDeclaration())
          types.set(s.node.id.name, s);
      }
      function owner(p: NodePath): NodePath | undefined {
        return p.find((p) => p.parentPath?.isProgram() === true) ?? undefined;
      }
      const used = new Set<t.Node>();
      const addLink = (from: t.Node, to: t.Node) => {
        const set = dependencies.get(from) ?? new Set<t.Node>();
        set.add(to);
        dependencies.set(from, set);
      };
      function reference(ref: NodePath, name: string) {
        const from = owner(ref);
        if (!from) return;
        const binding = ref.scope.getBinding(name);
        const to = binding ? owner(binding.path) : types.get(name);
        if (to && to.node !== from.node) {
          addLink(from.node, to.node);
          if (to.isImportDeclaration() && binding)
            addLink(from.node, binding.path.node);
        }
      }
      path.traverse({
        ReferencedIdentifier(ref) {
          reference(ref, ref.node.name);
        },
        AssignmentExpression(ref) {
          if (t.isIdentifier(ref.node.left)) reference(ref, ref.node.left.name);
        },
      });
      const queue = statements
        .filter(
          (s) =>
            s.isExportDefaultDeclaration() ||
            (s.isTSModuleDeclaration() && s.node.global),
        )
        .map((s) => s.node as t.Node);
      while (queue.length) {
        const n = queue.pop()!;
        if (used.has(n)) continue;
        used.add(n);
        queue.push(...(dependencies.get(n) ?? []));
      }
      program.program.body = statements
        .filter((s) => used.has(s.node))
        .map((s) => {
          if (s.isImportDeclaration())
            s.node.specifiers = s.node.specifiers.filter((spec) =>
              used.has(spec),
            );
          return s.node;
        });
      path.stop();
    },
  });
}

function plainMember(n: t.MemberExpression) {
  return !n.computed && t.isIdentifier(n.property)
    ? n.property.name
    : t.isStringLiteral(n.property)
      ? n.property.value
      : undefined;
}
function plainObject(
  n: t.Node | null | undefined,
): t.ObjectExpression | undefined {
  if (t.isObjectExpression(n)) return n;
  if (t.isTSAsExpression(n) || t.isTSSatisfiesExpression(n))
    return plainObject(n.expression);
}
function keyOf(p: t.ObjectProperty) {
  return !p.computed && t.isIdentifier(p.key)
    ? p.key.name
    : t.isStringLiteral(p.key)
      ? p.key.value
      : undefined;
}

function simplify(program: t.File) {
  traverse(program, {
    Program(path) {
      path.scope.crawl();
      // Restrict stylex.create and property dictionaries to the statically used
      // keys. Keep dynamic selections intact unless every call passes a literal.
      for (const binding of Object.values(path.scope.bindings)) {
        if (!binding.path.isVariableDeclarator() || !binding.constant) continue;
        const init = binding.path.node.init;
        const object =
          plainObject(init) ??
          (t.isCallExpression(init) &&
          t.isMemberExpression(init.callee) &&
          plainMember(init.callee) === "create"
            ? plainObject(init.arguments[0])
            : undefined);
        if (!object) continue;
        const keys = new Set<string>();
        let dynamic = false;
        for (const ref of binding.referencePaths) {
          const access = ref.parentPath;
          if (access?.isTSTypeQuery()) continue;
          if (
            !access?.isMemberExpression() ||
            access.node.object !== ref.node
          ) {
            dynamic = true;
            break;
          }
          const key = plainMember(access.node);
          if (key !== undefined) {
            keys.add(key);
            continue;
          }
          dynamic = true;
          break;
        }
        if (!dynamic && keys.size)
          object.properties = object.properties.filter(
            (prop) =>
              !t.isObjectProperty(prop) ||
              keyOf(prop) === undefined ||
              keys.has(keyOf(prop)!),
          );
      }
      path.traverse({
        JSXSpreadAttribute(spread) {
          let value: t.Node | undefined | null = spread.node.argument;
          const seen = new Set<t.Node>();
          while (value && !seen.has(value)) {
            seen.add(value);
            if (t.isIdentifier(value)) {
              const b = spread.scope.getBinding(value.name);
              if (!b?.constant || !b.path.isVariableDeclarator()) break;
              value = b.path.node.init;
            } else if (
              t.isMemberExpression(value) &&
              t.isIdentifier(value.object)
            ) {
              const key = plainMember(value);
              const b = spread.scope.getBinding(value.object.name);
              if (!key || !b?.constant || !b.path.isVariableDeclarator()) break;
              const object = plainObject(b.path.node.init);
              const property = object?.properties.find(
                (p) => t.isObjectProperty(p) && keyOf(p) === key,
              );
              if (!t.isObjectProperty(property)) break;
              value = property.value;
            } else break;
          }
          const object = plainObject(value);
          if (
            object &&
            object.properties.length &&
            object.properties.every(
              (p) =>
                t.isObjectProperty(p) && keyOf(p) && t.isExpression(p.value),
            )
          ) {
            spread.replaceWithMultiple(
              object.properties.map((p) => {
                assert.ok(t.isObjectProperty(p) && t.isExpression(p.value));
                return t.jsxAttribute(
                  t.jsxIdentifier(keyOf(p)!),
                  t.jsxExpressionContainer(t.cloneNode(p.value, true)),
                );
              }),
            );
          } else if (
            t.isCallExpression(value) &&
            t.isMemberExpression(value.callee) &&
            plainMember(value.callee) === "props"
          ) {
            spread.node.argument = t.cloneNode(value, true);
          }
        },
      });
      path.stop();
    },
  });
}

// Specialize small style factories when all inputs are literal. This lets the
// same source used in a large fixture library produce a short single example.
function specialize(program: t.File, helpers: Set<t.Node>) {
  function resultOf(fn: t.FunctionDeclaration | t.ArrowFunctionExpression) {
    if (!t.isBlockStatement(fn.body)) return fn.body;
    const steps = fn.body.body;
    const last = steps.at(-1);
    if (!t.isReturnStatement(last) || !last.argument) return;
    if (steps.length === 1) return last.argument;
    if (steps.length !== 2) return;
    const first = steps[0];
    // A StyleX props projection returns exactly its two public fields.
    if (
      t.isVariableDeclaration(first) &&
      first.declarations.length === 1 &&
      t.isObjectExpression(last.argument)
    ) {
      const d = first.declarations[0];
      if (
        t.isObjectPattern(d.id) &&
        t.isCallExpression(d.init) &&
        t.isMemberExpression(d.init.callee) &&
        plainMember(d.init.callee) === "props" &&
        [d.id.properties, last.argument.properties].every(
          (parts) =>
            parts.length === 2 &&
            parts.every(
              (p) =>
                t.isObjectProperty(p) &&
                p.shorthand &&
                ["className", "style"].includes(keyOf(p) ?? ""),
            ),
        )
      )
        return d.init;
    }
  }
  traverse(program, {
    CallExpression(p) {
      if (!t.isIdentifier(p.node.callee)) return;
      const binding = p.scope.getBinding(p.node.callee.name);
      const def = binding?.path.node;
      const fn = t.isVariableDeclarator(def) ? def.init : def;
      if (
        !(t.isFunctionDeclaration(fn) || t.isArrowFunctionExpression(fn)) ||
        !helpers.has(fn)
      )
        return;
      if (
        fn.async ||
        !fn.params.length ||
        fn.params.length !== p.node.arguments.length ||
        !fn.params.every((param) => t.isIdentifier(param)) ||
        !p.node.arguments.every(
          (arg) =>
            t.isStringLiteral(arg) ||
            t.isBooleanLiteral(arg) ||
            t.isNumericLiteral(arg),
        )
      )
        return;
      const output = resultOf(fn);
      if (!output) return;
      const wrapper = t.arrowFunctionExpression(
        fn.params.map((param) => t.cloneNode(param, true)),
        t.cloneNode(output, true),
      );
      const wrapped = t.file(t.program([t.expressionStatement(wrapper)]));
      traverse(wrapped, {
        ArrowFunctionExpression(scope) {
          for (const [i, param] of scope.node.params.entries()) {
            if (!t.isIdentifier(param)) continue;
            const parameter = scope.scope.getBinding(param.name);
            for (const use of parameter?.referencePaths ?? [])
              use.replaceWith(t.cloneNode(p.node.arguments[i], true));
          }
          scope.stop();
        },
      });
      assert.ok(t.isExpression(wrapper.body));
      p.replaceWith(wrapper.body);
    },
    BinaryExpression: {
      exit(p) {
        const n = p.node;
        if (
          (n.operator === "===" || n.operator === "!==") &&
          t.isLiteral(n.left) &&
          t.isLiteral(n.right) &&
          "value" in n.left &&
          "value" in n.right
        )
          p.replaceWith(
            t.booleanLiteral(
              (n.left.value === n.right.value) === (n.operator === "==="),
            ),
          );
      },
    },
    ConditionalExpression: {
      exit(p) {
        if (t.isBooleanLiteral(p.node.test))
          p.replaceWith(
            p.node.test.value ? p.node.consequent : p.node.alternate,
          );
      },
    },
    MemberExpression: {
      exit(p) {
        const member = p.node;
        const key = plainMember(member);
        if (key === undefined) return;
        if (member.computed && t.isValidIdentifier(key)) {
          member.computed = false;
          member.property = t.identifier(key);
        }
        let obj = plainObject(member.object);
        if (!obj && t.isIdentifier(member.object)) {
          const decl = p.scope.getBinding(member.object.name);
          if (decl?.constant && decl.path.isVariableDeclarator())
            obj = plainObject(decl.path.node.init);
        }
        if (
          !obj ||
          obj.properties.some(
            (prop) => !t.isObjectProperty(prop) || keyOf(prop) === undefined,
          )
        )
          return;
        const property = obj.properties.find(
          (prop) => t.isObjectProperty(prop) && keyOf(prop) === key,
        );
        // Only substitute immutable style selectors and simple value maps.
        if (
          t.isObjectProperty(property) &&
          (t.isMemberExpression(property.value) ||
            t.isStringLiteral(property.value) ||
            t.isNumericLiteral(property.value) ||
            (t.isObjectExpression(member.object) &&
              t.isExpression(property.value)))
        )
          p.replaceWith(t.cloneNode(property.value, true));
      },
    },
    ObjectExpression: {
      exit(p) {
        p.node.properties = p.node.properties.flatMap((prop) =>
          t.isSpreadElement(prop) && t.isObjectExpression(prop.argument)
            ? prop.argument.properties
            : [prop],
        );
      },
    },
  });
  traverse(program, {
    CallExpression(p) {
      const fn = p.node.callee;
      const [arg] = p.node.arguments;
      if (
        t.isMemberExpression(fn) &&
        plainMember(fn) === "includes" &&
        t.isArrayExpression(fn.object) &&
        fn.object.elements.every((item) => t.isStringLiteral(item)) &&
        t.isStringLiteral(arg)
      ) {
        p.replaceWith(
          t.booleanLiteral(
            fn.object.elements.some((item) =>
              t.isStringLiteral(item, { value: arg.value }),
            ),
          ),
        );
      }
    },
    ConditionalExpression: {
      exit(p) {
        if (t.isBooleanLiteral(p.node.test))
          p.replaceWith(
            p.node.test.value ? p.node.consequent : p.node.alternate,
          );
      },
    },
    ObjectExpression: {
      exit(p) {
        p.node.properties = p.node.properties.flatMap((prop) =>
          t.isSpreadElement(prop) && t.isObjectExpression(prop.argument)
            ? prop.argument.properties
            : [prop],
        );
      },
    },
    JSXSpreadAttribute(p) {
      const value = p.node.argument;
      if (t.isObjectExpression(value) && value.properties.length === 1) {
        const [prop] = value.properties;
        if (t.isSpreadElement(prop)) p.node.argument = prop.argument;
      }
    },
    JSXAttribute(p) {
      if (
        t.isJSXIdentifier(p.node.name) &&
        p.node.name.name.startsWith("data-parity-")
      )
        p.remove();
    },
  });
}

// These observer hooks exist solely for the parity test runner.
function removeTestHooks(program: t.File) {
  traverse(program, {
    TSModuleDeclaration(p) {
      if (
        p.node.global &&
        /parityCarousel|__sidebarProjectsReady/.test(
          print(t.file(t.program([p.node]))),
        )
      )
        p.remove();
    },
    LogicalExpression(p) {
      const lhs = p.node.left;
      if (
        p.node.operator === "??" &&
        t.isOptionalCallExpression(lhs) &&
        t.isMemberExpression(lhs.callee) &&
        t.isIdentifier(lhs.callee.object, { name: "window" }) &&
        plainMember(lhs.callee) === "__sidebarProjectsReady"
      )
        p.replaceWith(p.node.right);
    },
    JSXAttribute(p) {
      const value = p.node.value;
      if (
        t.isJSXExpressionContainer(value) &&
        t.isIdentifier(value.expression, { name: "observeCarousel" })
      )
        p.remove();
    },
    ExpressionStatement(p) {
      const expr = p.node.expression;
      if (
        t.isCallExpression(expr) &&
        t.isIdentifier(expr.callee, { name: "observeCarousel" })
      )
        p.remove();
    },
    JSXSpreadAttribute(p) {
      const val = p.node.argument;
      if (
        t.isObjectExpression(val) &&
        val.properties.length === 1 &&
        t.isSpreadElement(val.properties[0])
      )
        p.node.argument = val.properties[0].argument;
    },
  });
}

export async function bundleExample(files: ExampleFile[]) {
  const { program, helpers } = link(files);
  specialize(program, helpers);
  retained(program);
  simplify(program);
  retained(program);
  simplify(program);
  retained(program);
  // An isolated component needs only the built-in marker. A named marker
  // requires a second, separately installed .stylex.ts module.
  traverse(program, {
    CallExpression(p) {
      const callee = p.node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (
        plainMember(callee) === "defineMarker" &&
        t.isVariableDeclarator(p.parent) &&
        t.isIdentifier(p.parent.id, { name: "collapsibleGroup" })
      ) {
        callee.property = t.identifier("defaultMarker");
      }
      if (
        plainMember(callee) === "ancestor" &&
        t.isIdentifier(p.node.arguments[1], { name: "collapsibleGroup" })
      )
        p.node.arguments.splice(1);
    },
  });
  removeTestHooks(program);
  retained(program);
  return format(print(program), { parser: "typescript" });
}
