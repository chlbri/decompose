import { aliasTs } from '@bemedev/vitest-alias';
import { defineConfig } from 'vitest/config';
import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [aliasTs(tsconfig as never)],

  test: {
    bail: 10,
    maxConcurrency: 10,
    passWithNoTests: true,
    slowTestThreshold: 3000,
    globals: true,
    logHeapUsage: true,
    typecheck: {
      enabled: true,
      only: false,
      ignoreSourceErrors: false,
    },
    coverage: {
      enabled: true,
      extension: 'ts',
      all: true,
      include: [
        'src/decompose.ts',
        'src/helpers.ts',
        'src/decomposeSV.ts',
        'src/recompose.ts',
      ],
      provider: 'v8',
    },
  },
});
