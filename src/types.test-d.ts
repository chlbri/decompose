import { expectType } from 'tsd';
import type { Recompose } from './types';

// #region Simple
declare const et1: Recompose<{ age: number; login: string }>;
expectType<{ age: number; login: string }>(et1);
// #endregion

// #region Complex
declare const et2: Recompose<{
  'data.age': number;
  'data.login.ad.cd.ef': string;
  'data.login.ad.cd.xd': string;
  'data.connected': boolean;
  id: string;
}>;
expectType<string>(et2.id);
expectType<string>(et2.data.login.ad.cd.ef);
expectType<string>(et2.data.login.ad.cd.xd);
expectType<boolean>(et2.data.connected);
// #endregion

// #region Add some class object
declare const et3: Recompose<{
  'data.age': number;
  'data.login': string;
  id: string;
  'other.bool': boolean;
  'other.date': Date;
  /**
   * Don't known anything about this class
   */
  'other.permission': PermissionState;
  'other._class': AbortController;
  'other.classe.another': Document;
}>;
expectType<string>(et3.id);
expectType<number>(et3.data.age);
expectType<string>(et3.data.login);
expectType<boolean>(et3.other.bool);
expectType<Date>(et3.other.date);
expectType<PermissionState>(et3.other.permission);
expectType<AbortController>(et3.other._class);
expectType<Document>(et3.other.classe.another);
// #endregion
