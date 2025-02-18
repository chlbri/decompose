import { sortMap } from './sortMap';
import type { StateMatching, StateValue } from './types';
type DecomposeSV_F = <T extends StateValue>(val: T, sorter?: typeof sortMap) => StateMatching<T>[];
type _DecomposeSV_F = (val: any, sorter?: typeof sortMap) => string[];
export type DecomposeSV = DecomposeSV_F & {
    strict: DecomposeSV_F;
    low: _DecomposeSV_F;
};
export declare const decomposeSV: DecomposeSV;
export {};
//# sourceMappingURL=decomposeSV.d.ts.map