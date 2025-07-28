import { DELIMITER } from './constants/strings.js';
import { isPrimitive } from './helpers.js';
import { DEFAULT_DECOMPOSE_OPTIONS } from './types.types.js';

function ddecompose(val, prev = '', options = DEFAULT_DECOMPOSE_OPTIONS) {
    const { object } = {
        ...DEFAULT_DECOMPOSE_OPTIONS,
        ...options,
    };
    const canAddObjectKeys = object === 'both' || object === 'object';
    const canAddKeys = object === 'both' || object === 'key';
    const _prev = prev ? prev + DELIMITER : '';
    const output = [];
    const entries1 = Object.entries(val);
    entries1.forEach(([key, value]) => {
        const isPrimit = isPrimitive(value) || Array.isArray(value);
        if (!isPrimit) {
            const values = ddecompose(value, `${_prev}${key}`, options);
            output.push(...values);
            if (canAddObjectKeys) {
                output.push([`${_prev}${key}`, value]);
            }
        }
        else if (canAddKeys)
            output.push([`${_prev}${key}`, value]);
    });
    return output;
}
const _decompose = (val, options) => {
    const entries1 = ddecompose(val, '', options);
    const { sep, start } = {
        ...DEFAULT_DECOMPOSE_OPTIONS,
        ...options,
    };
    if (entries1.length == 0)
        return {};
    const regex = new RegExp(DELIMITER, 'g');
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

export { decompose };
//# sourceMappingURL=decompose.js.map
