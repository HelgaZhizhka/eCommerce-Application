/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
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
    // Deterministic, non-secret CT endpoint so MSW handlers and the SDK build
    // identical URLs regardless of a local .env (and with none in CI).
    env: {
      VITE_PROJECT_KEY_CLIENT: 'test-project',
      VITE_API_URL_CLIENT: 'https://api.commercetools.test',
    },
  },
});
