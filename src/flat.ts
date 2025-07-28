import type { types } from '@bemedev/types';
import { decompose } from './decompose';
import {
  DEFAULT_FLAT_OPTIONS,
  type FlatByKey,
  type FlatOptions,
} from './types.types';

type Flat_F = <
  T extends types.Ru,
  omit extends types.PickKeysBy<T, object> & string,
>(
  val: T,
  omitKey: omit,
  options?: FlatOptions,
) => FlatByKey<T, omit, FlatOptions>;

type _Flat_F = (val: any, omitKey: string, options?: FlatOptions) => any;

export type Flat = Flat_F & {
  strict: Flat_F;
  low: _Flat_F;
};

const _flat: _Flat_F = (val, omitKey, options = DEFAULT_FLAT_OPTIONS) => {
  const { sep, children } = {
    ...DEFAULT_FLAT_OPTIONS,
    ...options,
  };

  const first = decompose(val, {
    object: 'object',
    sep,
    start: true,
  });

  const output: any = {};

  const entries = Object.entries(first);
  if (entries.length === 0) return output;

  entries
    .filter(([k]) => {
      const splits = k.split(`${sep}${omitKey}${sep}`);
      const last = splits[splits.length - 1];

      return !last.includes(omitKey);
    })
    .forEach(([k, v]) => {
      const _value = structuredClone(v);
      if (!children) delete _value[omitKey];
      const key = k.replace(new RegExp(`${omitKey}${sep}`, 'g'), '');

      output[key] = _value;
    });

  return output;
};

export const flat: Flat = (val, key, options) => _flat(val, key, options);
flat.low = _flat;
flat.strict = _flat;
