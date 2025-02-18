import type { TrueObject } from '@bemedev/types';
import { DELIMITER } from './constants/strings';
import { isPrimitive } from './helpers';
import type { Decompose } from './types';

function ddecompose(val: any, prev = '') {
  const _prev = prev ? prev + DELIMITER : '';
  const output: [string, any][] = [];
  const entries1 = Object.entries(val);
  entries1.forEach(([key, value]) => {
    const isPrimit = isPrimitive(value);
    if (!isPrimit) {
      const values = ddecompose(value, `${_prev}${key}`);
      output.push(...values);
    } else output.push([`${_prev}${key}`, value]);
  });
  return output;
}

type Decompose_F = <T extends TrueObject>(val: T) => Decompose<T>;
type _Decompose_F = (val: any) => any;

export type Decomposer = Decompose_F & {
  strict: Decompose_F;
  low: _Decompose_F;
};

const _decompose: _Decompose_F = val => {
  const entries1 = ddecompose(val, '');
  if (entries1.length == 0) return {};

  const regex = new RegExp(DELIMITER, 'g');
  const entries2 = entries1.map(([key, value]) => [
    key.replace(regex, '.'),
    value,
  ]);

  const output = Object.fromEntries(entries2);
  return output;
};

/* v8 ignore next 1 */
export const decompose: Decomposer = val => _decompose(val);
decompose.low = _decompose;
decompose.strict = _decompose;
