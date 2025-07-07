import type { types } from '@bemedev/types';

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

// #region Decompose
type ToPaths<
  T,
  D extends string = '.',
  P extends string = '',
> = T extends Ru
  ? Required<{
      [K in keyof T]: ToPaths<T[K], D, `${P}${K & string}${D}`>;
    }>[keyof T]
  : { path: P extends `${infer P}${D}` ? P : never; type: T };

type FromPaths<T extends { path: string; type: unknown }> = {
  [P in T['path']]: Extract<T, { path: P }>['type'];
};

/**
 * From "Acid Coder"
 */
export type Decompose<
  T extends types.TrueObject,
  D extends string = '.',
> = types.NotSubType<FromPaths<ToPaths<T, D>>, undefined>;
// #endregion

export type LengthOf<T> =
  T extends ReadonlyArray<unknown> ? T['length'] : number;

export type StateValue = string | StateValueMap;

export interface StateValueMap {
  [key: string]: StateValue;
}

export type Ru = Record<string, unknown>;

// #region Recompose
// #region Preparation
// type Primitive = string | number | boolean | null | undefined | never;
type UnionToIntersection<U> = boolean extends U
  ? U
  : (U extends unknown ? (k: U) => void : never) extends (
        k: infer I,
      ) => void
    ? I
    : never;

type SplitSeparator<S extends string> = S extends `${infer A}.${string}`
  ? A
  : S;
// #endregion

export type Recompose<T extends Ru> = {
  [key in keyof T as SplitSeparator<key & string>]: UnionToIntersection<
    key extends `${string}.${infer A}`
      ? A extends `${string}.${string}`
        ? Recompose<Record<A, T[key]>>
        : Record<A, T[key]>
      : T[key]
  >;
};
// #endregion
