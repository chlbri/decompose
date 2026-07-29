import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: { host: '0.0.0.0' },
  resolve: {
    tsconfigPaths: true,
  },

  test: {
    maxConcurrency: 10,
    passWithNoTests: true,
    slowTestThreshold: 3000,
    bail: 35,
    globals: true,
    logHeapUsage: true,

    coverage: {
      enabled: true,
      reportsDirectory: '.coverage',
      provider: 'v8',
      exclude: ['*.js', '*.cjs', '*.mjs'],
    },

    projects: ['packages/decompose/vitest.config.ts'],
  },
});
