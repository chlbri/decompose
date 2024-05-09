import { expect, it } from 'vitest';
import { decomposeSV } from './decomposeSV';

it('String', () => {
  expect(decomposeSV('Hello World')).toEqual(['Hello World']);
});

it('Simple object', () => {
  const obj = {
    a: 'Hello',
    b: 'World',
  };
  expect(decomposeSV(obj)).toEqual(['a', 'a.Hello', 'b', 'b.World']);
});

it('Complex object', () => {
  const obj = {
    a: 'Hello',
    b: 'World',
    c: {
      d: 'Hello',
      e: {
        f: 'World',
        g: 'Again',
      },
    },
  };
  expect(decomposeSV(obj)).toEqual([
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
  ]);
});

it('Complex object with custom order', () => {
  const obj = {
    a: 'Hello',
    b: 'World',
    c: {
      d: 'Hello',
      e: {
        f: 'World',
        g: 'Again',
      },
    },
  };

  const actual = decomposeSV(obj, (a, b) => a.localeCompare(b));
  expect(actual).toEqual([
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
  ]);
});
