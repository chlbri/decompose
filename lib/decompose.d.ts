import { type Decompose, type DecomposeOptions } from './types.types';
type Decompose_F = <T>(val: T, options?: DecomposeOptions) => Decompose<T>;
type _Decompose_F = (val: any, options?: DecomposeOptions) => any;
export type Decomposer = Decompose_F & {
    strict: Decompose_F;
    low: _Decompose_F;
};
export declare const decompose: Decomposer;
export {};
//# sourceMappingURL=decompose.d.ts.map