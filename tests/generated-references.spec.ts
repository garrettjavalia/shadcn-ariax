import { test, expect } from "@playwright/test";
import { snapshot, differences } from "./compare";

test("missing React Aria references normalize only provider randomness", async ({
  page,
}) => {
  const markup = (
    prefix: string,
    key = "first",
    local = "a",
    other = prefix,
    user = "custom-panel",
  ) =>
    `<main id="parity-root"><button aria-controls="react-aria${prefix}-_r_${local}_-tabpanel-${key}" aria-labelledby="react-aria${prefix}-_r_a_ react-aria${other}-_r_b_"></button><button aria-controls="${user}"></button></main>`;
  await page.setContent(markup("123"));
  const baseline = await snapshot(page);
  await page.setContent(markup("456"));
  expect(differences(baseline, await snapshot(page))).toEqual([]);
  for (const html of [
    markup("456", "wrong"),
    markup("456", "first", "b"),
    markup("456", "first", "a", "789"),
    markup("456", "first", "a", "456", "changed-panel"),
  ]) {
    await page.setContent(html);
    expect(
      differences(baseline, await snapshot(page)).some((diff) =>
        /\/attrs\/aria-(controls|labelledby)$/.test(diff.path),
      ),
    ).toBe(true);
  }
});

test("missing, outside, and captured targets remain distinct", async ({
  page,
}) => {
  const id = "react-aria123-_r_a_";
  const markup = (target = "", inside = "", reference = id) =>
    `${target}<main id="parity-root"><button aria-labelledby="${reference}"></button>${inside}</main>`;
  await page.setContent(markup());
  const missing = await snapshot(page);
  for (const html of [
    markup(`<span id="${id}"></span>`),
    markup("", `<span id="${id}"></span>`),
  ]) {
    await page.setContent(html);
    expect(
      differences(missing, await snapshot(page)).some((diff) =>
        diff.path.endsWith("/attrs/aria-labelledby"),
      ),
    ).toBe(true);
  }
  for (const user of ["react-aria123-custom", "custom-panel"]) {
    await page.setContent(markup("", "", user));
    const baseline = await snapshot(page);
    await page.setContent(
      markup("", "", user.replace("123", "456") + "-changed"),
    );
    expect(
      differences(baseline, await snapshot(page)).some((diff) =>
        diff.path.endsWith("/attrs/aria-labelledby"),
      ),
    ).toBe(true);
  }
});

test("generated collection IDs preserve collection/item identity groups", async ({
  page,
}) => {
  const markup = (first: string, second: string, member = first, target = "") =>
    `<main id="parity-root"><div ${target ? `id="${target}"` : ""} data-collection="${first}"><span data-key="one" data-collection="${member}"></span></div><div data-collection="${second}"><span data-key="two" data-collection="${second}"></span></div></main>`;
  await page.setContent(markup("react-aria123-_r_a_", "react-aria123-_r_b_"));
  const baseline = await snapshot(page);
  await page.setContent(markup("react-aria456-_r_12_", "react-aria456-_r_24_"));
  expect(differences(baseline, await snapshot(page))).toEqual([]);
  for (const [name, html] of [
    [
      "split membership",
      markup(
        "react-aria456-_r_12_",
        "react-aria456-_r_24_",
        "react-aria456-_r_36_",
      ),
    ],
    [
      "merge collections",
      markup("react-aria456-_r_12_", "react-aria456-_r_12_"),
    ],
    [
      "different providers",
      markup("react-aria456-_r_12_", "react-aria789-_r_24_"),
    ],
  ]) {
    await page.setContent(html);
    expect(
      differences(baseline, await snapshot(page)).some((diff) =>
        diff.path.endsWith("/attrs/data-collection"),
      ),
      name,
    ).toBe(true);
  }
  await page.setContent(
    markup(
      "react-aria123-_r_a_",
      "react-aria123-_r_b_",
      undefined,
      "react-aria123-_r_a_",
    ),
  );
  const captured = await snapshot(page);
  await page.setContent(
    markup(
      "react-aria456-_r_12_",
      "react-aria456-_r_24_",
      undefined,
      "react-aria456-_r_12_",
    ),
  );
  expect(differences(captured, await snapshot(page))).toEqual([]);
  await page.setContent(
    markup(
      "react-aria456-_r_12_",
      "react-aria456-_r_24_",
      undefined,
      "react-aria456-_r_24_",
    ),
  );
  expect(
    differences(captured, await snapshot(page)).some((diff) =>
      diff.path.endsWith("/attrs/data-collection"),
    ),
  ).toBe(true);
  // Arbitrary user collection names are values, not generated identities.
  await page.setContent(markup("user-collection", "react-aria123-custom"));
  const user = await snapshot(page);
  await page.setContent(markup("changed-collection", "react-aria456-custom"));
  expect(
    differences(user, await snapshot(page)).filter((diff) =>
      diff.path.endsWith("/attrs/data-collection"),
    ),
  ).toHaveLength(4);
});
