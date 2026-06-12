/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      // the deprecated SDK's browser-field object remap is not applied to its
      // `module` entry by the dep optimizer, pulling in node-fetch's Node
      // build. Point straight at the browser ESM bundle. Dies in phase 2.
      '@commercetools/sdk-client-v2': '@commercetools/sdk-client-v2/dist/commercetools-sdk-client-v2.browser.esm.js',
      // ...and that browser build still imports bare node-fetch, whose Node
      // entry the optimizer prefers over its string `browser` field
      'node-fetch': 'node-fetch/browser.js',
    },
  },
  define: {
    // @commercetools/sdk-client-v2 references Node's `global`; CRA's webpack
    // polyfilled it. Remove when the SDK goes in phase 2 (ts-client v3).
    global: 'globalThis',
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    // Netlify deploy settings still expect CRA's output directory
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    // legacy tests assert raw CSS-module class names (CRA identity transform)
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
});
