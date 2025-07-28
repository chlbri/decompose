/* eslint-disable @typescript-eslint/no-unused-vars */

import type { flatByKey1 } from './flat.fixtures';
import type { FlatByKey } from './types.types';

// #region FlatMapByKey/Decempose

type KeyFlat1 = keyof FlatByKey<typeof flatByKey1, 'states'>;

expectTypeOf<KeyFlat1>().toEqualTypeOf<
  | '.'
  | '.atomic'
  | '.compound'
  | '.parallel'
  | '.compound.state1'
  | '.compound.state2'
  | '.parallel.atomic'
  | '.parallel.compound'
  | '.parallel.atomic.state1'
  | '.parallel.atomic.state2'
  | '.parallel.compound.state1'
  | '.parallel.compound.state2'
  | '.parallel.compound.entry'
  | '.parallel.compound.exit'
>();

// #endregion
