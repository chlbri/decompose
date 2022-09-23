
export type StateMatching<
  T extends Record<string, unknown> | string,
  Key = keyof T,
> = T extends Record<string, unknown>
  ? Key extends string
    ? T[Key] extends Record<string, unknown>
      ? `${Key}.${StateMatching<T[Key]>}` | (Key & string)
      : `${Key}.${T[Key] & string}` | (Key & string)
    : never
  : T;

export type LengthOf<T> = T extends ReadonlyArray<unknown>
  ? T['length']
  : number;

export type DecomposeOptions = {
  delimiter?: string;
  sorter?: (a: string, b: string) => number;
};

type _UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type _LastOf<T> = _UnionToIntersection<
  T extends unknown ? () => T : never
> extends () => infer R
  ? R
  : never;

type _Push<T extends unknown[], V> = [...T, V];

type _TuplifyUnionBoolean<T> = [T] extends [never] ? true : false;

// TS4.1+
export type TuplifyUnion<T> = true extends _TuplifyUnionBoolean<T>
  ? []
  : _Push<TuplifyUnion<Exclude<T, _LastOf<T>>>, _LastOf<T>>;

// #endregion

export type StateValue = string | StateValueMap;

export interface StateValueMap {
  [key: string]: StateValue;
}

