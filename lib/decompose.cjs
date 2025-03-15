'use strict';

var constants_strings = require('./constants/strings.cjs');
var helpers = require('./helpers.cjs');

function ddecompose(val, prev = '') {
  const _prev = prev ? prev + constants_strings.DELIMITER : '';
  const output = [];
  const entries1 = Object.entries(val);
  entries1.forEach(([key, value]) => {
    const isPrimit = helpers.isPrimitive(value) || Array.isArray(value);
    if (!isPrimit) {
      const values = ddecompose(value, `${_prev}${key}`);
      output.push(...values);
    } else output.push([`${_prev}${key}`, value]);
  });
  return output;
}
const _decompose = val => {
  const entries1 = ddecompose(val, '');
  if (entries1.length == 0) return {};
  const regex = new RegExp(constants_strings.DELIMITER, 'g');
  const entries2 = entries1.map(([key, value]) => [
    key.replace(regex, '.'),
    value,
  ]);
  const output = Object.fromEntries(entries2);
  return output;
};
/* v8 ignore next 1 */
const decompose = val => _decompose(val);
decompose.low = _decompose;
decompose.strict = _decompose;

exports.decompose = decompose;
//# sourceMappingURL=decompose.cjs.map
