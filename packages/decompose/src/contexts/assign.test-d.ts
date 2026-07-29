import { assignByKey } from './assign';

const ttD1 = assignByKey.typed({ a: { b: 1 } }, 'a.b', 2);
const ttD2 = assignByKey.typed({ a: { b: 1 } }, 'a', { b: 2 });

expectTypeOf(ttD1).toEqualTypeOf<{ a: { b: number } }>(ttD2);
