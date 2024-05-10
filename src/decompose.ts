import { DELIMITER } from './constants/strings';
import { isPrimitive } from './helpers';
import { sortMap } from './sortMap';
import { Ru } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ddecompose(val: any, prev = '') {
  const _prev = prev ? prev + DELIMITER : '';
  const output: string[] = [];
  const entries1 = Object.entries(val);
  entries1.forEach(([key, value]) => {
    output.push(`${_prev}${key}`);
    const isPrimit = isPrimitive(value);
    if (!isPrimit) {
      const values = ddecompose(value, `${_prev}${key}`);
      output.push(...values);
    }
  });
  return output;
}

export function decompose<T extends Ru>(
  val: T,
  sorter?: (a: string, b: string) => number,
) {
  const output1 = ddecompose(val, '');
  output1.sort(sorter ?? sortMap);
  const regex = new RegExp(DELIMITER, 'g');
  const output2 = output1.map(value => value.replace(regex, '.'));

  return output2;
}
