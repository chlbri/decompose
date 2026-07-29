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

export const isArrayIndex = (segment: string): boolean => {
  return /^\[\d+\]$/.test(segment);
};

export const parseIndex = (segment: string): number => {
  return parseInt(segment.slice(1, -1), 10);
};

export const splitKey = (key: string): string[] => {
  return key.split('.').filter(s => s !== '');
};

export const nextDefault = (segment: string): any => {
  return isArrayIndex(segment) ? [] : {};
};
