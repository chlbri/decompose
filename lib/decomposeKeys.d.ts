import { sortMap } from './sortMap';
import type { KeysMatching, Ru } from './types.types';
type DecomposeKeys_F = <
  T extends Ru,
  AddObjectKeys extends boolean = true,
>(
  val: T,
  sorter?: typeof sortMap,
  addObjectKeys?: AddObjectKeys,
) => KeysMatching<T, AddObjectKeys>[];
type _DecomposeKeys_F = (
  val: any,
  sorter?: typeof sortMap,
  addObjectKeys?: boolean,
) => string[];
export type DecomposeKeys = DecomposeKeys_F & {
  strict: DecomposeKeys_F;
  low: _DecomposeKeys_F;
};
export declare const decomposeKeys: DecomposeKeys;
export {};
//# sourceMappingURL=decomposeKeys.d.ts.map
