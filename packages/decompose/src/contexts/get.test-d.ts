import { getByKey } from './get';

declare const _getByKey: {
  a: number;
  b?: {
    c: string;
    d?: boolean;
  };
  e?: string[];
};

declare const ttdp1: {
  id: string;
  data: {
    age: number;
    login: string;
  };
  other: {
    date?: Date;
    bool?: boolean;
    permission?: PermissionState;
    _class?: AbortController;
    classe?: {
      another: Document;
    };
  };
  cbool?: boolean;
};

const getByKey1 = getByKey.defined(_getByKey, 'b');
expectTypeOf(getByKey1).toEqualTypeOf<{ c: string; d?: boolean }>();

const getByKey2 = getByKey.defined(_getByKey, 'a');
expectTypeOf(getByKey2).toEqualTypeOf<number>();

const getByKey3 = getByKey.defined(_getByKey, 'e');
expectTypeOf(getByKey3).toEqualTypeOf<string[]>();

const getByKey4 = getByKey.typed(_getByKey, 'e');
expectTypeOf(getByKey4).toEqualTypeOf<string[] | undefined>();

const getByKey5 = getByKey.defined(_getByKey, 'b.c');
expectTypeOf(getByKey5).toEqualTypeOf<string>();

const getByKey6 = getByKey.typed(_getByKey, 'b.c');
expectTypeOf(getByKey6).toEqualTypeOf<string | undefined>();

const getByKey7 = getByKey.typed(_getByKey, 'b.d');
expectTypeOf(getByKey7).toEqualTypeOf<boolean | undefined>();

const getByKey8 = getByKey.defined(_getByKey, 'b.d');
expectTypeOf(getByKey8).toEqualTypeOf<boolean>();

const getByKey9 = getByKey.options({
  sep: '/',
  start: true,
  object: 'both',
})(ttdp1, '/other/classe/another');
expectTypeOf(getByKey9).toEqualTypeOf<Document | undefined>();
