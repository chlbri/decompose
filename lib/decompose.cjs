'use strict';

var constants_strings = require('./constants/strings.cjs');
var helpers = require('./helpers.cjs');
var types_types = require('./types.types.cjs');

function ddecompose(arg, prev = '', options = types_types.DEFAULT_DECOMPOSE_OPTIONS) {
    const { object } = {
        ...types_types.DEFAULT_DECOMPOSE_OPTIONS,
        ...options,
    };
    const canAddObjectKeys = object === 'both' || object === 'object';
    const canAddKeys = object === 'both' || object === 'key';
    const _prev = prev ? prev + constants_strings.DELIMITER : '';
    const output = [];
    const isArray = Array.isArray(arg);
    if (isArray) {
        if (canAddObjectKeys)
            output.push([`${prev}`, arg]);
        arg.forEach((item, index) => {
            const values = ddecompose(item, `${_prev}[${index}]`, options);
            output.push(...values);
        });
        return output;
    }
    const isPrimit = helpers.isPrimitive(arg);
    if (isPrimit) {
        if (canAddKeys)
            output.push([`${prev}`, arg]);
        return output;
    }
    if (canAddObjectKeys && prev !== '')
        output.push([`${prev}`, arg]);
    const entries1 = Object.entries(arg);
    entries1.forEach(([key, value]) => {
        const values = ddecompose(value, `${_prev}${key}`, options);
        output.push(...values);
    });
    return output;
}
const _decompose = (val, options) => {
    const entries1 = ddecompose(val, '', options);
    const { sep, start } = {
        ...types_types.DEFAULT_DECOMPOSE_OPTIONS,
        ...options,
    };
    if (entries1.length == 0)
        return {};
    const regex = new RegExp(constants_strings.DELIMITER, 'g');
    const entries2 = entries1.map(([__key, value]) => {
        const _key = __key.replace(regex, sep);
        const key = start ? `${sep}${_key}` : _key;
        return [key, value];
    });
    const output = Object.fromEntries(entries2);
    return output;
};
/* v8 ignore next 1 */
const decompose = (val, options) => _decompose(val, options);
decompose.low = _decompose;
decompose.strict = _decompose;

exports.decompose = decompose;
//# sourceMappingURL=decompose.cjs.map
