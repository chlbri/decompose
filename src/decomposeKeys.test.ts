import { createTests } from '@bemedev/vitest-extended';
import { decomposeKeys } from './decomposeKeys';
import { ttest0, ttest1, ttest2 } from './fixtures';

describe('decomposeKeys', () => {
  const { acceptation, success } = createTests(decomposeKeys as any);
  describe('#0 => Acceptation', acceptation);

  describe(
    '#1 => Success',
    success(
      { invite: 'Empty object', parameters: [ttest0], expected: [] },
      {
        invite: 'Simple object',
        parameters: ttest1,
        expected: ['age', 'name'],
      },
      {
        invite: 'Recursive object',
        parameters: ttest2,
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
    ),
  );
});
