import fs from 'fs';
import path from 'path';
import { defineConfig, Options } from 'tsup';

const filePath = path.join(__dirname, './dist/index.js')


// export default defineConfig({
//   minify: true,
//   target: 'es2018',
//   external: ['react', 'react-dom', 'next', 'tsup'],
//   sourcemap: true,
//   dts: true,
//   format: ['esm', 'cjs'],
//   esbuildOptions(options) {
//     options.banner = {
//       js: '"use client"',
//     }
//   },
// })

export default defineConfig((options) => {
  return {
    minify: true,
    external: ['react', 'react-dom', 'next', 'tsup'],
    sourcemap: true,
    dts: true,
    format: ['esm', 'cjs'],
    onSuccess() {
      fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
          return console.error(err)
        }

        const result = data.replace(/"use strict";/g, '"use client";')
        fs.writeFile(filePath, result, 'utf8', function (err) {
          if (err) {
            return console.error(err)
          }

          console.log(`Modified file: ${filePath}`)
        })
      })
    }
    // esbuildOptions(options) {
    //   options.banner = {
    //     js: '"use client"',
    //   }
    // },
  } as Options
});