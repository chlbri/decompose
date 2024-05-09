'use strict';

var tsDeepmerge = require('ts-deepmerge');
var constants_strings = require('./constants/strings.cjs');

/* eslint-disable @typescript-eslint/no-explicit-any */
function recomposeObjectUrl(shape, value) {
    const obj = {};
    if (shape.length <= 0)
        return obj;
    const keys = shape.split(constants_strings.SEPARETOR);
    if (keys.length === 1) {
        const key = keys.shift();
        obj[key] = value;
    }
    else {
        const key = keys.shift();
        obj[key] = recomposeObjectUrl(keys.join(constants_strings.SEPARETOR), value);
    }
    return obj;
}
function recompose(shape) {
    const entries = Object.entries(shape);
    const arr = [];
    entries.forEach(([key, value]) => {
        arr.push(recomposeObjectUrl(key, value));
    });
    const output = tsDeepmerge.merge(...arr);
    return Object.freeze(output);
}

exports.recompose = recompose;
exports.recomposeObjectUrl = recomposeObjectUrl;
//# sourceMappingURL=recompose.cjs.map
