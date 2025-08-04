import { aliasTs } from '@bemedev/vitest-alias';
import { exclude } from '@bemedev/vitest-exclude';
import { defineConfig } from 'vitest/config';

import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [
    aliasTs(tsconfig as never),
    exclude({
      ignoreCoverageFiles: [
        '**/index.ts',
        '**/types.ts',
        '**/*.example.ts',
        '**/*.types.ts',
        '**/*.typegen.ts',
        '**/*.fixtures.ts',
        '**/fixtures.ts',
        '**/fixture.ts',
        '**/*.fixture.ts',
      ],
    }),
  ],

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
      ignoreSourceErrors: true,
    },
    coverage: {
      enabled: true,
      extension: 'ts',
      all: true,
      provider: 'v8',
    },
  },
});
