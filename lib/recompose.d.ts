import type { Recompose, Ru } from './types';
export declare function recomposeObjectUrl<T>(shape: string, value: T): Ru;
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
export declare function recompose<T extends Ru>(shape: T): Recompose<T>;
//# sourceMappingURL=recompose.d.ts.map