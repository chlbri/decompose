import {
  DELIMITER,
  LEFT_BRACKET,
  RIGHT_BRACKET,
} from './constants/strings';
import { isPrimitive } from './helpers';
import {
  DEFAULT_DECOMPOSE_OPTIONS,
  type Decompose,
  type DecomposeOptions,
} from './types.types';

function ddecompose(
  arg: any,
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

  const isArray = Array.isArray(arg);
  if (isArray) {
    if (canAddObjectKeys) output.push([`${prev}`, arg]);

    arg.forEach((item, index) => {
      const values = ddecompose(
        item,
        `${_prev}${LEFT_BRACKET}${index}${RIGHT_BRACKET}`,
        options,
      );
      output.push(...values);
    });
    return output;
  }

  const isPrimit = isPrimitive(arg);
  if (isPrimit) {
    if (canAddKeys) output.push([`${prev}`, arg]);
    return output;
  }

  if (canAddObjectKeys && prev !== '') output.push([`${prev}`, arg]);

  const entries1 = Object.entries(arg);
  entries1.forEach(([key, value]) => {
    const values = ddecompose(value, `${_prev}${key}`, options);
    output.push(...values);
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

  const regexDel = new RegExp(DELIMITER, 'g');
  const regexLeft = new RegExp(LEFT_BRACKET, 'g');
  const regexRight = new RegExp(RIGHT_BRACKET, 'g');
  const entries2 = entries1.map(([__key, value]) => {
    const _key = __key
      .replace(regexDel, sep)
      .replace(regexLeft, `[`)
      .replace(regexRight, `]`);
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
