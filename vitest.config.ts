import { exclude } from '@bemedev/dev-utils/vitest-exclude';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
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
        'src/contexts/constants.ts',
      ],
    }),
  ],

  test: {
    bail: 35,
    maxConcurrency: 10,
    passWithNoTests: true,
    slowTestThreshold: 3000,
    globals: true,
    logHeapUsage: true,

    typecheck: {
      enabled: true,
      ignoreSourceErrors: false,
    },
    coverage: {
      enabled: true,
      provider: 'v8',
    },
  },
});
