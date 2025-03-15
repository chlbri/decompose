import { createTests } from '@bemedev/vitest-extended';
import { decomposeSV } from './decomposeSV';

describe('decomposeSV', () => {
  const { acceptation, success } = createTests(decomposeSV.low);
  describe('#0 => Acceptation', acceptation);

  describe(
    '#1 => Success',
    success(
      {
        invite: 'string',
        parameters: 'Hello World',
        expected: ['Hello World'],
      },
      {
        invite: 'Simple object',
        parameters: { a: 'Hello', b: 'World' },
        expected: ['a', 'a.Hello', 'b', 'b.World'],
      },
      {
        invite: 'Complex object',
        parameters: {
          a: 'Hello',
          b: 'World',
          c: {
            d: 'Hello',
            e: {
              f: 'World',
              g: 'Again',
            },
          },
        },

        expected: [
          'a',
          'a.Hello',
          'b',
          'b.World',
          'c',
          'c.d',
          'c.d.Hello',
          'c.e',
          'c.e.f',
          'c.e.f.World',
          'c.e.g',
          'c.e.g.Again',
        ],
      },
      {
        invite: 'Complex object with custom order',
        parameters: {
          a: 'Hello',
          c: {
            e: {
              f: 'World',
              g: 'Again',
            },
            d: 'Hello',
          },
          b: 'World',
        },

        expected: [
          'a',
          'a.Hello',
          'b',
          'b.World',
          'c',
          'c.d',
          'c.d.Hello',
          'c.e',
          'c.e.f',
          'c.e.f.World',
          'c.e.g',
          'c.e.g.Again',
        ],
      },
    ),
  );
});
