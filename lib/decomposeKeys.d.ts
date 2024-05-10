import { sortMap } from './sortMap';
import type { KeysMatching, Ru } from './types';
export declare function decomposeKeys<T extends Ru, AddObjectKeys extends boolean = true>(val: T, sorter?: typeof sortMap, addObjectKeys?: AddObjectKeys): KeysMatching<T, true>[];
//# sourceMappingURL=decomposeKeys.d.ts.map