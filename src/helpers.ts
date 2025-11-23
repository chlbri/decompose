import type { DecomposeOptions, FlatOptions } from './types.types';

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

export const DEFAULT_FLAT_OPTIONS = {
  sep: '.',
  children: false,
} as const satisfies FlatOptions;

export const DEFAULT_DECOMPOSE_OPTIONS = {
  sep: '.',
  object: 'key',
  start: true,
} as const satisfies DecomposeOptions;
