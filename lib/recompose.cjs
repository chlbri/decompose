'use strict';

var tsDeepmerge = require('ts-deepmerge');
var constants_strings = require('./constants/strings.cjs');

/* eslint-disable @typescript-eslint/no-explicit-any */
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
/**
 *  Recompose a flatten object
 *  @example
 *
 *  { 'data.age': 10, 'human.login': 'login' }
 *  will become
 *  {
      data: {
        age: 10,
      },
      human: {
        login: 'login',
      },
    }
 *  @remark
 *  The generated typescript type takes too much ressources

 *  @todo
    Add type to the return
 */
function recompose(shape) {
    const entries = Object.entries(shape);
    const arr = [];
    entries.forEach(([key, value]) => {
        arr.push(recomposeObjectUrl(key, value));
    });
    /**
     * @todo
     * Add a return type
     */
    const output = tsDeepmerge.merge(...arr);
    return output;
}

exports.recompose = recompose;
exports.recomposeObjectUrl = recomposeObjectUrl;
//# sourceMappingURL=recompose.cjs.map
