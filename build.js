import fs from 'node:fs'
import path from 'node:path'
import * as rollup from 'rollup'
import * as esbuild from 'esbuild'
import { babel } from '@rollup/plugin-babel';
import { version } from './package.json'
import {nodeResolve} from '@rollup/plugin-node-resolve';

fs.rmSync('dist', { recursive: true, force: true })

let bundle = await rollup.rollup({
  input: 'index.js',
  plugins: [{
    name: 'esbuild',
    async load(id) {
      const { outputFiles } = await esbuild.build({
        entryPoints: [id],
        bundle: true,
        format: 'esm',
        outfile: id.replace(/\.ts$/, '.js'),
        sourcemap: true,
        write: false,
        target: ['es2017'],
        define: {
          __VERSION__: JSON.stringify(version)
        },
        legalComments: 'none'
      })
      let code, map;
      for (const { path, text } of outputFiles) {
        if (path.endsWith('.map')) map = text;
        else code = text;
      }
      return { code, map }
    }
  }]
})

await Promise.all([
  bundle.write({ file: 'dist/index.mjs', format: 'es', sourcemap: true, sourcemapExcludeSources: true }),
  bundle.write({ file: 'dist/index.js', format: 'cjs', sourcemap: true, sourcemapExcludeSources: true, interop: 'auto', exports: 'named' }),
])

await bundle.close()

let bundle_iife = await rollup.rollup({
  input: 'index.js',
  plugins: [
    {
    name: 'esbuild',
    async load(id) {
      const { outputFiles } = await esbuild.build({
        entryPoints: [id],
        bundle: true,
        format: 'esm',
        outfile: id.replace(/\.ts$/, '.js'),
        sourcemap: true,
        write: false,
        minify: true,
        target: ['es2015'],
        define: {
          __VERSION__: JSON.stringify(version)
        },
        legalComments: 'none'
      })
      let code, map;
      for (const { path, text } of outputFiles) {
        if (path.endsWith('.map')) map = text;
        else code = text;
      }
      return { code, map }
    }
    },
    nodeResolve(),
    babel({ babelHelpers: 'bundled', extensions: ['.ts'] })
  ]
})

await bundle_iife.write({ file: 'dist/index.global.js', format: 'iife', name: "NetlessFastboard" })
await bundle_iife.close()