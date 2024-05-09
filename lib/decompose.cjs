'use strict';

var constants_strings = require('./constants/strings.cjs');
var helpers = require('./helpers.cjs');
var sortMap = require('./sortMap.cjs');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ddecompose(val, prev = '') {
    const _prev = prev ? prev + constants_strings.DELIMITER : '';
    const output = [];
    const entries1 = Object.entries(val);
    entries1.forEach(([key, value]) => {
        output.push(`${_prev}${key}`);
        const isPrimit = helpers.isPrimitive(value);
        if (!isPrimit) {
            const values = ddecompose(value, `${_prev}${key}`);
            output.push(...values);
        }
    });
    return output;
}
function decompose(val, sorter) {
    const output1 = ddecompose(val, '');
    output1.sort(sorter ?? sortMap.sortMap);
    const regex = new RegExp(constants_strings.DELIMITER, 'g');
    const output2 = output1.map(value => value.replace(regex, '.'));
    return Object.freeze(output2);
}

exports.decompose = decompose;
//# sourceMappingURL=decompose.cjs.map
