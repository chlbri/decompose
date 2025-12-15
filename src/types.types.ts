import type { types } from '@bemedev/types';
import type {
  DEFAULT_DECOMPOSE_OPTIONS,
  DEFAULT_FLAT_OPTIONS,
} from './helpers';

export type StateMatching<
  T extends StateValue,
  Key = keyof T,
> = T extends StateValueMap
  ? Key extends string
    ? T[Key] extends StateValueMap
      ? `${Key}.${StateMatching<T[Key]>}` | Key
      : `${Key}.${T[Key] & string}` | Key
    : never
  : T;

export type KeysMatching<
  T extends types.TrueObject,
  AddObjectKeys extends boolean = true,
  Key extends keyof T = keyof T,
> = Key extends string
  ? Required<T[Key]> extends types.TrueObject
    ?
        | `${Key}.${KeysMatching<Required<T[Key]>, AddObjectKeys> & string}`
        | (AddObjectKeys extends true ? Key : never)
    : Key
  : never;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type EmptyObject = {};

//build type that separate a type by two: optional (not undefined) keys and required keys
export type SeparateOptionalAndRequiredKeys<T> = {
  requireds: {
    [K in keyof T as EmptyObject extends Pick<T, K> ? never : K]: T[K];
  };
  optionals: {
    [K in keyof T as EmptyObject extends Pick<T, K> ? K : never]: T[K];
  };
};

export type SeparateUndefinedAndRequiredKeys<T> = {
  requireds: {
    [K in keyof T as undefined extends T[K] ? never : K]: T[K];
  };
  undefineds: {
    [K in keyof T as undefined extends T[K] ? K : never]: T[K];
  };
};

// #region Decompose

// #region type Decompose
type WO = 'key' | 'object' | 'both';

// #region type _Decompose
type _Decompose<
  T,
  sep extends string = '.',
  wo extends WO = 'key',
  Remaining extends string = '',
> = {
  [k in Exclude<keyof T, undefined>]: T[k] extends infer Tk
    ? types._UnionToIntersection2<
        Tk extends types.AnyArray<infer A>
          ? number extends Tk['length']
            ? (wo extends 'object' | 'both'
                ? Record<`${Remaining}${k & string}`, Tk>
                : EmptyObject) &
                (A extends Ru
                  ? _Decompose<
                      A,
                      sep,
                      wo,
                      `${Remaining}${k & string}${sep}[${number}]${sep}`
                    > &
                      (wo extends 'object' | 'both'
                        ? {
                            [Key in `${Remaining}${k & string}${sep}[${number}]`]: A;
                          }
                        : EmptyObject)
                  : wo extends 'key' | 'both'
                    ? {
                        [Key in `${Remaining}${k & string}${sep}[${number}]`]: A;
                      }
                    : EmptyObject)
            : Extract<
                {
                  [Key in Extract<
                    keyof Tk,
                    `${number}`
                  > as `${Remaining}${k & string}${sep}[${Key & string}]`]: Tk[Key] extends infer TK2
                    ? TK2 extends Ru | types.AnyArray
                      ? _Decompose<
                          TK2,
                          sep,
                          wo,
                          `${Remaining}${k & string}${sep}[${Key & string}]${sep}`
                        > &
                          (wo extends 'object' | 'both'
                            ? Record<
                                `${Remaining}${k & string}${sep}[${Key & string}]`,
                                TK2
                              >
                            : EmptyObject)
                      : wo extends 'key' | 'both'
                        ? Record<
                            `${Remaining}${k & string}${sep}[${Key & string}]`,
                            TK2
                          >
                        : never
                    : never;
                } extends infer ARR
                  ? ARR[keyof ARR]
                  : never,
                object
              > &
                (wo extends 'object' | 'both'
                  ? Record<`${Remaining}${k & string}`, Tk>
                  : EmptyObject)
          : Tk extends Ru
            ? EmptyObject extends Required<Tk>
              ? Record<`${Remaining}${k & string}`, Tk>
              : _Decompose<
                  Tk,
                  sep,
                  wo,
                  `${Remaining}${k & string}${sep}`
                > &
                  (wo extends 'object' | 'both'
                    ? Record<`${Remaining}${k & string}`, Tk>
                    : EmptyObject)
            : wo extends 'key' | 'both'
              ? Record<`${Remaining}${k & string}`, Tk>
              : never
      >
    : never;
}[Exclude<keyof T, undefined>];
// #endregion

