'use strict';

var types = require('@bemedev/types');
var constants_strings = require('./constants/strings.cjs');
var sortMap = require('./sortMap.cjs');

function ddecompose(val, prev = '') {
  const output = [];
  const _prev = prev ? prev + constants_strings.DELIMITER : '';
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
const _decomposeSV = (val, sorter = sortMap.sortMap) => {
  const output1 = ddecompose(val, '');
  output1.sort(sorter);
  const regex = new RegExp(constants_strings.DELIMITER, 'g');
  return output1.map(value => value.replace(regex, '.'));
};
/* v8 ignore next 3 */
const decomposeSV = (val, sorter) => {
  return types.castings.commons.any(_decomposeSV(val, sorter));
};
decomposeSV.low = _decomposeSV;
decomposeSV.strict = types.castings.commons.unknown(_decomposeSV);

exports.decomposeSV = decomposeSV;
//# sourceMappingURL=decomposeSV.cjs.map
