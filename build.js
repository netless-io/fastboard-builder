import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import * as esbuild from "esbuild";
import { transformFile } from "@swc/core";

import { version } from "./package.json";

fs.rmSync("dist", { recursive: true, force: true });

const distDir = "dist";
const tempDir = path.join(distDir, ".tmp");
const rawGlobalFile = path.join(tempDir, "index.global.raw.js");
const rawGlobalEs5File = path.join(tempDir, "index.global.es5.raw.js");

const shared = {
  entryPoints: ["index.js"],
  bundle: true,
  sourcemap: true,
  target: ["es2017"],
  platform: "browser",
  legalComments: "none",
  define: {
    __VERSION__: JSON.stringify(version),
  },
};

await esbuild.build({
  ...shared,
  format: "esm",
  outfile: "dist/index.mjs",
});

await esbuild.build({
  ...shared,
  format: "cjs",
  outfile: "dist/index.js",
});

await esbuild.build({
  ...shared,
  format: "iife",
  globalName: "NetlessFastboard",
  minify: true,
  outfile: "dist/index.global.js",
});

await fsp.mkdir(tempDir, { recursive: true });

await esbuild.build({
  ...shared,
  sourcemap: false,
  format: "iife",
  globalName: "NetlessFastboard",
  minify: false,
  outfile: rawGlobalFile,
});

const { code } = await transformFile(rawGlobalFile, {
  jsc: {
    target: "es5",
  },
  sourceMaps: false,
});

await fsp.writeFile(rawGlobalEs5File, code);

await esbuild.build({
  entryPoints: [rawGlobalEs5File],
  bundle: false,
  minify: true,
  sourcemap: false,
  target: ["es5"],
  platform: "browser",
  legalComments: "none",
  logOverride: {
    "duplicate-case": "silent",
  },
  outfile: path.join(distDir, "index.global.es5.js"),
});

await fsp.rm(tempDir, { recursive: true, force: true });
