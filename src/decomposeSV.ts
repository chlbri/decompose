import { DELIMITER } from './constants/strings';
import { sortMap } from './sortMap';
import type { StateMatching, StateValue } from './types';

function ddecompose(val: StateValue, prev = '') {
  const output: string[] = [];

  const _prev = prev ? prev + DELIMITER : '';
  prev !== '' && output.push(prev);

  if (typeof val === 'string') {
    output.push(`${_prev}${val}`);
  } else {
    const keys = Object.keys(val);
    output.push(
      ...keys.map(key => ddecompose(val[key], `${_prev}${key}`)).flat(),
    );
  }

  return output;
}

export function decomposeSV<T extends StateValue>(
  val: T,
  sorter = sortMap,
) {
  const output1 = ddecompose(val, '');
  output1.sort(sorter);
  const regex = new RegExp(DELIMITER, 'g');
  const output2 = output1.map(value => value.replace(regex, '.'));

  return output2 as StateMatching<T>[];
}
