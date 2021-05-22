const root = '/api';
const usersRoot = `${root}/users`;
const booksRoot = `${root}/books`;
const reservationRoot = `${root}/reservations`;

export const routes = {
  user: {
    createUser: usersRoot,
    delete: `${usersRoot}/:id`,
    profile: `${usersRoot}/@me`,
    email: `${usersRoot}/email`,
  },
  auth: {
    login: `${usersRoot}/auth`,
    refresh: `${usersRoot}/refresh`,
  },
  book: {
    createBook: booksRoot,
    books: booksRoot,
  },
  author: {
    authors: `${booksRoot}/authors`,
  },
  reservation: {
    reservations: `${reservationRoot}`,
    createReservation: `${reservationRoot}`,
    acceptReservation: `${reservationRoot}/:id/accept`,
    rejectReservation: `${reservationRoot}/:id/reject`,
    cancelReservation: `${reservationRoot}/:id/cancel`,
  },
};
