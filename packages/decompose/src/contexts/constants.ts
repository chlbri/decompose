import type { DecomposeOptions } from '../types.types';

export const DEFAULT_OPTIONS = {
  start: false,
  sep: '.',
  object: 'both',
} as const satisfies DecomposeOptions;
