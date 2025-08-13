/* eslint-disable @typescript-eslint/no-unused-vars */

import type { flatByKey1 } from './fixtures';
import type { FlatByKey } from './types.types';

// #region FlatMapByKey/Decempose

type KeyFlat1 = keyof FlatByKey<typeof flatByKey1, 'states'>;

expectTypeOf<KeyFlat1>().toEqualTypeOf<
  | '.'
  | '.atomic'
  | '.compound'
  | '.compound.state1'
  | '.compound.state2'
  | '.parallel'
  | '.parallel.atomic'
  | '.parallel.atomic.state1'
  | '.parallel.atomic.state2'
  | '.parallel.compound'
  | '.parallel.compound.state1'
  | '.parallel.compound.state2'
  | '.parallel.compound.entry'
  | '.parallel.compound.exit'
>();

type KeyFlat11 = keyof FlatByKey<
  typeof flatByKey1,
  'states',
  { children: false; sep: '/' }
>;

expectTypeOf<KeyFlat11>().toEqualTypeOf<
  | '/'
  | '/atomic'
  | '/compound'
  | '/compound/state1'
  | '/compound/state2'
  | '/parallel'
  | '/parallel/atomic'
  | '/parallel/atomic/state1'
  | '/parallel/atomic/state2'
  | '/parallel/compound'
  | '/parallel/compound/entry'
  | '/parallel/compound/exit'
  | '/parallel/compound/state1'
  | '/parallel/compound/state2'
>();
