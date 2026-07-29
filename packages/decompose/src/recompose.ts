import { merge } from 'ts-deepmerge';
import { DEFAULT_DECOMPOSE_OPTIONS } from './constants';
import { SEPARATOR } from './constants/strings';
import type { DecomposeOptions, Recompose, Ru } from './types.types';

export function recomposeObjectUrl<T>(
  shape: string,
  value: T,
  sep: string = SEPARATOR,
) {
  const obj: Ru = {};
  if (shape.length <= 0) return obj;

  const keys = shape.split(sep);
  if (keys.length === 1) {
    const key = keys.shift();
    obj[key!] = value;
  } else {
    const key = keys.shift();
    obj[key!] = recomposeObjectUrl(keys.join(sep), value, sep);
  }

  return obj;
}

/**
 *  Recompose a flatten object 
 *  @example
 * 
 *  { 'data.age': 10, 'human.login': 'login' }
 *  will become
 *  {
      data: {
        age: 10,
      },
      human: {
        login: 'login',
      },
    }
 *  @remark   
 *  The generated typescript type takes too much ressources

 *  @todo
    Add type to the return
 */
type Recompose_F = <
  const T extends Ru,
  const O extends DecomposeOptions = typeof DEFAULT_DECOMPOSE_OPTIONS,
>(
  shape: T,
  options?: O,
) => Recompose<T, O>;
type _Recompose_F = (shape: any, options?: DecomposeOptions) => any;
type _Recompose2_F = <
  T extends Ru,
  const O extends DecomposeOptions = typeof DEFAULT_DECOMPOSE_OPTIONS,
>(
  shape: T,
  options?: O,
) => Recompose<T, O>;

export type Recomposer = _Recompose2_F & {
  strict: Recompose_F;
  low: _Recompose_F;
};

const _recompose: _Recompose_F = (shape, options) => {
  const { sep, start } = {
    ...DEFAULT_DECOMPOSE_OPTIONS,
    ...options,
  };
  const entries = Object.entries(shape);
  if (entries.length === 0) return {};
  const arr: any[] = [];
  entries.forEach(([key, value]) => {
    const cleanKey =
      start && key.startsWith(sep) ? key.slice(sep.length) : key;
    arr.push(recomposeObjectUrl(cleanKey, value, sep));
  });
  return _recompose2(merge(...arr));
};

const _recompose2: (shape: any) => any = shape => {
  const mustReturn =
    Array.isArray(shape) || typeof shape !== 'object' || shape === null;
  if (mustReturn) return shape;

  const entries = Object.entries(shape).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  const isEmpty = entries.length === 0;
  if (isEmpty) return {};

  const isArray = entries.every(
    ([key]) => key.startsWith('[') && key.endsWith(']'),
  );
  if (isArray) {
    const arr: any[] = [];
    entries.forEach(([key, value]) => {
      const index = parseInt(key.slice(1, -1), 10);
      arr[index] = _recompose2(value);
    });
    return arr;
  }

  return entries.reduce((acc, [key, value]) => {
    acc[key] = _recompose2(value);
    return acc;
  }, {} as any);
};

export const recompose: Recomposer = (shape, options) =>
  _recompose(shape, options);
recompose.low = _recompose;
recompose.strict = _recompose;
