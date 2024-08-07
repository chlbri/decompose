export type StateMatching<T extends StateValue, Key = keyof T> = T extends StateValueMap ? Key extends string ? T[Key] extends StateValueMap ? `${Key}.${StateMatching<T[Key]>}` | Key : `${Key}.${T[Key] & string}` | Key : never : T;
type NotUndefined<T> = Exclude<T, undefined>;
type NoU<T> = NotUndefined<T>;
export type KeysMatching<T extends object, AddObjectKeys extends boolean = true, Key extends keyof T = keyof T> = Key extends string ? NoU<T[Key]> extends object ? `${Key}.${KeysMatching<NoU<T[Key]>, AddObjectKeys> & string}` | (AddObjectKeys extends true ? Key : never) : Key : never;
type ToPaths<T, P extends string = ''> = T extends Ru ? {
    [K in keyof T]: ToPaths<T[K], `${P}${K & string}.`>;
}[keyof T] : {
    path: P extends `${infer P}.` ? P : never;
    type: T;
};
type FromPaths<T extends {
    path: string;
    type: unknown;
}> = {
    [P in T['path']]: Extract<T, {
        path: P;
    }>['type'];
};
/**
 * From "Acid Coder"
 */
export type Decompose<T extends Ru> = FromPaths<ToPaths<T>>;
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
type UnionToIntersection<U> = boolean extends U ? U : (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type SplitSeparator<S extends string> = S extends `${infer A}.${string}` ? A : S;
export type Recompose<T extends Ru> = {
    [key in keyof T as SplitSeparator<key & string>]: UnionToIntersection<key extends `${string}.${infer A}` ? A extends `${string}.${string}` ? Recompose<Record<A, T[key]>> : Record<A, T[key]> : T[key]>;
};
export {};
//# sourceMappingURL=types.d.ts.map