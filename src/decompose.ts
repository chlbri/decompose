import { StateValue } from 'xstate';
import { DELIMITER } from './constants/strings';
import { sortMap } from './sortMap';
import { StateMatching } from './types';

function ddecompose(val: StateValue, prev = '') {
  const _prev = prev ? prev + DELIMITER : '';
  const output: string[] = [];
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

export function decompose<T extends StateValue>(
  val: T,
  sorter?: (a: string, b: string) => number,
): readonly StateMatching<T>[] {
  const first = ddecompose(val, '');
  first.sort(sorter ?? sortMap(DELIMITER));
  const regex = new RegExp(DELIMITER, 'g');
  const output = first.map(value => value.replace(regex, '.'));

  return Object.freeze(output) as StateMatching<T>[];
}
