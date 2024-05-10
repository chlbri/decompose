import { DELIMITER } from './constants/strings.js';
import { isPrimitive } from './helpers.js';
import { sortMap } from './sortMap.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ddecompose(val, prev = '') {
    const _prev = prev ? prev + DELIMITER : '';
    const output = [];
    const entries1 = Object.entries(val);
    entries1.forEach(([key, value]) => {
        output.push(`${_prev}${key}`);
        const isPrimit = isPrimitive(value);
        if (!isPrimit) {
            const values = ddecompose(value, `${_prev}${key}`);
            output.push(...values);
        }
    });
    return output;
}
function decompose(val, sorter) {
    const output1 = ddecompose(val, '');
    output1.sort(sorter ?? sortMap);
    const regex = new RegExp(DELIMITER, 'g');
    const output2 = output1.map(value => value.replace(regex, '.'));
    return output2;
}

export { decompose };
//# sourceMappingURL=decompose.js.map
