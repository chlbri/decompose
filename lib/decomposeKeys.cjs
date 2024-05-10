'use strict';

var constants_strings = require('./constants/strings.cjs');
var helpers = require('./helpers.cjs');
var sortMap = require('./sortMap.cjs');

/* eslint-disable @typescript-eslint/no-explicit-any */
function ddecomposeKeys(val, prev = '', addObjectKeys = true) {
    const _prev = prev ? prev + constants_strings.DELIMITER : '';
    const output = [];
    const entries1 = Object.entries(val);
    entries1.forEach(([key, value]) => {
        const isPrimit = helpers.isPrimitive(value);
        if (!isPrimit) {
            if (addObjectKeys)
                output.push(`${_prev}${key}`);
            const values = ddecomposeKeys(value, `${_prev}${key}`, addObjectKeys);
            output.push(...values);
        }
        else
            output.push(`${_prev}${key}`);
    });
    return output;
}
function decomposeKeys(val, sorter = sortMap.sortMap, addObjectKeys) {
    const output1 = ddecomposeKeys(val, '', addObjectKeys);
    output1.sort(sorter);
    const regex = new RegExp(constants_strings.DELIMITER, 'g');
    const output2 = output1.map(value => value.replace(regex, '.'));
    return output2;
}

exports.decomposeKeys = decomposeKeys;
//# sourceMappingURL=decomposeKeys.cjs.map
