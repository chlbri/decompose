import { DELIMITER } from './constants/strings.js';
import { isPrimitive } from './helpers.js';
import { sortMap } from './sortMap.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
function ddecomposeKeys(val, prev = '', addObjectKeys = true) {
    const _prev = prev ? prev + DELIMITER : '';
    const output = [];
    const entries1 = Object.entries(val);
    entries1.forEach(([key, value]) => {
        const isPrimit = isPrimitive(value);
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
function decomposeKeys(val, sorter = sortMap, addObjectKeys) {
    const output1 = ddecomposeKeys(val, '', addObjectKeys);
    output1.sort(sorter);
    const regex = new RegExp(DELIMITER, 'g');
    const output2 = output1.map(value => value.replace(regex, '.'));
    return output2;
}

export { decomposeKeys };
//# sourceMappingURL=decomposeKeys.js.map
