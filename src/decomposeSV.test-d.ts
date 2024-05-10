import { expectType } from 'tsd';
import { ttest0 } from './decompose.fixtures';
import { decomposeSV } from './decomposeSV';

// #region Empty
// eslint-disable-next-line @typescript-eslint/ban-types
const ttKM0 = decomposeSV(ttest0);
expectType<never[]>(ttKM0);
// #endregion

// #region Simple
const ttKM1 = decomposeSV({
  password: 'string',
  login: 'string',
} as const);
expectType<('login' | 'password' | 'password.string' | 'login.string')[]>(
  ttKM1,
);
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

expectType<
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
>(ttKM2);
// #endregion
