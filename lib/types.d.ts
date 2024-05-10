export type StateMatching<T extends Record<string, unknown> | string, Key = keyof T> = T extends Record<string, unknown> ? Key extends string ? T[Key] extends Record<string, unknown> ? `${Key}.${StateMatching<T[Key]>}` | (Key & string) : Key & string : never : T;
export type LengthOf<T> = T extends ReadonlyArray<unknown> ? T['length'] : number;
export type DecomposeOptions = {
    delimiter?: string;
    sorter?: (a: string, b: string) => number;
};
export type StateValue = string | StateValueMap;
export interface StateValueMap {
    [key: string]: StateValue;
}
export type Ru = Record<string, unknown>;
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type SplitSeparator<S extends string> = S extends `${infer A}.${string}` ? A : S;
export type Recompose<T extends Ru> = {
    [key in keyof T as SplitSeparator<key & string>]: UnionToIntersection<key extends `${string}.${infer A}` ? A extends `${string}.${string}` ? Recompose<Record<A, T[key]>> : Record<A, T[key]> : T[key]>;
};
export {};
//# sourceMappingURL=types.d.ts.map