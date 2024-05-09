import { createTests } from '@bemedev/vitest-extended';
import { decompose } from './decompose';

const useTests = createTests(decompose);

useTests(
  ['Empty object', [{}], []],
  ['Simple object', [{ age: 16, name: 'Alfred' }], ['age', 'name']],
  [
    'Recursive object',
    [
      {
        _id: 'nanoid',
        data: {
          name: {
            firstName: 'Charles-Lévi',
            lastName: 'BRI',
          },
        },
        statistics: {
          updations: 5,
          deletions: 34,
        },
      },
    ],
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
