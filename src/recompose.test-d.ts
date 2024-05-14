import { expectAssignable, expectType } from 'tsd';
import { ttest0, ttest1 } from './decompose.fixtures';
import { recompose } from './recompose';

// #region Recompose
// #region Empty
const et0 = recompose(ttest0);
expectType<NonNullable<unknown>>(et0);
// #endregion
// #region Simple
const et1 = recompose(ttest1);
expectType<{ age: number; name: string }>(et1);
// #endregion

// #region Complex
const et2 = recompose({
  'data.age': 54,
  'data.connected': true,
  'data.login.ad.cd.ef': 'string',
  'data.login.ad.cd.xd': 'string',
  _id: 'id',
});

expectAssignable<Record<string, unknown>>(et2);
expectAssignable<{
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
}>(et2);
expectType<string>(et2._id);

expectAssignable<{
  age: number;
  login: {
    ad: {
      cd: {
        ef: string;
        xd: string;
      };
    };
  };
}>(et2.data);
expectAssignable<{ ef: string; xd: string }>(et2.data.login.ad.cd);

expectType<string>(et2.data.login.ad.cd.ef);
expectType<string>(et2.data.login.ad.cd.xd);
expectType<boolean>(et2.data.connected);
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
expectType<string>(et3.id);
expectType<null>(et3.nu);
expectType<undefined>(et3.undefined);
expectType<null>(et3.other.nu);
expectType<undefined>(et3.other.undefined);
expectType<number>(et3.data.age);
expectType<number>(et3.age);
expectType<string>(et3.data.login);
expectType<boolean>(et3.other.bool);
expectType<boolean>(et3.bool);
expectType<Date>(et3.other.date);
expectType<AbortController>(et3.other._class);
expectType<Document>(et3.other.classe.another);
// #endregion
// #endregion
