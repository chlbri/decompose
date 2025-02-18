import type { Recompose, Ru } from './types.types';
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
type Recompose_F = <T extends Ru>(shape: T) => Recompose<T>;
type _Recompose_F = (shape: any) => any;
export type Recomposer = Recompose_F & {
  strict: Recompose_F;
  low: _Recompose_F;
};
export declare const recompose: Recomposer;
export {};
//# sourceMappingURL=recompose.d.ts.map
