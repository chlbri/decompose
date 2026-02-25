import {
  isArrayIndex,
  nextDefault,
  parseIndex,
  splitKey,
} from '../helpers';
import type { Decompose, Ru } from '../types.types';
import type { DEFAULT_OPTIONS } from './constants';

// #region type AssignByBey_F
export type AssignByBey_F = <
  T extends Ru,
  D extends Decompose<T, typeof DEFAULT_OPTIONS>,
  K extends Extract<keyof D, string>,
  R extends D[K],
>(
  obj: T,
  key: K,
  value: R,
) => T;
// #endregion

export interface AssignByKey {
  (obj: any, key: string, value: any): any;
  low: (obj: any, key: string, value: any) => any;
  typed: AssignByBey_F;
}

const _assignByKey: AssignByKey['low'] = (obj, key, value) => {
  const segments = splitKey(key);

  const [first, ...rest] = segments;
  const out: any = obj ?? nextDefault(first);

  if (rest.length === 0) {
    if (isArrayIndex(first)) {
      out[parseIndex(first)] = value;
    } else {
      out[first] = value;
    }
    return out;
  }

  const nextKey = rest.join('.');
  const next = rest[0];
  const _nextDefault = nextDefault(next);

  if (isArrayIndex(first)) {
    const idx = parseIndex(first);
    out[idx] = _assignByKey(out[idx] ?? _nextDefault, nextKey, value);
  } else {
    out[first] = _assignByKey(out[first] ?? _nextDefault, nextKey, value);
  }

  return out;
};

/**
 * Assigns a value to a path in an object.
 * @param obj The object to assign the value to
 * @param path The key to assign the value to, can be a nested key (e.g. 'a.b.c')
 * @param value The value to assign to the key
 * @returns The modified object with the value assigned to the specified key
 *
 * @see {@linkcode Decompose} for more details on object decomposition.
 */
export const assignByKey: AssignByKey = (obj, path, value) => {
  return _assignByKey(obj, path, value);
};

assignByKey.low = assignByKey;
assignByKey.typed = assignByKey;
