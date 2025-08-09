import { this1 } from '@bemedev/build-tests/constants';
import { createTests } from '@bemedev/vitest-extended';
import { dumbFn, TEST_SKIP, ttest0, ttest1, ttest2 } from './fixtures';

describe.skipIf(TEST_SKIP)('decomposeKeys', () => {
  const { acceptation, success } = createTests.withImplementation(dumbFn, {
    name: 'decomposeSV',
    instanciation: async () => {
      const func = await import(this1).then(
        ({ decomposeKeys }) => decomposeKeys,
      );

      return func.low;
    },
  });
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
