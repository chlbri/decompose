import type { Decompose, GetParents } from './types.types';

type str0 = 'a';
type str1 = 'a.b.c.d';
type str2 = 'a/b/c/d/e';

expectTypeOf<GetParents<str0>>().toEqualTypeOf<never>();
expectTypeOf<GetParents<str1>>().toEqualTypeOf<'a.b.c' | 'a.b' | 'a'>();
expectTypeOf<GetParents<str2, '/'>>().toEqualTypeOf<
  'a/b/c/d' | 'a/b/c' | 'a/b' | 'a'
>();

type Complex1 = Decompose<
  {
    fn: (num: number) => any;
    array: [number, string, boolean, { body: any; age: number }];
    body: any;
  },
  { object: 'both'; start: false }
>;

expectTypeOf<Complex1>().toEqualTypeOf<{
  fn: (num: number) => any;
  array: [
    number,
    string,
    boolean,
    {
      body: any;
      age: number;
    },
  ];
  'array.[0]': number;
  'array.[1]': string;
  'array.[2]': boolean;
  'array.[3]': {
    body: any;
    age: number;
  };
  'array.[3].body': any;
  'array.[3].age': number;
  body: any;
}>();
