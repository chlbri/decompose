import { t } from '@bemedev/types';
import { DELIMITER } from './constants/strings.js';
import { sortMap } from './sortMap.js';

function ddecompose(val, prev = '') {
    const output = [];
    const _prev = prev ? prev + DELIMITER : '';
    if (prev !== '')
        output.push(prev);
    if (typeof val === 'string') {
        output.push(`${_prev}${val}`);
    }
    else {
        const keys = Object.keys(val);
        output.push(...keys.map(key => ddecompose(val[key], `${_prev}${key}`)).flat());
    }
    return output;
}
const _decomposeSV = (val, sorter = sortMap) => {
    const output1 = ddecompose(val, '');
    output1.sort(sorter);
    const regex = new RegExp(DELIMITER, 'g');
    return output1.map(value => value.replace(regex, '.'));
};
/* v8 ignore next 3 */
const decomposeSV = (val, sorter) => {
    return t.any(_decomposeSV(val, sorter));
};
decomposeSV.low = _decomposeSV;
decomposeSV.strict = t.unknown(_decomposeSV);

export { decomposeSV };
//# sourceMappingURL=decomposeSV.js.map
