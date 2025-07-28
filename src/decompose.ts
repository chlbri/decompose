import { DELIMITER } from './constants/strings';
import { isPrimitive } from './helpers';
import {
  DEFAULT_DECOMPOSE_OPTIONS,
  type Decompose,
  type DecomposeOptions,
} from './types.types';

function ddecompose(
  val: any,
  prev = '',
  options: DecomposeOptions = DEFAULT_DECOMPOSE_OPTIONS,
) {
  const { object } = {
    ...DEFAULT_DECOMPOSE_OPTIONS,
    ...options,
  };
  const canAddObjectKeys = object === 'both' || object === 'object';
  const canAddKeys = object === 'both' || object === 'key';

  const _prev = prev ? prev + DELIMITER : '';
  const output: [string, any][] = [];
  const entries1 = Object.entries(val);
  entries1.forEach(([key, value]) => {
    const isPrimit = isPrimitive(value) || Array.isArray(value);
    if (!isPrimit) {
      const values = ddecompose(value, `${_prev}${key}`, options);
      output.push(...values);

      if (canAddObjectKeys) {
        output.push([`${_prev}${key}`, value]);
      }
    } else if (canAddKeys) output.push([`${_prev}${key}`, value]);
  });
  return output;
}

type Decompose_F = <T>(val: T, options?: DecomposeOptions) => Decompose<T>;
type _Decompose_F = (val: any, options?: DecomposeOptions) => any;

export type Decomposer = Decompose_F & {
  strict: Decompose_F;
  low: _Decompose_F;
};

const _decompose: _Decompose_F = (val, options) => {
  const entries1 = ddecompose(val, '', options);

  const { sep, start } = {
    ...DEFAULT_DECOMPOSE_OPTIONS,
    ...options,
  };
  if (entries1.length == 0) return {};

  const regex = new RegExp(DELIMITER, 'g');
  const entries2 = entries1.map(([__key, value]) => {
    const _key = __key.replace(regex, sep);
    const key = start ? `${sep}${_key}` : _key;
    return [key, value];
  });

  const output = Object.fromEntries(entries2);
  return output;
};

/* v8 ignore next 1 */
export const decompose: Decomposer = (val, options) =>
  _decompose(val, options);
decompose.low = _decompose;
decompose.strict = _decompose;
