'use strict';

var constants_strings = require('./constants/strings.cjs');
var sortMap = require('./sortMap.cjs');

function ddecompose(val, prev = '') {
    const output = [];
    const _prev = prev ? prev + constants_strings.DELIMITER : '';
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
function decomposeSV(val, sorter = sortMap.sortMap) {
    const output1 = ddecompose(val, '');
    output1.sort(sorter);
    const regex = new RegExp(constants_strings.DELIMITER, 'g');
    const output2 = output1.map(value => value.replace(regex, '.'));
    return output2;
}

exports.decomposeSV = decomposeSV;
//# sourceMappingURL=decomposeSV.cjs.map
