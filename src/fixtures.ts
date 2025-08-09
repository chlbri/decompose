export const ttest0 = {};
export const ttest1 = { age: 16, name: 'Alfred' };
export const ttest2 = {
  _id: 'nanoid',
  data: {
    name: {
      firstName: 'Charles-Lévi',
      lastName: 'BRI',
    },
  },
  statistics: {
    updations: 5,
    deletions: 34,
  },
};
export const ttest3 = {
  ...ttest2,
  arr: [1, 2, 3],
};

//With array of objects and arrays of primitives
export const ttest4 = {
  _id: 'nanoid',
  data: {
    name: {
      firstName: 'Charles-Lévi',
      lastName: 'BRI',
    },
  },
  statistics: {
    updations: 5,
    deletions: 34,
  },
  arr: [
    {
      id: 1,
      value: 'one',
    },
    {
      id: 2,
      value: 'two',
    },
    {
      id: 3,
      value: 'three',
    },
  ],
  arr2: [1, 2, 3],
  arr3: ['a', 'b', 'c'],
};

export const flatByKey1 = {
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
            state1: {
              entry: 'inc',
              exit: 'inc',
            },
            state2: {
              entry: 'inc',
              exit: 'inc',
            },
            entry: {
              entry: 'inc',
              exit: 'inc',
            },
            exit: {
              entry: 'inc',
              exit: 'inc',
            },
          },
        },
      },
    },
  },
} as const;

export const TEST_SKIP = process.env.VITEST_VSCODE === 'true';

export const dumbFn = () => {};
