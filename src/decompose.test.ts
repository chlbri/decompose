import { createTests } from '@bemedev/vitest-extended';
import { relative } from 'node:path';
import tsd, { formatter } from 'tsd';
import { decompose } from './decompose';
import { ttest0, ttest1, ttest2 } from './decompose.fixtures';

describe('decompose', () => {
  describe('decompose.low', () => {
    const { acceptation, success } = createTests(decompose.low);

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

    describe(
      '#2 => Success',
      success(
        { invite: 'Empty object', parameters: [ttest0], expected: ttest0 },
        {
          invite: 'Simple object',
          parameters: [ttest1],
          expected: ttest1,
        },
        {
          invite: 'Recursive object',
          parameters: [ttest2],
          expected: {
            _id: 'nanoid',
            'data.name.firstName': 'Charles-Lévi',
            'data.name.lastName': 'BRI',
            'statistics.deletions': 34,
            'statistics.updations': 5,
          },
        },
      ),
    );
  });
});
