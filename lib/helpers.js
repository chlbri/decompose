function isPrimitive(arg) {
    return (typeof arg === 'number' ||
        typeof arg === 'string' ||
        typeof arg === 'boolean' ||
        arg === undefined ||
        arg === null);
}

export { isPrimitive };
//# sourceMappingURL=helpers.js.map
