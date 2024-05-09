'use strict';

var constants_strings = require('./constants/strings.cjs');
var sortMap = require('./sortMap.cjs');

function ddecompose(val, prev = '') {
    const _prev = prev ? prev + constants_strings.DELIMITER : '';
    const output = [];
    prev !== '' && output.push(prev);
    if (typeof val === 'string') {
        output.push(`${_prev}${val}`);
    }
    else {
        const keys = Object.keys(val);
        output.push(...keys.map(key => ddecompose(val[key], `${_prev}${key}`)).flat());
    }
    return output;
}
function decomposeSV(val, sorter) {
    const first = ddecompose(val, '');
    first.sort(sorter ?? sortMap.sortMap);
    const regex = new RegExp(constants_strings.DELIMITER, 'g');
    const output = first.map(value => value.replace(regex, '.'));
    return Object.freeze(output);
}

exports.decomposeSV = decomposeSV;
//# sourceMappingURL=decomposeSV.cjs.map
