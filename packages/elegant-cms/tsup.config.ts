import { defineConfig, Options } from 'tsup';

export default defineConfig((options) => {
  return {
    minify: true,
    external: ['react', 'react-dom', 'next', 'tsup'],
    sourcemap: true,
    dts: true,
    format: ['esm', 'cjs'],
    esbuildOptions(options) {
      options.banner = {
        js: '"use client"',
      }
    },
  } as Options
});