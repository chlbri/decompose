import { createTests } from '@bemedev/vitest-extended';
import { getByKey } from './get';

describe('getByKey', () => {
  describe('#01 => getByKey.low', () => {
    const { acceptation, success } = createTests(getByKey.low);

    describe('#00 => Acceptation', acceptation);

    describe(
      '#01 => Cases',
      success(
        {
          invite: 'Get a value from a simple key',
          parameters: [{ a: 1 }, 'a'],
          expected: 1,
        },
        {
          invite: 'Get a value from a nested key',
          parameters: [{ a: { b: 1 } }, 'a.b'],
          expected: 1,
        },
        {
          invite: 'Get a value from a nested key, level 2',
          parameters: [{ a: { b: { c: 1 } } }, 'a.b.c'],
          expected: 1,
        },
        {
          invite: 'Object',
          parameters: [{ a: { b: { c: 1 } } }, 'a'],
          expected: { b: { c: 1 } },
        },
        {
          invite: 'Get a value from a non-existing nested key',
          parameters: [{ a: {} }, 'a.b.c'],
          expected: undefined,
        },
        {
          invite: 'Get a value from a non-existing nested key, level 2',
          parameters: [{}, 'a.b.c'],
          expected: undefined,
        },
        {
          invite: 'Can get from undefined',
          parameters: [undefined, 'a.b.c'],
          expected: undefined,
        },
      ),
    );

    describe(
      '#02 => Array cases',
      success(
        {
          invite: 'Get first element of a root array',
          parameters: [[1, 2, 3], '[0]'],
          expected: 1,
        },
        {
          invite: 'Get last element of a root array',
          parameters: [[1, 2, 3], '[2]'],
          expected: 3,
        },
        {
          invite: 'Get a property from an array element',
          parameters: [[{ a: 1 }, { a: 2 }], '[0].a'],
          expected: 1,
        },
        {
          invite: 'Get a nested property from an array element',
          parameters: [[{ a: { b: 42 } }], '[0].a.b'],
          expected: 42,
        },
        {
          invite: 'Get an object element from array (object: both)',
          parameters: [[{ a: 1 }, { a: 2 }], '[1]'],
          expected: { a: 2 },
        },
        {
          invite: 'Get from array nested in object',
          parameters: [{ items: [10, 20, 30] }, 'items.[0]'],
          expected: 10,
        },
        {
          invite: 'Get from object in array nested in object',
          parameters: [{ items: [{ id: 7 }] }, 'items.[0].id'],
          expected: 7,
        },
        {
          invite: 'Non-existing array index',
          parameters: [[1, 2], '[5]'],
          expected: undefined,
        },
      ),
    );
  });

  describe('#02 => getByKey.options', () => {
    const CONFIG1 = { start: false, object: 'both' } as const;
    const CONFIG2 = { start: true, object: 'key', sep: '/' } as const;

    describe(`#01 => Config ::: ${JSON.stringify(CONFIG1)}`, () => {
      const { success } = createTests(getByKey.options(CONFIG1) as any);

      describe(
        '#01 => Cases',
        success(
          {
            invite: 'Get a value from a simple key',
            parameters: [{ a: 1 }, 'a'],
            expected: 1,
          },
          {
            invite: 'Get a value from a nested key',
            parameters: [{ a: { b: 1 } }, 'a.b'],
            expected: 1,
          },
          {
            invite: 'Get a value from a nested key, level 2',
            parameters: [{ a: { b: { c: 1 } } }, 'a.b.c'],
            expected: 1,
          },
          {
            invite: 'Object',
            parameters: [{ a: { b: { c: 1 } } }, 'a'],
            expected: { b: { c: 1 } },
          },
          {
            invite: 'Get a value from a non-existing nested key',
            parameters: [{ a: {} }, 'a.b.c'],
            expected: undefined,
          },
          {
            invite: 'Get a value from a non-existing nested key, level 2',
            parameters: [{}, 'a.b.c'],
            expected: undefined,
          },
          {
            invite: 'Can get from undefined',
            parameters: [undefined, 'a.b.c'],
            expected: undefined,
          },
        ),
      );
    });

    describe(`#02 => Config ::: ${JSON.stringify(CONFIG2)}`, () => {
      const { success } = createTests(getByKey.options(CONFIG2) as any);

      describe(
        '#01 => Successfull Cases',
        success(
          {
            invite: 'Get a value from a simple key',
            parameters: [{ a: 1 }, '/a'],
            expected: 1,
          },
          {
            invite: 'Undefined if not started with sep. #1',
            parameters: [{ a: 1 }, 'a'],
            expected: undefined,
          },
          {
            invite: 'Get a value from a nested key',
            parameters: [{ a: { b: 1 } }, '/a/b'],
            expected: 1,
          },
          {
            invite: 'Undefined if not started with sep. #1',
            parameters: [{ a: { b: 1 } }, 'a/b'],
            expected: undefined,
          },
          {
            invite: 'Undefined for object. #1',
            parameters: [{ a: { b: 1 } }, '/a'],
            expected: undefined,
          },
          {
            invite: 'Get a value from a nested key, level 2',
            parameters: [{ a: { b: { c: 1 } } }, '/a/b/c'],
            expected: 1,
          },
          {
            invite: 'Undefined for object. #2',
            parameters: [{ a: { b: { c: 1 } } }, '/a/b'],
            expected: undefined,
          },
        ),
      );
    });
  });
});
