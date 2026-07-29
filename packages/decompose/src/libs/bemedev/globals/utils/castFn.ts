import { _unknown } from './_unknown';
import { expandFn } from './expandFn';

/**
 * castFn variable - Auto-generated expression
 *
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 *
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export const castFn = <T>() => {
  const _out = <const Tr extends object = object>(extensions?: Tr) => {
    const out = expandFn((arg: T) => arg, {
      ...(extensions as Tr),
      forceCast: (arg: unknown) => {
        return _unknown<T>(arg);
      },
      dynamic: <U extends T>(arg: U) => {
        return arg;
      },
    });
    return out;
  };
  return _out;
};
