import { decompose } from './decompose';

it('String', () => {
  expect(decompose('Hello World')).toEqual(['Hello World']);
});

it('Simple object', () => {
  const obj = {
    a: 'Hello',
    b: 'World',
  };
  expect(decompose(obj)).toEqual(['a', 'b', 'a.Hello', 'b.World']);
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
  expect(decompose(obj)).toEqual([
    'a',
    'b',
    'c',
    'a.Hello',
    'b.World',
    'c.d',
    'c.e',
    'c.d.Hello',
    'c.e.f',
    'c.e.g',
    'c.e.f.World',
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

  const actual = decompose(obj, (a, b) => a.localeCompare(b));
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
