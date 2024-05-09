type Primitive = string | number | boolean | null | undefined;

export function isPrimitive(arg: unknown): arg is Primitive {
  return (
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'boolean' ||
    arg === undefined ||
    arg === null
  );
}