export type DecomposeOptions = {
  sep?: string;
  object?: WO;
  start?: boolean;
};

type DefaultDecomposeOptions = typeof DEFAULT_DECOMPOSE_OPTIONS;

export type Decompose<
  T,
  O extends DecomposeOptions = DefaultDecomposeOptions,
  sep extends string = O['sep'] extends string
    ? O['sep']
    : DefaultDecomposeOptions['sep'],
> =
  EmptyObject extends Required<T>
    ? EmptyObject
    : types.UnionToIntersection<
          _Decompose<
            T,
            sep,
            O['object'] extends WO
              ? O['object']
              : DefaultDecomposeOptions['object'],
            O['start'] extends infer S extends boolean
              ? S extends true
                ? sep
                : ''
              : sep
          >
        > extends infer P
      ? P
      : never;
// #endregion

// #endregion

// #region type FlatByKey
type _ExcludeFrom<
  S extends string,
  T extends string,
  Delimiter extends string = '.',
> = Exclude<
  S extends `${string}${T}${infer V}` ? _ExcludeFrom<V, T, Delimiter> : S,
  `${string}${string}${Delimiter}${string}` | ''
>;

export type ExtractEndsFrom<
  S extends string,
  T extends string,
  Delimiter extends string = '.',
> = Extract<
  S,
  `${string}${Delimiter}${T}${_ExcludeFrom<S, T, Delimiter>}`
>;

export type ExcludeFrom<
  S extends string,
  T extends string,
  Delimiter extends string = '.',
> = S extends `${infer P}${Delimiter}${T}${infer V}`
  ? ExcludeFrom<`${P}${V}`, T, Delimiter>
  : S;

// export type ExcludeFrom<
//   S extends string,
//   T extends string,
//   Delimiter extends string = '.',
// > = _ExcludeFrom2<ExtractFrom<S, T, Delimiter>, T>;

type _FlatByKey<
  T,
  KEY extends types.PickKeysBy<T, object>,
  wc extends boolean = false,
  sep extends string = '.',
> = (Decompose<T, { sep: sep; object: 'object' }> extends infer D
  ? {
      [K in ExtractEndsFrom<keyof D & string, KEY, sep> as ExcludeFrom<
        K,
        KEY,
        sep
      >]: wc extends true ? D[K] : Omit<D[K], KEY>;
    }
  : never) &
  Record<sep, T>;

export type FlatOptions = {
  sep?: string;
  children?: boolean;
};

type DefaultFlatOptions = typeof DEFAULT_FLAT_OPTIONS;
export type FlatByKey<
  T,
  omit extends types.PickKeysBy<T, object>,
  O extends FlatOptions = DefaultFlatOptions,
> = _FlatByKey<
  T,
  omit,
  O['children'] extends boolean
    ? O['children']
    : DefaultFlatOptions['children'],
  O['sep'] extends string ? O['sep'] : DefaultFlatOptions['sep']
>;

//#endregion

export type StateValue = string | StateValueMap;

export interface StateValueMap {
  [key: string]: StateValue;
}

export type Ru = Record<string, unknown>;

// #region Recompose
// #region Preparation

export type UnionKeys<U> = U extends Record<infer K, any> ? K : never;

type SplitSeparator<S extends string> = S extends `${infer A}.${string}`
  ? A
  : S;

// Simple tuple creation for arrays up to 10 elements

export type IndexString = `[${number}]`;

// #endregion

type _Recompose<T extends Ru> = {
  [key in keyof T as SplitSeparator<
    key & string
  >]: types._UnionToIntersection1<
    key extends `${string}.${infer A}`
      ? A extends `${string}.${string}`
        ? _Recompose<Record<A, T[key]>>
        : Record<A, T[key]>
      : T[key]
  >;
};

export type Recompose<T extends Ru> = Recompose3<_Recompose<T>>;

export type Compare<T, U> = T extends U
  ? U extends T
    ? true
    : false
  : false;

export type Recompose3<T extends types.To> = keyof T extends never
  ? NonNullable<unknown>
  : keyof T extends IndexString
    ? types.ValuesOf<T>[]
    : {
        [K in keyof T]: T[K] extends infer TK extends types.To
          ? Recompose3<TK>
          : T[K];
      };

// #endregion
