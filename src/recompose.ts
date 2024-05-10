/* eslint-disable @typescript-eslint/no-explicit-any */
import { merge } from 'ts-deepmerge';
import { SEPARATOR } from './constants/strings';
import type { Recompose, Ru } from './types';

export function recomposeObjectUrl<T>(shape: string, value: T) {
  const obj: Ru = {};
  if (shape.length <= 0) return obj;

  const keys = shape.split(SEPARATOR);
  if (keys.length === 1) {
    const key = keys.shift();
    obj[key!] = value;
  } else {
    const key = keys.shift();
    obj[key!] = recomposeObjectUrl(keys.join(SEPARATOR), value);
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
export function recompose<T extends Ru>(shape: T) {
  const entries = Object.entries(shape);
  const arr: any[] = [];
  entries.forEach(([key, value]) => {
    arr.push(recomposeObjectUrl(key, value));
  });
  /**
   * @todo
   * Add a return type
   */
  const output = merge(...arr);
  return output as Recompose<T>;
}
