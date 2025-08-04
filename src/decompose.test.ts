import { createTests } from '@bemedev/vitest-extended';
import { decompose } from './decompose';
import { ttest0, ttest1, ttest2, ttest3, ttest4 } from './fixtures';

describe('decompose', () => {
  const { acceptation, success } = createTests(decompose.low);
  describe('#0 => Acceptation', acceptation);

  describe(
    '#2 => Success',
    success(
      { invite: 'Empty object', parameters: [ttest0], expected: ttest0 },
      {
        invite: 'Empty object with object="object"',
        parameters: [ttest0, { object: 'object' }],
        expected: ttest0,
      },
      {
        invite: 'Empty object with object="key"',
        parameters: [ttest0, { object: 'key' }],
        expected: ttest0,
      },
      {
        invite: 'Empty object with object="both"',
        parameters: [ttest0, { object: 'both' }],
        expected: ttest0,
      },
      {
        invite: 'Empty object with sep="/"',
        parameters: [ttest0, { sep: '/' }],
        expected: ttest0,
      },
      {
        invite: 'Empty object with sep="/" and start=true',
        parameters: [ttest0, { sep: '/', start: false }],
        expected: ttest0,
      },
      {
        invite: 'Simple object',
        parameters: ttest1,
        expected: { '.age': 16, '.name': 'Alfred' },
      },
      {
        invite: 'Simple object with object="object"',
        parameters: [ttest1, { object: 'object' }],
        expected: { '.age': 16, '.name': 'Alfred' },
      },
      {
        invite: 'Simple object with object="key"',
        parameters: [ttest1, { object: 'key' }],
        expected: { '.age': 16, '.name': 'Alfred' },
      },
      {
        invite: 'Simple object with object="both"',
        parameters: [ttest1, { object: 'both' }],
        expected: { '.age': 16, '.name': 'Alfred' },
      },
      {
        invite: 'Simple object with sep="/"',
        parameters: [ttest1, { sep: '/' }],
        expected: { '/age': 16, '/name': 'Alfred' },
      },
      {
        invite: 'Simple object with sep="/" and start=false',
        parameters: [ttest1, { sep: '/', start: false }],
        expected: { age: 16, name: 'Alfred' },
      },
      {
        invite:
          'Simple object with object="object" sep="/" and start=false',
        parameters: [ttest1, { sep: '/', start: false, object: 'object' }],
        expected: { age: 16, name: 'Alfred' },
      },
      {
        invite: 'Recursive object',
        parameters: ttest2,
        expected: {
          '._id': 'nanoid',
          '.data.name.firstName': 'Charles-Lévi',
          '.data.name.lastName': 'BRI',
          '.statistics.deletions': 34,
          '.statistics.updations': 5,
        },
      },
      {
        invite: 'Recursive object with object="object"',
        parameters: [ttest2, { object: 'object' }],
        expected: {
          '._id': 'nanoid',
          '.data': {
            name: {
              firstName: 'Charles-Lévi',
              lastName: 'BRI',
            },
          },
          '.data.name': {
            firstName: 'Charles-Lévi',
            lastName: 'BRI',
          },
          '.statistics': {
            deletions: 34,
            updations: 5,
          },
        },
      },
      {
        invite: 'Recursive object with object="key"',
        parameters: [ttest2, { object: 'key' }],
        expected: {
          '._id': 'nanoid',
          '.data.name.firstName': 'Charles-Lévi',
          '.data.name.lastName': 'BRI',
          '.statistics.deletions': 34,
          '.statistics.updations': 5,
        },
      },
      {
        invite: 'Recursive object with sep="/"',
        parameters: [ttest2, { sep: '/' }],
        expected: {
          '/_id': 'nanoid',
          '/data/name/firstName': 'Charles-Lévi',
          '/data/name/lastName': 'BRI',
          '/statistics/deletions': 34,
          '/statistics/updations': 5,
        },
      },
      {
        invite: 'Recursive object with sep="/" and object="both"',
        parameters: [ttest2, { sep: '/', object: 'both' }],
        expected: {
          '/_id': 'nanoid',
          '/data/name/firstName': 'Charles-Lévi',
          '/data/name/lastName': 'BRI',
          '/data': {
            name: { firstName: 'Charles-Lévi', lastName: 'BRI' },
          },
          '/data/name': {
            firstName: 'Charles-Lévi',
            lastName: 'BRI',
          },
          '/statistics/updations': 5,
          '/statistics/deletions': 34,
          '/statistics': { updations: 5, deletions: 34 },
        },
      },
      {
        invite: 'Recursive object with sep="/" and start=false',
        parameters: [ttest2, { sep: '/', start: false }],
        expected: {
          _id: 'nanoid',
          'data/name/firstName': 'Charles-Lévi',
          'data/name/lastName': 'BRI',
          'statistics/deletions': 34,
          'statistics/updations': 5,
        },
      },
      {
        invite:
          'Recursive object with sep="/" and start=false and object="object"',
        parameters: [ttest2, { sep: '/', start: false, object: 'object' }],
        expected: {
          _id: 'nanoid',
          data: {
            name: {
              firstName: 'Charles-Lévi',
              lastName: 'BRI',
            },
          },
          'data/name': {
            firstName: 'Charles-Lévi',
            lastName: 'BRI',
          },
          statistics: {
            deletions: 34,
            updations: 5,
          },
        },
      },
      {
        invite: 'Recursive object and array',
        parameters: ttest3,
        expected: {
          '._id': 'nanoid',
          '.data.name.firstName': 'Charles-Lévi',
          '.data.name.lastName': 'BRI',
          '.statistics.deletions': 34,
          '.statistics.updations': 5,
          '.arr.[0]': 1,
          '.arr.[1]': 2,
          '.arr.[2]': 3,
        },
      },
      {
        invite: 'Recursive object and array with start="false"',
        parameters: [ttest3, { start: false }],
        expected: {
          _id: 'nanoid',
          'data.name.firstName': 'Charles-Lévi',
          'data.name.lastName': 'BRI',
          'statistics.deletions': 34,
          'statistics.updations': 5,
          'arr.[0]': 1,
          'arr.[1]': 2,
          'arr.[2]': 3,
        },
      },
      {
        invite: 'Recursive object and array with sep="/"',
        parameters: [ttest3, { sep: '/' }],
        expected: {
          '/_id': 'nanoid',
          '/data/name/firstName': 'Charles-Lévi',
          '/data/name/lastName': 'BRI',
          '/statistics/deletions': 34,
          '/statistics/updations': 5,
          '/arr/[0]': 1,
          '/arr/[1]': 2,
          '/arr/[2]': 3,
        },
      },
      {
        invite: 'Recursive object and array with sep="/" and start=false',
        parameters: [ttest3, { sep: '/', start: false }],
        expected: {
          _id: 'nanoid',
          'data/name/firstName': 'Charles-Lévi',
          'data/name/lastName': 'BRI',
          'statistics/deletions': 34,
          'statistics/updations': 5,
          'arr/[0]': 1,
          'arr/[1]': 2,
          'arr/[2]': 3,
        },
      },
      {
        invite:
          'Recursive object and array with sep="/" and start=false and object="both"',
        parameters: [ttest3, { sep: '/', start: false, object: 'both' }],
        expected: {
          _id: 'nanoid',
          'data/name/firstName': 'Charles-Lévi',
          'data/name/lastName': 'BRI',
          'statistics/deletions': 34,
          'statistics/updations': 5,
          arr: [1, 2, 3],
          data: {
            name: {
              firstName: 'Charles-Lévi',
              lastName: 'BRI',
            },
          },
          'arr/[0]': 1,
          'arr/[1]': 2,
          'arr/[2]': 3,
          'data/name': {
            firstName: 'Charles-Lévi',
            lastName: 'BRI',
          },
          statistics: {
            deletions: 34,
            updations: 5,
          },
        },
      },
      {
        invite:
          'Very complex with arrays of objects, sep=".", object="both" and start=false',
        parameters: [ttest4, { sep: '.', start: false, object: 'both' }],
        expected: {
          _id: 'nanoid',
          arr: [
            {
              id: 1,
              value: 'one',
            },
            {
              id: 2,
              value: 'two',
            },
            {
              id: 3,
              value: 'three',
            },
          ],
          'arr.[0]': {
            id: 1,
            value: 'one',
          },
          'arr.[0].id': 1,
          'arr.[0].value': 'one',
          'arr.[1]': {
            id: 2,
            value: 'two',
          },
          'arr.[1].id': 2,
          'arr.[1].value': 'two',
          'arr.[2]': {
            id: 3,
            value: 'three',
          },
          'arr.[2].id': 3,
          'arr.[2].value': 'three',
          arr2: [1, 2, 3],
          'arr2.[0]': 1,
          'arr2.[1]': 2,
          'arr2.[2]': 3,
          arr3: ['a', 'b', 'c'],
          'arr3.[0]': 'a',
          'arr3.[1]': 'b',
          'arr3.[2]': 'c',
          data: {
            name: {
              firstName: 'Charles-Lévi',
              lastName: 'BRI',
            },
          },
          'data.name': {
            firstName: 'Charles-Lévi',
            lastName: 'BRI',
          },
          'data.name.firstName': 'Charles-Lévi',
          'data.name.lastName': 'BRI',
          statistics: {
            deletions: 34,
            updations: 5,
          },
          'statistics.deletions': 34,
          'statistics.updations': 5,
        },
      },
      {
        invite:
          'Very complex with arrays of objects, sep="/", object="object" and start=true',
        parameters: [ttest4, { sep: '/', start: true, object: 'object' }],
        expected: {
          '/_id': 'nanoid',
          '/arr': [
            {
              id: 1,
              value: 'one',
            },
            {
              id: 2,
              value: 'two',
            },
            {
              id: 3,
              value: 'three',
            },
          ],
          '/arr/[0]': {
            id: 1,
            value: 'one',
          },
          '/arr/[1]': {
            id: 2,
            value: 'two',
          },
          '/arr/[2]': {
            id: 3,
            value: 'three',
          },
          '/arr2': [1, 2, 3],
          '/arr3': ['a', 'b', 'c'],
          '/data': {
            name: {
              firstName: 'Charles-Lévi',
              lastName: 'BRI',
            },
          },
          '/data/name': {
            firstName: 'Charles-Lévi',
            lastName: 'BRI',
          },
          '/statistics': {
            deletions: 34,
            updations: 5,
          },
        },
      },
      {
        invite:
          'Very complex with arrays of objects,  object="key" and start=false',
        parameters: [ttest4, { start: false, object: 'key' }],
        expected: {
          _id: 'nanoid',
          'arr.[0].id': 1,
          'arr.[0].value': 'one',
          'arr.[1].id': 2,
          'arr.[1].value': 'two',
          'arr.[2].id': 3,
          'arr.[2].value': 'three',
          'arr2.[0]': 1,
          'arr2.[1]': 2,
          'arr2.[2]': 3,
          'arr3.[0]': 'a',
          'arr3.[1]': 'b',
          'arr3.[2]': 'c',
          'data.name.firstName': 'Charles-Lévi',
          'data.name.lastName': 'BRI',
          'statistics.deletions': 34,
          'statistics.updations': 5,
        },
      },
      {
        invite: 'Very complex with arrays of objects, and start=false',
        parameters: [ttest4, { start: false }],
        expected: {
          _id: 'nanoid',
          'arr.[0].id': 1,
          'arr.[0].value': 'one',
          'arr.[1].id': 2,
          'arr.[1].value': 'two',
          'arr.[2].id': 3,
          'arr.[2].value': 'three',
          'arr2.[0]': 1,
          'arr2.[1]': 2,
          'arr2.[2]': 3,
          'arr3.[0]': 'a',
          'arr3.[1]': 'b',
          'arr3.[2]': 'c',
          'data.name.firstName': 'Charles-Lévi',
          'data.name.lastName': 'BRI',
          'statistics.deletions': 34,
          'statistics.updations': 5,
        },
      },
      {
        invite: 'Very complex with arrays of objects, without options',
        parameters: ttest4,
        expected: {
          '._id': 'nanoid',
          '.arr.[0].id': 1,
          '.arr.[0].value': 'one',
          '.arr.[1].id': 2,
          '.arr.[1].value': 'two',
          '.arr.[2].id': 3,
          '.arr.[2].value': 'three',
          '.arr2.[0]': 1,
          '.arr2.[1]': 2,
          '.arr2.[2]': 3,
          '.arr3.[0]': 'a',
          '.arr3.[1]': 'b',
          '.arr3.[2]': 'c',
          '.data.name.firstName': 'Charles-Lévi',
          '.data.name.lastName': 'BRI',
          '.statistics.deletions': 34,
          '.statistics.updations': 5,
        },
      },
    ),
  );
});

test('#debug', () => {
  console.log(
    'flatByKey1',
    decompose(ttest3, { sep: '/', start: false, object: 'both' }),
  );
});
