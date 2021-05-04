const root = '/api';
const usersRoot = `${root}/user`;
const booksRoot = `${root}/book`;
const books = `${root}/books`;

export const routes = {
  user: {
    root: usersRoot,
    delete: `${usersRoot}/:id`,
    auth: `${usersRoot}/auth`,
    refresh: `${usersRoot}/refresh`,
  },
  book: {
    root: booksRoot,
    books,
  },
};
