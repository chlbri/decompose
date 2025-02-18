import type { TrueObject } from '@bemedev/types';
import type { Decompose } from './types';
type Decompose_F = <T extends TrueObject>(val: T) => Decompose<T>;
type _Decompose_F = (val: any) => any;
export type Decomposer = Decompose_F & {
    strict: Decompose_F;
    low: _Decompose_F;
};
export declare const decompose: Decomposer;
export {};
//# sourceMappingURL=decompose.d.ts.map