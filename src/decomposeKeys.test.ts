import { createTests } from '@bemedev/vitest-extended';
import { relative } from 'node:path';
import tsd, { formatter } from 'tsd';
import { ttest0, ttest1, ttest2 } from './decompose.fixtures';
import { decomposeKeys } from './decomposeKeys';

describe('#1 => Function', () => {
  const { acceptation, success } = createTests(decomposeKeys as any);

  describe('#0 Acceptation & types', () => {
    test('#1 => Types', async () => {
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
    }, 15_000);

    describe('#2 Acceptation', acceptation);
  });
  success(
    { invite: 'Empty object', parameters: [ttest0], expected: [] },
    {
      invite: 'Simple object',
      parameters: [ttest1],
      expected: ['age', 'name'],
    },
    {
      invite: 'Recursive object',
      parameters: [ttest2],
      expected: [
        '_id',
        'data',
        'data.name',
        'data.name.firstName',
        'data.name.lastName',
        'statistics',
        'statistics.deletions',
        'statistics.updations',
      ],
    },
  );
});
