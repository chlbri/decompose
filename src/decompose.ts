/* eslint-disable @typescript-eslint/no-explicit-any */
import { DELIMITER } from './constants/strings';
import { isPrimitive } from './helpers';
import type { Decompose, Ru } from './types';

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

export function decompose<T extends Ru>(val: T) {
  const entries1 = ddecompose(val, '');
  if (entries1.length == 0) return {} as Decompose<T>;
  const regex = new RegExp(DELIMITER, 'g');
  const entries2 = entries1.map(([key, value]) => [
    key.replace(regex, '.'),
    value,
  ]);
  const output = Object.fromEntries(entries2);
  return output as Decompose<T>;
}
