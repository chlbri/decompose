import type { DecomposeOptions, FlatOptions } from '../types.types';

export const DEFAULT_FLAT_OPTIONS = {
  sep: '.',
  children: false,
} as const satisfies FlatOptions;

export const DEFAULT_DECOMPOSE_OPTIONS = {
  sep: '.',
  object: 'key',
  start: true,
} as const satisfies DecomposeOptions;
