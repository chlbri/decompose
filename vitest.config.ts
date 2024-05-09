import { aliasTs } from '@bemedev/vitest-alias';
import { defineConfig } from 'vitest/config';
import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [aliasTs(tsconfig as never)],

  test: {
    environment: 'node',
    globals: true,
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
