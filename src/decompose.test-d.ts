import { expectTypeOf } from 'vitest';
import { decompose } from './decompose';
import { ttest0, ttest1, ttest2 } from './fixtures';
import type { Decompose } from './types.types';

// #region Empty
const ttD0 = decompose(ttest0);
// eslint-disable-next-line @typescript-eslint/ban-types
expectTypeOf(ttD0).toEqualTypeOf<{}>();
// #endregion

// #region Simple
const ttD1 = decompose(ttest1);
expectTypeOf(ttD1).toEqualTypeOf<{
  '.age': number;
  '.name': string;
}>();
// #endregion

// #region Complex
const ttD2 = decompose(ttest2);
expectTypeOf(ttD2).toEqualTypeOf<{
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
      login: 'string';
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

expectTypeOf(ttD3).toEqualTypeOf<{
  '.id': string;
  '.data.age': number;
  '.data.login': 'string';
  '.other.bool': boolean;
  '.other.date': Date;
  '.data': {
    age: number;
    login: 'string';
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

expectTypeOf(ttD4).toEqualTypeOf<{
  '/id': string;
  '/data/age': number;
  '/data/login': string;
  '/other/date': Date;
  '/other/bool': boolean;
  '/other/permission': PermissionState;
  '/other/_class': AbortController;
  '/other/classe/another': Document;
}>();

type _TTD4P = Partial<{
  id: string;
  data: {
    age: number;
    login: string;
  };
  other: Partial<{
    date: Date;
    bool: boolean;
    permission: PermissionState;
    _class: AbortController;
    classe: {
      another: Document;
    };
  }>;
}>;

declare const ttD4p: Decompose<_TTD4P, { sep: '/'; object: 'both' }>;

expectTypeOf(ttD4p).toEqualTypeOf<{
  '/id': string | undefined;
  '/data/age': number;
  '/data/login': string;
  '/other/date': Date;
  '/other/bool': boolean;
  '/other/permission': 'denied' | 'granted' | 'prompt';
  '/other/_class': AbortController;
  '/other/classe/another': Document;
  '/data':
    | {
        age: number;
        login: string;
      }
    | undefined;
  '/other':
    | Partial<{
        date: Date;
        bool: boolean;
        permission: PermissionState;
        _class: AbortController;
        classe: {
          another: Document;
        };
      }>
    | undefined;
  '/other/classe': {
    another: Document;
  };
}>();

//Create a tests with readonly  array of primitive and array of objects
declare const ttD5: Decompose<
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
    arrayOfPrimitives: ['Toto', true, 42, null];
    arrayOfObjects: [
      {
        name: 'Alfred';
        value: 56;
      },
      {
        name: 'Charles';
        value: 78;
      },
      {
        name: 'Benoit';
        value: 12;
      },
    ];
    stringA: string[];
  },
  { sep: '/'; object: 'both' }
>;

expectTypeOf(ttD5).toEqualTypeOf<{
  '/id': string;

  [key: `/stringA/[${number}]`]: string;

  '/data': {
    age: number;
    login: string;
  };
  '/data/age': number;
  '/data/login': string;

  '/other': {
    date: Date;
    bool: boolean;
    permission: PermissionState;
    _class: AbortController;
    classe: { another: Document };
  };
  '/other/date': Date;
  '/other/bool': boolean;
  '/other/permission': PermissionState;
  '/other/_class': AbortController;

  '/other/classe': { another: Document };
  '/other/classe/another': Document;

  '/arrayOfPrimitives': ['Toto', true, 42, null];
  '/arrayOfPrimitives/[0]': 'Toto';
  '/arrayOfPrimitives/[1]': true;
  '/arrayOfPrimitives/[2]': 42;
  '/arrayOfPrimitives/[3]': null;
  '/arrayOfObjects': [
    {
      name: 'Alfred';
      value: 56;
    },
    {
      name: 'Charles';
      value: 78;
    },
    {
      name: 'Benoit';
      value: 12;
    },
  ];

  '/arrayOfObjects/[0]': {
    name: 'Alfred';
    value: 56;
  };

  '/arrayOfObjects/[1]': {
    name: 'Charles';
    value: 78;
  };

  '/arrayOfObjects/[2]': {
    name: 'Benoit';
    value: 12;
  };

  '/arrayOfObjects/[0]/name': 'Alfred';
  '/arrayOfObjects/[0]/value': 56;
  '/arrayOfObjects/[1]/name': 'Charles';
  '/arrayOfObjects/[1]/value': 78;
  '/arrayOfObjects/[2]/name': 'Benoit';
  '/arrayOfObjects/[2]/value': 12;

  '/stringA': string[];
}>();

type _TTD6 = {
  iterator: number;
  input: string;
  data: string[];
};

declare const ttD6O: Decompose<_TTD6, { start: false; object: 'object' }>;

expectTypeOf(ttD6O).toEqualTypeOf<{
  data: string[];
}>();

declare const ttD6B: Decompose<_TTD6, { start: false; object: 'both' }>;

expectTypeOf(ttD6B).toEqualTypeOf<{
  iterator: number;
  input: string;
  data: string[];
  [key: `data.[${number}]`]: string;
}>();

declare const ttD6K: Decompose<_TTD6, { start: false; object: 'key' }>;

expectTypeOf(ttD6K).toEqualTypeOf<{
  iterator: number;
  input: string;
}>;

const _ttd7 = {
  iterator: 0,
  input: '',
  data: [] as string[],
};

const ttD7O = decompose(_ttd7, { start: false, object: 'object' });

expectTypeOf(ttD7O).toEqualTypeOf<{
  data: string[];
}>();

const ttD7B = decompose(_ttd7, { start: false, object: 'both' });

expectTypeOf(ttD7B).toEqualTypeOf<{
  iterator: number;
  input: string;
  data: string[];
  [key: `data.[${number}]`]: string;
}>();

const ttD7K = decompose(_ttd7, { start: false, object: 'key' });

expectTypeOf(ttD7K).toEqualTypeOf<{
  iterator: number;
  input: string;
  [key: `data.[${number}]`]: string;
}>();
// #endregion
