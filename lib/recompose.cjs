'use strict';

var tsDeepmerge = require('ts-deepmerge');
var constants_strings = require('./constants/strings.cjs');

function recomposeObjectUrl(shape, value) {
    const obj = {};
    if (shape.length <= 0)
        return obj;
    const keys = shape.split(constants_strings.SEPARATOR);
    if (keys.length === 1) {
        const key = keys.shift();
        obj[key] = value;
    }
    else {
        const key = keys.shift();
        obj[key] = recomposeObjectUrl(keys.join(constants_strings.SEPARATOR), value);
    }
    return obj;
}
const _recompose = shape => {
    const entries = Object.entries(shape);
    const arr = [];
    entries.forEach(([key, value]) => {
        arr.push(recomposeObjectUrl(key, value));
    });
    return tsDeepmerge.merge(...arr);
};
const recompose = shape => _recompose(shape);
recompose.low = _recompose;
recompose.strict = _recompose;

exports.recompose = recompose;
exports.recomposeObjectUrl = recomposeObjectUrl;
//# sourceMappingURL=recompose.cjs.map
