import { expectTypeOf } from 'vitest';
import { decompose } from './decompose';
import { ttest0, ttest1, ttest2 } from './decompose.fixtures';
import type { Decompose } from './types.types';

// #region Empty
const ttD0 = decompose(ttest0);
// eslint-disable-next-line @typescript-eslint/ban-types
expectTypeOf(ttD0).toEqualTypeOf<unknown>();
// #endregion

// #region Simple
const ttD1 = decompose(ttest1);
expectTypeOf(ttD1).toMatchObjectType<{
  '.age': number;
  '.name': string;
}>();
// #endregion

// #region Complex
const ttD2 = decompose(ttest2);
expectTypeOf(ttD2).toMatchObjectType<{
  '._id': string;
  '.data.name.firstName': string;
  '.data.name.lastName': string;
  '.statistics.deletions': number;
  '.statistics.updations': number;
}>();
// #endregion

// #region Complex With Classes
declare const ttD3: Decompose<
  {
    id: string;
    data: {
      age: number;
      login: string;
    };
    other: {
      date: Date;
      bool: boolean;
      permission: PermissionState;
      _class: AbortController;
      classe: {
        another: Document;
      };
    };
  },
  { object: 'both' }
>;

expectTypeOf(ttD3).toMatchObjectType<{
  '.id': string;
  '.data.age': number;
  '.data.login': string;
  '.other.bool': boolean;
  '.other.date': Date;
  '.data': {
    age: number;
    login: string;
  };
  '.other': {
    date: Date;
    bool: boolean;
    permission: PermissionState;
    _class: AbortController;
    classe: { another: Document };
  };
  '.other.permission': PermissionState;
  '.other._class': AbortController;
  '.other.classe.another': Document;
  '.other.classe': { another: Document };
}>();

declare const ttD4: Decompose<
  {
    id: string;
    data: {
      age: number;
      login: string;
    };
    other: {
      date: Date;
      bool: boolean;
      permission: PermissionState;
      _class: AbortController;
      classe: {
        another: Document;
      };
    };
  },
  { sep: '/' }
>;

expectTypeOf(ttD4).toMatchObjectType<{
  '/id': string;
  '/data/age': number;
  '/data/login': string;
  '/other/date': Date;
  '/other/bool': boolean;
  '/other/permission': PermissionState;
  '/other/_class': AbortController;
  '/other/classe/another': Document;
}>();

// #endregion
