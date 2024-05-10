import { DELIMITER } from './constants/strings.js';
import { sortMap } from './sortMap.js';

function ddecompose(val, prev = '') {
    const output = [];
    const _prev = prev ? prev + DELIMITER : '';
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
function decomposeSV(val, sorter = sortMap) {
    const output1 = ddecompose(val, '');
    output1.sort(sorter);
    const regex = new RegExp(DELIMITER, 'g');
    const output2 = output1.map(value => value.replace(regex, '.'));
    return output2;
}

export { decomposeSV };
//# sourceMappingURL=decomposeSV.js.map
