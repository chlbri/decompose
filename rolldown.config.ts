import { defineConfig } from '@bemedev/rolldown-config';

export default defineConfig.bemedev({
  declarationMap: true,
  sourcemap: true,
  ignoresJS: '**/*.example.ts',
});
