import { createTests } from '@bemedev/vitest-extended';
import tsd, { formatter } from 'tsd';
import { describe, expect, test } from 'vitest';
import { decomposeSV } from './decomposeSV';
import { relative } from 'node:path';

test('#0 => Types', async () => {
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
});

describe('#1 => Function', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useTests = createTests(decomposeSV as any);

  useTests(
    ['string', ['Hello World'], ['Hello World']],
    [
      'Simple object',
      [
        {
          a: 'Hello',
          b: 'World',
        },
      ],
      ['a', 'a.Hello', 'b', 'b.World'],
    ],
    [
      'Complex object',
      [
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
      [
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
    ],
    [
      'Complex object with custom order',
      [
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
      [
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
    ],
  );
});
