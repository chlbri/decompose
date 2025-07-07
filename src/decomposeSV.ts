import { castings } from '@bemedev/types';
import { DELIMITER } from './constants/strings';
import { sortMap } from './sortMap';
import type { StateMatching, StateValue } from './types.types';

function ddecompose(val: StateValue, prev = '') {
  const output: string[] = [];

  const _prev = prev ? prev + DELIMITER : '';
  if (prev !== '') output.push(prev);

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

type DecomposeSV_F = <T extends StateValue>(
  val: T,
  sorter?: typeof sortMap,
) => StateMatching<T>[];

type _DecomposeSV_F = (val: any, sorter?: typeof sortMap) => string[];

export type DecomposeSV = DecomposeSV_F & {
  strict: DecomposeSV_F;
  low: _DecomposeSV_F;
};

const _decomposeSV: _DecomposeSV_F = (val, sorter = sortMap) => {
  const output1 = ddecompose(val, '');
  output1.sort(sorter);
  const regex = new RegExp(DELIMITER, 'g');
  return output1.map(value => value.replace(regex, '.'));
};

/* v8 ignore next 3 */
export const decomposeSV: DecomposeSV = (val, sorter) => {
  return castings.commons.any(_decomposeSV(val, sorter));
};
decomposeSV.low = _decomposeSV;
decomposeSV.strict = castings.commons.unknown<DecomposeSV_F>(_decomposeSV);
