import type { GetParents } from './types.types';

type str0 = 'a';
type str1 = 'a.b.c.d';
type str2 = 'a/b/c/d/e';

expectTypeOf<GetParents<str0>>().toEqualTypeOf<never>();
expectTypeOf<GetParents<str1>>().toEqualTypeOf<'a.b.c' | 'a.b' | 'a'>();
expectTypeOf<GetParents<str2, '/'>>().toEqualTypeOf<
  'a/b/c/d' | 'a/b/c' | 'a/b' | 'a'
>();
