import { createTests } from '@bemedev/vitest-extended';
import { relative } from 'node:path';
import tsd, { formatter } from 'tsd';
import { describe, expect, test } from 'vitest';
import { ttest0, ttest1, ttest2 } from './decompose.fixtures';
import { decomposeKeys } from './decomposeKeys';

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

describe('#1 => Function', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useTests = createTests(decomposeKeys as any);

  useTests(
    ['Empty object', [ttest0], []],
    ['Simple object', [ttest1], ['age', 'name']],
    [
      'Recursive object',
      [ttest2],
      [
        '_id',
        'data',
        'data.name',
        'data.name.firstName',
        'data.name.lastName',
        'statistics',
        'statistics.deletions',
        'statistics.updations',
      ],
    ],
  );
});
