import { expectTypeOf } from 'vitest';
import { decomposeSV } from './decomposeSV';
import { ttest0 } from './fixtures';

// #region Empty
// eslint-disable-next-line @typescript-eslint/ban-types
const ttKM0 = decomposeSV(ttest0);
expectTypeOf(ttKM0).toEqualTypeOf<never[]>();
// #endregion

// #region Simple
const ttKM1 = decomposeSV({
  password: 'string',
  login: 'string',
} as const);
expectTypeOf(ttKM1).toEqualTypeOf<
  ('login' | 'password' | 'password.string' | 'login.string')[]
>();
// #endregion

// #region Complex
const ttKM2 = decomposeSV({
  a: 'Hello',
  c: {
    e: {
      f: 'World',
      g: 'Again',
    },
    d: 'Hello',
  },
  b: 'World',
} as const);

expectTypeOf(ttKM2).toEqualTypeOf<
  (
    | 'a'
    | 'a.Hello'
    | 'b'
    | 'b.World'
    | 'c'
    | 'c.d'
    | 'c.d.Hello'
    | 'c.e'
    | 'c.e.f'
    | 'c.e.f.World'
    | 'c.e.g'
    | 'c.e.g.Again'
  )[]
>();
// #endregion
