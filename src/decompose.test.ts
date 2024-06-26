import { createTests } from '@bemedev/vitest-extended';
import tsd, { formatter } from 'tsd';
import { describe, expect, test } from 'vitest';
import { decompose } from './decompose';
import { ttest0, ttest1, ttest2 } from './decompose.fixtures';
import { relative } from 'node:path';

test('#0 => Types', async () => {
  const file = relative(process.cwd(), __filename).replace(
    '.test.ts',
    '.test-d.ts',
  );
  const testFiles = [file];
  const _tsd = await tsd({
    cwd: process.cwd(),
    testFiles,
  });
  const _fd = formatter(_tsd, true);
  expect(_fd).toBe('');
});

describe('#1 => The functions', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useTests = createTests(decompose as any);

  useTests(
    ['Empty object', [ttest0], ttest0],
    ['Simple object', [ttest1], ttest1],
    [
      'Recursive object',
      [ttest2],
      {
        _id: 'nanoid',
        'data.name.firstName': 'Charles-Lévi',
        'data.name.lastName': 'BRI',
        'statistics.deletions': 34,
        'statistics.updations': 5,
      },
    ],
  );
});
