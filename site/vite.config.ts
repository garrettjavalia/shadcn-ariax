import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import type { TransformOptions } from "@babel/core";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const require = createRequire(import.meta.url);
const stylexPostcss = require("@stylexjs/postcss-plugin");
const root = fileURLToPath(new URL("../", import.meta.url));

export const babel: TransformOptions = {
  babelrc: false,
  configFile: false,
  parserOpts: { plugins: ["typescript", "jsx"] },
  plugins: [
    [
      "@stylexjs/babel-plugin",
      {
        dev: false,
        runtimeInjection: false,
        treeshakeCompensation: true,
        unstable_moduleResolution: { type: "commonJS" },
      },
    ],
  ],
};

export default defineConfig({
  root,
  publicDir: false,
  plugins: [react({ babel })],
  resolve: {
    alias: {
      "@/components/ui": fileURLToPath(
        new URL("../src/ariax/ui", import.meta.url),
      ),
    },
    dedupe: ["react", "react-dom", "react-aria-components"],
  },
  css: {
    postcss: {
      plugins: [
        stylexPostcss({
          include: [
            "src/ariax/**/*.{ts,tsx}",
            "site/**/*.{ts,tsx}",
            "generated/site-previews/**/*.tsx",
          ],
          babelConfig: babel,
          useCSSLayers: false,
        }),
      ],
    },
  },
});
