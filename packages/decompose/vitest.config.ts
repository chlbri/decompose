import { exclude } from '@bemedev/dev-utils/vitest-exclude';
import { defineProject } from '@bemedev/dev-utils/vitest-extended';

export default defineProject({
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
    typecheck: {
      enabled: true,
      ignoreSourceErrors: false,
    },
  },
});
