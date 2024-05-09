import { merge } from 'ts-deepmerge';
import { SEPARETOR } from './constants/strings.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
function recomposeObjectUrl(shape, value) {
    const obj = {};
    if (shape.length <= 0)
        return obj;
    const keys = shape.split(SEPARETOR);
    if (keys.length === 1) {
        const key = keys.shift();
        obj[key] = value;
    }
    else {
        const key = keys.shift();
        obj[key] = recomposeObjectUrl(keys.join(SEPARETOR), value);
    }
    return obj;
}
function recompose(shape) {
    const entries = Object.entries(shape);
    const arr = [];
    entries.forEach(([key, value]) => {
        arr.push(recomposeObjectUrl(key, value));
    });
    const output = merge(...arr);
    return Object.freeze(output);
}

export { recompose, recomposeObjectUrl };
//# sourceMappingURL=recompose.js.map
