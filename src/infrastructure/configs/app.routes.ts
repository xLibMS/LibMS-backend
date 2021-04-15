const root = '/api';
const usersRoot = `${root}/user`;

export const routes = {
  user: {
    root: usersRoot,
    delete: `${usersRoot}/:id`,
    auth: `${usersRoot}/auth`,
    refresh: `${usersRoot}/refresh`,
  },
};
