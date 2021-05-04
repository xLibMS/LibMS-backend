const root = '/api';
const usersRoot = `${root}/user`;
const booksRoot = `${root}/book`;
const booksList = `${root}/books-list`;

export const routes = {
  user: {
    root: usersRoot,
    delete: `${usersRoot}/:id`,
    auth: `${usersRoot}/auth`,
    refresh: `${usersRoot}/refresh`,
  },
  book: {
    root: booksRoot,
    list: booksList,
  },
};
