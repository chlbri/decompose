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
type Recompose_F = <T extends Ru>(shape: T) => Recompose<T>;
type _Recompose_F = (shape: any) => any;

export type Recomposer = Recompose_F & {
  strict: Recompose_F;
  low: _Recompose_F;
};

const _recompose: _Recompose_F = shape => {
  const entries = Object.entries(shape);
  const arr: any[] = [];
  entries.forEach(([key, value]) => {
    arr.push(recomposeObjectUrl(key, value));
  });
  return merge(...arr);
};

export const recompose: Recomposer = shape => _recompose(shape);
recompose.low = _recompose;
recompose.strict = _recompose;
