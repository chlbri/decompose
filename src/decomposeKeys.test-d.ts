import { expectType } from 'tsd';
import { ttest0, ttest1, ttest2 } from './decompose.fixtures';
import { decomposeKeys } from './decomposeKeys';

// #region Simple
const ttKM0 = decomposeKeys(ttest0);
expectType<never[]>(ttKM0);
// #endregion

// #region Simple
const ttKM1 = decomposeKeys(ttest1);
expectType<('age' | 'name')[]>(ttKM1);
// #endregion

// #region Simple
const ttKM2 = decomposeKeys(ttest2);
expectType<
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
>(ttKM2);
// #endregion
