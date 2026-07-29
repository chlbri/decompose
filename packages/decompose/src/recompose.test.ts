import { createTests } from '@bemedev/dev-utils/vitest-extended';
import { decompose } from './decompose';
import { ttest0, ttest1, ttest2, ttest3, ttest4 } from './fixtures';
import { recompose, recomposeObjectUrl } from './recompose';

describe('recompose', () => {
  describe('#01 => URL for coverage', () => {
    const { acceptation, success } = createTests(recomposeObjectUrl);
    describe('#00 => Acceptation', acceptation);

    describe(
      '#01 => Success',
      success({
        invite: 'Empty string',
        parameters: ['', 10],
        expected: {},
      }),
    );
  });

  describe('#02 => recompose', () => {
    const { acceptation, success } = createTests(recompose);
    describe('#00 => Acceptation', acceptation);

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
      ),
    );
  });

  describe('#03 => decompose, recompose', () => {
    [ttest0, ttest1, ttest2, ttest3, ttest4].forEach((testCase, index) => {
      test(`#0${index} => For ttest-${index}`, () => {
        expect(
          recompose(
            decompose(recompose(decompose(testCase, { start: false })), {
              start: false,
            }),
          ),
        ).toEqual(testCase);
      });
    });
  });

  test('#04 => Real tests', () => {
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

    const actual = recompose(decomposed);
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

    expect(actual).toEqual(expected);
  });

  describe('#05 => Options tests', () => {
    test('#01 => Custom separator "/"', () => {
      const flat = {
        '/data/name': 'Charles',
        '/data/age': 30,
      };
      const expected = {
        data: {
          name: 'Charles',
          age: 30,
        },
      };
      expect(recompose(flat, { sep: '/' })).toEqual(expected);
    });

    test('#02 => Custom separator "/" and start = false', () => {
      const flat = {
        'data/name': 'Charles',
        'data/age': 30,
      };
      const expected = {
        data: {
          name: 'Charles',
          age: 30,
        },
      };
      expect(recompose(flat, { sep: '/', start: false })).toEqual(
        expected,
      );
    });

    test('#03 => Default separator "." and start = false', () => {
      const flat = {
        'data.name': 'Charles',
        'data.age': 30,
      };
      const expected = {
        data: {
          name: 'Charles',
          age: 30,
        },
      };
      expect(recompose(flat, { start: false })).toEqual(expected);
    });

    test('#04 => object = "both"', () => {
      const flat = {
        data: { name: 'Charles' },
        'data.name': 'Charles',
      };
      const expected = {
        data: {
          name: 'Charles',
        },
      };
      expect(recompose(flat, { start: false, object: 'both' })).toEqual(
        expected,
      );
    });

    test('#05 => start = true but key has no leading sep', () => {
      const flat = {
        'data.name': 'Charles',
        'data.age': 30,
      };
      const expected = {
        data: {
          name: 'Charles',
          age: 30,
        },
      };
      expect(recompose(flat, { start: true })).toEqual(expected);
    });
  });

  describe('#06 => decompose / recompose roundtrip with options', () => {
    const optionsList = [
      { start: true, sep: '.' },
      { start: false, sep: '.' },
      { start: true, sep: '/' },
      { start: false, sep: '/' },
      { start: true, sep: '.', object: 'object' },
      { start: true, sep: '.', object: 'both' },
    ] as const;

    let index = 0;
    optionsList.forEach(options => {
      [ttest1, ttest2, ttest3, ttest4].forEach((testCase, caseIdx) => {
        test(`#06.${index} => Options: ${JSON.stringify(options)} for ttest-${caseIdx}`, () => {
          const flat = decompose(testCase, options);
          const restored = recompose.low(flat, options);
          expect(restored).toEqual(testCase);
        });
        index++;
      });
    });
  });
});
