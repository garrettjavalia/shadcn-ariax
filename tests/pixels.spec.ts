import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";
import { pixelsMatch } from "./compare";

test("pixel comparison tolerates only sparse one-level raster differences", () => {
  const a = new PNG({ width: 100, height: 100 });
  const b = new PNG({ width: 100, height: 100 });
  a.data.fill(128);
  b.data.fill(128);
  expect(pixelsMatch(a, b)).toBe(true);
  // Ten pixels is exactly 0.1%; all four channels may differ by one.
  for (let i = 0; i < 40; i++) b.data[i]++;
  expect(pixelsMatch(a, b)).toBe(true);
  b.data[40]++;
  expect(pixelsMatch(a, b)).toBe(false);
  b.data[40]--;
  b.data[0]++;
  expect(pixelsMatch(a, b)).toBe(false);
  expect(pixelsMatch(a, new PNG({ width: 101, height: 100 }))).toBe(false);
});
