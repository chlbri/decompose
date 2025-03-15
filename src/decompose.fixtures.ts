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
