import { t } from '@bemedev/types';
import { DELIMITER } from './constants/strings.js';
import { isPrimitive } from './helpers.js';
import { sortMap } from './sortMap.js';

function ddecomposeKeys(val, prev = '', addObjectKeys = true) {
  const _prev = prev ? prev + DELIMITER : '';
  const output = [];
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
const _decomposeKeys = (val, sorter = sortMap, addObjectKeys = true) => {
  const output1 = ddecomposeKeys(val, '', addObjectKeys);
  output1.sort(sorter);
  const regex = new RegExp(DELIMITER, 'g');
  return output1.map(value => value.replace(regex, '.'));
};
const decomposeKeys = (val, sorter, addObjectKeys) => {
  return t.any(_decomposeKeys(val, sorter, addObjectKeys));
};
decomposeKeys.low = _decomposeKeys;
decomposeKeys.strict = t.unknown(_decomposeKeys);

export { decomposeKeys };
//# sourceMappingURL=decomposeKeys.js.map
