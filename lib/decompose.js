import { DELIMITER } from './constants/strings.js';
import { isPrimitive } from './helpers.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
function ddecompose(val, prev = '') {
    const _prev = prev ? prev + DELIMITER : '';
    const output = [];
    const entries1 = Object.entries(val);
    entries1.forEach(([key, value]) => {
        const isPrimit = isPrimitive(value);
        if (!isPrimit) {
            const values = ddecompose(value, `${_prev}${key}`);
            output.push(...values);
        }
        else
            output.push([`${_prev}${key}`, value]);
    });
    return output;
}
function decompose(val) {
    const entries1 = ddecompose(val, '');
    if (entries1.length == 0)
        return {};
    const regex = new RegExp(DELIMITER, 'g');
    const entries2 = entries1.map(([key, value]) => [
        key.replace(regex, '.'),
        value,
    ]);
    const output = Object.fromEntries(entries2);
    return output;
}

export { decompose };
//# sourceMappingURL=decompose.js.map
