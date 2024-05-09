'use strict';

function isPrimitive(arg) {
    return (typeof arg === 'number' ||
        typeof arg === 'string' ||
        typeof arg === 'boolean' ||
        arg === undefined ||
        arg === null);
}

exports.isPrimitive = isPrimitive;
//# sourceMappingURL=helpers.cjs.map
