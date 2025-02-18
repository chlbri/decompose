import { t } from '@bemedev/types';
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

type DecomposeKeys_F = <
  T extends Ru,
  AddObjectKeys extends boolean = true,
>(
  val: T,
  sorter?: typeof sortMap,
  addObjectKeys?: AddObjectKeys,
) => KeysMatching<T, AddObjectKeys>[];

type _DecomposeKeys_F = (
  val: any,
  sorter?: typeof sortMap,
  addObjectKeys?: boolean,
) => string[];

export type DecomposeKeys = DecomposeKeys_F & {
  strict: DecomposeKeys_F;
  low: _DecomposeKeys_F;
};

const _decomposeKeys: _DecomposeKeys_F = (
  val,
  sorter = sortMap,
  addObjectKeys = true,
) => {
  const output1 = ddecomposeKeys(val, '', addObjectKeys);
  output1.sort(sorter);
  const regex = new RegExp(DELIMITER, 'g');
  return output1.map(value => value.replace(regex, '.'));
};

export const decomposeKeys: DecomposeKeys = (val, sorter, addObjectKeys) =>
  _decomposeKeys(val, sorter, addObjectKeys) as any;
decomposeKeys.low = _decomposeKeys;
decomposeKeys.strict = t.unknown<DecomposeKeys_F>(_decomposeKeys);
