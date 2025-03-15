import { createTests } from '@bemedev/vitest-extended';
import { ttest1, ttest2, ttest3 } from './decompose.fixtures';
import { recompose, recomposeObjectUrl } from './recompose';

describe('recompose', () => {
  describe('#1 => URL for coverage', () => {
    const { acceptation, success } = createTests(recomposeObjectUrl);
    describe('#0 Acceptation', acceptation);

    describe(
      '#1 Success',
      success({
        invite: 'Empty string',
        parameters: ['', 10],
        expected: {},
      }),
    );
  });

  describe('recompose', () => {
    const { acceptation, success } = createTests(recompose);
    describe('#0 Acceptation', acceptation);

    describe(
      '#1 Success',
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
});
