import { createTests } from '@bemedev/vitest-extended';
import { relative } from 'node:path';
import tsd, { formatter } from 'tsd';
import { decomposeSV } from './decomposeSV';

describe.concurrent('#1 => Function', () => {
  const { acceptation, success } = createTests(decomposeSV.low);
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
    '#1 => Success',
    success(
      {
        invite: 'string',
        parameters: ['Hello World'],
        expected: ['Hello World'],
      },
      {
        invite: 'Simple object',
        parameters: [{ a: 'Hello', b: 'World' }],
        expected: ['a', 'a.Hello', 'b', 'b.World'],
      },
      {
        invite: 'Complex object',
        parameters: [
          {
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
        ],
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
        parameters: [
          {
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
        ],
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
