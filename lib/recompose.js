import { merge } from 'ts-deepmerge';
import { SEPARATOR } from './constants/strings.js';

function recomposeObjectUrl(shape, value) {
    const obj = {};
    if (shape.length <= 0)
        return obj;
    const keys = shape.split(SEPARATOR);
    if (keys.length === 1) {
        const key = keys.shift();
        obj[key] = value;
    }
    else {
        const key = keys.shift();
        obj[key] = recomposeObjectUrl(keys.join(SEPARATOR), value);
    }
    return obj;
}
const _recompose = shape => {
    const entries = Object.entries(shape);
    const arr = [];
    entries.forEach(([key, value]) => {
        arr.push(recomposeObjectUrl(key, value));
    });
    return merge(...arr);
};
const recompose = shape => _recompose(shape);
recompose.low = _recompose;
recompose.strict = _recompose;

export { recompose, recomposeObjectUrl };
//# sourceMappingURL=recompose.js.map
