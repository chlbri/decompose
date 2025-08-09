import { this1 } from '@bemedev/build-tests/constants';
import { createTests } from '@bemedev/vitest-extended';
import { dumbFn, flatByKey1, TEST_SKIP } from './fixtures';

describe.skipIf(TEST_SKIP)('flat', () => {
  const { acceptation, success } = createTests.withImplementation(dumbFn, {
    name: 'flatByKey',
    instanciation: async () => {
      const func = await import(this1).then(({ flatByKey }) => flatByKey);

      return func.low;
    },
  });
  describe('#0 => Acceptation', acceptation);

  describe(
    '#1 => Success',
    success(
      {
        invite: 'Empty ',
        parameters: [{}, 'states'],
        expected: {
          '.': {},
        },
      },
      {
        invite: 'FlatByKey1 without options',
        parameters: [flatByKey1, 'states'],
        expected: {
          '.': {},
          '.atomic': { entry: 'inc', exit: 'inc' },
          '.compound.state1': { entry: 'inc', exit: 'inc' },
          '.compound.state2': { entry: 'inc', exit: 'inc' },
          '.compound': { entry: 'inc', exit: 'inc' },
          '.parallel.atomic.state1': { entry: 'inc', exit: 'inc' },
          '.parallel.atomic.state2': { entry: 'inc', exit: 'inc' },
          '.parallel.atomic': { entry: 'inc', exit: 'inc' },
          '.parallel.compound.state1': { entry: 'inc', exit: 'inc' },
          '.parallel.compound.state2': { entry: 'inc', exit: 'inc' },
          '.parallel.compound.entry': { entry: 'inc', exit: 'inc' },
          '.parallel.compound.exit': { entry: 'inc', exit: 'inc' },
          '.parallel.compound': { entry: 'inc', exit: 'inc' },
          '.parallel': { entry: 'inc', exit: 'inc' },
        },
      },
      {
        invite: 'FlatByKey1 without sep="/"',
        parameters: [flatByKey1, 'states', { sep: '/' }],
        expected: {
          '/': {},
          '/atomic': { entry: 'inc', exit: 'inc' },
          '/compound/state1': { entry: 'inc', exit: 'inc' },
          '/compound/state2': { entry: 'inc', exit: 'inc' },
          '/compound': { entry: 'inc', exit: 'inc' },
          '/parallel/atomic/state1': { entry: 'inc', exit: 'inc' },
          '/parallel/atomic/state2': { entry: 'inc', exit: 'inc' },
          '/parallel/atomic': { entry: 'inc', exit: 'inc' },
          '/parallel/compound/state1': { entry: 'inc', exit: 'inc' },
          '/parallel/compound/state2': { entry: 'inc', exit: 'inc' },
          '/parallel/compound/entry': { entry: 'inc', exit: 'inc' },
          '/parallel/compound/exit': { entry: 'inc', exit: 'inc' },
          '/parallel/compound': { entry: 'inc', exit: 'inc' },
          '/parallel': { entry: 'inc', exit: 'inc' },
        },
      },
      {
        invite: 'FlatByKey1 without sep="/" and children="true"',
        parameters: [flatByKey1, 'states', { sep: '/', children: true }],
        expected: {
          '/': {
            states: {
              atomic: {
                entry: 'inc',
                exit: 'inc',
              },
              compound: {
                entry: 'inc',
                exit: 'inc',
                states: {
                  state1: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                  state2: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                },
              },
              parallel: {
                entry: 'inc',
                exit: 'inc',
                states: {
                  atomic: {
                    entry: 'inc',
                    exit: 'inc',
                    states: {
                      state1: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                      state2: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                    },
                  },
                  compound: {
                    entry: 'inc',
                    exit: 'inc',
                    states: {
                      entry: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                      exit: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                      state1: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                      state2: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                    },
                  },
                },
              },
            },
          },
          '/atomic': {
            entry: 'inc',
            exit: 'inc',
          },
          '/compound': {
            entry: 'inc',
            exit: 'inc',
            states: {
              state1: {
                entry: 'inc',
                exit: 'inc',
              },
              state2: {
                entry: 'inc',
                exit: 'inc',
              },
            },
          },
          '/compound/state1': {
            entry: 'inc',
            exit: 'inc',
          },
          '/compound/state2': {
            entry: 'inc',
            exit: 'inc',
          },
          '/parallel': {
            entry: 'inc',
            exit: 'inc',
            states: {
              atomic: {
                entry: 'inc',
                exit: 'inc',
                states: {
                  state1: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                  state2: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                },
              },
              compound: {
                entry: 'inc',
                exit: 'inc',
                states: {
                  entry: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                  exit: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                  state1: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                  state2: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                },
              },
            },
          },
          '/parallel/atomic': {
            entry: 'inc',
            exit: 'inc',
            states: {
              state1: {
                entry: 'inc',
                exit: 'inc',
              },
              state2: {
                entry: 'inc',
                exit: 'inc',
              },
            },
          },
          '/parallel/atomic/state1': {
            entry: 'inc',
            exit: 'inc',
          },
          '/parallel/atomic/state2': {
            entry: 'inc',
            exit: 'inc',
          },
          '/parallel/compound': {
            entry: 'inc',
            exit: 'inc',
            states: {
              entry: {
                entry: 'inc',
                exit: 'inc',
              },
              exit: {
                entry: 'inc',
                exit: 'inc',
              },
              state1: {
                entry: 'inc',
                exit: 'inc',
              },
              state2: {
                entry: 'inc',
                exit: 'inc',
              },
            },
          },
          '/parallel/compound/entry': {
            entry: 'inc',
            exit: 'inc',
          },
          '/parallel/compound/exit': {
            entry: 'inc',
            exit: 'inc',
          },
          '/parallel/compound/state1': {
            entry: 'inc',
            exit: 'inc',
          },
          '/parallel/compound/state2': {
            entry: 'inc',
            exit: 'inc',
          },
        },
      },
      {
        invite: 'FlatByKey1 without sep="/" and children="true"',
        parameters: [flatByKey1, 'states', { sep: '.', children: true }],
        expected: {
          '.': {
            states: {
              atomic: {
                entry: 'inc',
                exit: 'inc',
              },
              compound: {
                entry: 'inc',
                exit: 'inc',
                states: {
                  state1: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                  state2: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                },
              },
              parallel: {
                entry: 'inc',
                exit: 'inc',
                states: {
                  atomic: {
                    entry: 'inc',
                    exit: 'inc',
                    states: {
                      state1: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                      state2: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                    },
                  },
                  compound: {
                    entry: 'inc',
                    exit: 'inc',
                    states: {
                      entry: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                      exit: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                      state1: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                      state2: {
                        entry: 'inc',
                        exit: 'inc',
                      },
                    },
                  },
                },
              },
            },
          },
          '.atomic': {
            entry: 'inc',
            exit: 'inc',
          },
          '.compound': {
            entry: 'inc',
            exit: 'inc',
            states: {
              state1: {
                entry: 'inc',
                exit: 'inc',
              },
              state2: {
                entry: 'inc',
                exit: 'inc',
              },
            },
          },
          '.compound.state1': {
            entry: 'inc',
            exit: 'inc',
          },
          '.compound.state2': {
            entry: 'inc',
            exit: 'inc',
          },
          '.parallel': {
            entry: 'inc',
            exit: 'inc',
            states: {
              atomic: {
                entry: 'inc',
                exit: 'inc',
                states: {
                  state1: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                  state2: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                },
              },
              compound: {
                entry: 'inc',
                exit: 'inc',
                states: {
                  entry: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                  exit: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                  state1: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                  state2: {
                    entry: 'inc',
                    exit: 'inc',
                  },
                },
              },
            },
          },
          '.parallel.atomic': {
            entry: 'inc',
            exit: 'inc',
            states: {
              state1: {
                entry: 'inc',
                exit: 'inc',
              },
              state2: {
                entry: 'inc',
                exit: 'inc',
              },
            },
          },
          '.parallel.atomic.state1': {
            entry: 'inc',
            exit: 'inc',
          },
          '.parallel.atomic.state2': {
            entry: 'inc',
            exit: 'inc',
          },
          '.parallel.compound': {
            entry: 'inc',
            exit: 'inc',
            states: {
              entry: {
                entry: 'inc',
                exit: 'inc',
              },
              exit: {
                entry: 'inc',
                exit: 'inc',
              },
              state1: {
                entry: 'inc',
                exit: 'inc',
              },
              state2: {
                entry: 'inc',
                exit: 'inc',
              },
            },
          },
          '.parallel.compound.entry': {
            entry: 'inc',
            exit: 'inc',
          },
          '.parallel.compound.exit': {
            entry: 'inc',
            exit: 'inc',
          },
          '.parallel.compound.state1': {
            entry: 'inc',
            exit: 'inc',
          },
          '.parallel.compound.state2': {
            entry: 'inc',
            exit: 'inc',
          },
        },
      },
    ),
  );
});
