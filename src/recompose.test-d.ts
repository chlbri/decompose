import { expectTypeOf } from 'vitest';
import { ttest0, ttest1 } from './fixtures';
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
const et2 = recompose.strict({
  'data.age': 54,
  'data.connected': true,
  'data.login.ad.cd.ef': 'string',
  'data.login.ad.cd.xd': 'string',
  _id: 'id',
});

expectTypeOf(et2).toExtend<Record<string, unknown>>();
expectTypeOf(et2).toExtend<{
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
    connected: boolean;
  };
  _id: string;
}>();
expectTypeOf(et2._id).toEqualTypeOf<'id'>();

expectTypeOf(et2.data).toExtend<{
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
expectTypeOf(et2.data.login.ad.cd).toEqualTypeOf<{
  ef: 'string';
  xd: 'string';
}>();

expectTypeOf(et2.data.login.ad.cd.ef).toEqualTypeOf<'string'>();
expectTypeOf(et2.data.login.ad.cd.xd).toEqualTypeOf<'string'>();
expectTypeOf(et2.data.connected).toEqualTypeOf<true>();

const et22 = recompose({
  'data.age': 54,
  'data.connected': true,
  'data.login.ad.cd.ef': 'string',
  'data.login.ad.cd.xd': 'string',
  _id: 'id',
});
expectTypeOf(et22).toEqualTypeOf<{
  data: {
    age: number;
    connected: boolean;
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
// #endregion

// #region Add some class object
const et3 = recompose.strict({
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
expectTypeOf(et3.id).toEqualTypeOf<'id'>();
expectTypeOf(et3.nu).toEqualTypeOf<null>();
expectTypeOf(et3.undefined).toEqualTypeOf<undefined>();
expectTypeOf(et3.other.nu).toEqualTypeOf<null>();
expectTypeOf(et3.other.undefined).toEqualTypeOf<undefined>();
expectTypeOf(et3.data.age).toEqualTypeOf<54>();
expectTypeOf(et3.age).toEqualTypeOf<65>();
expectTypeOf(et3.data.login).toEqualTypeOf<'login'>();
expectTypeOf(et3.other.bool).toEqualTypeOf<true>();
expectTypeOf(et3.bool).toEqualTypeOf<true>();
expectTypeOf(et3.other.date).toEqualTypeOf<Date>();
expectTypeOf(et3.other._class).toEqualTypeOf<AbortController>();
expectTypeOf(et3.other.classe.another).toEqualTypeOf<Document>();
// #endregion
// #endregion

const et33 = recompose({
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

expectTypeOf(et33).toEqualTypeOf<{
  data: {
    age: number;
    login: string;
  };
  id: string;
  other: {
    nu: null;
    undefined: undefined;
    date: Date;
    _class: AbortController;
    classe: {
      another: Document;
    };
    bool: boolean;
  };
  bool: boolean;
  nu: null;
  undefined: undefined;
  age: number;
}>();
expectTypeOf(et33.id).toEqualTypeOf<string>();
expectTypeOf(et33.nu).toEqualTypeOf<null>();
expectTypeOf(et33.undefined).toEqualTypeOf<undefined>();
expectTypeOf(et33.other.nu).toEqualTypeOf<null>();
expectTypeOf(et33.other.undefined).toEqualTypeOf<undefined>();
expectTypeOf(et33.data.age).toEqualTypeOf<number>();
expectTypeOf(et33.age).toEqualTypeOf<number>();
expectTypeOf(et33.data.login).toEqualTypeOf<string>();
expectTypeOf(et33.other.bool).toEqualTypeOf<boolean>();
expectTypeOf(et33.bool).toEqualTypeOf<boolean>();
expectTypeOf(et33.other.date).toEqualTypeOf<Date>();
expectTypeOf(et33.other._class).toEqualTypeOf<AbortController>();
expectTypeOf(et33.other.classe.another).toEqualTypeOf<Document>();
// #endregion
// #endregion

const et4 = recompose.strict({
  'arr.[0]': 1,
  'arr.[1]': 2,
  'arr.[2]': 3,
});

expectTypeOf(et4).toEqualTypeOf<{
  readonly arr: (1 | 2 | 3)[];
}>();

const et44 = recompose({
  'arr.[0]': 1,
  'arr.[1]': 2,
  'arr.[2]': 3,
});

expectTypeOf(et44).toEqualTypeOf<{
  arr: number[];
}>();
