import { expectTypeOf } from 'vitest';
import { decomposeKeys } from './decomposeKeys';
import { ttest0, ttest1, ttest2 } from './fixtures';

// #region Simple
const ttKM0 = decomposeKeys(ttest0);
expectTypeOf(ttKM0).toEqualTypeOf<never[]>();
// #endregion

// #region Simple
const ttKM1 = decomposeKeys(ttest1);
expectTypeOf(ttKM1).toEqualTypeOf<('age' | 'name')[]>();
// #endregion

// #region Simple
const ttKM2 = decomposeKeys(ttest2);
expectTypeOf(ttKM2).toEqualTypeOf<
  (
    | '_id'
    | 'data'
    | 'statistics'
    | 'data.name'
    | 'data.name.firstName'
    | 'data.name.lastName'
    | 'statistics.updations'
    | 'statistics.deletions'
  )[]
>();
// #endregion

// #endregion
