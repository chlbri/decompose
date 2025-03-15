import { createTests } from '@bemedev/vitest-extended';
import { decompose } from './decompose';
import { ttest0, ttest1, ttest2, ttest3 } from './decompose.fixtures';

describe('decompose', () => {
  const { acceptation, success } = createTests(decompose.low);
  describe('#0 => Acceptation', acceptation);

  describe(
    '#2 => Success',
    success(
      { invite: 'Empty object', parameters: [ttest0], expected: ttest0 },
      {
        invite: 'Simple object',
        parameters: ttest1,
        expected: ttest1,
      },
      {
        invite: 'Recursive object',
        parameters: ttest2,
        expected: {
          _id: 'nanoid',
          'data.name.firstName': 'Charles-Lévi',
          'data.name.lastName': 'BRI',
          'statistics.deletions': 34,
          'statistics.updations': 5,
        },
      },
      {
        invite: 'Recursive object and array',
        parameters: ttest3,
        expected: {
          _id: 'nanoid',
          'data.name.firstName': 'Charles-Lévi',
          'data.name.lastName': 'BRI',
          'statistics.deletions': 34,
          'statistics.updations': 5,
          arr: [1, 2, 3],
        },
      },
    ),
  );
});
