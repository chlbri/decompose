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
