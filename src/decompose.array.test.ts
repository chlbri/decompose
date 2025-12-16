import { createTests } from '@bemedev/vitest-extended';
import { decompose } from './decompose';

describe('decompose.array', () => {
  const { acceptation, success } = createTests(decompose.low);
  describe('#0 => Acceptation', acceptation);

  describe(
    '#1 => Success - Deep nested arrays',
    success(
      {
        invite: 'Simple array of primitives',
        parameters: [[1, 2, 3]],
        expected: {
          '.[0]': 1,
          '.[1]': 2,
          '.[2]': 3,
        },
      },
      {
        invite: 'Simple array of primitives with object="both"',
        parameters: [[1, 2, 3], { object: 'both' }],
        expected: {
          '.[0]': 1,
          '.[1]': 2,
          '.[2]': 3,
        },
      },
      {
        invite: 'Simple array of strings',
        parameters: [['a', 'b', 'c']],
        expected: {
          '.[0]': 'a',
          '.[1]': 'b',
          '.[2]': 'c',
        },
      },
      {
        invite: 'Array of objects',
        parameters: [
          [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
          ],
        ],
        expected: {
          '.[0].id': 1,
          '.[0].name': 'Alice',
          '.[1].id': 2,
          '.[1].name': 'Bob',
        },
      },
      {
        invite: 'Array of objects with object="both"',
        parameters: [
          [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
          ],
          { object: 'both' },
        ],
        expected: {
          '.[0]': { id: 1, name: 'Alice' },
          '.[0].id': 1,
          '.[0].name': 'Alice',
          '.[1]': { id: 2, name: 'Bob' },
          '.[1].id': 2,
          '.[1].name': 'Bob',
        },
      },
      {
        invite: 'Nested arrays - 2 levels',
        parameters: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
        expected: {
          '.[0].[0]': 1,
          '.[0].[1]': 2,
          '.[1].[0]': 3,
          '.[1].[1]': 4,
        },
      },
      {
        invite: 'Nested arrays - 2 levels with object="both"',
        parameters: [
          [
            [1, 2],
            [3, 4],
          ],
          { object: 'both' },
        ],
        expected: {
          '.[0]': [1, 2],
          '.[0].[0]': 1,
          '.[0].[1]': 2,
          '.[1]': [3, 4],
          '.[1].[0]': 3,
          '.[1].[1]': 4,
        },
      },
      {
        invite: 'Nested arrays - 3 levels',
        parameters: [[[[1, 2], [3]], [[4, 5, 6]]]],
        expected: {
          '.[0].[0].[0]': 1,
          '.[0].[0].[1]': 2,
          '.[0].[1].[0]': 3,
          '.[1].[0].[0]': 4,
          '.[1].[0].[1]': 5,
          '.[1].[0].[2]': 6,
        },
      },
      {
        invite: 'Nested arrays - 3 levels with sep="/"',
        parameters: [[[[1, 2], [3]], [[4, 5, 6]]], { sep: '/' }],
        expected: {
          '/[0]/[0]/[0]': 1,
          '/[0]/[0]/[1]': 2,
          '/[0]/[1]/[0]': 3,
          '/[1]/[0]/[0]': 4,
          '/[1]/[0]/[1]': 5,
          '/[1]/[0]/[2]': 6,
        },
      },
      {
        invite: 'Array with nested objects containing arrays',
        parameters: [
          [
            { id: 1, tags: ['a', 'b'] },
            { id: 2, tags: ['c', 'd', 'e'] },
          ],
        ],
        expected: {
          '.[0].id': 1,
          '.[0].tags.[0]': 'a',
          '.[0].tags.[1]': 'b',
          '.[1].id': 2,
          '.[1].tags.[0]': 'c',
          '.[1].tags.[1]': 'd',
          '.[1].tags.[2]': 'e',
        },
      },
      {
        invite:
          'Array with nested objects containing arrays with object="both"',
        parameters: [
          [
            { id: 1, tags: ['a', 'b'] },
            { id: 2, tags: ['c', 'd', 'e'] },
          ],
          { object: 'both' },
        ],
        expected: {
          '.[0]': { id: 1, tags: ['a', 'b'] },
          '.[0].id': 1,
          '.[0].tags': ['a', 'b'],
          '.[0].tags.[0]': 'a',
          '.[0].tags.[1]': 'b',
          '.[1]': { id: 2, tags: ['c', 'd', 'e'] },
          '.[1].id': 2,
          '.[1].tags': ['c', 'd', 'e'],
          '.[1].tags.[0]': 'c',
          '.[1].tags.[1]': 'd',
          '.[1].tags.[2]': 'e',
        },
      },
      {
        invite:
          'Deep nested: array of objects with nested arrays of objects',
        parameters: [
          [
            {
              category: 'A',
              items: [
                { name: 'item1', count: 5 },
                { name: 'item2', count: 10 },
              ],
            },
            {
              category: 'B',
              items: [{ name: 'item3', count: 15 }],
            },
          ],
        ],
        expected: {
          '.[0].category': 'A',
          '.[0].items.[0].name': 'item1',
          '.[0].items.[0].count': 5,
          '.[0].items.[1].name': 'item2',
          '.[0].items.[1].count': 10,
          '.[1].category': 'B',
          '.[1].items.[0].name': 'item3',
          '.[1].items.[0].count': 15,
        },
      },
      {
        invite:
          'Deep nested: array of objects with nested arrays of objects with sep="/" and object="both"',
        parameters: [
          [
            {
              category: 'A',
              items: [
                { name: 'item1', count: 5 },
                { name: 'item2', count: 10 },
              ],
            },
            {
              category: 'B',
              items: [{ name: 'item3', count: 15 }],
            },
          ],
          { sep: '/', object: 'both' },
        ],
        expected: {
          '/[0]': {
            category: 'A',
            items: [
              { name: 'item1', count: 5 },
              { name: 'item2', count: 10 },
            ],
          },
          '/[0]/category': 'A',
          '/[0]/items': [
            { name: 'item1', count: 5 },
            { name: 'item2', count: 10 },
          ],
          '/[0]/items/[0]': { name: 'item1', count: 5 },
          '/[0]/items/[0]/name': 'item1',
          '/[0]/items/[0]/count': 5,
          '/[0]/items/[1]': { name: 'item2', count: 10 },
          '/[0]/items/[1]/name': 'item2',
          '/[0]/items/[1]/count': 10,
          '/[1]': {
            category: 'B',
            items: [{ name: 'item3', count: 15 }],
          },
          '/[1]/category': 'B',
          '/[1]/items': [{ name: 'item3', count: 15 }],
          '/[1]/items/[0]': { name: 'item3', count: 15 },
          '/[1]/items/[0]/name': 'item3',
          '/[1]/items/[0]/count': 15,
        },
      },
      {
        invite: 'Mixed: nested arrays and objects with start=false',
        parameters: [
          [
            { level: 1, data: [[{ value: 'deep' }]] },
            { level: 2, data: [[{ value: 'deeper' }]] },
          ],
          { start: false },
        ],
        expected: {
          '[0].level': 1,
          '[0].data.[0].[0].value': 'deep',
          '[1].level': 2,
          '[1].data.[0].[0].value': 'deeper',
        },
      },
      {
        invite: 'Array with null and undefined values',
        parameters: [[1, null, undefined, 'test']],
        expected: {
          '.[0]': 1,
          '.[1]': null,
          '.[2]': undefined,
          '.[3]': 'test',
        },
      },
      {
        invite: 'Empty array',
        parameters: [[]],
        expected: [],
      },
      {
        invite: 'Empty array with object="both"',
        parameters: [[], { object: 'both' }],
        expected: [],
      },
      {
        invite: 'Array with mixed types',
        parameters: [[1, 'string', true, { key: 'value' }, [5, 6]]],
        expected: {
          '.[0]': 1,
          '.[1]': 'string',
          '.[2]': true,
          '.[3].key': 'value',
          '.[4].[0]': 5,
          '.[4].[1]': 6,
        },
      },
      {
        invite: 'Array with mixed types and object="both"',
        parameters: [
          [1, 'string', true, { key: 'value' }, [5, 6]],
          { object: 'both' },
        ],
        expected: {
          '.[0]': 1,
          '.[1]': 'string',
          '.[2]': true,
          '.[3]': { key: 'value' },
          '.[3].key': 'value',
          '.[4]': [5, 6],
          '.[4].[0]': 5,
          '.[4].[1]': 6,
        },
      },
    ),
  );
});
