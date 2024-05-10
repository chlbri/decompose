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
//# sourceMappingURL=types.d.ts.map