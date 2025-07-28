'use strict';

var types = require('@bemedev/types');
var constants_strings = require('./constants/strings.cjs');
var helpers = require('./helpers.cjs');
var sortMap = require('./sortMap.cjs');

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
const _decomposeKeys = (val, sorter = sortMap.sortMap, addObjectKeys = true) => {
    const output1 = ddecomposeKeys(val, '', addObjectKeys);
    output1.sort(sorter);
    const regex = new RegExp(constants_strings.DELIMITER, 'g');
    return output1.map(value => value.replace(regex, '.'));
};
const decomposeKeys = (val, sorter, addObjectKeys) => {
    return types.castings.commons.any(_decomposeKeys(val, sorter, addObjectKeys));
};
decomposeKeys.low = _decomposeKeys;
decomposeKeys.strict =
    types.castings.commons.unknown(_decomposeKeys);

exports.decomposeKeys = decomposeKeys;
//# sourceMappingURL=decomposeKeys.cjs.map
