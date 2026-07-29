/**
 * NotUndefined type - Auto-generated expression
 *
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 *
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export type NotUndefined<T> = Exclude<T, undefined>;
/**
 * Keys type - Auto-generated expression
 *
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 *
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export type Keys = keyof any;
/**
 * UnionKeys type - Auto-generated expression
 *
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 *
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export type UnionKeys<U> = U extends Record<infer K, any> ? K : never;

/**
 * _UnionToIntersection1 type - Auto-generated expression
 *
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 *
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export type _UnionToIntersection1<U> = boolean extends U
  ? U
  : (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

/**
 * _UnionToIntersection2 type - Auto-generated expression
 *
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 *
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export type _UnionToIntersection2<U> = {
  [K in UnionKeys<U>]: U extends Record<K, infer T> ? T : never;
};

/**
 * UnionToIntersection type - Auto-generated expression
 *
 * ⚠️ WARNING: This expression is auto-generated and should not be modified.
 * Any manual changes will be overwritten during the next generation.
 *
 * @generated
 * @readonly
 * @author chlbri (bri_lvi@icloud.com)
 */
export type UnionToIntersection<U> = _UnionToIntersection2<
  _UnionToIntersection1<U>
>;
// #endregion
// | ((value: unknown) => boolean);
