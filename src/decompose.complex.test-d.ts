import { decompose } from './decompose';
import type { Decompose } from './types.types';

//Create a tests with readonly  array of primitive and array of objects
declare const _ttD: {
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
      another?: Document;
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
      data: {
        info: string;
        stats?: number[];
      }[];
      data2: [
        {
          more: string;
        },
      ];
    },
  ];
  stringA?: string[];
  stringB: { toto: string }[];
};

const ttD = decompose.strict(_ttD, {
  sep: '/',
  object: 'both',
});

type TTT = (typeof _ttD)[`arrayOfObjects`][2]['data'][number];

expectTypeOf(ttD).toEqualTypeOf<{
  '/id': string;

  [key: `/stringA/[${number}]`]: string | undefined;
  [key: `/stringB/[${number}]`]: { toto: string };
  [key: `/stringB/[${number}]/toto`]: string;

  [key: `/arrayOfObjects/[2]/data/[${number}]`]: {
    info: string;
    stats?: number[];
  };

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
    classe: { another?: Document | undefined };
  };

  '/other/date': Date;
  '/other/bool': boolean;
  '/other/permission': PermissionState;
  '/other/_class': AbortController;

  '/other/classe': { another?: Document | undefined };
  '/other/classe/another': Document | undefined;

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
      data: {
        info: string;
        stats?: number[];
      }[];
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

    data: {
      info: string;
      stats?: number[];
    }[];
  };

  '/arrayOfObjects/[0]/name': 'Alfred';
  '/arrayOfObjects/[0]/value': 56;
  '/arrayOfObjects/[1]/name': 'Charles';
  '/arrayOfObjects/[1]/value': 78;
  '/arrayOfObjects/[2]/name': 'Benoit';
  '/arrayOfObjects/[2]/value': 12;

  '/arrayOfObjects/[2]/data': {
    info: string;
    stats?: number[];
  }[];

  '/stringA': string[] | undefined;
  '/stringB': { toto: string }[];
}>();
