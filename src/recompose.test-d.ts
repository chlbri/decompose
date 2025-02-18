import { expectTypeOf } from 'vitest';
import { ttest0, ttest1 } from './decompose.fixtures';
import { recompose } from './recompose';

// #region Recompose
// #region Empty
const et0 = recompose(ttest0);
expectTypeOf(et0).toEqualTypeOf<NonNullable<unknown>>();
// #endregion
// #region Simple
const et1 = recompose(ttest1);
expectTypeOf(et1).toEqualTypeOf<{ age: number; name: string }>();
// #endregion

// #region Complex
const et2 = recompose({
  'data.age': 54,
  'data.connected': true,
  'data.login.ad.cd.ef': 'string',
  'data.login.ad.cd.xd': 'string',
  _id: 'id',
});

expectTypeOf(et2).toMatchTypeOf<Record<string, unknown>>();
expectTypeOf(et2).toMatchTypeOf<{
  data: {
    age: number;
    login: {
      ad: {
        cd: {
          ef: string;
          xd: string;
        };
      };
    };
  };
  _id: string;
}>();
expectTypeOf(et2._id).toEqualTypeOf<string>();

expectTypeOf(et2.data).toMatchTypeOf<{
  age: number;
  login: {
    ad: {
      cd: {
        ef: string;
        xd: string;
      };
    };
  };
}>();
expectTypeOf(et2.data.login.ad.cd).toMatchTypeOf<{ ef: string; xd: string }>();

expectTypeOf(et2.data.login.ad.cd.ef).toEqualTypeOf<string>();
expectTypeOf(et2.data.login.ad.cd.xd).toEqualTypeOf<string>();
expectTypeOf(et2.data.connected).toEqualTypeOf<boolean>();
// #endregion

// #region Add some class object
const et3 = recompose({
  'data.age': 54,
  'data.login': 'login',
  id: 'id',
  'other.bool': true,
  'other.nu': null,
  'other.undefined': undefined,
  'other.date': new Date(),
  bool: true,
  nu: null,
  undefined: undefined,
  age: 65,
  /**
   * Don't known anything about this class
   */
  'other._class': new AbortController(),
  'other.classe.another': new Document(),
});
expectTypeOf(et3.id).toEqualTypeOf<string>();
expectTypeOf(et3.nu).toEqualTypeOf<null>();
expectTypeOf(et3.undefined).toEqualTypeOf<undefined>();
expectTypeOf(et3.other.nu).toEqualTypeOf<null>();
expectTypeOf(et3.other.undefined).toEqualTypeOf<undefined>();
expectTypeOf(et3.data.age).toEqualTypeOf<number>();
expectTypeOf(et3.age).toEqualTypeOf<number>();
expectTypeOf(et3.data.login).toEqualTypeOf<string>();
expectTypeOf(et3.other.bool).toEqualTypeOf<boolean>();
expectTypeOf(et3.bool).toEqualTypeOf<boolean>();
expectTypeOf(et3.other.date).toEqualTypeOf<Date>();
expectTypeOf(et3.other._class).toEqualTypeOf<AbortController>();
expectTypeOf(et3.other.classe.another).toEqualTypeOf<Document>();
// #endregion
// #endregion
