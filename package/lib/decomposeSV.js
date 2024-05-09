import { DELIMITER } from './constants/strings.js';
import { sortMap } from './sortMap.js';

function ddecompose(val, prev = '') {
    const _prev = prev ? prev + DELIMITER : '';
    const output = [];
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
function decomposeSV(val, sorter) {
    const first = ddecompose(val, '');
    first.sort(sorter ?? sortMap);
    const regex = new RegExp(DELIMITER, 'g');
    const output = first.map(value => value.replace(regex, '.'));
    return Object.freeze(output);
}

export { decomposeSV };
//# sourceMappingURL=decomposeSV.js.map
