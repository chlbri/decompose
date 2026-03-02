import { createTests } from '@bemedev/vitest-extended';
import { assignByKey } from './assign';

describe('assignByKey', () => {
  const { acceptation, success } = createTests(assignByKey.low);

  describe('#00 => Acceptation', acceptation);

  describe(
    '#01 => Simple cases',
    success(
      {
        invite: 'Assign a value to a simple key',
        parameters: [{ a: 1 }, 'a', 2],
        expected: { a: 2 },
      },
      {
        invite: 'Assign a value to a nested key',
        parameters: [{ a: { b: 1 } }, 'a.b', 2],
        expected: { a: { b: 2 } },
      },
      {
        invite: 'Assign a value to a non-existing nested key',
        parameters: [{ a: {} }, 'a.b.c', 3],
        expected: { a: { b: { c: 3 } } },
      },
      {
        invite: 'Assign a value to a non-existing nested key, level 2',
        parameters: [{}, 'a.b.c', 3],
        expected: { a: { b: { c: 3 } } },
      },
      {
        invite: 'Can assign to undefined',
        parameters: [undefined, 'a.b.c', 3],
        expected: { a: { b: { c: 3 } } },
      },
    ),
  );

  describe(
    '#02 => Array cases',
    success(
      {
        invite: 'Assign a value to an array index',
        parameters: [[1, 2, 3], '[0]', 99],
        expected: [99, 2, 3],
      },
      {
        invite: 'Assign a value to last array index',
        parameters: [[1, 2, 3], '[2]', 99],
        expected: [1, 2, 99],
      },
      {
        invite: 'Assign a property on an array element',
        parameters: [[{ a: 1 }, { a: 2 }], '[0].a', 99],
        expected: [{ a: 99 }, { a: 2 }],
      },
      {
        invite: 'Assign a nested property on an array element',
        parameters: [[{ a: { b: 1 } }], '[0].a.b', 42],
        expected: [{ a: { b: 42 } }],
      },
      {
        invite: 'Assign to array index nested in object',
        parameters: [{ items: [1, 2, 3] }, 'items.[1]', 99],
        expected: { items: [1, 99, 3] },
      },
      {
        invite: 'Assign a property on an object in array nested in object',
        parameters: [
          { items: [{ id: 1 }, { id: 2 }] },
          'items.[0].id',
          42,
        ],
        expected: { items: [{ id: 42 }, { id: 2 }] },
      },
      {
        invite: 'Assign from undefined root with array index',
        parameters: [undefined, '[0]', 'hello'],
        expected: ['hello'],
      },
      {
        invite: 'Assign to non-existing array index',
        parameters: [[5], '[1]', 'hello'],
        expected: [5, 'hello'],
      },
      {
        invite: 'Assign to non-existing array index + 1',
        parameters: [[5], '[2]', 'hello'],
        expected: [5, 'hello'],
      },
      {
        invite: 'Assign a property on an empty-slot array element',
        parameters: [[], '[0].a', 1],
        expected: [{ a: 1 }],
      },
      {
        invite: 'Assign a property on an empty-slot array element (+2)',
        parameters: [[], '[2].a', 1],
        expected: [{ a: 1 }],
      },
    ),
  );
});
