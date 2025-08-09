import { this1 } from '@bemedev/build-tests/constants';
import { createTests } from '@bemedev/vitest-extended';
import { dumbFn, TEST_SKIP, ttest1, ttest2, ttest3 } from './fixtures';

describe.skipIf(TEST_SKIP)('recompose', () => {
  const { acceptation, success } = createTests.withImplementation(dumbFn, {
    name: 'recompose',
    instanciation: async () => {
      const func = await import(this1).then(({ recompose }) => recompose);

      return func.low;
    },
  });

  describe('#00 => Acceptation', acceptation);

  // #region Complex
  const decomposed = {
    states: {
      idle: {
        on: {},
      },
      state1: {
        activities: {
          DELAY: 'inc',
        },
        states: {
          state11: {
            states: {
              state111: {
                states: {
                  state1111: {},
                },
              },
              state112: {},
            },
          },
        },
      },
    },
    'states.idle': {
      on: {},
    },
    'states.idle.on': {},
    'states.state1': {
      activities: {
        DELAY: 'inc',
      },
      states: {
        state11: {
          states: {
            state111: {
              states: {
                state1111: {},
              },
            },
            state112: {},
          },
        },
      },
    },
    'states.state1.activities': {
      DELAY: 'inc',
    },
    'states.state1.activities.DELAY': 'inc',
    'states.state1.states': {
      state11: {
        states: {
          state111: {
            states: {
              state1111: {},
            },
          },
          state112: {},
        },
      },
    },
    'states.state1.states.state11': {
      states: {
        state111: {
          states: {
            state1111: {},
          },
        },
        state112: {},
      },
    },
    'states.state1.states.state11.states': {
      state111: {
        states: {
          state1111: {},
        },
      },
      state112: {},
    },
    'states.state1.states.state11.states.state111': {
      states: {
        state1111: {},
      },
    },
    'states.state1.states.state11.states.state111.states': {
      state1111: {},
    },
    'states.state1.states.state11.states.state111.states.state1111': {},
    'states.state1.states.state11.states.state112': {},
  };

  const expected = {
    states: {
      idle: {
        on: {},
      },
      state1: {
        activities: {
          DELAY: 'inc',
        },
        states: {
          state11: {
            states: {
              state111: {
                states: {
                  state1111: {},
                },
              },
              state112: {},
            },
          },
        },
      },
    },
  };
  // #endregion

  describe(
    '#01 => Success',
    success(
      { invite: 'Empty object', parameters: [{}], expected: {} },
      {
        invite: 'Object with simple keys',
        parameters: { age: 10, login: 'login' },
        expected: { age: 10, login: 'login' },
      },
      {
        invite: 'Object with keys, recursive order 1',
        parameters: { 'data.age': 10, 'human.login': 'login' },
        expected: {
          data: {
            age: 10,
          },
          human: {
            login: 'login',
          },
        },
      },
      {
        invite: 'Object with keys, and array, recursive order 1',
        parameters: {
          _id: 'nanoid',
          'data.name.firstName': 'Charles-Lévi',
          'data.name.lastName': 'BRI',
          'statistics.deletions': 34,
          'statistics.updations': 5,
          'arr.[0]': 1,
          'arr.[1]': 2,
          'arr.[2]': 3,
        },
        expected: {
          _id: 'nanoid',
          arr: [1, 2, 3],
          data: {
            name: {
              firstName: 'Charles-Lévi',
              lastName: 'BRI',
            },
          },
          statistics: {
            deletions: 34,
            updations: 5,
          },
        },
      },
      {
        invite: 'Object with mergeable keys, recursive order 1',
        parameters: { 'data.age': 10, 'data.login': 'login' },
        expected: {
          data: {
            age: 10,
            login: 'login',
          },
        },
      },
      {
        invite: 'Object with keys, recursive order 4',
        parameters: {
          'db1.collection.entity.data.age': 10,
          'db2.collection.entity.data.login': 'login',
        },

        expected: {
          db1: {
            collection: {
              entity: {
                data: {
                  age: 10,
                },
              },
            },
          },
          db2: {
            collection: {
              entity: {
                data: {
                  login: 'login',
                },
              },
            },
          },
        },
      },
      {
        invite: 'Object with mergeable keys, recursive order 4',
        parameters: {
          'db1.collection.entity.data.age': 10,
          'db1.collection.entity.data.login': 'login',
          'db1.collection.entity.data.password': 'password',
        },

        expected: {
          db1: {
            collection: {
              entity: {
                data: {
                  age: 10,
                  login: 'login',
                  password: 'password',
                },
              },
            },
          },
        },
      },
      {
        invite: 'Very complex',
        parameters: {
          'db1.collection.entity.data.age': 10,
          'db1.collection.entity2.data.login': 'login',
          'db1.collection.entity.data.password': 'password',
          'db3.collection.entity.data.password': 'password',
          'db3.collection.entity.data.login': 'login',
          statistics: 1000,
          'remainData.owner': 'admin',
          id: 'id',
        },

        expected: {
          db1: {
            collection: {
              entity: {
                data: {
                  age: 10,
                  password: 'password',
                },
              },
              entity2: {
                data: {
                  login: 'login',
                },
              },
            },
          },
          db3: {
            collection: {
              entity: {
                data: {
                  password: 'password',
                  login: 'login',
                },
              },
            },
          },
          statistics: 1000,
          remainData: {
            owner: 'admin',
          },
          id: 'id',
        },
      },
      {
        invite: 'Conflicts',
        parameters: {
          statistics: 1000,
          'statistics.owner': 'super',
          'statistics.owner.website': 'www.supper.com',
        },

        expected: {
          statistics: {
            owner: {
              website: 'www.supper.com',
            },
          },
        },
      },
      {
        invite: 'with Array',
        parameters: {
          _id: 'nanoid',
          'data.name.firstName': 'Charles-Lévi',
          'data.name.lastName': 'BRI',
          'statistics.deletions': 34,
          'statistics.updations': 5,
          arr: [1, 2, 3],
        },
        expected: ttest3,
      },
      {
        invite: 'ttest2',
        parameters: {
          _id: 'nanoid',
          'data.name.firstName': 'Charles-Lévi',
          'data.name.lastName': 'BRI',
          'statistics.deletions': 34,
          'statistics.updations': 5,
        },
        expected: ttest2,
      },
      {
        invite: 'ttest1',
        parameters: ttest1,
        expected: ttest1,
      },
      {
        invite: 'So complex',
        expected,
        parameters: decomposed,
      },
    ),
  );
});
