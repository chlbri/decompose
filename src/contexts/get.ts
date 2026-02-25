import type { DEFAULT_OPTIONS } from './constants';
import { decompose } from '../decompose';
import type { Decompose, DecomposeOptions, Ru } from '../types.types';

// #region type GetByKey_F
export type GetByKey_F = <
  const T extends Ru,
  const K extends keyof Decompose<T, typeof DEFAULT_OPTIONS>,
>(
  obj: T,
  key: Extract<K, string>,
) => Decompose<T, typeof DEFAULT_OPTIONS>[K];

export type GetByKeyOption_F = <
  const O extends DecomposeOptions = typeof DEFAULT_OPTIONS,
>(
  val: O,
) => <const T extends Ru, const K extends keyof Decompose<T, O>>(
  obj: T,
  key: Extract<K, string>,
) => Decompose<T, O>[K];
// #endregion

export interface GetByKey {
  (obj: any, key: string): any;
  low: (obj: any, key: string) => any;
  typed: GetByKey_F;
  options: GetByKeyOption_F;
}

const _getByKey: GetByKey['low'] = (obj, key) => {
  const decomposed = decompose.low(obj, { start: false, object: 'both' });
  return (decomposed as any)[key];
};

/**
 * Retrieves a value from an object by a specified key.
 * @param obj The object to retrieve the value from
 * @param key The key to retrieve the value for, can be a nested key (e.g. 'a.b.c')
 * @returns The value associated with the specified key in the object
 *
 * @see {@linkcode Decompose} for more details on object decomposition.
 */
export const getByKey: GetByKey = (obj, key) => _getByKey(obj, key);

getByKey.low = getByKey;
getByKey.typed = getByKey;
getByKey.options = options => (obj, key) => {
  const decomposed = decompose.low(obj, options);
  return decomposed[key];
};
