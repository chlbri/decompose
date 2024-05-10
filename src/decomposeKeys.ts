/* eslint-disable @typescript-eslint/no-explicit-any */
import { DELIMITER } from './constants/strings';
import { isPrimitive } from './helpers';
import { sortMap } from './sortMap';
import type { KeysMatching, Ru } from './types';

function ddecomposeKeys(val: any, prev = '', addObjectKeys = true) {
  const _prev = prev ? prev + DELIMITER : '';
  const output: string[] = [];
  const entries1 = Object.entries(val);
  entries1.forEach(([key, value]) => {
    const isPrimit = isPrimitive(value);
    if (!isPrimit) {
      if (addObjectKeys) output.push(`${_prev}${key}`);
      const values = ddecomposeKeys(
        value,
        `${_prev}${key}`,
        addObjectKeys,
      );
      output.push(...values);
    } else output.push(`${_prev}${key}`);
  });
  return output;
}

export function decomposeKeys<
  T extends Ru,
  AddObjectKeys extends boolean = true,
>(val: T, sorter = sortMap, addObjectKeys?: AddObjectKeys) {
  const output1 = ddecomposeKeys(val, '', addObjectKeys);
  output1.sort(sorter);
  const regex = new RegExp(DELIMITER, 'g');
  const output2 = output1.map(value => value.replace(regex, '.'));

  return output2 as KeysMatching<T, true>[];
}
