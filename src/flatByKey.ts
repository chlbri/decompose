import type { types } from '@bemedev/types';
import { DEFAULT_FLAT_OPTIONS } from './helpers';
import type { FlatByKey, FlatOptions } from './types.types';

type Flat_F = <
  T extends types.Ru,
  omit extends types.PickKeysBy<T, object> & string,
>(
  val: T,
  omitKey: omit,
  options?: FlatOptions,
) => FlatByKey<T, omit, FlatOptions>;

type _Flat_F = (
  val: any,
  omitKey: string,
  options?: FlatOptions,
  path?: string,
) => any;

export type Flat = Flat_F & {
  strict: Flat_F;
  low: _Flat_F;
};

const _flat: _Flat_F = (val, omitKey, options, path = '') => {
  const _options = { ...DEFAULT_FLAT_OPTIONS, ...options };
  const { [omitKey]: recursives, ...rest } = val;

  const check = _options.children;

  let out: any = {};
  out[path === '' ? _options.sep : path] = check ? val : rest;

  if (recursives) {
    for (const key in recursives) {
      if (Object.prototype.hasOwnProperty.call(recursives, key)) {
        const element = recursives[key];
        const inner = _flat(
          element,
          omitKey,
          options,
          `${path}${_options.sep}${key}`,
        );
        out = { ...out, ...inner };
      }
    }
  }

  return out;
};

export const flatByKey: Flat = (val, key, options) =>
  _flat(val, key, options);
flatByKey.low = _flat;
flatByKey.strict = _flat;
