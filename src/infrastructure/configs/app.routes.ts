const root = '/api';
const usersRoot = `${root}/users`;
const booksRoot = `${root}/books`;
const authorsRoot = `${root}/authors`;
const reservationRoot = `${root}/reservations`;

export const routes = {
  user: {
    createUser: usersRoot,
    profile: `${usersRoot}/@me`,
    delete: `${usersRoot}/:id`,
    email: `${usersRoot}/email`,
  },
  auth: {
    login: `${usersRoot}/auth`,
    refresh: `${usersRoot}/refresh`,
  },
  book: {
    createBook: booksRoot,
    books: booksRoot,
    book: `${booksRoot}/:id`,
  },
  author: {
    authors: `${authorsRoot}`,
  },
  reservation: {
    reservations: `${reservationRoot}`,
    createReservation: `${reservationRoot}`,
    acceptReservation: `${reservationRoot}/:id/accept`,
    rejectReservation: `${reservationRoot}/:id/reject`,
    cancelReservation: `${reservationRoot}/:id/cancel`,
    checkOut: `${reservationRoot}/:id/check-out`,
    userReservations: `${reservationRoot}/@me`,
  },
};
