/* eslint-disable @typescript-eslint/no-explicit-any */
import { merge } from 'ts-deepmerge';
import { SEPARETOR } from './constants/strings';
import type { Recompose, Ru } from './types';

export function recomposeObjectUrl<T>(shape: string, value: T) {
  const obj: Ru = {};
  if (shape.length <= 0) return obj;

  const keys = shape.split(SEPARETOR);
  if (keys.length === 1) {
    const key = keys.shift();
    obj[key!] = value;
  } else {
    const key = keys.shift();
    obj[key!] = recomposeObjectUrl(keys.join(SEPARETOR), value);
  }

  return obj;
}

export function recompose<T extends Ru>(shape: T) {
  const entries = Object.entries(shape);
  const arr: any[] = [];
  entries.forEach(([key, value]) => {
    arr.push(recomposeObjectUrl(key, value));
  });
  const output = merge(...arr);
  return Object.freeze(output) as Recompose<T>;
}
