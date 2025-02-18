import { expectType } from 'tsd';
import { decompose } from './decompose';
import { ttest0, ttest1, ttest2 } from './decompose.fixtures';
import type { Decompose } from './types';

// #region Empty
const ttD0 = decompose(ttest0);
// eslint-disable-next-line @typescript-eslint/ban-types
expectType<{}>(ttD0);
// #endregion

// #region Simple
const ttD1 = decompose(ttest1);
expectType<{ age: number; name: string }>(ttD1);
// #endregion

// #region Complex
const ttD2 = decompose(ttest2);
expectType<{
  _id: string;
  'data.name.firstName': string;
  'data.name.lastName': string;
  'statistics.deletions': number;
  'statistics.updations': number;
}>(ttD2);
// #endregion

// #region Complex With Classes
declare const ttD3: Decompose<{
  id: string;
  data?: {
    age?: number;
    login: string;
  };
  other?: {
    date: Date;
    bool: boolean;
    permission: PermissionState;
    _class?: AbortController;
    classe?: {
      another: Document;
    };
  };
}>;

expectType<{
  id: string;
  'data.age': number | undefined;
  'data.login': string;
  'other.bool': boolean;
  'other.date': Date;
  /**
   * Don't known anything about this class
   */
  'other.permission': PermissionState;
  'other._class': AbortController | undefined;
  'other.classe.another': Document;
}>(ttD3);

declare const ttD4: Decompose<
  {
    id: string;
    data?: {
      age?: number;
      login: string;
    };
    other?: {
      date: Date;
      bool: boolean;
      permission: PermissionState;
      _class?: AbortController;
      classe?: {
        another: Document;
      };
    };
  },
  '/'
>;

expectType<{
  id: string;
  'data/age': number | undefined;
  'data/login': string;
  'other/date': Date;
  'other/bool': boolean;
  'other/permission': 'denied' | 'granted' | 'prompt';
  'other/_class': AbortController | undefined;
  'other/classe/another': Document;
}>(ttD4);
// #endregion
