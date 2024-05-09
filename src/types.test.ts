import tsd, { formatter } from 'tsd';
import { expect, test } from 'vitest';

test('#0 => types', async () => {
  const _tsd = await tsd({
    cwd: process.cwd(),
    testFiles: ['./src/types.test-d.ts'],
    typingsFile: './src/types.ts',
  });
  const _fd = formatter(_tsd, true);
  expect(_fd).toBe('');
}, 10000);
