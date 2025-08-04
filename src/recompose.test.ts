import { createTests } from '@bemedev/vitest-extended';
import { decompose } from './decompose';
import { ttest0, ttest1, ttest2, ttest3, ttest4 } from './fixtures';
import { recompose, recomposeObjectUrl } from './recompose';

describe('recompose', () => {
  describe('#01 => URL for coverage', () => {
    const { acceptation, success } = createTests(recomposeObjectUrl);
    describe('#01.00 => Acceptation', acceptation);

    describe(
      '#01.01 => Success',
      success({
        invite: 'Empty string',
        parameters: ['', 10],
        expected: {},
      }),
    );
  });

  describe('#02 => recompose', () => {
    const { acceptation, success } = createTests(recompose);
    describe('#02.00 => Acceptation', acceptation);

    describe(
      '#02.01 => Success',
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
      test(`#03.0${index} => For ttest-${index}`, () => {
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
});
